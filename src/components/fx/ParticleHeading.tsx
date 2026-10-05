import { useEffect, useRef, useState } from "react";

/**
 * A heading made of particles. When it first scrolls into view the particles
 * fly in from all over and assemble into the words; the pointer pushes them
 * aside as it passes, a click sends a shockwave through them, and they always
 * spring back home.
 *
 * How it works:
 *
 * - The real heading is rendered as usual, so layout, line breaks, selection
 *   and screen readers are untouched. Once the particles are ready its text is
 *   made transparent and a canvas over it takes over the drawing.
 * - Each line's box comes from a DOM Range, and the text is drawn into an
 *   offscreen canvas in the same web font, size and colours (the gradient
 *   line included). Every few pixels of ink becomes a particle whose home is
 *   that pixel and whose colour is the ink's.
 * - Particles live in typed arrays: position, velocity, home and colour. Each
 *   frame they are pushed by the pointer, pulled home by a damped spring, and
 *   written straight into an ImageData buffer, which is far cheaper than a
 *   draw call per particle.
 * - Once every particle is home and still, the loop stops drawing until the
 *   pointer comes back. It re-samples on resize and when the page font changes.
 *
 * With reduced motion, or without a 2D canvas, it is just the heading.
 */

type Line = { text: string; gradient?: boolean };

/** Sampling step in CSS pixels: one particle per STEP x STEP of ink. */
const STEP_DESKTOP = 3;
const STEP_MOBILE = 2.5;
/** Room around the text the particles may fly into. */
const BLEED = 60;
const SPRING = 0.055;
const DAMPING = 0.84;
const PUSH_RADIUS = 70;
const PUSH_FORCE = 5.5;
const SHOCK_RADIUS = 260;
const SHOCK_FORCE = 38;
const MAX_DPR = 2;

export function ParticleHeading({ lines, className }: { lines: Line[]; className?: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const heading = headingRef.current;
    const canvas = canvasRef.current;
    if (!heading || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    let n = 0;
    let x = new Float32Array(0);
    let y = x;
    let vx = x;
    let vy = x;
    let hx = x;
    let hy = x;
    let color = new Uint32Array(0);
    let W = 0;
    let H = 0;
    let dpr = 1;
    let dot = 2;
    let image: ImageData | null = null;
    let pixels = new Uint32Array(0);
    let pointer: { x: number; y: number } | null = null;
    let awake = true;
    let assembled = false;
    let visible = false;
    let cancelled = false;

    /** Draws the heading's lines into an offscreen canvas and turns ink into particles. */
    const sample = () => {
      const box = heading.getBoundingClientRect();
      dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      W = Math.ceil((box.width + BLEED * 2) * dpr);
      H = Math.ceil((box.height + BLEED * 2) * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${W / dpr}px`;
      canvas.style.height = `${H / dpr}px`;

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d");
      if (!o) return;
      const cs = getComputedStyle(heading);
      o.scale(dpr, dpr);
      o.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      o.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
      o.textBaseline = "alphabetic";
      const root = getComputedStyle(document.documentElement);
      const primary = root.getPropertyValue("--color-primary").trim() || "#22d3ee";
      const accent = root.getPropertyValue("--color-accent").trim() || "#a855f7";
      const ink = getComputedStyle(document.body).color;

      lines.forEach((line, i) => {
        const el = lineRefs.current[i];
        if (!el) return;
        const range = document.createRange();
        range.selectNodeContents(el);
        const r = range.getBoundingClientRect();
        const m = o.measureText(line.text);
        const left = r.left - box.left + BLEED;
        const top = r.top - box.top + BLEED;
        // Centre the font's box in the line box, which is where CSS puts it.
        const baseline = top + (r.height + m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2;
        if (line.gradient) {
          const g = o.createLinearGradient(left, 0, left + r.width, 0);
          g.addColorStop(0, primary);
          g.addColorStop(1, accent);
          o.fillStyle = g;
        } else {
          o.fillStyle = ink;
        }
        o.fillText(line.text, left, baseline);
      });

      const data = o.getImageData(0, 0, W, H).data;
      const step = Math.round(
        (window.matchMedia("(pointer: coarse)").matches ? STEP_MOBILE : STEP_DESKTOP) * dpr,
      );
      // Dots fill most of their cell, so the resting words read solid.
      dot = Math.max(1, Math.round(step * 0.62));
      const homes: number[] = [];
      const colors: number[] = [];
      for (let py = 0; py < H; py += step) {
        for (let px = 0; px < W; px += step) {
          const k = (py * W + px) * 4;
          const a = data[k + 3];
          if (a < 128) continue;
          homes.push(px, py);
          // Little-endian ABGR, as a Uint32 view over RGBA bytes reads it.
          colors.push((255 << 24) | (data[k + 2] << 16) | (data[k + 1] << 8) | data[k]);
        }
      }

      const prevN = n;
      n = homes.length / 2;
      const nx = new Float32Array(n);
      const ny = new Float32Array(n);
      const nvx = new Float32Array(n);
      const nvy = new Float32Array(n);
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      color = Uint32Array.from(colors);
      for (let i = 0; i < n; i++) {
        hx[i] = homes[i * 2];
        hy[i] = homes[i * 2 + 1];
        if (assembled && i < prevN) {
          // A re-sample keeps particles where they were; they flow to the new shape.
          nx[i] = x[i];
          ny[i] = y[i];
        } else if (assembled) {
          nx[i] = hx[i];
          ny[i] = hy[i];
        } else {
          // Not yet assembled: scattered, waiting to fly in.
          nx[i] = Math.random() * W;
          ny[i] = Math.random() * H;
          nvx[i] = (Math.random() - 0.5) * 30 * dpr;
          nvy[i] = (Math.random() - 0.5) * 30 * dpr;
        }
      }
      x = nx;
      y = ny;
      vx = nvx;
      vy = nvy;
      image = ctx.createImageData(W, H);
      pixels = new Uint32Array(image.data.buffer);
      awake = true;
    };

    const draw = () => {
      if (!image) return;
      pixels.fill(0);
      for (let i = 0; i < n; i++) {
        const px = x[i] | 0;
        const py = y[i] | 0;
        if (px < 0 || py < 0 || px + dot > W || py + dot > H) continue;
        const c = color[i];
        for (let dy = 0; dy < dot; dy++) {
          const row = (py + dy) * W + px;
          for (let dx = 0; dx < dot; dx++) pixels[row + dx] = c;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const step = () => {
      const r = PUSH_RADIUS * dpr;
      const r2 = r * r;
      let moving = false;
      for (let i = 0; i < n; i++) {
        if (pointer) {
          const dx = x[i] - pointer.x;
          const dy = y[i] - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / r) * PUSH_FORCE * dpr;
            vx[i] += (dx / d) * f;
            vy[i] += (dy / d) * f;
          }
        }
        vx[i] = (vx[i] + (hx[i] - x[i]) * SPRING) * DAMPING;
        vy[i] = (vy[i] + (hy[i] - y[i]) * SPRING) * DAMPING;
        x[i] += vx[i];
        y[i] += vy[i];
        if (!moving && (Math.abs(vx[i]) > 0.02 || Math.abs(vy[i]) > 0.02)) moving = true;
      }
      return moving;
    };

    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden || !assembled || !awake) return;
      const moving = step();
      draw();
      if (!moving && !pointer) {
        // Settle exactly on the ink, so the resting text is crisp.
        x.set(hx);
        y.set(hy);
        draw();
        awake = false;
      }
    };

    /** Pointer position in canvas pixels, or null when it is nowhere near. */
    const toCanvas = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      if (clientX < r.left || clientX > r.right || clientY < r.top || clientY > r.bottom)
        return null;
      return { x: (clientX - r.left) * dpr, y: (clientY - r.top) * dpr };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      pointer = toCanvas(e.clientX, e.clientY);
      if (pointer) awake = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      pointer = t ? toCanvas(t.clientX, t.clientY) : null;
      if (pointer) awake = true;
    };
    const onTouchEnd = () => {
      pointer = null;
    };
    const onPointerDown = (e: PointerEvent) => {
      const p = toCanvas(e.clientX, e.clientY);
      if (!p) return;
      const rr = SHOCK_RADIUS * dpr;
      for (let i = 0; i < n; i++) {
        const dx = x[i] - p.x;
        const dy = y[i] - p.y;
        const d = Math.hypot(dx, dy);
        if (d > rr || d < 0.01) continue;
        const f = (1 - d / rr) * SHOCK_FORCE * dpr;
        vx[i] += (dx / d) * f + (Math.random() - 0.5) * 4;
        vy[i] += (dy / d) * f + (Math.random() - 0.5) * 4;
      }
      awake = true;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !assembled && n) {
        // The fly-in, the first time it is seen.
        assembled = true;
        awake = true;
      }
    });

    let resizeTimer = 0;
    const resample = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (cancelled) return;
        sample();
        if (!assembled) return;
        draw();
      }, 120);
    };
    const ro = new ResizeObserver(resample);
    // Arcade mode swaps the font via a class on <html>, so a class change re-samples.
    const mo = new MutationObserver(resample);

    // Sample only once the web font is in, or the ink would be the fallback's.
    const start = () => {
      if (cancelled) return;
      sample();
      if (!n) return;
      setLive(true);
      io.observe(canvas);
      ro.observe(heading);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      raf = requestAnimationFrame(frame);
    };
    if (document.fonts) void document.fonts.ready.then(start);
    else start();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [lines]);

  return (
    // Not selectable: the visible words are particles, and a selection box over
    // the hidden text underneath only looks broken. Screen readers still read it.
    <div className="relative select-none">
      <h2
        ref={headingRef}
        className={className}
        // The canvas draws the words once it is ready; the text stays for layout,
        // selection and screen readers.
        style={live ? { color: "transparent", WebkitTextFillColor: "transparent" } : undefined}
      >
        {lines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            <span
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={
                line.gradient
                  ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  : undefined
              }
              style={live && line.gradient ? { backgroundImage: "none" } : undefined}
            >
              {line.text}
            </span>
          </span>
        ))}
      </h2>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
        style={{ left: -BLEED, top: -BLEED }}
      />
    </div>
  );
}
