import { useEffect, useRef } from "react";

/**
 * Cursor-following backdrop glow.
 *
 * The position is written straight to the element inside a rAF instead of
 * going through state: a pointer move fires far more often than a frame, and
 * re-rendering a full-viewport element on each one was pure waste.
 */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let x = -200;
    let y = -200;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--glow-x", `${x}px`);
      el.style.setProperty("--glow-y", `${y}px`);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-100"
      style={
        {
          ["--glow-x" as string]: "-200px",
          ["--glow-y" as string]: "-200px",
          background:
            "radial-gradient(600px circle at var(--glow-x) var(--glow-y), oklch(0.68 0.22 305 / 0.18), transparent 45%), radial-gradient(900px circle at var(--glow-x) var(--glow-y), oklch(0.78 0.17 200 / 0.10), transparent 60%)",
        } as React.CSSProperties
      }
    />
  );
}
