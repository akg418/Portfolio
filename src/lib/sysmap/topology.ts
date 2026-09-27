/**
 * getXplain.ai, drawn as a system: the services and data stores described on
 * the project card, laid out on a 1100 x 620 canvas. Replica counts and
 * per-pod concurrency are the simulation's choices, not production figures.
 */

export type NodeKind = "client" | "edge" | "service" | "worker" | "store" | "external";

export type NodeDef = {
  id: string;
  label: string;
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
    id: "app",
    label: "Flutter app",
    sub: "iOS · Android",
    x: 90,
    y: 150,
    kind: "client",
    info: "Learners ask questions by typing, speaking or taking a photo, and open lessons.",
  },
  {
    id: "admin",
    label: "Admin dashboard",
    sub: "Next.js",
    x: 90,
    y: 300,
    kind: "client",
    info: "Internal dashboard reading the same API.",
  },
  {
    id: "stripe",
    label: "Billing webhooks",
    sub: "Stripe · RevenueCat",
    x: 90,
    y: 470,
    kind: "external",
    info: "Subscription events. Entitlement is derived from live subscription state, which is what closed the Premium-downgrade revenue leak.",
  },
  {
    id: "ingress",
    label: "Ingress",
    sub: "Kubernetes · TLS",
    x: 255,
    y: 300,
    kind: "edge",
    replicas: 2,
    perPod: 64,
    info: "Terminates TLS and routes only to pods that are Ready.",
  },
  {
    id: "hub",
    label: "API hub",
    sub: "FastAPI · WorkOS + JWT",
    x: 430,
    y: 300,
    kind: "service",
    replicas: 3,
    perPod: 12,
    info: "Owns everything user-facing: auth, learners, lessons, XP, 1v1 challenges, search, webhooks. It coordinates the pipeline by enqueueing jobs rather than doing inference itself.",
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    sub: "pgvector",
    x: 430,
    y: 525,
    kind: "store",
    info: "Relational data plus pgvector embeddings for the similarity search.",
  },
  {
    id: "redis",
    label: "Redis",
    sub: "ARQ job queues",
    x: 610,
    y: 300,
    kind: "store",
    info: "Queues between pipeline stages. A stage picks a job up when one of its pods has a free slot.",
  },
  {
    id: "similarity",
    label: "similarity-checker",
    sub: "embed → pgvector",
    x: 800,
    y: 80,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 4,
    info: "Embeds each incoming question and searches pgvector, so a lesson that already exists is reused instead of rebuilt.",
  },
  {
    id: "enricher",
    label: "question-enricher",
    sub: "ARQ worker",
    x: 800,
    y: 195,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 4,
    info: "Enriches the raw question before the lesson is built.",
  },
  {
    id: "builder",
    label: "lesson-builder",
    sub: "13-step Gemini pipeline",
    x: 800,
    y: 310,
    kind: "worker",
    replicas: 3,
    min: 1,
    max: 8,
    perPod: 2,
    info: "Builds the bilingual EN/AR lesson in 13 Gemini steps, then writes it to S3.",
  },
  {
    id: "images",
    label: "images-manager",
    sub: "Gemini image · Pillow",
    x: 800,
    y: 425,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 3,
    info: "Generates the lesson's illustrations, post-processes them and stores them in S3.",
  },
  {
    id: "audio",
    label: "audio-manager",
    sub: "Gemini TTS",
    x: 800,
    y: 540,
    kind: "worker",
    replicas: 2,
    min: 1,
    max: 5,
    perPod: 3,
    info: "Narrates the lesson with Gemini TTS and stores the audio in S3.",
  },
  {
    id: "gemini",
    label: "Gemini",
    sub: "text · image · TTS",
    x: 1005,
    y: 250,
    kind: "external",
    info: "External model API. Everything in the pipeline depends on it, so its failures are the ones worth rehearsing.",
  },
  {
    id: "s3",
    label: "S3",
    sub: "lessons · media",
    x: 1005,
    y: 480,
    kind: "store",
    info: "Lesson JSON, illustrations and narration.",
  },
];

/** Undirected links, drawn once; `arc` bends a status callback out of the way. */
export type EdgeDef = { a: string; b: string; callback?: boolean; arc?: number };

export const EDGES: EdgeDef[] = [
  { a: "app", b: "ingress" },
  { a: "admin", b: "ingress" },
  { a: "stripe", b: "ingress" },
  { a: "ingress", b: "hub" },
  { a: "hub", b: "redis" },
  { a: "hub", b: "postgres" },
  { a: "redis", b: "similarity" },
  { a: "redis", b: "enricher" },
  { a: "redis", b: "builder" },
  { a: "redis", b: "images" },
  { a: "redis", b: "audio" },
  { a: "similarity", b: "gemini" },
  { a: "enricher", b: "gemini" },
  { a: "builder", b: "gemini" },
  { a: "images", b: "gemini" },
  { a: "audio", b: "gemini" },
  { a: "similarity", b: "postgres", arc: 0 },
  { a: "builder", b: "s3" },
  { a: "images", b: "s3" },
  { a: "audio", b: "s3" },
  // Workers patch status back to the hub over HTTP.
  { a: "similarity", b: "hub", callback: true, arc: -70 },
  { a: "images", b: "hub", callback: true, arc: 60 },
  { a: "audio", b: "hub", callback: true, arc: 90 },
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
