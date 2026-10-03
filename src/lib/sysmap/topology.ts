/**
 * The flagship system, redacted: the same overall shape (clients, an edge, a
 * core API with its database and queue, a staged async pipeline, and external
 * dependencies), but with every service reduced to a generic role. Names,
 * internals and the exact topology are deliberately withheld, so nothing here
 * describes the employer's real system beyond what a generic diagram would.
 * Replica counts and concurrency are the simulation's own choices.
 */

export type NodeKind = "client" | "edge" | "service" | "worker" | "store" | "external";

export type NodeDef = {
  id: string;
  label: string;
  /** Shown as a blurred, unreadable tag: the real detail is withheld. */
  redacted?: boolean;
  sub: string;
  x: number;
  y: number;
  kind: NodeKind;
  /** Pods the simulation starts with, and the autoscaler's bounds (workers). */
  replicas?: number;
  min?: number;
  max?: number;
  /** Jobs or requests one pod handles at once. */
  perPod?: number;
  info: string;
};

export const NODES: NodeDef[] = [
  {
    id: "mobile",
    label: "Mobile app",
    sub: "client",
    x: 90,
    y: 150,
    kind: "client",
    info: "Where users start requests and async jobs.",
  },
  {
    id: "web",
    label: "Web dashboard",
    sub: "client",
    x: 90,
    y: 300,
    kind: "client",
    info: "A second client of the same API.",
  },
  {
    id: "payments",
    label: "Payments",
    sub: "webhooks",
    x: 90,
    y: 470,
    kind: "external",
    info: "Third-party events arriving as webhooks.",
  },
  {
    id: "edge",
    label: "Edge",
    sub: "TLS · routing",
    x: 255,
    y: 300,
    kind: "edge",
    replicas: 2,
    perPod: 64,
    info: "Terminates TLS and routes only to instances that are ready.",
  },
  {
    id: "api",
    label: "Core API",
    redacted: true,
    sub: "",
    x: 430,
    y: 300,
    kind: "service",
    replicas: 3,
    perPod: 12,
    info: "Serves the user-facing API and hands heavy work to the pipeline as queued jobs instead of doing it inline.",
  },
  {
    id: "db",
    label: "Database",
    redacted: true,
    sub: "",
    x: 430,
    y: 525,
    kind: "store",
    info: "The system of record.",
  },
  {
    id: "queue",
    label: "Job queue",
    redacted: true,
    sub: "",
    x: 610,
    y: 300,
    kind: "store",
    info: "Buffers work between pipeline stages, so each stage takes a job when it has a free slot.",
  },
  {
    id: "stage1",
    label: "Stage 1",
    redacted: true,
    sub: "",
    x: 800,
    y: 80,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 4,
    info: "First stage. It can finish a job early when the result already exists.",
  },
  {
    id: "stage2",
    label: "Stage 2",
    redacted: true,
    sub: "",
    x: 800,
    y: 195,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 4,
    info: "Prepares the job for the expensive stage.",
  },
  {
    id: "stage3",
    label: "Stage 3",
    redacted: true,
    sub: "",
    x: 800,
    y: 310,
    kind: "worker",
    replicas: 3,
    min: 1,
    max: 8,
    perPod: 2,
    info: "The long one: a chain of model calls, then the result goes to storage.",
  },
  {
    id: "stage4",
    label: "Stage 4",
    redacted: true,
    sub: "",
    x: 800,
    y: 425,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 3,
    info: "Runs in parallel with stage 5 once stage 3 is done.",
  },
  {
    id: "stage5",
    label: "Stage 5",
    redacted: true,
    sub: "",
    x: 800,
    y: 540,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 3,
    info: "Runs in parallel with stage 4 once stage 3 is done.",
  },
  {
    id: "ai",
    label: "AI provider",
    redacted: true,
    sub: "",
    x: 1005,
    y: 250,
    kind: "external",
    info: "An external model API that the pipeline depends on, which makes its outages the ones worth rehearsing.",
  },
  {
    id: "store",
    label: "Object storage",
    redacted: true,
    sub: "",
    x: 1005,
    y: 480,
    kind: "store",
    info: "Where the pipeline's outputs land.",
  },
];

/** Undirected links, drawn once; `arc` bends a status callback out of the way. */
export type EdgeDef = { a: string; b: string; callback?: boolean; arc?: number };

export const EDGES: EdgeDef[] = [
  { a: "mobile", b: "edge" },
  { a: "web", b: "edge" },
  { a: "payments", b: "edge" },
  { a: "edge", b: "api" },
  { a: "api", b: "queue" },
  { a: "api", b: "db" },
  { a: "queue", b: "stage1" },
  { a: "queue", b: "stage2" },
  { a: "queue", b: "stage3" },
  { a: "queue", b: "stage4" },
  { a: "queue", b: "stage5" },
  { a: "stage1", b: "ai" },
  { a: "stage2", b: "ai" },
  { a: "stage3", b: "ai" },
  { a: "stage4", b: "ai" },
  { a: "stage5", b: "ai" },
  { a: "stage1", b: "db", arc: 0 },
  { a: "stage3", b: "store" },
  { a: "stage4", b: "store" },
  { a: "stage5", b: "store" },
  // Stages report status back to the API.
  { a: "stage1", b: "api", callback: true, arc: -70 },
  { a: "stage4", b: "api", callback: true, arc: 60 },
  { a: "stage5", b: "api", callback: true, arc: 90 },
];

export const NODE_W = 150;
export const NODE_H = 54;

export const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, NodeDef>;

export type Pt = { x: number; y: number };

/** Control points of the cubic curve for an edge, oriented a → b. */
export function curve(e: EdgeDef): [Pt, Pt, Pt, Pt] {
  const A = nodeById[e.a];
  const B = nodeById[e.b];
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const bend = e.arc ?? 0;
  if (Math.abs(dx) < 40) {
    // Near-vertical: a gentle bow sideways.
    return [A, { x: A.x + 40, y: A.y + dy / 3 }, { x: B.x + 40, y: B.y - dy / 3 }, B];
  }
  return [A, { x: A.x + dx * 0.5, y: A.y + bend }, { x: B.x - dx * 0.5, y: B.y + bend }, B];
}

export function bezier([p0, p1, p2, p3]: [Pt, Pt, Pt, Pt], t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

export function curveLength(c: [Pt, Pt, Pt, Pt]) {
  let len = 0;
  let prev = c[0];
  for (let i = 1; i <= 24; i++) {
    const p = bezier(c, i / 24);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
}

export function edgeKey(a: string, b: string) {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

export const edgeByKey = Object.fromEntries(EDGES.map((e) => [edgeKey(e.a, e.b), e])) as Record<
  string,
  EdgeDef
>;
