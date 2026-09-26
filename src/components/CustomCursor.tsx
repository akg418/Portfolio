import { useEffect, useRef, useState } from "react";

const DOT_SIZE = 12;
const HOVER_SIZE = 44;
const LABEL_SIZE = 72;
const INTERACTIVE = "a,button,input,textarea,[role=button]";

/**
 * Replaces the system cursor with a ring and a dot. Anything carrying a
 * `data-cursor` label swells the ring and writes the label inside it.
 *
 * Position is written to CSS custom properties inside a rAF rather than held
 * in state, so pointer movement does not re-render. Only the hover and pressed
 * states — which change rarely — go through React.
 */
export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);
    document.body.classList.add("custom-cursor");

    let frame = 0;
    let x = -100;
    let y = -100;

    const paint = () => {
      frame = 0;
      for (const el of [ringRef.current, dotRef.current]) {
        el?.style.setProperty("--cursor-x", `${x}px`);
        el?.style.setProperty("--cursor-y", `${y}px`);
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
      const target = e.target as HTMLElement | null;
      setHover(!!target?.closest(INTERACTIVE));
      setLabel(target?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (!mounted) return null;

  const size = label ? LABEL_SIZE : hover ? HOVER_SIZE : DOT_SIZE;
  const base: React.CSSProperties = {
    ["--cursor-x" as string]: "-100px",
    ["--cursor-y" as string]: "-100px",
  };

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full font-mono text-[10px] uppercase tracking-widest text-foreground transition-[width,height,background,border-color] duration-150"
        style={{
          ...base,
          width: size,
          height: size,
          border: "1.5px solid oklch(0.78 0.17 200)",
          background: label
            ? "oklch(0.78 0.17 200 / 0.25)"
            : hover
              ? "oklch(0.78 0.17 200 / 0.15)"
              : "transparent",
          backdropFilter: label ? "blur(4px)" : undefined,
          transform: `translate(var(--cursor-x), var(--cursor-y)) translate(-50%, -50%) scale(${
            down ? 0.85 : 1
          })`,
        }}
      >
        {label}
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 rounded-full"
        style={{
          ...base,
          background: "oklch(0.97 0.01 250)",
          transform: "translate(var(--cursor-x), var(--cursor-y)) translate(-50%, -50%)",
        }}
      />
    </>
  );
}
