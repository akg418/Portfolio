import { useEffect, useState } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);
    document.body.classList.add("custom-cursor");
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,input,textarea,[role=button]"));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!mounted) return null;
  const size = hover ? 44 : 12;
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed z-[100] rounded-full transition-[width,height,background,border-color] duration-150"
        style={{
          width: size,
          height: size,
          left: pos.x - size / 2,
          top: pos.y - size / 2,
          border: "1.5px solid oklch(0.78 0.17 200)",
          background: hover ? "oklch(0.78 0.17 200 / 0.15)" : "transparent",
          transform: down ? "scale(0.85)" : "scale(1)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed z-[100] h-1 w-1 rounded-full"
        style={{
          left: pos.x - 2,
          top: pos.y - 2,
          background: "oklch(0.97 0.01 250)",
        }}
      />
    </>
  );
}