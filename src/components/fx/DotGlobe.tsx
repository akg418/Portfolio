import { useEffect, useRef, useState } from "react";
import { landDots } from "@/data/landDots";

/**
 * A dotted globe with Cairo pinned on it and light arcs flying out to cities
 * around the world. Drag it (or flick it) to spin; it keeps turning slowly on
 * its own.
 *
 * Drawn on a 2D canvas, no 3D library:
 * - Land is a few thousand lat/lon dots. Each frame they are turned into unit
 *   vectors, rotated by the globe's yaw and pitch, and projected
 *   orthographically. Depth decides size and brightness, and dots on the far
 *   side still show faintly through, so it reads as a sphere.
 * - Dots are sorted into a handful of brightness buckets and drawn one
 *   fillStyle per bucket, rather than one state change per dot.
 * - Arcs are great circles found by spherical interpolation between Cairo
 *   and each city, lifted off the surface in the middle. A bright head runs
 *   along each, with a fading trail, and a ring pings where it lands. Arc
 *   points behind the globe are hidden unless they rise past its edge.
 * - Dragging turns the globe directly, and letting go leaves it spinning on
 *   the flick, easing back to its slow idle turn.
 */

const DEG = Math.PI / 180;
const CAIRO = { name: "Cairo", lat: 30.04, lon: 31.24 };
const CITIES = [
  { name: "London", lat: 51.5, lon: -0.13 },
  { name: "Berlin", lat: 52.52, lon: 13.4 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Riyadh", lat: 24.71, lon: 46.68 },
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "San Francisco", lat: 37.77, lon: -122.42 },
  { name: "Toronto", lat: 43.65, lon: -79.38 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
];
const IDLE_SPIN = 0.12; // radians per second
const DEFAULT_PITCH = 0.38;
const FLICK_DECAY = 2.2; // per second
const ARC_MS = 2600;
const ARC_GAP_MS = 700;
const ARC_SEGMENTS = 64;
const BUCKETS = 8;
const MAX_DPR = 2;

type Vec = [number, number, number];

function toVec(lat: number, lon: number): Vec {
  const la = lat * DEG;
  const lo = lon * DEG;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

/** Spherical interpolation between two unit vectors. */
function slerp(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-5) return a;
  const s = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / s;
  const wb = Math.sin(t * omega) / s;
  return [a[0] * wa + b[0] * wb, a[1] * wa + b[1] * wb, a[2] * wa + b[2] * wb];
}

/**
 * Any CSS colour (oklch, a variable's value…) as [r, g, b], by painting it on
 * a 1px canvas: gradients reject some colour syntaxes outright.
 */
function toRgb(color: string): [number, number, number] {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const g = c.getContext("2d")!;
  g.fillStyle = "#888";
  g.fillStyle = color;
  g.fillRect(0, 0, 1, 1);
  const [r, gr, b] = g.getImageData(0, 0, 1, 1).data;
  return [r, gr, b];
}

const rgba = ([r, g, b]: [number, number, number], a: number) => `rgba(${r},${g},${b},${a})`;

export function DotGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = useState(false);
  const view = useRef({
    yaw: -CAIRO.lon * DEG + 0.35,
    pitch: DEFAULT_PITCH,
    vYaw: 0,
    vPitch: 0,
    drag: null as null | { x: number; y: number; t: number; id: number },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const raw = landDots();
    const n = raw.length / 2;
    const land = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const [x, y, z] = toVec(raw[i * 2 + 1], raw[i * 2]);
      land[i * 3] = x;
      land[i * 3 + 1] = y;
      land[i * 3 + 2] = z;
    }
    const home = toVec(CAIRO.lat, CAIRO.lon);
    const arcs = CITIES.map((c, i) => {
      const to = toVec(c.lat, c.lon);
      const angle = Math.acos(home[0] * to[0] + home[1] * to[1] + home[2] * to[2]);
      // Longer flights fly higher, but never past the frame.
      const lift = 0.05 + angle * 0.1;
      const pts: Vec[] = [];
      for (let k = 0; k <= ARC_SEGMENTS; k++) {
        const t = k / ARC_SEGMENTS;
        const p = slerp(home, to, t);
        const h = 1 + lift * Math.sin(Math.PI * t);
        pts.push([p[0] * h, p[1] * h, p[2] * h]);
      }
      return { ...c, to, pts, offset: i * (ARC_MS + ARC_GAP_MS) * 0.45 };
    });

    const root = getComputedStyle(document.documentElement);
    let P: [number, number, number] = [34, 211, 238];
    let A: [number, number, number] = [168, 85, 247];
    let primary = "";
    let accent = "";
    let ink = "";
    const readColors = () => {
      P = toRgb(root.getPropertyValue("--color-primary").trim() || "#22d3ee");
      A = toRgb(root.getPropertyValue("--color-accent").trim() || "#a855f7");
      primary = rgba(P, 1);
      accent = rgba(A, 1);
      ink = rgba(toRgb(getComputedStyle(canvas).color), 1);
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let W = 0;
    let H = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const buckets: number[][] = Array.from({ length: BUCKETS }, () => []);

    const draw = (now: number) => {
      const v = view.current;
      // Leaves room around the sphere for arcs rising off it.
      const R = Math.min(W, H) * 0.37;
      const cx = W / 2;
      const cy = H / 2;
      const cyaw = Math.cos(v.yaw);
      const syaw = Math.sin(v.yaw);
      const cp = Math.cos(v.pitch);
      const sp = Math.sin(v.pitch);
      /** Rotate a unit-sphere point by yaw then pitch; returns [x, y, depth]. */
      const rot = (x: number, y: number, z: number): Vec => {
        const x1 = x * cyaw + z * syaw;
        const z1 = -x * syaw + z * cyaw;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        return [x1, y2, z2];
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Atmosphere and the body of the sphere.
      const glow = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      glow.addColorStop(0, rgba(P, 0));
      glow.addColorStop(0.35, rgba(P, 0.22));
      glow.addColorStop(1, rgba(P, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, rgba(P, 0.1));
      body.addColorStop(1, rgba(A, 0.06));
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Land: bucket by depth, then one fill per bucket.
      for (const b of buckets) b.length = 0;
      for (let i = 0; i < n; i++) {
        const [x, y, z] = rot(land[i * 3], land[i * 3 + 1], land[i * 3 + 2]);
        const k = Math.min(BUCKETS - 1, Math.floor(((z + 1) / 2) * BUCKETS));
        buckets[k].push(cx + x * R, cy - y * R);
      }
      for (let k = 0; k < BUCKETS; k++) {
        const depth = (k + 0.5) / BUCKETS; // 0 far side … 1 facing us
        const front = depth > 0.5;
        ctx.globalAlpha = front ? 0.25 + (depth - 0.5) * 1.5 : 0.06 + depth * 0.1;
        ctx.fillStyle = front ? ink : primary;
        const size = front ? 1.1 + (depth - 0.5) * 2.4 : 0.9;
        const list = buckets[k];
        for (let i = 0; i < list.length; i += 2) {
          ctx.fillRect(list[i] - size / 2, list[i + 1] - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;

      /** Whether a point off the surface is in view: in front, or outside the disc. */
      const shown = (p: Vec) => p[2] > 0 || Math.hypot(p[0], p[1]) > 1;

      // Arcs, each on its own cycle: draw out, then fade.
      const cycle = arcs.length * (ARC_MS + ARC_GAP_MS) * 0.45 + ARC_MS;
      for (const a of arcs) {
        const t = ((now + cycle - a.offset) % cycle) / ARC_MS;
        if (t > 1.35) continue;
        const head = Math.min(1, t);
        const tail = Math.max(0, t - 0.55);
        const from = Math.floor(tail * ARC_SEGMENTS);
        const to = Math.floor(head * ARC_SEGMENTS);
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, primary);
        grad.addColorStop(1, accent);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        let pen = false;
        for (let k = from; k <= to; k++) {
          const p = rot(...a.pts[k]);
          if (!shown(p)) {
            pen = false;
            continue;
          }
          const x = cx + p[0] * R;
          const y = cy - p[1] * R;
          if (pen) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
          pen = true;
        }
        ctx.globalAlpha = t > 1 ? Math.max(0, 1 - (t - 1) / 0.35) : 0.9;
        ctx.stroke();

        // The bright head, while it is still travelling.
        if (t < 1) {
          const p = rot(...a.pts[to]);
          if (shown(p)) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = "#fff";
            ctx.shadowColor = primary;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(cx + p[0] * R, cy - p[1] * R, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
        // A ping where it lands, and the city's name.
        if (t >= 1) {
          const p = rot(...a.to);
          if (p[2] > 0) {
            const s = (t - 1) / 0.35;
            const x = cx + p[0] * R;
            const y = cy - p[1] * R;
            ctx.globalAlpha = 1 - s;
            ctx.strokeStyle = accent;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(x, y, 3 + s * 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = ink;
            ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
            ctx.fillText(a.name, x + 7, y - 6);
          }
        }
      }
      ctx.globalAlpha = 1;

      // Home.
      const c = rot(...home);
      if (c[2] > 0) {
        const x = cx + c[0] * R;
        const y = cy - c[1] * R;
        const pulse = (now / 1400) % 1;
        ctx.strokeStyle = primary;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 1 - pulse;
        ctx.beginPath();
        ctx.arc(x, y, 4 + pulse * 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.fillStyle = primary;
        ctx.shadowColor = primary;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 3.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = ink;
        ctx.font = "700 11px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(CAIRO.name, x + 8, y + 4);
      }
    };

    let raf = 0;
    let last = performance.now();
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden) return;
      const v = view.current;
      if (!v.drag) {
        v.yaw += (v.vYaw + (reduce ? 0 : IDLE_SPIN)) * dt;
        v.pitch += v.vPitch * dt;
        const decay = Math.exp(-FLICK_DECAY * dt);
        v.vYaw *= decay;
        v.vPitch *= decay;
        // Settle back to a comfortable tilt.
        v.pitch += (DEFAULT_PITCH - v.pitch) * (1 - Math.exp(-1.5 * dt));
      }
      draw(reduce ? 0 : now);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  /** Radians of turn per pixel of drag, so the surface roughly follows the pointer. */
  const perPx = () => 1 / ((canvasRef.current?.clientWidth ?? 300) * 0.37);

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const v = view.current;
    v.drag = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
    v.vYaw = v.vPitch = 0;
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const v = view.current;
    const d = v.drag;
    if (!d || d.id !== e.pointerId) return;
    if (e.pointerType === "mouse" && e.buttons === 0) return onUp();
    const now = performance.now();
    const dt = Math.max(1, now - d.t) / 1000;
    const dyaw = (e.clientX - d.x) * perPx();
    const dpitch = (e.clientY - d.y) * perPx();
    v.yaw += dyaw;
    v.pitch = Math.max(-1.1, Math.min(1.1, v.pitch + dpitch));
    // Smoothed, so letting go flings it at the drag's speed.
    v.vYaw = v.vYaw * 0.5 + (dyaw / dt) * 0.5;
    v.vPitch = v.vPitch * 0.5 + (dpitch / dt) * 0.5;
    d.x = e.clientX;
    d.y = e.clientY;
    d.t = now;
  };
  const onUp = () => {
    const v = view.current;
    if (!v.drag) return;
    // A pointer held still before letting go should not fling.
    if (performance.now() - v.drag.t > 80) v.vYaw = v.vPitch = 0;
    v.vYaw = Math.max(-8, Math.min(8, v.vYaw));
    v.vPitch = Math.max(-4, Math.min(4, v.vPitch));
    v.drag = null;
    setDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-cursor={dragging ? "Spin" : "Drag"}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onLostPointerCapture={onUp}
      className={`touch-pan-y text-foreground ${dragging ? "cursor-grabbing" : "cursor-grab"} ${
        className ?? ""
      }`}
    />
  );
}
