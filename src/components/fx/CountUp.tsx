import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const DURATION_MS = 1600;

/**
 * Counts the first number in a value like "15,000+" or "~20" up from zero
 * when it scrolls into view, keeping whatever surrounds it. Values without a
 * leading number ("7m → 9s") are shown as they are.
 */
export function CountUp({ value }: { value: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const match = /^(\D*)([\d,]+)(.*)$/.exec(value);
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!inView) {
      setN(0);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      setN(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // `match` is derived from `value`; `target` covers it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  if (!match) return <span>{value}</span>;
  const grouped = match[2].includes(",") ? n.toLocaleString("en-US") : String(n);
  return (
    <span ref={ref} aria-label={value} className="tabular-nums">
      <span aria-hidden>
        {match[1]}
        {grouped}
        {match[3]}
      </span>
    </span>
  );
}
