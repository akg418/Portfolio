import { useEffect, useId, useRef, useState } from "react";
import { links, profile } from "@/data/profile";
import { solveMystery } from "@/lib/mysteries";

/**
 * A conference badge on a lanyard, hanging into the hero. Grab it, pull it,
 * swing it, throw it; click it to flip it over.
 *
 * The physics is Verlet integration with position constraints, no library:
 *
 * - The strap is a chain of light particles held apart by distance
 *   constraints, pinned at the top. It may stretch a little under a hard pull,
 *   like a real elastic lanyard, and springs back.
 * - The card is a rigid rod of two heavy particles: the punched hole, which is
 *   also the last particle of the strap, and the bottom edge. It pivots freely
 *   on the strap, so it swings as a pendulum on a pendulum.
 * - Constraints are corrected in proportion to inverse mass, so the heavy card
 *   drags the light strap taut rather than the other way round.
 * - Dragging pins whichever point along the card was grabbed to the pointer by
 *   splitting the correction between the rod's two ends; letting go keeps the
 *   last frame's motion, which is what makes a throw.
 * - The card tilts in 3D with its sideways speed, so a swing reads as depth.
 *
 * Everything sleeps once it hangs still, and a light breeze nudges it now and
 * then. With reduced motion it simply hangs there.
 */

const STRAP_POINTS = 14;
const GRAVITY = 1700;
const DAMPING = 0.994;
const ITERATIONS = 14;
const SUBSTEPS = 3;
/** How far a hard pull may stretch the strap, as a multiple of its length. */
const MAX_STRETCH = 1.7;
const STRAP_MASS = 1;
const HOLE_MASS = 4;
const CARD_MASS = 7;
/** Distance from the card's top edge to the punched hole. */
const HOLE_PX = 16;
const MAX_TILT = 38;
const DRAG_PX = 5;
const REST_SPEED = 4;

type Pt = { x: number; y: number; px: number; py: number; invM: number };
type Size = { cardW: number; cardH: number; strap: number; anchorY: number; height: number };

const DESKTOP: Size = { cardW: 210, cardH: 300, strap: 270, anchorY: -130, height: 520 };
const MOBILE: Size = { cardW: 176, cardH: 252, strap: 170, anchorY: -16, height: 440 };

/** Moves a and b toward distance `len`, split by inverse mass. */
function constrain(a: Pt, b: Pt, len: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy) || 1e-6;
  const w = a.invM + b.invM;
  if (!w) return;
  const k = (d - len) / d / w;
  a.x += dx * k * a.invM;
  a.y += dy * k * a.invM;
  b.x -= dx * k * b.invM;
  b.y -= dy * k * b.invM;
}

export function LanyardBadge({ photo, photoAlt }: { photo?: string; photoAlt: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState<Size>(DESKTOP);
  const [flipped, setFlipped] = useState(false);
  /** Seven flips in a visit reveal the VIP pass (a hidden mystery). */
  const [flips, setFlips] = useState(0);
  const flip = () => {
    setFlipped((f) => !f);
    setFlips((n) => {
      if (n + 1 === 7) solveMystery("badge");
      return n + 1;
    });
  };
  const [held, setHeld] = useState(false);
  const strapId = useId();

  const sim = useRef<{
    pts: Pt[];
    seg: number;
    grab: {
      s: number;
      tx: number;
      ty: number;
      startX: number;
      startY: number;
      moved: boolean;
    } | null;
    asleep: boolean;
    tilt: number;
  } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const pick = () => setSize(mq.matches ? MOBILE : DESKTOP);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ax = () => box.clientWidth / 2;
    const seg = size.strap / (STRAP_POINTS - 1);
    const rod = size.cardH - HOLE_PX;

    // Start swung out to one side, so it drops in on a swing.
    const pts: Pt[] = [];
    for (let i = 0; i < STRAP_POINTS; i++) {
      const t = i / (STRAP_POINTS - 1);
      const x = ax() + (reduce ? 0 : t * t * size.strap * 0.8);
      const y = size.anchorY + (reduce ? t * size.strap : t * size.strap * 0.55);
      const invM = i === 0 ? 0 : i === STRAP_POINTS - 1 ? 1 / HOLE_MASS : 1 / STRAP_MASS;
      pts.push({ x, y, px: x, py: y, invM });
    }
    const hole = pts[STRAP_POINTS - 1];
    const bx = hole.x + (reduce ? 0 : rod * 0.5);
    const by = hole.y + (reduce ? rod : rod * 0.85);
    pts.push({ x: bx, y: by, px: bx, py: by, invM: 1 / CARD_MASS });
    sim.current = { pts, seg, grab: null, asleep: false, tilt: 0 };

    const paint = () => {
      const s = sim.current!;
      const h = s.pts[STRAP_POINTS - 1];
      const b = s.pts[STRAP_POINTS];
      const angle = Math.atan2(-(b.x - h.x), b.y - h.y);
      const card = cardRef.current;
      if (card) {
        card.style.transform = `translate(${h.x - size.cardW / 2}px, ${h.y - HOLE_PX}px) rotate(${angle}rad)`;
      }
      if (tiltRef.current) tiltRef.current.style.setProperty("--tilt", `${s.tilt}deg`);
      // Smooth strap: a quadratic curve through the midpoints of the chain.
      let d = `M${s.pts[0].x},${s.pts[0].y}`;
      for (let i = 1; i < STRAP_POINTS - 1; i++) {
        const p = s.pts[i];
        const n = s.pts[i + 1];
        d += ` Q${p.x},${p.y} ${(p.x + n.x) / 2},${(p.y + n.y) / 2}`;
      }
      d += ` L${h.x},${h.y}`;
      strapRef.current?.setAttribute("d", d);
    };

    if (reduce) {
      paint();
      return;
    }

    let raf = 0;
    let last = performance.now();
    let nextBreeze = last + 5000;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(box);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const s = sim.current!;
      const elapsed = Math.min(1 / 30, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;

      if (now > nextBreeze && !s.grab) {
        // A light breeze, so it never looks frozen.
        const b = s.pts[STRAP_POINTS];
        b.px -= (Math.random() - 0.5) * 3;
        s.asleep = false;
        nextBreeze = now + 5000 + Math.random() * 5000;
      }
      if (s.asleep && !s.grab) return;

      const dt = elapsed / SUBSTEPS;
      const anchorX = ax();
      for (let step = 0; step < SUBSTEPS; step++) {
        for (const p of s.pts) {
          if (!p.invM) continue;
          const vx = (p.x - p.px) * DAMPING;
          const vy = (p.y - p.py) * DAMPING;
          p.px = p.x;
          p.py = p.y;
          p.x += vx;
          p.y += vy + GRAVITY * dt * dt;
        }
        const top = s.pts[0];
        top.x = top.px = anchorX;
        top.y = top.py = size.anchorY;

        for (let k = 0; k < ITERATIONS; k++) {
          for (let i = 0; i < STRAP_POINTS - 1; i++) constrain(s.pts[i], s.pts[i + 1], s.seg);
          constrain(s.pts[STRAP_POINTS - 1], s.pts[STRAP_POINTS], rod);
          if (s.grab) {
            // Pin the grabbed point of the card to the pointer: the error is
            // shared between the rod's ends by where along it the grip is.
            const h = s.pts[STRAP_POINTS - 1];
            const b = s.pts[STRAP_POINTS];
            const w0 = 1 - s.grab.s;
            const w1 = s.grab.s;
            const gx = h.x + (b.x - h.x) * w1;
            const gy = h.y + (b.y - h.y) * w1;
            const norm = w0 * w0 + w1 * w1;
            const ex = s.grab.tx - gx;
            const ey = s.grab.ty - gy;
            h.x += (ex * w0) / norm;
            h.y += (ey * w0) / norm;
            b.x += (ex * w1) / norm;
            b.y += (ey * w1) / norm;
          }
        }
        // However hard it is pulled, the strap only stretches so far.
        const h = s.pts[STRAP_POINTS - 1];
        const dx = h.x - anchorX;
        const dy = h.y - size.anchorY;
        const d = Math.hypot(dx, dy);
        const max = size.strap * MAX_STRETCH;
        if (d > max) {
          h.x = anchorX + (dx / d) * max;
          h.y = size.anchorY + (dy / d) * max;
        }
      }

      const b = s.pts[STRAP_POINTS];
      const vx = (b.x - b.px) / dt;
      const vy = (b.y - b.py) / dt;
      const target = Math.max(-MAX_TILT, Math.min(MAX_TILT, vx * 0.035));
      s.tilt += (target - s.tilt) * 0.12;
      paint();

      const still = s.pts.every((p) => Math.hypot(p.x - p.px, p.y - p.py) / dt < REST_SPEED);
      if (still && !s.grab && Math.abs(s.tilt) < 0.2 && Math.hypot(vx, vy) < REST_SPEED) {
        s.asleep = true;
      }
    };
    paint();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size]);

  /** Pointer position in the box's coordinates. */
  const local = (e: { clientX: number; clientY: number }) => {
    const r = boxRef.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  };

  const release = () => {
    const s = sim.current;
    if (!s?.grab) return;
    const clicked = !s.grab.moved;
    s.grab = null;
    s.asleep = false;
    setHeld(false);
    if (clicked) flip();
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = sim.current;
    if (!s || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const [x, y] = local(e);
    const h = s.pts[STRAP_POINTS - 1];
    const b = s.pts[STRAP_POINTS];
    const ax = b.x - h.x;
    const ay = b.y - h.y;
    const len2 = ax * ax + ay * ay || 1;
    const along = ((x - h.x) * ax + (y - h.y) * ay) / len2;
    s.grab = {
      s: Math.max(0.05, Math.min(1, along)),
      tx: x,
      ty: y,
      startX: x,
      startY: y,
      moved: false,
    };
    s.asleep = false;
    setHeld(true);
  };

  const onMove = (e: React.PointerEvent) => {
    const g = sim.current?.grab;
    if (!g) return;
    if (e.pointerType === "mouse" && e.buttons === 0) return release();
    const [x, y] = local(e);
    g.tx = x;
    g.ty = y;
    if (Math.hypot(x - g.startX, y - g.startY) > DRAG_PX) g.moved = true;
  };

  useEffect(() => {
    const drop = () => {
      const s = sim.current;
      if (s?.grab) s.grab.moved = true;
      release();
    };
    window.addEventListener("blur", drop);
    return () => window.removeEventListener("blur", drop);
  }, []);

  const [first, , second] = profile.name.toUpperCase().split(/( )/);

  return (
    <div
      ref={boxRef}
      className="relative z-20 w-full select-none md:w-[320px]"
      style={{ height: size.height }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <path
          ref={strapRef}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
          id={strapId}
        />
        {/* The strap's print, riding along the path as it bends. */}
        <text
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="1.6"
          fill="var(--color-background)"
          dominantBaseline="middle"
          className="font-mono"
        >
          <textPath href={`#${strapId}`} startOffset="6">
            {`${profile.domain.toUpperCase()} • `.repeat(8)}
          </textPath>
        </text>
      </svg>

      <div
        ref={cardRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        data-cursor={held ? "Throw" : "Grab"}
        className={`absolute left-0 top-0 touch-none ${held ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          width: size.cardW,
          height: size.cardH,
          transformOrigin: `50% ${HOLE_PX}px`,
          perspective: 900,
        }}
        role="button"
        tabIndex={0}
        aria-label={`${profile.name}'s badge. Press to flip it over.`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip();
          }
        }}
      >
        {/* Two layers: the swing tilt follows every frame, the flip eases. */}
        <div
          ref={tiltRef}
          className="relative h-full w-full [transform-style:preserve-3d]"
          style={{ transform: "rotateY(var(--tilt, 0deg))" }}
        >
          <div
            className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]"
            style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}
          >
            {/* Front */}
            <div className="badge-face absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1224] text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
              <div className="relative h-[46%] overflow-hidden">
                {photo && (
                  <img
                    src={photo}
                    alt={photoAlt}
                    draggable={false}
                    className="h-full w-full object-cover object-[50%_30%]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-transparent to-transparent" />
                <div className="absolute left-1/2 top-2.5 h-2 w-9 -translate-x-1/2 rounded-full bg-[#0d1224] ring-1 ring-white/20" />
              </div>
              <div className="flex flex-1 flex-col px-4 pb-3 pt-1">
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-300">
                  {profile.domain}
                </div>
                <div className="mt-1 text-xl font-black leading-[0.95] tracking-tight">
                  {first}
                  <br />
                  <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                    {second}
                  </span>
                </div>
                <div className="mt-1.5 text-[11px] text-white/60">{profile.role}</div>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-widest text-white/40">
                      Access
                    </div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      All areas
                    </div>
                  </div>
                  {/* Decorative barcode. */}
                  <div className="flex h-7 items-end gap-[1.5px]" aria-hidden>
                    {"3121413211231412".split("").map((w, i) => (
                      <span key={i} className="h-full bg-white/70" style={{ width: Number(w) }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>

            {/* Back */}
            <div className="badge-face badge-back absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1224] p-4 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
              <div className="mx-auto mt-0.5 h-2 w-9 rounded-full bg-black/60 ring-1 ring-white/20" />
              <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-300">
                If found, hire
              </div>
              <div className="mt-1 text-sm font-bold">{profile.name}</div>
              <div className="mt-0.5 text-[11px] text-white/60">{profile.location}</div>
              <div className="mt-4 space-y-1.5 font-mono text-[10px]">
                <a
                  href={`mailto:${profile.email}`}
                  className="block truncate text-white/80 underline-offset-2 hover:text-cyan-300 hover:underline"
                >
                  {profile.email}
                </a>
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-white/80 underline-offset-2 hover:text-cyan-300 hover:underline"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
              {flips >= 7 && (
                <div className="mt-3 rounded border border-amber-300/60 px-2 py-1 text-center font-mono text-[9px] font-bold uppercase tracking-widest text-amber-300">
                  ★ VIP pass · persistence noted
                </div>
              )}
              <div className="mt-auto font-mono text-[8px] uppercase tracking-widest text-white/35">
                Click to flip back
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
