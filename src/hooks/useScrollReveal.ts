import { useEffect } from "react";

/**
 * Sections below the fold rise into place the first time they scroll into view.
 * The hidden state is added here rather than in markup, so without JS (or with
 * reduced motion) everything simply shows.
 */
export function useScrollReveal(selector = "main > section") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    for (const el of els) el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("reveal-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, [selector]);
}
