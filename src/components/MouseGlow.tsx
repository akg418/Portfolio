import { useEffect, useState } from "react";

export function MouseGlow() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!mounted) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-[background] duration-100"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, oklch(0.68 0.22 305 / 0.18), transparent 45%), radial-gradient(900px circle at ${pos.x}px ${pos.y}px, oklch(0.78 0.17 200 / 0.10), transparent 60%)`,
      }}
    />
  );
}