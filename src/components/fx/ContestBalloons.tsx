import { useEffect, useRef, useState, type ReactNode } from "react";
import { Scissors } from "lucide-react";
import { solveMystery } from "@/lib/mysteries";

/**
 * ICPC hands out a balloon for every problem a team solves. Here is a bunch
 * of them, lettered like a problem set, tied down along the bottom of the box.
 * They float, bob in a breeze, jostle each other, shy away from the pointer
 * and can be grabbed and yanked. Click one without dragging and it pops: it
 * bursts into shreds, the string drops, and a few seconds later it re-inflates.
 *
 * Physics, no library:
 * - Each string is a short Verlet chain pinned at its anchor; the last link
 *   is the knot, which carries buoyancy, so the string is pulled up taut and
 *   swings when the balloon moves.
 * - Balloons push each other apart when they overlap and are kept inside the
 *   box; the pointer blows them away within a small radius.
 * - A popped balloon loses its lift, so its string falls and dangles, and the
 *   shreds are simple particles under gravity.
 *
 * Rendered as SVG and updated in place each frame; nothing re-renders. Paused
 * off screen, and still with reduced motion.
 *
 * A `backdrop` can be drawn behind the balloons.
 */

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#06b6d4",
  "#f97316",
];
const LINKS = 9;
const GRAVITY = 900;
const LIFT = 2200;
const DAMPING = 0.985;
const ITERATIONS = 6;
const RADIUS = 26;
const BLOW_RADIUS = 90;
const BLOW_FORCE = 1400;
const DRAG_PX = 5;
const REINFLATE_MS = 3500;
const INFLATE_MS = 650;
const HEIGHT = 280;
/** Fired when a vehicle drives into the box. */
export const PARTY_EVENT = "acpc-party";

type P = { x: number; y: number; px: number; py: number };
type Balloon = {
  anchor: number;
  len: number;
  pts: P[];
  sway: number;
  popped: boolean;
  poppedAt: number;
  scale: number;
  /** Cut loose: string and all are gone until it re-inflates. */
  cut: boolean;
};
type Shred = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  va: number;
  life: number;
  c: string;
};

export function ContestBalloons({
  backdrop,
  controls,
}: {
  backdrop?: ReactNode;
  /** Shown between the box and its caption. */
  controls?: ReactNode;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [pops, setPops] = useState(0);
  const cutSet = useRef(new Set<number>());
  const state = useRef<{
    balloons: Balloon[];
    shreds: Shred[];
    pointer: { x: number; y: number } | null;
    grab: { i: number; x: number; y: number; sx: number; sy: number; moved: boolean } | null;
    booms: { x: number; y: number; t: number }[];
  }>({ balloons: [], shreds: [], pointer: null, grab: null, booms: [] });

  useEffect(() => {
    const box = boxRef.current;
    const svg = svgRef.current;
    if (!box || !svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = state.current;

    const W = () => box.clientWidth;
    const anchorX = (b: Balloon) => b.anchor * W();

    s.balloons = LETTERS.map((_, i) => {
      const anchor = (i + 0.5) / LETTERS.length;
      const len = 120 + ((i * 37) % 5) * 18;
      const pts: P[] = [];
      for (let k = 0; k <= LINKS; k++) {
        const x = anchor * W();
        const y = HEIGHT - (k / LINKS) * len;
        pts.push({ x, y, px: x, py: y });
      }
      return {
        anchor,
        len,
        pts,
        sway: Math.random() * 10,
        popped: false,
        poppedAt: 0,
        scale: 1,
        cut: false,
      };
    });

    // SVG nodes, made once and moved every frame.
    const NS = "http://www.w3.org/2000/svg";
    const strings: SVGPathElement[] = [];
    const bodies: SVGGElement[] = [];
    const shredLayer = document.createElementNS(NS, "g");
    const boomLayer = document.createElementNS(NS, "g");
    svg.replaceChildren();
    s.balloons.forEach((_, i) => {
      const path = document.createElementNS(NS, "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-opacity", "0.45");
      path.setAttribute("stroke-width", "1.2");
      svg.appendChild(path);
      strings.push(path);
    });
    s.balloons.forEach((_, i) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("data-balloon", String(i));
      g.style.cursor = "grab";
      const c = COLORS[i % COLORS.length];
      g.innerHTML = `
        <path d="M0,-1 l-3.5,6 h7 z" fill="${c}"/>
        <ellipse cx="0" cy="-${RADIUS}" rx="${RADIUS * 0.86}" ry="${RADIUS}" fill="${c}"/>
        <ellipse cx="-${RADIUS * 0.3}" cy="-${RADIUS * 1.35}" rx="${RADIUS * 0.2}" ry="${RADIUS * 0.32}" fill="#fff" opacity="0.45" transform="rotate(-20 -${RADIUS * 0.3} -${RADIUS * 1.35})"/>
        <text x="0" y="-${RADIUS * 0.72}" text-anchor="middle" font-size="18" font-weight="800" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#fff" fill-opacity="0.92">${LETTERS[i]}</text>`;
      svg.appendChild(g);
      bodies.push(g);
    });
    svg.appendChild(shredLayer);
    svg.appendChild(boomLayer);

    /** Balloon centre, above the knot along the last link. */
    const centre = (b: Balloon) => {
      const k = b.pts[LINKS];
      const j = b.pts[LINKS - 1];
      const dx = k.x - j.x;
      const dy = k.y - j.y;
      const d = Math.hypot(dx, dy) || 1;
      return {
        x: k.x + (dx / d) * RADIUS * b.scale,
        y: k.y + (dy / d) * RADIUS * b.scale,
        ux: dx / d,
        uy: dy / d,
      };
    };

    const paint = (now: number) => {
      s.balloons.forEach((b, i) => {
        let d = `M${b.pts[0].x},${b.pts[0].y}`;
        for (let k = 1; k < LINKS; k++) {
          const p = b.pts[k];
          const q = b.pts[k + 1];
          d += ` Q${p.x},${p.y} ${(p.x + q.x) / 2},${(p.y + q.y) / 2}`;
        }
        d += ` L${b.pts[LINKS].x},${b.pts[LINKS].y}`;
        strings[i].setAttribute("d", d);
        strings[i].style.display = b.cut ? "none" : "";
        const k = b.pts[LINKS];
        const c = centre(b);
        const angle = (Math.atan2(c.uy, c.ux) * 180) / Math.PI + 90;
        const g = bodies[i];
        g.style.display = b.scale < 0.02 ? "none" : "";
        g.setAttribute("transform", `translate(${k.x},${k.y}) rotate(${angle}) scale(${b.scale})`);
      });
      shredLayer.innerHTML = s.shreds
        .map(
          (p) =>
            `<rect x="-3" y="-2" width="6" height="4" rx="1" fill="${p.c}" opacity="${Math.min(1, p.life * 2)}" transform="translate(${p.x},${p.y}) rotate(${p.a})"/>`,
        )
        .join("");
      boomLayer.innerHTML = s.booms
        .map((bm) => {
          const t = (now - bm.t) / 600;
          return `<text x="${bm.x}" y="${bm.y - t * 24}" text-anchor="middle" font-size="16" font-weight="900" font-family="ui-monospace, monospace" fill="currentColor" opacity="${1 - t}">POP!</text>`;
        })
        .join("");
    };

    const step = (dt: number, now: number) => {
      const w = W();
      for (const b of s.balloons) {
        // Re-inflate after a pop.
        if (b.popped && now - b.poppedAt > REINFLATE_MS) {
          b.popped = false;
          b.cut = false;
          b.poppedAt = now;
          b.scale = 0;
        }
        if (!b.popped && b.scale < 1) b.scale = Math.min(1, (now - b.poppedAt) / INFLATE_MS);

        const lift = b.popped ? 0 : LIFT * b.scale;
        b.sway += dt;
        const breeze = Math.sin(b.sway * 0.9) * 60 + Math.sin(b.sway * 2.3 + b.anchor * 9) * 25;
        b.pts.forEach((p, k) => {
          if (k === 0) return;
          const vx = (p.x - p.px) * DAMPING;
          const vy = (p.y - p.py) * DAMPING;
          p.px = p.x;
          p.py = p.y;
          let ax = 0;
          let ay = GRAVITY * 0.15;
          if (k === LINKS) {
            ay = GRAVITY - lift;
            ax = breeze;
            // The pointer blows air at it.
            if (s.pointer && !b.popped) {
              const c = centre(b);
              const dx = c.x - s.pointer.x;
              const dy = c.y - s.pointer.y;
              const d = Math.hypot(dx, dy);
              if (d < BLOW_RADIUS && d > 1) {
                const f = (1 - d / BLOW_RADIUS) * BLOW_FORCE;
                ax += (dx / d) * f * 4;
                ay += (dy / d) * f * 4;
              }
            }
          }
          p.x += vx + ax * dt * dt;
          p.y += vy + ay * dt * dt;
        });
        const base = b.pts[0];
        base.x = base.px = b.anchor * w;
        base.y = base.py = HEIGHT;
      }

      for (let it = 0; it < ITERATIONS; it++) {
        for (const b of s.balloons) {
          const seg = b.len / LINKS;
          for (let k = 0; k < LINKS; k++) {
            const a = b.pts[k];
            const c = b.pts[k + 1];
            const dx = c.x - a.x;
            const dy = c.y - a.y;
            const d = Math.hypot(dx, dy) || 1e-6;
            const diff = (d - seg) / d;
            if (k === 0) {
              c.x -= dx * diff;
              c.y -= dy * diff;
            } else {
              a.x += dx * diff * 0.5;
              a.y += dy * diff * 0.5;
              c.x -= dx * diff * 0.5;
              c.y -= dy * diff * 0.5;
            }
          }
        }
        // Balloons jostle: push overlapping centres apart via their knots.
        for (let i = 0; i < s.balloons.length; i++) {
          const A = s.balloons[i];
          if (A.popped) continue;
          for (let j = i + 1; j < s.balloons.length; j++) {
            const B = s.balloons[j];
            if (B.popped) continue;
            const ca = centre(A);
            const cb = centre(B);
            const dx = cb.x - ca.x;
            const dy = cb.y - ca.y;
            const d = Math.hypot(dx, dy) || 1e-6;
            const min = RADIUS * 1.75 * ((A.scale + B.scale) / 2);
            if (d < min) {
              const push = ((min - d) / d) * 0.5;
              A.pts[LINKS].x -= dx * push;
              A.pts[LINKS].y -= dy * push;
              B.pts[LINKS].x += dx * push;
              B.pts[LINKS].y += dy * push;
            }
          }
        }
        // A grabbed balloon follows the pointer, within reach of its string.
        if (s.grab) {
          const b = s.balloons[s.grab.i];
          const k = b.pts[LINKS];
          const ax = anchorX(b);
          let tx = s.grab.x;
          let ty = s.grab.y + RADIUS;
          const dx = tx - ax;
          const dy = ty - HEIGHT;
          const d = Math.hypot(dx, dy);
          const max = b.len * 1.05;
          if (d > max) {
            tx = ax + (dx / d) * max;
            ty = HEIGHT + (dy / d) * max;
          }
          k.x = tx;
          k.y = ty;
        }
        // Keep balloons inside the box.
        for (const b of s.balloons) {
          const k = b.pts[LINKS];
          k.x = Math.max(RADIUS, Math.min(w - RADIUS, k.x));
          k.y = Math.max(RADIUS * 2.1, Math.min(HEIGHT, k.y));
        }
      }

      for (const p of s.shreds) {
        p.vy += GRAVITY * dt;
        p.vx *= 0.98;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.a += p.va * dt;
        p.life -= dt;
      }
      s.shreds = s.shreds.filter((p) => p.life > 0 && p.y < HEIGHT + 40);
      s.booms = s.booms.filter((bm) => now - bm.t < 600);
    };

    let raf = 0;
    let last = performance.now();
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(box);

    // Let the strings settle before anyone sees them.
    for (let i = 0; i < 90; i++) step(1 / 60, 0);
    paint(0);
    if (reduce) return () => io.disconnect();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(1 / 30, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      step(dt, now);
      paint(now);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // A vehicle drove into the box: the balloons go wild for a moment.
  useEffect(() => {
    const on = () => {
      const start = performance.now();
      const kick = () => {
        for (const b of state.current.balloons) {
          const k = b.pts[LINKS];
          k.px = k.x - (Math.random() - 0.5) * 30;
          k.py = k.y - (Math.random() - 0.5) * 24;
        }
        if (performance.now() - start < 4000) window.setTimeout(kick, 160);
      };
      kick();
    };
    window.addEventListener(PARTY_EVENT, on);
    return () => window.removeEventListener(PARTY_EVENT, on);
  }, []);

  const local = (e: { clientX: number; clientY: number }) => {
    const r = boxRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const pop = (i: number) => {
    const s = state.current;
    const b = s.balloons[i];
    const k = b.pts[LINKS];
    const cy = k.y - RADIUS;
    for (let n = 0; n < 16; n++) {
      const a = Math.random() * Math.PI * 2;
      const v = 150 + Math.random() * 260;
      s.shreds.push({
        x: k.x,
        y: cy,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 120,
        a: Math.random() * 360,
        va: (Math.random() - 0.5) * 900,
        life: 0.9 + Math.random() * 0.5,
        c: COLORS[i % COLORS.length],
      });
    }
    s.booms.push({ x: k.x, y: cy - RADIUS, t: performance.now() });
    b.popped = true;
    b.poppedAt = performance.now();
    b.scale = 0;
    setPops((n) => n + 1);
  };

  /**
   * Cuts a balloon's string: it floats off out of the box and all the way up
   * the page, swaying, until it is lost over the first section. A new one
   * inflates in its place.
   */
  const cut = (i: number) => {
    const s = state.current;
    const b = s.balloons[i];
    const box = boxRef.current;
    if (!b || b.popped || !box) return;
    const k = b.pts[LINKS];
    const r = box.getBoundingClientRect();
    b.popped = true;
    b.cut = true;
    // Every balloon set free in one visit: all problems accepted.
    cutSet.current.add(i);
    if (cutSet.current.size === LETTERS.length) {
      solveMystery("balloons");
    }
    b.poppedAt = performance.now();
    b.scale = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    launch(r.left + window.scrollX + k.x, r.top + window.scrollY + k.y, i);
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = (e.target as Element).closest("[data-balloon]");
    if (!target || e.button !== 0) return;
    const i = Number(target.getAttribute("data-balloon"));
    if (state.current.balloons[i]?.popped) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = local(e);
    state.current.grab = { i, x: p.x, y: p.y, sx: p.x, sy: p.y, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const s = state.current;
    const p = local(e);
    s.pointer = e.pointerType === "mouse" ? p : null;
    const g = s.grab;
    if (!g) return;
    if (e.pointerType === "mouse" && e.buttons === 0) return onUp();
    g.x = p.x;
    g.y = p.y;
    if (Math.hypot(p.x - g.sx, p.y - g.sy) > DRAG_PX) g.moved = true;
  };
  const onUp = () => {
    const s = state.current;
    const g = s.grab;
    if (!g) return;
    s.grab = null;
    if (!g.moved) pop(g.i);
  };

  return (
    <div className="mb-10">
      <div
        ref={boxRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onLostPointerCapture={onUp}
        onPointerLeave={() => {
          state.current.pointer = null;
        }}
        data-cursor="Pop"
        data-party-zone
        className="relative w-full touch-pan-y select-none overflow-hidden rounded-xl border border-border bg-card/30 text-foreground"
        style={{ height: HEIGHT }}
      >
        {backdrop}
        <svg ref={svgRef} aria-hidden className="absolute inset-0 h-full w-full overflow-visible" />
        {/* A tie at the foot of each string: touch it and the balloon is cut loose. */}
        {LETTERS.map((letter, i) => (
          <button
            key={letter}
            type="button"
            aria-label={`Cut balloon ${letter} loose`}
            data-cursor="Cut"
            onPointerEnter={(e) => e.pointerType === "mouse" && cut(i)}
            onPointerDown={(e) => {
              e.stopPropagation();
              cut(i);
            }}
            onClick={() => cut(i)}
            className="absolute bottom-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            style={{ left: `${((i + 0.5) / LETTERS.length) * 100}%` }}
          >
            <Scissors className="h-3 w-3" />
          </button>
        ))}
      </div>
      {controls}
      <p className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>
          At ICPC every solved problem earns a balloon · grab one, click to pop, or cut its string
        </span>
        <span aria-live="polite">{pops > 0 ? `popped: ${pops}` : ""}</span>
      </p>
    </div>
  );
}

/** Rise speed (px/s) at release and at most, and its acceleration. */
const FLY = { v0: 90, max: 560, accel: 170 };

/**
 * One cut-loose balloon floating up the page, in page coordinates so it keeps
 * climbing past whatever is scrolled into view. It sways as it rises and fades
 * out once it reaches the first section.
 */
function launch(x: number, y: number, i: number) {
  const color = COLORS[i % COLORS.length];
  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  el.style.cssText =
    "position:absolute;left:0;top:0;z-index:30;pointer-events:none;will-change:transform,opacity";
  el.innerHTML = `
    <svg width="60" height="120" viewBox="-30 -60 60 120" style="overflow:visible">
      <path d="M0,4 C6,24 -6,40 2,58" fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.2"/>
      <path d="M0,-1 l-3.5,6 h7 z" fill="${color}"/>
      <ellipse cx="0" cy="-${RADIUS}" rx="${RADIUS * 0.86}" ry="${RADIUS}" fill="${color}"/>
      <ellipse cx="-${RADIUS * 0.3}" cy="-${RADIUS * 1.35}" rx="${RADIUS * 0.2}" ry="${RADIUS * 0.32}" fill="#fff" opacity=".45"/>
      <text x="0" y="-${RADIUS * 0.72}" text-anchor="middle" font-size="18" font-weight="800" font-family="ui-monospace, monospace" fill="#fff" fill-opacity=".92">${LETTERS[i]}</text>
    </svg>`;
  el.style.color = getComputedStyle(document.body).color;
  document.body.appendChild(el);

  const first = document.querySelector("main > section");
  const lost = first ? first.getBoundingClientRect().bottom + window.scrollY - 120 : 400;
  let v = FLY.v0;
  let t = 0;
  let fade = 1;
  let last = performance.now();
  const frame = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    t += dt;
    v = Math.min(FLY.max, v + FLY.accel * dt);
    y -= v * dt;
    const sway = Math.sin(t * 1.6 + i) * 26;
    if (y < lost) fade -= dt * 0.9;
    el.style.opacity = String(Math.max(0, fade));
    el.style.transform = `translate(${x + sway - 30}px, ${y - 60}px) rotate(${Math.sin(t * 1.6 + i + 0.8) * 9}deg) scale(${0.6 + 0.4 * Math.max(0, fade)})`;
    if (fade > 0 && y > -200) requestAnimationFrame(frame);
    else el.remove();
  };
  requestAnimationFrame(frame);
}
