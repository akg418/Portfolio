import { useEffect, useRef, useState } from "react";
import { RotateCcw, Square } from "lucide-react";

/**
 * A little car that lives on the page.
 *
 * At rest it potters about the bottom corner of the screen, bouncing on its
 * suspension. On a desktop, click it and it is yours: arrow keys (or WASD)
 * drive it anywhere on the page, the window scrolls to follow, and whatever it
 * hits (headings, buttons, chips, images) gets knocked across the page and
 * stays where it lands, until "Reset website" puts everything back.
 *
 * - Arcade handling: speed along the heading, steering that scales with
 *   speed, a handbrake, and dust kicked up when it accelerates or turns hard.
 * - Collisions are circle-against-rectangle tests against a cached set of
 *   page elements near the car. A hit pushes the element along the contact
 *   normal by an impulse scaled by its size and spins it a little; the car
 *   bounces back off it. Elements slide to a stop with friction.
 * - Pushed elements move through the individual `translate` and `rotate`
 *   properties, which compose with any transform the page already uses, so
 *   resetting is just clearing them.
 *
 * Nothing renders for anyone who asked for reduced motion.
 */

const ACCEL = 900;
const BRAKE = 1500;
const MAX_FWD = 560;
const MAX_REV = 220;
const DRAG = 1.6;
const STEER = 3.4;
const RADIUS = 17;
const IDLE_SPEED = 70;
const PUSH = 1.25;
const SLIDE_FRICTION = 0.9;
const CANDIDATES =
  "main h1, main h2, main h3, main h4, main p, main a, main button, main img, main li, main [class*='rounded-md'], main [class*='rounded-full']";

type Pushed = {
  el: HTMLElement;
  /** Page-space box with no push applied. */
  x: number;
  y: number;
  w: number;
  h: number;
  m: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
};

type Puff = { x: number; y: number; t: number; s: number };

export function PlayCar() {
  const carRef = useRef<HTMLDivElement>(null);
  const puffRef = useRef<HTMLDivElement>(null);
  const [driving, setDriving] = useState(false);
  const [canDrive, setCanDrive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [moved, setMoved] = useState(0);
  const drivingRef = useRef(false);
  const resetRef = useRef<() => void>(() => {});
  /** Switch the car between screen space (idle) and page space (driving). */
  const toPageRef = useRef<() => void>(() => {});
  const toViewportRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    setCanDrive(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const car = carRef.current!;
    const puffLayer = puffRef.current!;

    // Car state. Idle: viewport coordinates. Driving: page coordinates.
    const s = {
      x: 60,
      y: window.innerHeight - 140,
      a: 0,
      v: 0,
      steer: 0,
      bounce: 0,
      target: { x: 200, y: window.innerHeight - 150 },
    };
    const keys = new Set<string>();
    let pushed: Pushed[] = [];
    let lastScan = 0;
    let puffs: Puff[] = [];
    let raf = 0;
    let last = performance.now();
    let movedCount = 0;

    const idleBox = () => ({
      x0: 30,
      x1: Math.min(window.innerWidth - 60, 340),
      y0: window.innerHeight - 220,
      y1: window.innerHeight - 110,
    });
    const pickTarget = () => {
      const b = idleBox();
      s.target = {
        x: b.x0 + Math.random() * (b.x1 - b.x0),
        y: b.y0 + Math.random() * (b.y1 - b.y0),
      };
    };

    /** Collects the elements a car could plausibly hit, outermost first, skipping fixed chrome. */
    const scan = () => {
      const keep = new Map(pushed.map((p) => [p.el, p]));
      const out: Pushed[] = [];
      const chosen = new Set<Element>();
      for (const el of document.querySelectorAll<HTMLElement>(CANDIDATES)) {
        if (el.closest("header, [role=dialog], .fixed, canvas, svg")) continue;
        let ancestor = el.parentElement;
        let nested = false;
        while (ancestor && !nested) {
          if (chosen.has(ancestor)) nested = true;
          ancestor = ancestor.parentElement;
        }
        if (nested) continue;
        const prev = keep.get(el);
        const r = el.getBoundingClientRect();
        const dx = prev?.dx ?? 0;
        const dy = prev?.dy ?? 0;
        const w = r.width;
        const h = r.height;
        if (w < 8 || h < 8 || w > window.innerWidth * 0.7 || h > 360) continue;
        chosen.add(el);
        out.push(
          prev
            ? { ...prev, x: r.left + window.scrollX - dx, y: r.top + window.scrollY - dy, w, h }
            : {
                el,
                x: r.left + window.scrollX,
                y: r.top + window.scrollY,
                w,
                h,
                m: Math.min(6, Math.max(0.6, (w * h) / 5000)),
                dx: 0,
                dy: 0,
                vx: 0,
                vy: 0,
                rot: 0,
                vr: 0,
              },
        );
      }
      pushed = out;
    };

    const puff = (x: number, y: number) => {
      puffs.push({ x, y, t: 0, s: 4 + Math.random() * 5 });
      if (puffs.length > 60) puffs.shift();
    };

    const collide = () => {
      let any = false;
      for (const p of pushed) {
        const left = p.x + p.dx;
        const top = p.y + p.dy;
        if (Math.abs(top + p.h / 2 - s.y) > p.h / 2 + RADIUS + 40) continue;
        const cx = Math.max(left, Math.min(s.x, left + p.w));
        const cy = Math.max(top, Math.min(s.y, top + p.h));
        const ddx = s.x - cx;
        const ddy = s.y - cy;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 > RADIUS * RADIUS) continue;
        const d = Math.sqrt(d2) || 1;
        // Normal from the element to the car; inside the box, push along heading.
        const nx = d2 > 0.01 ? ddx / d : -Math.cos(s.a);
        const ny = d2 > 0.01 ? ddy / d : -Math.sin(s.a);
        const speed = Math.abs(s.v);
        if (speed < 15) continue;
        const k = (speed * PUSH) / p.m;
        // Away from the car, harder for a faster car and a lighter element.
        p.vx -= nx * k * 0.05;
        p.vy -= ny * k * 0.05;
        p.vr += ((Math.random() - 0.5) * speed * 0.04) / p.m;
        // The car bounces back and loses speed.
        s.x += nx * (RADIUS - d + 1);
        s.y += ny * (RADIUS - d + 1);
        s.v *= -0.35;
        s.bounce = 1;
        if (!p.el.dataset.carMoved) {
          p.el.dataset.carMoved = "1";
          movedCount++;
          any = true;
        }
        for (let i = 0; i < 4; i++) puff(cx, cy);
      }
      if (any) setMoved(movedCount);
    };

    const slide = () => {
      for (const p of pushed) {
        if (!p.vx && !p.vy && !p.vr) continue;
        p.dx += p.vx;
        p.dy += p.vy;
        p.rot += p.vr;
        p.vx *= SLIDE_FRICTION;
        p.vy *= SLIDE_FRICTION;
        p.vr *= SLIDE_FRICTION;
        if (Math.abs(p.vx) < 0.02) p.vx = 0;
        if (Math.abs(p.vy) < 0.02) p.vy = 0;
        if (Math.abs(p.vr) < 0.01) p.vr = 0;
        p.el.style.translate = `${p.dx.toFixed(1)}px ${p.dy.toFixed(1)}px`;
        p.el.style.rotate = `${p.rot.toFixed(2)}deg`;
      }
    };

    resetRef.current = () => {
      for (const el of document.querySelectorAll<HTMLElement>("[data-car-moved]")) {
        el.style.translate = "";
        el.style.rotate = "";
        delete el.dataset.carMoved;
      }
      for (const p of pushed) Object.assign(p, { dx: 0, dy: 0, vx: 0, vy: 0, rot: 0, vr: 0 });
      movedCount = 0;
      setMoved(0);
    };

    const toPage = () => {
      s.x += window.scrollX;
      s.y += window.scrollY;
      scan();
    };
    const toViewport = () => {
      s.x -= window.scrollX;
      s.y -= window.scrollY;
      const b = idleBox();
      s.x = Math.max(b.x0, Math.min(b.x1, s.x));
      s.y = Math.max(b.y0, Math.min(b.y1, s.y));
      s.v = 0;
      pickTarget();
    };
    toPageRef.current = toPage;
    toViewportRef.current = toViewport;

    const onKey = (e: KeyboardEvent) => {
      if (!drivingRef.current) return;
      // Typing somewhere (the terminal, a form) is not driving.
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, [contenteditable=true]")) return;
      const k = e.key.toLowerCase();
      const map: Record<string, string> = {
        arrowup: "up",
        w: "up",
        arrowdown: "down",
        s: "down",
        arrowleft: "left",
        a: "left",
        arrowright: "right",
        d: "right",
        " ": "brake",
      };
      const m = map[k];
      if (!m) return;
      e.preventDefault();
      if (e.type === "keydown") keys.add(m);
      else keys.delete(m);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    const clearKeys = () => keys.clear();
    window.addEventListener("blur", clearKeys);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const driving = drivingRef.current;

      if (driving) {
        if (now - lastScan > 1500) {
          lastScan = now;
          scan();
        }
        const throttle = (keys.has("up") ? 1 : 0) - (keys.has("down") ? 1 : 0);
        if (throttle > 0) s.v += (s.v < 0 ? BRAKE : ACCEL) * dt;
        else if (throttle < 0) s.v -= (s.v > 0 ? BRAKE : ACCEL * 0.6) * dt;
        s.v -= s.v * DRAG * dt;
        if (keys.has("brake")) s.v -= s.v * 6 * dt;
        s.v = Math.max(-MAX_REV, Math.min(MAX_FWD, s.v));
        const turn = (keys.has("right") ? 1 : 0) - (keys.has("left") ? 1 : 0);
        s.steer += (turn - s.steer) * Math.min(1, dt * 10);
        const grip = Math.min(1, Math.abs(s.v) / 140);
        s.a += s.steer * STEER * grip * Math.sign(s.v || 1) * dt;
        s.x += Math.cos(s.a) * s.v * dt;
        s.y += Math.sin(s.a) * s.v * dt;

        // The page is the arena.
        const maxX = document.documentElement.scrollWidth - RADIUS;
        const maxY = document.documentElement.scrollHeight - RADIUS;
        if (s.x < RADIUS || s.x > maxX || s.y < RADIUS || s.y > maxY) {
          s.x = Math.max(RADIUS, Math.min(maxX, s.x));
          s.y = Math.max(RADIUS, Math.min(maxY, s.y));
          s.v *= -0.3;
          s.bounce = 1;
        }
        collide();
        slide();

        // Keep the car in the middle band of the window.
        const sy = s.y - window.scrollY;
        const vh = window.innerHeight;
        const lo = vh * 0.3;
        const hi = vh * 0.65;
        if (sy < lo || sy > hi) {
          window.scrollTo({
            top: window.scrollY + (sy < lo ? sy - lo : sy - hi) * 0.18,
            behavior: "instant",
          });
        }

        if (
          (throttle !== 0 && Math.abs(s.v) < 260) ||
          (Math.abs(s.steer) > 0.6 && Math.abs(s.v) > 220)
        ) {
          if (Math.random() < 0.5) puff(s.x - Math.cos(s.a) * 18, s.y - Math.sin(s.a) * 18);
        }
      } else {
        // Idle: wander toward a target point near the corner.
        const dx = s.target.x - s.x;
        const dy = s.target.y - s.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 14) {
          pickTarget();
        } else {
          let diff = Math.atan2(dy, dx) - s.a;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          s.a += Math.max(-1, Math.min(1, diff)) * 2.2 * dt;
          s.v += (IDLE_SPEED * Math.min(1, dist / 60) - s.v) * 2 * dt;
          s.x += Math.cos(s.a) * s.v * dt;
          s.y += Math.sin(s.a) * s.v * dt;
        }
        if (Math.random() < 0.03) puff(s.x - Math.cos(s.a) * 18, s.y - Math.sin(s.a) * 18);
      }

      // Draw. Driving positions are page-space; idle ones are already on screen.
      s.bounce *= Math.exp(-dt * 6);
      const ox = driving ? window.scrollX : 0;
      const oy = driving ? window.scrollY : 0;
      const wobble =
        Math.sin(now / 90) * (0.6 + Math.min(1, Math.abs(s.v) / 300)) +
        s.bounce * Math.sin(now / 30) * 4;
      car.style.transform = `translate(${s.x - ox}px, ${s.y - oy}px) rotate(${s.a}rad)`;
      const body = car.firstElementChild as HTMLElement | null;
      if (body)
        body.style.transform = `translate(-50%, -50%) scale(${1 + s.bounce * 0.12}, ${1 - s.bounce * 0.08}) rotate(${wobble * 0.6}deg)`;

      puffs = puffs.filter((p) => (p.t += dt) < 0.7);
      puffLayer.innerHTML = puffs
        .map((p) => {
          const k = p.t / 0.7;
          return `<span style="position:absolute;left:0;top:0;width:${p.s}px;height:${p.s}px;border-radius:999px;background:currentColor;opacity:${(1 - k) * 0.35};transform:translate(${p.x - ox - p.s / 2}px,${p.y - oy - p.s / 2 - k * 10}px) scale(${1 + k * 1.5})"></span>`;
        })
        .join("");
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", clearKeys);
    };
  }, [enabled]);

  const start = () => {
    if (!canDrive || drivingRef.current) return;
    toPageRef.current();
    drivingRef.current = true;
    setDriving(true);
  };
  const stop = () => {
    drivingRef.current = false;
    toViewportRef.current();
    setDriving(false);
  };

  if (!enabled) return null;

  return (
    <>
      <div
        ref={puffRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 text-muted-foreground"
      />
      <div
        ref={carRef}
        className="fixed left-0 top-0 z-40"
        style={{ transform: "translate(-200px, -200px)" }}
      >
        <button
          type="button"
          onClick={start}
          data-cursor={driving ? undefined : canDrive ? "Drive" : undefined}
          aria-label={canDrive ? "Drive the car" : "A little car"}
          className={`block ${driving ? "cursor-default" : canDrive ? "cursor-pointer" : "cursor-default"}`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <CarSprite lights={driving} />
        </button>
      </div>

      {driving && (
        <div className="fixed left-1/2 top-20 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/85 px-3 py-2 font-mono text-[11px] shadow-lg backdrop-blur-md">
          <span className="hidden text-muted-foreground sm:inline">
            ↑ ↓ ← → or WASD · space to brake
            {moved > 0 ? ` · ${moved} things knocked over` : ""}
          </span>
          <button
            type="button"
            onClick={stop}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 hover:border-primary/60 hover:text-primary"
          >
            <Square className="h-3 w-3" /> Stop driving
          </button>
          <button
            type="button"
            onClick={() => resetRef.current()}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 font-semibold text-primary-foreground hover:opacity-90"
          >
            <RotateCcw className="h-3 w-3" /> Reset website
          </button>
        </div>
      )}
    </>
  );
}

/** Top-down, facing right: a round little hatchback in the site's colours. */
function CarSprite({ lights }: { lights: boolean }) {
  return (
    <svg
      width="52"
      height="34"
      viewBox="0 0 52 34"
      className="overflow-visible drop-shadow-[0_6px_6px_rgba(0,0,0,0.45)]"
    >
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      {lights && (
        <g opacity="0.5">
          <path d="M46 9 L96 -4 L96 14 Z" fill="#fde68a" opacity="0.35" />
          <path d="M46 25 L96 20 L96 38 Z" fill="#fde68a" opacity="0.35" />
        </g>
      )}
      {/* wheels */}
      {[
        [9, 1],
        [33, 1],
        [9, 27],
        [33, 27],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="10" height="6" rx="2" fill="#0f172a" />
      ))}
      {/* body */}
      <rect x="3" y="4" width="44" height="26" rx="11" fill="url(#car-body)" />
      <rect x="6" y="7" width="38" height="5" rx="2.5" fill="#fff" opacity="0.25" />
      {/* cabin */}
      <rect x="15" y="8" width="20" height="18" rx="6" fill="#0b1224" opacity="0.85" />
      <rect x="29" y="10" width="5" height="14" rx="2.5" fill="#7dd3fc" opacity="0.75" />
      <rect x="16" y="10" width="4" height="14" rx="2" fill="#7dd3fc" opacity="0.4" />
      {/* lights */}
      <circle cx="45" cy="10" r="2.4" fill={lights ? "#fef08a" : "#fde68a"} />
      <circle cx="45" cy="24" r="2.4" fill={lights ? "#fef08a" : "#fde68a"} />
      <rect x="2.5" y="8" width="2" height="5" rx="1" fill="#f43f5e" />
      <rect x="2.5" y="21" width="2" height="5" rx="1" fill="#f43f5e" />
    </svg>
  );
}
