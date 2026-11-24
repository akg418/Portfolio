import { useEffect, useRef, useState } from "react";

/** What every transition is handed. `out` turns true at the swap, when the reveal starts. */
export type FxProps = { x: number; y: number; out: boolean };

export type Fx = {
  id: string;
  /** By this time (ms) the screen must be fully covered; the view swaps underneath. */
  swap: number;
  /** By this time (ms) the curtain must be gone. */
  end: number;
  Render: (p: FxProps) => React.ReactElement;
};

export const DARK = "#05010d";
export const NEON = ["#22d3ee", "#a855f7", "#db2777"] as const;

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeIn = (t: number) => t * t * t;
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Distance from the screen centre to a corner, plus a margin: enough to cover it all. */
export const reach = (w: number, h: number) => Math.hypot(w, h) * 0.55 + 40;

export type Draw = (t: number) => void;

/**
 * A full-screen canvas sized for the device pixel ratio. `make` runs once with
 * the context and viewport size and returns the per-frame draw, which gets the
 * ms elapsed since the transition began.
 */
export function FxCanvas({
  make,
  className = "",
}: {
  make: (ctx: CanvasRenderingContext2D, w: number, h: number) => Draw;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const makeRef = useRef(make);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.scale(dpr, dpr);
    const draw = makeRef.current(ctx, w, h);
    const t0 = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      draw(now - t0);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className={`absolute inset-0 size-full ${className}`} />;
}

const WORD = "CHAOS MODE";
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/** "CHAOS MODE", scrambling into place after `delay` ms, flying at the camera when `out`. */
export function Word({ delay = 500, out }: { delay?: number; out: boolean }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const start = performance.now() + delay;
    const ms = 600;
    let raf = 0;
    const tick = (now: number) => {
      const t = clamp((now - start) / ms);
      const locked = Math.floor(t * WORD.length);
      let s = "";
      for (let i = 0; i < WORD.length; i++) {
        s +=
          i < locked || WORD[i] === " "
            ? WORD[i]
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setText(now < start ? "" : s);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [delay]);
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <p
        className={`mode-word font-mono text-4xl font-black tracking-[0.25em] text-white sm:text-7xl ${
          out ? "is-out" : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
}

type Star = { x: number; y: number; z: number; hue: number };

/**
 * Stars in 3D space rushing at the camera, perspective-projected and drawn as
 * streaks that stretch with speed. Returns a step that draws one frame.
 */
export function starfield(w: number, h: number, count = 800) {
  const focal = Math.min(w, h) * 0.8;
  const depth = 1600;
  const stars: Star[] = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * w * 2,
    y: (Math.random() - 0.5) * h * 2,
    z: Math.random() * depth,
    hue: [190, 270, 320][Math.floor(Math.random() * 3)],
  }));
  return (ctx: CanvasRenderingContext2D, dt: number, speed: number, cx: number, cy: number) => {
    ctx.lineCap = "round";
    for (const s of stars) {
      s.z -= speed * dt;
      if (s.z < 1) {
        s.z = depth;
        s.x = (Math.random() - 0.5) * w * 2;
        s.y = (Math.random() - 0.5) * h * 2;
        continue;
      }
      const tail = s.z + 20 + speed * dt * 4;
      const near = 1 - s.z / depth;
      ctx.strokeStyle = `hsla(${s.hue}, 95%, ${60 + near * 30}%, ${0.3 + near * 0.7})`;
      ctx.lineWidth = 0.5 + near * 2.5;
      ctx.beginPath();
      ctx.moveTo(cx + (s.x / tail) * focal, cy + (s.y / tail) * focal);
      ctx.lineTo(cx + (s.x / s.z) * focal, cy + (s.y / s.z) * focal);
      ctx.stroke();
    }
  };
}

/** Tracks frame-to-frame delta inside a draw function. */
export function clock() {
  let last = -1;
  return (t: number) => {
    const dt = last < 0 ? 16 : Math.min(50, t - last);
    last = t;
    return dt;
  };
}
