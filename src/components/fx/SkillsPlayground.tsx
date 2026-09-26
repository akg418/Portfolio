import { useEffect, useRef, useState } from "react";

/**
 * The tech stack as a pile of physical chips: they rain into a box when it
 * scrolls into view, tumble, stack and settle, and can be grabbed and thrown.
 *
 * A small rigid-body engine, written for exactly this:
 *
 * - Every chip is a capsule (a segment with a radius), which is what a pill-
 *   shaped label is, and makes contacts cheap and smooth: two capsules touch
 *   where their segments come within the sum of their radii.
 * - Contacts come from the closest points between segments, plus each
 *   endpoint against the other segment, so two chips lying flat on each other
 *   get two contacts and rest instead of see-sawing on one.
 * - The solver is sequential impulses with accumulated, clamped normal and
 *   friction impulses and a Baumgarte bias to push overlaps apart, sub-stepped
 *   for stability. Bodies rotate, so a chip landing on a corner tips over.
 * - A grabbed chip hangs from the pointer on a damped spring attached where it
 *   was picked up, so it swings, and letting go throws it with the spring's
 *   velocity.
 *
 * Chips are ordinary DOM elements moved by transforms, so the text stays crisp
 * and the styling is plain Tailwind.
 */

type Body = {
  x: number;
  y: number;
  a: number;
  vx: number;
  vy: number;
  w: number;
  /** Half the segment length and the capsule radius. */
  half: number;
  r: number;
  width: number;
  height: number;
  invM: number;
  invI: number;
};

type Contact = {
  a: number;
  /** -1 for a wall. */
  b: number;
  nx: number;
  ny: number;
  px: number;
  py: number;
  pen: number;
  jn: number;
  jt: number;
  bounce: number;
};

const GRAVITY = 2000;
const SUBSTEPS = 4;
const ITERATIONS = 6;
const RESTITUTION = 0.18;
const FRICTION = 0.45;
const BETA = 0.25;
const SLOP = 0.4;
const MAX_BIAS = 700;
const MAX_SPEED = 3200;
const DENSITY = 0.001;
const GRAB_STIFFNESS = 700;
const GRAB_DAMPING = 45;

/** One colour per skill group, so the pile still reads as categories. */
const GROUP_TONES = [
  "border-cyan-400/50 text-cyan-700 dark:text-cyan-200",
  "border-violet-400/50 text-violet-700 dark:text-violet-200",
  "border-emerald-400/50 text-emerald-700 dark:text-emerald-200",
  "border-amber-400/50 text-amber-700 dark:text-amber-200",
  "border-sky-400/50 text-sky-700 dark:text-sky-200",
  "border-pink-400/50 text-pink-700 dark:text-pink-200",
];

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/** Segment endpoints of a body. */
function ends(b: Body) {
  const cx = Math.cos(b.a) * b.half;
  const cy = Math.sin(b.a) * b.half;
  return [b.x - cx, b.y - cy, b.x + cx, b.y + cy] as const;
}

/** Closest point on segment (ax,ay)-(bx,by) to point (px,py). */
function closestOnSegment(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  const t = len2 > 1e-9 ? clamp01(((px - ax) * dx + (py - ay) * dy) / len2) : 0;
  return [ax + dx * t, ay + dy * t] as const;
}

/** Closest points between two segments (Ericson, Real-Time Collision Detection 5.1.9). */
function closestSegSeg(
  p1x: number,
  p1y: number,
  q1x: number,
  q1y: number,
  p2x: number,
  p2y: number,
  q2x: number,
  q2y: number,
) {
  const d1x = q1x - p1x,
    d1y = q1y - p1y,
    d2x = q2x - p2x,
    d2y = q2y - p2y;
  const rx = p1x - p2x,
    ry = p1y - p2y;
  const a = d1x * d1x + d1y * d1y;
  const e = d2x * d2x + d2y * d2y;
  const f = d2x * rx + d2y * ry;
  let s = 0;
  let t = 0;
  if (a <= 1e-9 && e <= 1e-9) {
    s = t = 0;
  } else if (a <= 1e-9) {
    t = clamp01(f / e);
  } else {
    const c = d1x * rx + d1y * ry;
    if (e <= 1e-9) {
      s = clamp01(-c / a);
    } else {
      const b = d1x * d2x + d1y * d2y;
      const denom = a * e - b * b;
      s = denom > 1e-9 ? clamp01((b * f - c * e) / denom) : 0;
      t = (b * s + f) / e;
      if (t < 0) {
        t = 0;
        s = clamp01(-c / a);
      } else if (t > 1) {
        t = 1;
        s = clamp01((b - c) / a);
      }
    }
  }
  return [p1x + d1x * s, p1y + d1y * s, p2x + d2x * t, p2y + d2y * t] as const;
}

function makeContact(
  ai: number,
  bi: number,
  cax: number,
  cay: number,
  cbx: number,
  cby: number,
  ra: number,
  rb: number,
): Contact | null {
  const dx = cbx - cax;
  const dy = cby - cay;
  const d2 = dx * dx + dy * dy;
  const rs = ra + rb;
  if (d2 >= rs * rs) return null;
  const d = Math.sqrt(d2);
  const nx = d > 1e-6 ? dx / d : 0;
  const ny = d > 1e-6 ? dy / d : 1;
  return {
    a: ai,
    b: bi,
    nx,
    ny,
    px: cax + nx * ra,
    py: cay + ny * ra,
    pen: rs - d,
    jn: 0,
    jt: 0,
    bounce: 0,
  };
}

/** Up to two contacts between capsules i and j. */
function collidePair(bodies: Body[], i: number, j: number, out: Contact[]) {
  const A = bodies[i];
  const B = bodies[j];
  // Broad phase: bounding circles.
  const reach = A.half + A.r + B.half + B.r;
  const ddx = B.x - A.x;
  const ddy = B.y - A.y;
  if (ddx * ddx + ddy * ddy > reach * reach) return;

  const [a0x, a0y, a1x, a1y] = ends(A);
  const [b0x, b0y, b1x, b1y] = ends(B);
  const found: Contact[] = [];
  const push = (c: Contact | null) => {
    if (!c) return;
    // Two contacts only if they are genuinely apart; otherwise keep the deeper.
    for (let k = 0; k < found.length; k++) {
      const o = found[k];
      if ((o.px - c.px) ** 2 + (o.py - c.py) ** 2 < 16) {
        if (c.pen > o.pen) found[k] = c;
        return;
      }
    }
    found.push(c);
  };

  const [sx, sy, tx, ty] = closestSegSeg(a0x, a0y, a1x, a1y, b0x, b0y, b1x, b1y);
  push(makeContact(i, j, sx, sy, tx, ty, A.r, B.r));
  for (const [px, py] of [
    [a0x, a0y],
    [a1x, a1y],
  ]) {
    const [qx, qy] = closestOnSegment(px, py, b0x, b0y, b1x, b1y);
    push(makeContact(i, j, px, py, qx, qy, A.r, B.r));
  }
  for (const [px, py] of [
    [b0x, b0y],
    [b1x, b1y],
  ]) {
    const [qx, qy] = closestOnSegment(px, py, a0x, a0y, a1x, a1y);
    push(makeContact(i, j, qx, qy, px, py, A.r, B.r));
  }
  found.sort((p, q) => q.pen - p.pen);
  out.push(...found.slice(0, 2));
}

/** Both endpoints of body i against the floor and side walls. */
function collideWalls(bodies: Body[], i: number, W: number, H: number, out: Contact[]) {
  const b = bodies[i];
  const [x0, y0, x1, y1] = ends(b);
  for (const [ex, ey] of [
    [x0, y0],
    [x1, y1],
  ]) {
    const floor = ey + b.r - H;
    if (floor > 0) out.push(wall(i, 0, 1, ex, H, floor));
    const left = b.r - ex;
    if (left > 0) out.push(wall(i, -1, 0, 0, ey, left));
    const right = ex + b.r - W;
    if (right > 0) out.push(wall(i, 1, 0, W, ey, right));
  }
}

function wall(a: number, nx: number, ny: number, px: number, py: number, pen: number): Contact {
  return { a, b: -1, nx, ny, px, py, pen, jn: 0, jt: 0, bounce: 0 };
}

/** Velocity of body b at world point (px,py). */
function pointVel(b: Body, px: number, py: number) {
  const rx = px - b.x;
  const ry = py - b.y;
  return [b.vx - b.w * ry, b.vy + b.w * rx] as const;
}

function applyImpulse(b: Body, px: number, py: number, jx: number, jy: number) {
  b.vx += jx * b.invM;
  b.vy += jy * b.invM;
  b.w += ((px - b.x) * jy - (py - b.y) * jx) * b.invI;
}

/** Relative velocity of B against A at the contact (B static for walls). */
function relVel(bodies: Body[], c: Contact) {
  const A = bodies[c.a];
  const [vax, vay] = pointVel(A, c.px, c.py);
  if (c.b < 0) return [-vax, -vay] as const;
  const [vbx, vby] = pointVel(bodies[c.b], c.px, c.py);
  return [vbx - vax, vby - vay] as const;
}

/** Effective mass along direction (dx,dy) at the contact point. */
function effMass(bodies: Body[], c: Contact, dx: number, dy: number) {
  const A = bodies[c.a];
  const raxd = (c.px - A.x) * dy - (c.py - A.y) * dx;
  let k = A.invM + raxd * raxd * A.invI;
  if (c.b >= 0) {
    const B = bodies[c.b];
    const rbxd = (c.px - B.x) * dy - (c.py - B.y) * dx;
    k += B.invM + rbxd * rbxd * B.invI;
  }
  return k;
}

function solveContact(bodies: Body[], c: Contact, dt: number) {
  const A = bodies[c.a];
  const B = c.b >= 0 ? bodies[c.b] : null;

  // Normal: keep the bodies from moving into each other, and push overlaps apart.
  let [rvx, rvy] = relVel(bodies, c);
  const vn = rvx * c.nx + rvy * c.ny;
  const bias = Math.min(MAX_BIAS, (BETA / dt) * Math.max(0, c.pen - SLOP));
  const target = Math.max(bias, c.bounce);
  const kn = effMass(bodies, c, c.nx, c.ny);
  let dj = (target - vn) / kn;
  const jn = Math.max(0, c.jn + dj);
  dj = jn - c.jn;
  c.jn = jn;
  applyImpulse(A, c.px, c.py, -dj * c.nx, -dj * c.ny);
  if (B) applyImpulse(B, c.px, c.py, dj * c.nx, dj * c.ny);

  // Friction, bounded by the normal impulse (Coulomb).
  [rvx, rvy] = relVel(bodies, c);
  const tx = -c.ny;
  const ty = c.nx;
  const vt = rvx * tx + rvy * ty;
  const kt = effMass(bodies, c, tx, ty);
  let djt = -vt / kt;
  const max = FRICTION * c.jn;
  const jt = Math.max(-max, Math.min(max, c.jt + djt));
  djt = jt - c.jt;
  c.jt = jt;
  applyImpulse(A, c.px, c.py, -djt * tx, -djt * ty);
  if (B) applyImpulse(B, c.px, c.py, djt * tx, djt * ty);
}

type Grab = { i: number; lx: number; ly: number; tx: number; ty: number };

function step(bodies: Body[], W: number, H: number, dt: number, grab: Grab | null) {
  for (const b of bodies) b.vy += GRAVITY * dt;

  if (grab) {
    const b = bodies[grab.i];
    const c = Math.cos(b.a);
    const s = Math.sin(b.a);
    const ax = b.x + grab.lx * c - grab.ly * s;
    const ay = b.y + grab.lx * s + grab.ly * c;
    const [vx, vy] = pointVel(b, ax, ay);
    const m = 1 / b.invM;
    // Spring to the pointer, damped, with gravity cancelled so it hangs true.
    const fx = m * (GRAB_STIFFNESS * (grab.tx - ax) - GRAB_DAMPING * vx);
    const fy = m * (GRAB_STIFFNESS * (grab.ty - ay) - GRAB_DAMPING * vy - GRAVITY);
    applyImpulse(b, ax, ay, fx * dt, fy * dt);
    b.w *= 0.985;
  }

  const contacts: Contact[] = [];
  for (let i = 0; i < bodies.length; i++) {
    collideWalls(bodies, i, W, H, contacts);
    for (let j = i + 1; j < bodies.length; j++) collidePair(bodies, i, j, contacts);
  }
  for (const c of contacts) {
    const [rvx, rvy] = relVel(bodies, c);
    const vn = rvx * c.nx + rvy * c.ny;
    c.bounce = vn < -120 ? -RESTITUTION * vn : 0;
  }
  for (let k = 0; k < ITERATIONS; k++) for (const c of contacts) solveContact(bodies, c, dt);

  for (const b of bodies) {
    const speed = Math.hypot(b.vx, b.vy);
    if (speed > MAX_SPEED) {
      b.vx *= MAX_SPEED / speed;
      b.vy *= MAX_SPEED / speed;
    }
    b.vx *= 0.9995;
    b.vy *= 0.9995;
    b.w *= 0.998;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.a += b.w * dt;
  }
}

export function SkillsPlayground({ groups }: { groups: Record<string, string[]> }) {
  const chips = Object.entries(groups).flatMap(([group, items], g) =>
    items.map((label) => ({ label, group, tone: GROUP_TONES[g % GROUP_TONES.length] })),
  );
  const pitRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodies = useRef<Body[]>([]);
  const grab = useRef<Grab | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  useEffect(() => {
    const pit = pitRef.current;
    if (!pit) return;

    let raf = 0;
    let started = false;
    let visible = false;
    let last = performance.now();

    const start = () => {
      started = true;
      const W = pit.clientWidth;
      bodies.current = chipRefs.current.map((el, i) => {
        const width = el?.offsetWidth ?? 80;
        const height = el?.offsetHeight ?? 28;
        const r = height / 2;
        const m = width * height * DENSITY;
        return {
          x: r + width / 2 + Math.random() * Math.max(1, W - width - 2 * r),
          // Staggered above the box, so they rain in rather than appear.
          y: -height - i * 34 - Math.random() * 40,
          a: (Math.random() - 0.5) * 0.8,
          vx: (Math.random() - 0.5) * 120,
          vy: 0,
          w: (Math.random() - 0.5) * 4,
          half: Math.max(0, (width - height) / 2),
          r,
          width,
          height,
          invM: 1 / m,
          invI: 12 / (m * (width * width + height * height)),
        };
      });
    };

    const paint = () => {
      bodies.current.forEach((b, i) => {
        const el = chipRefs.current[i];
        if (el)
          el.style.transform = `translate(${b.x - b.width / 2}px, ${b.y - b.height / 2}px) rotate(${b.a}rad)`;
      });
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const elapsed = Math.min(1 / 30, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      if (!started) start();
      const W = pit.clientWidth;
      const H = pit.clientHeight;
      const dt = elapsed / SUBSTEPS;
      for (let s = 0; s < SUBSTEPS; s++) step(bodies.current, W, H, dt, grab.current);
      paint();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(pit);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  /** Pointer position inside the pit, kept to where a chip can actually go. */
  const pitPoint = (e: React.PointerEvent) => {
    const r = pitRef.current!.getBoundingClientRect();
    return [
      Math.max(0, Math.min(r.width, e.clientX - r.left)),
      Math.max(-120, Math.min(r.height, e.clientY - r.top)),
    ] as const;
  };

  const onDown = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const b = bodies.current[i];
    if (!b || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const [px, py] = pitPoint(e);
    // Anchor in the chip's own frame, so it hangs from where it was picked up.
    const c = Math.cos(-b.a);
    const s = Math.sin(-b.a);
    const dx = px - b.x;
    const dy = py - b.y;
    grab.current = { i, lx: dx * c - dy * s, ly: dx * s + dy * c, tx: px, ty: py };
    setDragging(i);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!grab.current) return;
    const [px, py] = pitPoint(e);
    grab.current.tx = px;
    grab.current.ty = py;
  };
  const onUp = () => {
    grab.current = null;
    setDragging(null);
  };

  const shake = () => {
    for (const b of bodies.current) {
      b.vy -= 700 + Math.random() * 700;
      b.vx += (Math.random() - 0.5) * 700;
      b.w += (Math.random() - 0.5) * 12;
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
        <span>Grab a chip and throw it.</span>
        <button
          type="button"
          onClick={shake}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-foreground transition-colors hover:border-primary/60 hover:text-primary"
        >
          Shake the box
        </button>
      </div>
      <div
        ref={pitRef}
        className="relative h-[440px] select-none overflow-hidden rounded-xl border border-border bg-card/30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--color-foreground) 10%, transparent) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* The real list, for anyone not looking at the pile. */}
        <ul className="sr-only">
          {chips.map((c) => (
            <li key={c.label}>
              {c.group}: {c.label}
            </li>
          ))}
        </ul>
        {chips.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            aria-hidden
            data-cursor={dragging === i ? "Throw" : "Grab"}
            onPointerDown={onDown(i)}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className={`absolute left-0 top-0 origin-center touch-none whitespace-nowrap rounded-full border bg-background/85 px-3 py-1 text-xs font-medium shadow-[0_4px_14px_-6px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:px-3.5 sm:py-1.5 sm:text-sm ${c.tone} ${
              dragging === i ? "cursor-grabbing ring-1 ring-primary" : "cursor-grab"
            }`}
            style={{ transform: "translate(-9999px, 0)" }}
          >
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}
