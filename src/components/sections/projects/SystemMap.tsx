import { useEffect, useRef, useState } from "react";
import { Activity, Pause, Play, Radar, Skull, Zap } from "lucide-react";
import { Simulation, type Flow, type Trace } from "@/lib/sysmap/sim";
import {
  EDGES,
  NODES,
  NODE_H,
  NODE_W,
  bezier,
  curve,
  edgeByKey,
  edgeKey,
  nodeById,
  type NodeDef,
} from "@/lib/sysmap/topology";

/**
 * The flagship system, live and redacted: a generic model of its shape as a
 * running simulation. Service names and internals are withheld and some tags
 * are blurred on purpose. Requests and pipeline jobs flow across the map as
 * packets; instances, queues and load update as they go. Kill an instance,
 * take the AI provider down, spike the traffic or trace one job end to end.
 */

const COLORS: Record<Flow | "failed" | "traced", string> = {
  read: "#22d3ee",
  job: "#a78bfa",
  webhook: "#fbbf24",
  failed: "#f43f5e",
  traced: "#ffffff",
};
const POD_COLORS = {
  ready: "#34d399",
  starting: "#fbbf24",
  down: "#f43f5e",
  terminating: "#64748b",
};
const SPEEDS = [0.5, 1, 2, 4];
const SNAPSHOT_MS = 120;
const POOL = 420;

type Snapshot = {
  nodes: Record<string, ReturnType<Simulation["nodeState"]>>;
  stats: ReturnType<Simulation["stats"]>;
  trace: Trace | null;
  now: number;
};

const curves = Object.fromEntries(EDGES.map((e) => [edgeKey(e.a, e.b), curve(e)]));

function pathD(e: (typeof EDGES)[number]) {
  const [p0, p1, p2, p3] = curve(e);
  return `M${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
}

/**
 * Placeholder for a withheld detail: letters derived from the node's generic
 * id, never from the real name, so un-blurring it reveals nothing.
 */
function redactedTag(id: string) {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const abc = "abcdefghijklmnopqrstuvwxyz";
  const word = (n: number) =>
    Array.from({ length: n }, () => {
      h = Math.imul(h ^ (h >>> 13), 0x5bd1e995);
      return abc[Math.abs(h) % 26];
    }).join("");
  return `${word(5 + (Math.abs(h) % 4))} · ${word(4 + (Math.abs(h >> 3) % 5))}`;
}

function fmtMs(ms: number) {
  if (!ms) return "—";
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
}

export function SystemMap() {
  const simRef = useRef<Simulation | null>(null);
  const packetLayer = useRef<SVGGElement>(null);
  const edgeRefs = useRef<Record<string, SVGPathElement | null>>({});
  const boxRef = useRef<HTMLDivElement>(null);
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [selected, setSelected] = useState<string>("api");
  const [ui, setUi] = useState({
    paused: false,
    speed: 1,
    traffic: 1,
    autoscale: true,
    modelDown: false,
  });

  useEffect(() => {
    const sim = new Simulation();
    simRef.current = sim;
    const layer = packetLayer.current!;
    const NS = "http://www.w3.org/2000/svg";
    const pool: SVGCircleElement[] = [];
    for (let i = 0; i < POOL; i++) {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("r", "3");
      c.style.display = "none";
      layer.appendChild(c);
      pool.push(c);
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) sim.speed = 0.5;

    let raf = 0;
    let last = performance.now();
    let lastSnap = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    if (boxRef.current) io.observe(boxRef.current);

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = t - last;
      last = t;
      if (!visible || document.hidden) return;
      sim.step(dt);

      // Edges light up with the traffic on them.
      const load: Record<string, number> = {};
      for (const p of sim.packets) {
        const k = edgeKey(p.from, p.to);
        load[k] = (load[k] ?? 0) + (p.failed ? 3 : 1);
      }
      for (const [k, el] of Object.entries(edgeRefs.current)) {
        if (!el) continue;
        const n = load[k] ?? 0;
        el.style.strokeOpacity = String(n ? Math.min(0.75, 0.28 + n * 0.07) : 0.16);
        el.style.stroke = n ? "var(--color-primary)" : "currentColor";
      }

      let i = 0;
      for (const p of sim.packets) {
        if (i >= POOL) break;
        const e = edgeByKey[edgeKey(p.from, p.to)];
        const c = curves[edgeKey(p.from, p.to)];
        if (!e || !c) continue;
        let k = Math.min(1, Math.max(0, (sim.now - p.t0) / p.dur));
        if (p.from !== e.a) k = 1 - k;
        const pt = bezier(c, k);
        const el = pool[i++];
        el.style.display = "";
        el.setAttribute("cx", pt.x.toFixed(1));
        el.setAttribute("cy", pt.y.toFixed(1));
        el.setAttribute("r", p.traced ? "5.5" : "3");
        el.setAttribute(
          "fill",
          p.failed ? COLORS.failed : p.traced ? COLORS.traced : COLORS[p.flow],
        );
        el.setAttribute("filter", p.traced ? "url(#sysmap-glow-strong)" : "url(#sysmap-glow)");
      }
      for (; i < POOL; i++) {
        if (pool[i].style.display === "none") break;
        pool[i].style.display = "none";
      }

      if (t - lastSnap > SNAPSHOT_MS) {
        lastSnap = t;
        const nodes: Snapshot["nodes"] = {};
        for (const n of NODES) nodes[n.id] = sim.nodeState(n.id);
        setSnap({
          nodes,
          stats: sim.stats(),
          trace: sim.trace ? { ...sim.trace, spans: [...sim.trace.spans] } : null,
          now: sim.now,
        });
      }
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      layer.replaceChildren();
    };
  }, []);

  const set = <K extends keyof typeof ui>(key: K, value: (typeof ui)[K]) => {
    const sim = simRef.current;
    if (sim) (sim as unknown as Record<string, unknown>)[key] = value;
    setUi((u) => ({ ...u, [key]: value }));
  };

  const sim = simRef.current;
  const sel = nodeById[selected];
  const selState = snap?.nodes[selected];
  const s = snap?.stats;

  return (
    <div ref={boxRef} className="rounded-2xl border border-border bg-card/40 p-3 sm:p-5">
      {/* Header and controls */}
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300">
            Live · flagship system · redacted
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
            Break production. It's a simulation.
          </h3>
          <p className="mt-1 max-w-xl text-xs text-muted-foreground">
            A redacted model of a production system I work on, running as a discrete-event
            simulation in your browser. Names and internals are withheld. Click any node to inspect
            it, kill its instances, or take the AI provider down, and watch retries, restarts and
            autoscaling handle it.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => set("paused", !ui.paused)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 hover:border-primary/60"
          >
            {ui.paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {ui.paused ? "Play" : "Pause"}
          </button>
          <div className="flex overflow-hidden rounded-md border border-border">
            {SPEEDS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => set("speed", v)}
                className={`px-2 py-1.5 ${ui.speed === v ? "bg-primary text-primary-foreground" : "bg-background hover:text-primary"}`}
              >
                {v}×
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5">
            <Activity className="h-3.5 w-3.5 text-primary" />
            traffic
            <input
              type="range"
              min={0}
              max={4}
              step={0.25}
              value={ui.traffic}
              onChange={(e) => set("traffic", Number(e.target.value))}
              className="w-20 accent-[var(--color-primary)]"
              aria-label="Traffic"
            />
            <span className="w-8 tabular-nums">{ui.traffic}×</span>
          </label>
          <button
            type="button"
            onClick={() => sim && (sim.spikeUntil = sim.now + 6000)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 hover:border-amber-400/60 hover:text-amber-300"
          >
            <Zap className="h-3.5 w-3.5" /> Spike 5×
          </button>
          <button
            type="button"
            onClick={() => set("autoscale", !ui.autoscale)}
            aria-pressed={ui.autoscale}
            className={`rounded-md border px-2.5 py-1.5 ${ui.autoscale ? "border-emerald-400/50 text-emerald-300" : "border-border bg-background text-muted-foreground"}`}
          >
            autoscale {ui.autoscale ? "on" : "off"}
          </button>
          <button
            type="button"
            onClick={() => sim?.start("job", true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 font-semibold text-primary-foreground hover:opacity-90"
          >
            <Radar className="h-3.5 w-3.5" /> Trace a job
          </button>
        </div>
      </div>

      <div className="mb-1 font-mono text-[10px] text-muted-foreground sm:hidden">
        ← swipe the map · tap a node →
      </div>
      {/* The map */}
      <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0">
        <svg
          viewBox="0 0 1100 620"
          className="min-w-[760px] w-full select-none"
          role="img"
          aria-label="Redacted architecture map with live simulated traffic"
        >
          <defs>
            <filter id="sysmap-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="sysmap-glow-strong" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="sysmap-redact" x="-10%" y="-60%" width="120%" height="220%">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
            <pattern id="sysmap-grid" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="1100" height="620" fill="url(#sysmap-grid)" className="text-foreground" />

          {/* Zones */}
          <Zone x={12} y={100} w={156} h={430} label="clients" />
          <Zone x={178} y={200} w={530} h={400} label="core" dashed />
          <Zone x={716} y={24} w={168} h={576} label="async pipeline" dashed />
          <Zone x={920} y={185} w={170} h={360} label="external" />

          {EDGES.map((e) => (
            <path
              key={edgeKey(e.a, e.b)}
              ref={(el) => {
                edgeRefs.current[edgeKey(e.a, e.b)] = el;
              }}
              d={pathD(e)}
              fill="none"
              stroke="currentColor"
              strokeWidth={e.callback ? 1 : 1.4}
              strokeDasharray={e.callback ? "4 5" : undefined}
              className="text-foreground transition-[stroke-opacity] duration-300"
            />
          ))}

          <g ref={packetLayer} />

          {NODES.map((n) => (
            <NodeBox
              key={n.id}
              def={n}
              state={snap?.nodes[n.id] ?? null}
              selected={selected === n.id}
              modelDown={n.id === "ai" && ui.modelDown}
              onSelect={() => setSelected(n.id)}
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-muted-foreground">
        <Dot c={COLORS.read} label="read request" />
        <Dot c={COLORS.job} label="async job" />
        <Dot c={COLORS.webhook} label="webhook" />
        <Dot c={COLORS.failed} label="failure" />
        <Dot c={COLORS.traced} label="traced request" />
        <span className="ml-auto">pods:</span>
        <Dot c={POD_COLORS.ready} label="ready" />
        <Dot c={POD_COLORS.starting} label="starting" />
        <Dot c={POD_COLORS.down} label="crashed" />
      </div>

      {/* Metrics */}
      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4 lg:grid-cols-7">
        <Metric label="throughput" value={s ? `${s.rps.toFixed(1)}/s` : "—"} />
        <Metric
          label="GET p50 / p95"
          value={s ? `${fmtMs(s.readP50)} / ${fmtMs(s.readP95)}` : "—"}
        />
        <Metric label="job p50" value={s ? fmtMs(s.jobP50) : "—"} />
        <Metric
          label="error rate (5s)"
          value={s ? `${(s.errorRate * 100).toFixed(1)}%` : "—"}
          warn={!!s && s.errorRate > 0.02}
        />
        <Metric label="model calls" value={s ? `${s.modelPerSec.toFixed(1)}/s` : "—"} />
        <Metric label="jobs done · early" value={s ? `${s.built} · ${s.reused}` : "—"} />
        <Metric
          label="retries · dead-lettered"
          value={s ? `${s.retries} · ${s.deadLettered}` : "—"}
          warn={!!s && s.deadLettered > 0}
        />
      </div>

      {/* Inspector and trace */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="rounded-xl border border-border bg-background/50 p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Inspector
          </div>
          <div className="mt-1 text-lg font-bold">{sel.label}</div>
          <div
            className="font-mono text-[11px] text-primary"
            style={sel.redacted ? { filter: "blur(3px)", userSelect: "none" } : undefined}
            aria-label={sel.redacted ? "redacted" : undefined}
          >
            {sel.redacted ? redactedTag(sel.id) : sel.sub}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{sel.info}</p>
          {selState && (
            <div className="mt-3 space-y-2 font-mono text-[11px]">
              <div className="flex flex-wrap items-center gap-1.5">
                pods
                {selState.pods.map((p, i) => (
                  <span
                    key={i}
                    title={p}
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: POD_COLORS[p] }}
                  />
                ))}
                <span className="text-muted-foreground">
                  {selState.pods.filter((p) => p === "ready").length}/{selState.pods.length} ready
                </span>
              </div>
              <div>
                load {Math.round(selState.util * 100)}% · queued {selState.queued}
                {sel.max ? ` · autoscale ${sel.min}–${sel.max}` : ""}
              </div>
              <button
                type="button"
                onClick={() => sim?.killPod(selected)}
                className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-rose-500/50 px-2.5 py-1.5 text-rose-300 hover:bg-rose-500/10"
              >
                <Skull className="h-3.5 w-3.5" /> Kill a pod
              </button>
            </div>
          )}
          {selected === "ai" && (
            <button
              type="button"
              onClick={() => set("modelDown", !ui.modelDown)}
              className={`mt-3 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] ${ui.modelDown ? "border-emerald-400/50 text-emerald-300" : "border-rose-500/50 text-rose-300 hover:bg-rose-500/10"}`}
            >
              {ui.modelDown ? "Restore the AI provider" : "Simulate an AI provider outage"}
            </button>
          )}
          {!selState && selected !== "ai" && (
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">
              Managed or external: not something you can kill from here. Try the core API or a
              worker.
            </p>
          )}
        </div>

        <TracePanel trace={snap?.trace ?? null} now={snap?.now ?? 0} />
      </div>

      <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
        Redacted on purpose: service names, internals and exact topology are withheld or
        generalised, and blurred tags are placeholders. Traffic, timings (compressed), replica
        counts and failures are simulated.
      </p>
    </div>
  );
}

function Zone({
  x,
  y,
  w,
  h,
  label,
  dashed,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  dashed?: boolean;
}) {
  return (
    <g className="text-foreground">
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={16}
        fill="currentColor"
        fillOpacity={0.02}
        stroke="currentColor"
        strokeOpacity={0.1}
        strokeDasharray={dashed ? "6 6" : undefined}
      />
      <text
        x={x + 12}
        y={y + h - 10}
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        opacity={0.35}
        letterSpacing="1.5"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function NodeBox({
  def,
  state,
  selected,
  modelDown,
  onSelect,
}: {
  def: NodeDef;
  state: ReturnType<Simulation["nodeState"]> | null;
  selected: boolean;
  modelDown: boolean;
  onSelect: () => void;
}) {
  const x = def.x - NODE_W / 2;
  const y = def.y - NODE_H / 2;
  const hot = !!state?.erroredRecently || modelDown;
  const accent =
    def.kind === "worker"
      ? "#a78bfa"
      : def.kind === "service" || def.kind === "edge"
        ? "#22d3ee"
        : def.kind === "external"
          ? "#fbbf24"
          : "#94a3b8";
  const util = state?.util ?? 0;

  return (
    <g
      onClick={onSelect}
      data-cursor="Inspect"
      className="cursor-pointer text-foreground"
      role="button"
      aria-label={`Inspect ${def.label}`}
    >
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx={12}
        fill="var(--color-background)"
        stroke={hot ? "#f43f5e" : selected ? accent : "currentColor"}
        strokeOpacity={hot || selected ? 1 : 0.18}
        strokeWidth={selected ? 1.8 : 1.2}
        style={{
          filter: hot
            ? "drop-shadow(0 0 8px rgba(244,63,94,.55))"
            : selected
              ? `drop-shadow(0 0 10px ${accent}66)`
              : undefined,
          transition: "stroke .2s",
        }}
      />
      <rect x={x} y={y + 10} width={3} height={NODE_H - 20} rx={1.5} fill={accent} />
      <text x={x + 12} y={y + 21} fontSize="12.5" fontWeight="700" fill="currentColor">
        {def.label}
      </text>
      <text
        x={x + 12}
        y={y + 36}
        fontSize="9.5"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        opacity={0.55}
        filter={!state?.step && def.redacted ? "url(#sysmap-redact)" : undefined}
      >
        {state?.step ? `model call ${state.step}` : def.redacted ? redactedTag(def.id) : def.sub}
      </text>

      {/* Pods */}
      {state?.pods.slice(0, 9).map((p, i) => (
        <circle key={i} cx={x + 14 + i * 9} cy={y + 46} r={3} fill={POD_COLORS[p]}>
          {p === "starting" && (
            <animate attributeName="opacity" values="1;.3;1" dur="0.8s" repeatCount="indefinite" />
          )}
        </circle>
      ))}

      {/* Load */}
      {state && (
        <rect
          x={x + NODE_W - 58}
          y={y + 43}
          width={46 * Math.min(1, util)}
          height={5}
          rx={2.5}
          fill={util > 0.85 ? "#f43f5e" : util > 0.6 ? "#fbbf24" : "#34d399"}
        />
      )}
      {state && (
        <rect
          x={x + NODE_W - 58}
          y={y + 43}
          width={46}
          height={5}
          rx={2.5}
          fill="currentColor"
          opacity={0.1}
        />
      )}

      {/* Queue */}
      {!!state?.queued && (
        <g>
          <rect x={x + NODE_W - 30} y={y - 9} width={38} height={18} rx={9} fill="#f59e0b" />
          <text
            x={x + NODE_W - 11}
            y={y + 4}
            fontSize="10"
            fontWeight="700"
            textAnchor="middle"
            fill="#111827"
          >
            {state.queued > 99 ? "99+" : state.queued}
          </text>
        </g>
      )}
      {modelDown && (
        <g>
          <rect x={x + NODE_W - 36} y={y - 9} width={44} height={18} rx={9} fill="#f43f5e" />
          <text
            x={x + NODE_W - 14}
            y={y + 4}
            fontSize="10"
            fontWeight="700"
            textAnchor="middle"
            fill="#fff"
          >
            503
          </text>
        </g>
      )}
    </g>
  );
}

function Metric({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="bg-background/80 px-3 py-2.5">
      <div className={`font-mono text-sm font-bold tabular-nums ${warn ? "text-rose-400" : ""}`}>
        {value}
      </div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Dot({ c, label }: { c: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
      {label}
    </span>
  );
}

const SPAN_COLORS = { ok: "#22d3ee", error: "#f43f5e", retry: "#f59e0b" };

function TracePanel({ trace, now }: { trace: Trace | null; now: number }) {
  if (!trace) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-border p-4 text-center font-mono text-[11px] text-muted-foreground">
        Press “Trace a job” to follow one request through every stage, as a distributed trace.
      </div>
    );
  }
  const end = trace.end ?? now;
  const total = Math.max(1, end - trace.start);
  return (
    <div className="rounded-xl border border-border bg-background/50 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Trace #{trace.id}</span>
        <span
          className={
            trace.end
              ? trace.outcome?.includes("dead") || trace.outcome?.includes("50")
                ? "text-rose-400"
                : "text-emerald-400"
              : "text-amber-300"
          }
        >
          {trace.end ? `${trace.outcome} · ${fmtMs(total)}` : `running · ${fmtMs(total)}`}
        </span>
      </div>
      <div className="mt-2 max-h-64 space-y-[3px] overflow-y-auto pr-1">
        {trace.spans.map((sp, i) => {
          const left = ((sp.start - trace.start) / total) * 100;
          const width = Math.max(0.6, (((sp.end ?? now) - sp.start) / total) * 100);
          return (
            <div
              key={i}
              className="grid grid-cols-[minmax(0,44%)_1fr] items-center gap-2 font-mono text-[10px]"
            >
              <span className="truncate text-muted-foreground" title={`${sp.name} · ${sp.node}`}>
                <span className="text-foreground/80">{sp.name}</span>
              </span>
              <div className="relative h-2.5 rounded-sm bg-foreground/5">
                <div
                  className="absolute inset-y-0 rounded-sm"
                  style={{
                    left: `${left}%`,
                    width: `${Math.min(width, 100 - left)}%`,
                    background: SPAN_COLORS[sp.status],
                    opacity: sp.end ? 0.9 : 0.5,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
