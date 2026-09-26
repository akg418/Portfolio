import { useRef, type ReactNode } from "react";

/**
 * Pulls its child toward the pointer while hovered, then springs back.
 * Fine pointers only; on touch it is an inert wrapper.
 */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transition = "transform 120ms ease-out";
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 600ms cubic-bezier(.2,1.6,.4,1)";
    el.style.transform = "";
  };

  return (
    <span ref={ref} className="inline-block" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  );
}
