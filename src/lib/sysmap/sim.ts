import { NODES, curve, curveLength, edgeByKey, edgeKey, nodeById, type NodeDef } from "./topology";

/**
 * A discrete-event simulation of a redacted production system: requests
 * through an edge to a core API, and async jobs through a staged pipeline.
 *
 * Time is simulated, not wall-clock: a min-heap of timers is advanced every
 * animation frame by `step(realMs)`, scaled by `speed`, and each request is an
 * ordinary async function that awaits `sleep`, `travel` and `work`. So the
 * whole thing pauses, speeds up and slows down exactly, and the flows read
 * like the code they model.
 *
 * What is modelled (generic distributed-systems behaviour):
 * - Instances with a fixed number of concurrent slots and a FIFO wait queue
 *   in front of each service.
 * - Killing an instance aborts what it was doing. HTTP requests on it fail
 *   with a 502; pipeline jobs go back on the queue. A replacement comes up
 *   after a crash back-off and a readiness delay, and the edge only routes to
 *   ready instances, so requests wait, and time out as 504s if none return.
 * - Calls to the external model API can fail. Stages release their slot and
 *   re-enqueue the job with exponential backoff plus jitter, and dead-letter
 *   it after the last attempt.
 * - Optional autoscaling of the stages on queue depth, with scale-down only
 *   after a sustained idle spell.
 *
 * Timings are compressed, step counts vary per job, and replica counts are
 * illustrative.
 */

export type Flow = "read" | "job" | "webhook";

export type Packet = {
  id: number;
  from: string;
  to: string;
  t0: number;
  dur: number;
  flow: Flow;
  traced: boolean;
  failed: boolean;
};

export type PodState = "ready" | "starting" | "down" | "terminating";
type Pod = { id: number; state: PodState; busy: number; tokens: Set<Token> };
type Token = { pod: Pod; aborted: boolean; svc: Service };
type Waiter = { resolve: (t: Token) => void; reject: (e: Error) => void; timer?: number };

type Service = {
  def: NodeDef;
  pods: Pod[];
  waiters: Waiter[];
  idleFor: number;
  /** Sim time of the last failure here, for a flash on the map. */
  lastError: number;
  /** Current step of the long stage, shown on the node. */
  step: number;
};

export type Span = {
  name: string;
  node: string;
  start: number;
  end?: number;
  status: "ok" | "error" | "retry";
};

export type Trace = { id: number; spans: Span[]; start: number; end?: number; outcome?: string };

type Done = { flow: Flow; t: number; ms: number; ok: boolean; built?: boolean };

/**
 * Packets are slowed down so they can be watched, so HTTP latency is measured
 * without their travel time and with a modelled in-cluster hop instead.
 */
type Net = { visual: number; modelled: number };

class Aborted extends Error {}
class Timeout extends Error {}
class ModelError extends Error {}

const TRAVEL_PX_PER_MS = 0.9;
const RESTART_BACKOFF_MS = 1400;
const READINESS_MS = 1900;
const HTTP_TIMEOUT_MS = 3500;
const MAX_ATTEMPTS = 4;
const RETRY_BASE_MS = 500;
/** The long stage makes a varying number of model calls per job. */
const STEPS: [number, number] = [6, 12];
const REUSE_RATE = 0.3;
const WINDOW_MS = 20_000;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Rates in arrivals per simulated second, at traffic 1×. */
const RATES: Record<Flow, number> = { read: 5, job: 0.9, webhook: 0.25 };

export class Simulation {
  now = 0;
  speed = 1;
  paused = false;
  traffic = 1;
  autoscale = true;
  modelDown = false;
  spikeUntil = -1;

  packets: Packet[] = [];
  services: Record<string, Service> = {};
  trace: Trace | null = null;

  built = 0;
  reused = 0;
  retries = 0;
  deadLettered = 0;
  failed = 0;
  private done: Done[] = [];
  private modelCalls: number[] = [];

  private heap: { t: number; seq: number; fn: () => void }[] = [];
  private seq = 0;
  private ids = 0;
  private nextArrival: Record<Flow, number> = { read: 0, job: 0, webhook: 0 };
  private lengths: Record<string, number> = {};
  private nextScale = 0;

  constructor() {
    for (const def of NODES) {
      if (!def.replicas) continue;
      this.services[def.id] = {
        def,
        pods: Array.from({ length: def.replicas }, () => this.pod("ready")),
        waiters: [],
        idleFor: 0,
        lastError: -1e9,
        step: 0,
      };
    }
    for (const [k, e] of Object.entries(edgeByKey)) this.lengths[k] = curveLength(curve(e));
  }

  // ---- clock -------------------------------------------------------------

  private at(t: number, fn: () => void) {
    const h = this.heap;
    h.push({ t, seq: this.seq++, fn });
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p].t < h[i].t || (h[p].t === h[i].t && h[p].seq < h[i].seq)) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  }

  private pop() {
    const h = this.heap;
    const top = h[0];
    const last = h.pop()!;
    if (h.length) {
      h[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        const r = l + 1;
        let m = i;
        const less = (a: number, b: number) =>
          h[a].t < h[b].t || (h[a].t === h[b].t && h[a].seq < h[b].seq);
        if (l < h.length && less(l, m)) m = l;
        if (r < h.length && less(r, m)) m = r;
        if (m === i) break;
        [h[m], h[i]] = [h[i], h[m]];
        i = m;
      }
    }
    return top;
  }

  sleep(ms: number) {
    return new Promise<void>((resolve) => this.at(this.now + Math.max(0, ms), resolve));
  }

  /** Advances simulated time by a frame's worth of real time. */
  step(realMs: number) {
    if (this.paused) return;
    const dt = Math.min(100, realMs) * this.speed;
    const end = this.now + dt;
    this.arrivals(end);
    while (this.heap.length && this.heap[0].t <= end) {
      const e = this.pop();
      this.now = e.t;
      e.fn();
    }
    this.now = end;
    if (this.now >= this.nextScale) {
      this.nextScale = this.now + 1000;
      this.scale(1000);
    }
    this.packets = this.packets.filter((p) => p.t0 + p.dur > this.now);
    const cutoff = this.now - WINDOW_MS;
    if (this.done.length && this.done[0].t < cutoff)
      this.done = this.done.filter((d) => d.t >= cutoff);
    if (this.modelCalls.length && this.modelCalls[0] < this.now - 5000)
      this.modelCalls = this.modelCalls.filter((t) => t >= this.now - 5000);
  }

  // ---- traffic -------------------------------------------------------------

  private arrivals(until: number) {
    const boost = this.now < this.spikeUntil ? 5 : 1;
    for (const flow of ["read", "job", "webhook"] as Flow[]) {
      const rate = (RATES[flow] * this.traffic * boost) / 1000;
      if (rate <= 0) continue;
      if (this.nextArrival[flow] < this.now) this.nextArrival[flow] = this.now;
      while (this.nextArrival[flow] <= until) {
        const t = this.nextArrival[flow];
        this.at(t, () => this.start(flow, false));
        // Poisson arrivals: exponential gaps.
        this.nextArrival[flow] += -Math.log(1 - Math.random()) / rate;
      }
    }
  }

  start(flow: Flow, traced: boolean) {
    const run = flow === "read" ? this.read : flow === "job" ? this.pipelineJob : this.webhook;
    const t0 = this.now;
    const net: Net = { visual: 0, modelled: 0 };
    // HTTP flows report modelled latency; a job reports the whole pipeline.
    const ms = () => (flow === "job" ? this.now - t0 : this.now - t0 - net.visual + net.modelled);
    if (traced) this.trace = { id: ++this.ids, spans: [], start: t0 };
    run.call(this, traced, net).then(
      (outcome) => {
        this.done.push({
          flow,
          t: this.now,
          ms: ms(),
          ok: true,
          built: outcome === "job done",
        });
        if (traced && this.trace) {
          this.trace.end = this.now;
          this.trace.outcome = outcome;
        }
      },
      (e: Error) => {
        this.done.push({ flow, t: this.now, ms: ms(), ok: false });
        this.failed++;
        if (traced && this.trace) {
          this.trace.end = this.now;
          this.trace.outcome = e.message || "failed";
        }
      },
    );
  }

  // ---- primitives ------------------------------------------------------------

  private span(traced: boolean, name: string, node: string): Span | null {
    if (!traced || !this.trace) return null;
    const s: Span = { name, node, start: this.now, status: "ok" };
    this.trace.spans.push(s);
    return s;
  }

  private close(s: Span | null, status: Span["status"] = "ok") {
    if (!s) return;
    s.end = this.now;
    s.status = status;
  }

  /** A hop along the map, as a packet; resolves on arrival. */
  private async travel(
    from: string,
    to: string,
    flow: Flow,
    traced: boolean,
    failed = false,
    net?: Net,
  ) {
    const len = this.lengths[edgeKey(from, to)] ?? 200;
    const dur = len / TRAVEL_PX_PER_MS;
    if (net) {
      net.visual += dur;
      net.modelled += rand(0.3, 1.2);
    }
    this.packets.push({ id: ++this.ids, from, to, t0: this.now, dur, flow, traced, failed });
    await this.sleep(dur);
  }

  private pod(state: PodState): Pod {
    return { id: ++this.ids, state, busy: 0, tokens: new Set() };
  }

  private freePod(svc: Service) {
    let best: Pod | null = null;
    for (const p of svc.pods) {
      if (p.state !== "ready" || p.busy >= (svc.def.perPod ?? 1)) continue;
      if (!best || p.busy < best.busy) best = p;
    }
    return best;
  }

  private take(svc: Service, pod: Pod): Token {
    const t: Token = { pod, aborted: false, svc };
    pod.busy++;
    pod.tokens.add(t);
    return t;
  }

  /** A slot on one of the service's Ready pods, queueing if there is none. */
  private acquire(id: string, timeoutMs?: number) {
    const svc = this.services[id];
    const pod = this.freePod(svc);
    if (pod && !svc.waiters.length) return Promise.resolve(this.take(svc, pod));
    return new Promise<Token>((resolve, reject) => {
      const w: Waiter = { resolve, reject };
      svc.waiters.push(w);
      if (timeoutMs) {
        const seq = this.seq;
        this.at(this.now + timeoutMs, () => {
          const i = svc.waiters.indexOf(w);
          if (i < 0) return;
          svc.waiters.splice(i, 1);
          svc.lastError = this.now;
          reject(new Timeout("504 · no ready pod"));
        });
        void seq;
      }
    });
  }

  private release(t: Token) {
    t.pod.busy--;
    t.pod.tokens.delete(t);
    if (t.pod.state === "terminating" && t.pod.busy === 0) {
      t.svc.pods = t.svc.pods.filter((p) => p !== t.pod);
    }
    this.pump(t.svc);
  }

  private pump(svc: Service) {
    while (svc.waiters.length) {
      const pod = this.freePod(svc);
      if (!pod) return;
      const w = svc.waiters.shift()!;
      w.resolve(this.take(svc, pod));
    }
  }

  /** Time spent on a slot that has already been acquired; throws if its pod died. */
  private async busy(t: Token, ms: number) {
    await this.sleep(ms);
    if (t.aborted) throw new Aborted("pod killed");
  }

  private async model(from: string, flow: Flow, traced: boolean, what: string, ms: number) {
    const s = this.span(traced, what, "ai");
    await this.travel(from, "ai", flow, traced);
    this.modelCalls.push(this.now);
    if (this.modelDown && Math.random() < 0.85) {
      await this.sleep(rand(150, 300));
      this.services[from].lastError = this.now;
      await this.travel("ai", from, flow, traced, true);
      this.close(s, "error");
      throw new ModelError("AI provider 503");
    }
    await this.sleep(ms);
    await this.travel("ai", from, flow, traced);
    this.close(s);
  }

  /**
   * One pipeline stage of a job: wait for a slot, run, and on failure
   * give the slot back and come back later with exponential backoff.
   */
  private async job(stage: string, traced: boolean, run: (t: Token) => Promise<void>) {
    for (let attempt = 1; ; attempt++) {
      const q = this.span(traced, `queued · ${stage}`, "queue");
      const token = await this.acquire(stage);
      this.close(q);
      const s = this.span(traced, attempt > 1 ? `${stage} (attempt ${attempt})` : stage, stage);
      try {
        await run(token);
        this.release(token);
        this.close(s);
        return;
      } catch (e) {
        this.release(token);
        this.services[stage].lastError = this.now;
        if (attempt >= MAX_ATTEMPTS) {
          this.close(s, "error");
          this.deadLettered++;
          throw new Error(`dead-lettered at ${stage}`);
        }
        this.close(s, "retry");
        this.retries++;
        if (e instanceof Aborted) continue; // the pod died: straight back on the queue
        const backoff = RETRY_BASE_MS * 2 ** (attempt - 1) * rand(0.8, 1.2);
        const d = this.span(traced, `backoff ${Math.round(backoff)}ms`, "queue");
        await this.sleep(backoff);
        this.close(d, "retry");
      }
    }
  }

  // ---- flows ---------------------------------------------------------------

  /** A read: through the edge to the API, a database read, and back. */
  private async read(traced: boolean, net: Net) {
    const client = Math.random() < 0.8 ? "mobile" : "web";
    await this.travel(client, "edge", "read", traced, false, net);
    await this.http(client, "read", traced, "GET request", net, async (t) => {
      await this.busy(t, rand(4, 12));
      const s = this.span(traced, "DB read", "db");
      await this.travel("api", "db", "read", traced, false, net);
      await this.sleep(rand(4, 18));
      await this.travel("db", "api", "read", traced, false, net);
      this.close(s);
      if (t.aborted) throw new Aborted("pod killed");
    });
    await this.travel("edge", client, "read", traced, false, net);
    return "200 OK";
  }

  /** A third-party webhook updating a record. */
  private async webhook(traced: boolean, net: Net) {
    await this.travel("payments", "edge", "webhook", traced, false, net);
    await this.http("payments", "webhook", traced, "POST webhook", net, async (t) => {
      await this.busy(t, rand(3, 8));
      const s = this.span(traced, "DB write", "db");
      await this.travel("api", "db", "webhook", traced, false, net);
      await this.sleep(rand(6, 20));
      await this.travel("db", "api", "webhook", traced, false, net);
      this.close(s);
    });
    await this.travel("edge", "payments", "webhook", traced, false, net);
    return "200 OK";
  }

  /**
   * The API leg of an HTTP request: the edge waits for a ready instance (504
   * after a while), and a pod dying mid-request turns into a 502.
   */
  private async http(
    client: string,
    flow: Flow,
    traced: boolean,
    name: string,
    net: Net | undefined,
    handler: (t: Token) => Promise<void>,
  ) {
    const s = this.span(traced, name, "api");
    let token: Token;
    try {
      token = await this.acquire("api", HTTP_TIMEOUT_MS);
    } catch (e) {
      this.close(s, "error");
      await this.travel("edge", client, flow, traced, true, net);
      throw e;
    }
    await this.travel("edge", "api", flow, traced, false, net);
    try {
      await handler(token);
    } catch (e) {
      this.release(token);
      this.close(s, "error");
      this.services.api.lastError = this.now;
      await this.travel("api", "edge", flow, traced, true, net);
      await this.travel("edge", client, flow, traced, true, net);
      throw e instanceof Aborted ? new Error("502 · pod killed mid-request") : e;
    }
    this.release(token);
    await this.travel("api", "edge", flow, traced, false, net);
    this.close(s);
  }

  /**
   * An async job. The API answers 202 at once and enqueues it; stage 1 may
   * finish it early, otherwise it runs through stages 2 and 3 and fans out to
   * stages 4 and 5 in parallel.
   */
  private async pipelineJob(traced: boolean, _net?: Net) {
    await this.travel("mobile", "edge", "job", traced);
    await this.http("mobile", "job", traced, "POST request → 202", undefined, async (t) => {
      await this.busy(t, rand(6, 14));
      await this.travel("api", "queue", "job", traced);
      await this.travel("queue", "api", "job", traced);
    });
    void this.travel("edge", "mobile", "job", traced);

    // Stage 1: one model call and a lookup; it may find the result already exists.
    await this.travel("queue", "stage1", "job", traced);
    let duplicate = false;
    await this.job("stage1", traced, async (t) => {
      await this.model("stage1", "job", traced, "model call", rand(200, 380));
      const s = this.span(traced, "DB lookup", "db");
      await this.travel("stage1", "db", "job", traced);
      await this.sleep(rand(15, 45));
      await this.travel("db", "stage1", "job", traced);
      this.close(s);
      if (t.aborted) throw new Aborted("pod killed");
      // A traced job always runs in full, so there is a pipeline to see.
      duplicate = !traced && Math.random() < REUSE_RATE;
    });
    if (duplicate) {
      await this.travel("stage1", "api", "job", traced);
      this.reused++;
      return "finished early (result existed)";
    }

    await this.travel("stage1", "queue", "job", traced);
    await this.travel("queue", "stage2", "job", traced);
    await this.job("stage2", traced, async (t) => {
      await this.model("stage2", "job", traced, "model call", rand(350, 650));
      if (t.aborted) throw new Aborted("pod killed");
    });

    await this.travel("stage2", "queue", "job", traced);
    await this.travel("queue", "stage3", "job", traced);
    await this.job("stage3", traced, async (t) => {
      const svc = this.services.stage3;
      const steps = Math.round(rand(...STEPS));
      for (let i = 1; i <= steps; i++) {
        svc.step = i;
        await this.model("stage3", "job", traced, `model call ${i}`, rand(160, 380));
        if (t.aborted) throw new Aborted("pod killed");
      }
      const s = this.span(traced, "write object", "store");
      await this.travel("stage3", "store", "job", traced);
      await this.travel("store", "stage3", "job", traced);
      this.close(s);
    });

    // Fan out: stages 4 and 5 in parallel.
    await this.travel("stage3", "queue", "job", traced);
    const media = (stage: "stage4" | "stage5", what: string, ms: [number, number]) =>
      (async () => {
        await this.travel("queue", stage, "job", traced);
        await this.job(stage, traced, async (t) => {
          await this.model(stage, "job", traced, what, rand(...ms));
          const s = this.span(traced, `PUT ${stage}`, "store");
          await this.travel(stage, "store", "job", traced);
          await this.travel("store", stage, "job", traced);
          this.close(s);
          if (t.aborted) throw new Aborted("pod killed");
        });
        const p = this.span(traced, `PATCH status (${stage})`, "api");
        await this.travel(stage, "api", "job", traced);
        this.close(p);
      })();
    await Promise.all([
      media("stage4", "model call", [1100, 1900]),
      media("stage5", "model call", [800, 1500]),
    ]);
    const s = this.span(traced, "DB write", "db");
    await this.travel("api", "db", "job", traced);
    await this.travel("db", "api", "job", traced);
    this.close(s);
    this.built++;
    return "job done";
  }

  // ---- chaos and scaling -------------------------------------------------

  /** Kills one running instance; it is restarted after a back-off. */
  killPod(id: string) {
    const svc = this.services[id];
    const victims = svc?.pods.filter((p) => p.state === "ready");
    if (!victims?.length) return false;
    const pod = victims[Math.floor(Math.random() * victims.length)];
    pod.state = "down";
    svc.lastError = this.now;
    for (const t of pod.tokens) t.aborted = true;
    this.at(this.now + RESTART_BACKOFF_MS, () => {
      if (pod.state !== "down") return;
      pod.state = "starting";
      this.at(this.now + READINESS_MS, () => {
        if (pod.state !== "starting") return;
        pod.state = "ready";
        this.pump(svc);
      });
    });
    return true;
  }

  private scale(everyMs: number) {
    if (!this.autoscale) return;
    for (const svc of Object.values(this.services)) {
      const def = svc.def;
      if (def.kind !== "worker" || !def.max) continue;
      const live = svc.pods.filter((p) => p.state !== "terminating");
      const ready = live.filter((p) => p.state === "ready");
      const cap = ready.length * (def.perPod ?? 1);
      const busy = ready.reduce((n, p) => n + p.busy, 0);
      if (svc.waiters.length > cap * 0.5 && live.length < def.max) {
        const pod = this.pod("starting");
        svc.pods.push(pod);
        this.at(this.now + READINESS_MS, () => {
          if (pod.state !== "starting") return;
          pod.state = "ready";
          this.pump(svc);
        });
        svc.idleFor = 0;
      } else if (!svc.waiters.length && busy < cap * 0.3) {
        svc.idleFor += everyMs;
        if (svc.idleFor >= 6000 && live.length > (def.min ?? 1)) {
          const idle = ready.find((p) => p.busy === 0);
          if (idle) {
            idle.state = "terminating";
            svc.pods = svc.pods.filter((p) => p !== idle);
          }
          svc.idleFor = 0;
        }
      } else {
        svc.idleFor = 0;
      }
    }
  }

  // ---- read-outs -------------------------------------------------------------

  stats() {
    const window = this.done;
    const pct = (flow: Flow, p: number, builtOnly = false) => {
      const ms = window
        .filter((d) => d.flow === flow && d.ok && (!builtOnly || d.built))
        .map((d) => d.ms);
      if (!ms.length) return 0;
      ms.sort((a, b) => a - b);
      return ms[Math.min(ms.length - 1, Math.floor(ms.length * p))];
    };
    const last5 = window.filter((d) => d.t >= this.now - 5000);
    const errors = last5.filter((d) => !d.ok).length;
    return {
      rps: last5.length / 5,
      errorRate: last5.length ? errors / last5.length : 0,
      readP50: pct("read", 0.5),
      readP95: pct("read", 0.95),
      jobP50: pct("job", 0.5, true),
      modelPerSec: this.modelCalls.length / 5,
      built: this.built,
      reused: this.reused,
      retries: this.retries,
      deadLettered: this.deadLettered,
      failed: this.failed,
      inFlight: this.packets.length,
    };
  }

  nodeState(id: string) {
    const svc = this.services[id];
    if (!svc) return null;
    const per = svc.def.perPod ?? 1;
    const ready = svc.pods.filter((p) => p.state === "ready");
    const cap = ready.length * per;
    const busy = ready.reduce((n, p) => n + p.busy, 0);
    return {
      pods: svc.pods.map((p) => p.state),
      util: cap ? busy / cap : svc.waiters.length ? 1 : 0,
      queued: svc.waiters.length,
      erroredRecently: this.now - svc.lastError < 900,
      step: id === "stage3" && busy > 0 ? svc.step : 0,
    };
  }
}
