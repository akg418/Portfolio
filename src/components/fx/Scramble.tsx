import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFXYZ$%&";
const MS_PER_CHAR = 45;
const FRAME_MS = 32;

/**
 * Text that decodes itself, left to right, the first time it scrolls into
 * view. Screen readers and the server render only ever see the real text.
 */
export function Scramble({ text }: { text: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(text);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    const id = window.setInterval(() => {
      const settled = Math.floor((performance.now() - start) / MS_PER_CHAR);
      if (settled >= text.length) {
        setShown(text);
        window.clearInterval(id);
        return;
      }
      setShown(
        text
          .split("")
          .map((c, i) =>
            i < settled || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
    }, FRAME_MS);
    return () => window.clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
