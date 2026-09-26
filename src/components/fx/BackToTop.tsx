import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const LABEL = "BACK TO TOP • BACK TO TOP • ";
const RING_R = 34;
const RING = 2 * Math.PI * RING_R;

/**
 * A round badge with spinning circular text and a ring that fills with scroll
 * progress. Shows once the visitor is a screen down; clicking it goes home.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const t = total > 0 ? h.scrollTop / total : 0;
      setVisible(h.scrollTop > window.innerHeight);
      ringRef.current?.style.setProperty("stroke-dashoffset", String(RING * (1 - t)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className="group fixed bottom-32 right-3 z-30 h-14 w-14 rounded-full sm:right-6 sm:h-[76px] sm:w-[76px] bg-background/70 backdrop-blur-md transition-[opacity,transform] duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px) scale(0.8)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg viewBox="0 0 76 76" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle
          cx="38"
          cy="38"
          r={RING_R}
          fill="none"
          className="stroke-border"
          strokeWidth="1.5"
        />
        <circle
          ref={ringRef}
          cx="38"
          cy="38"
          r={RING_R}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={RING}
          strokeDashoffset={RING}
          transform="rotate(-90 38 38)"
        />
        <defs>
          <path id="btt-circle" d="M38,38 m-25,0 a25,25 0 1,1 50,0 a25,25 0 1,1 -50,0" />
        </defs>
        <g className="btt-spin">
          <text className="fill-muted-foreground font-mono" fontSize="7.2" letterSpacing="1.3">
            <textPath href="#btt-circle">{LABEL}</textPath>
          </text>
        </g>
      </svg>
      <ArrowUp className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-primary transition-transform group-hover:-translate-y-[70%]" />
    </button>
  );
}
