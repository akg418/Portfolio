import { useEffect, useRef } from "react";
import { skills } from "@/data/profile";

const WORDS = Object.values(skills).flat();
const BASE_SPEED = 40; // px per second
const MAX_SKEW = 12; // degrees

/**
 * A band of the tech stack in huge outlined type, drifting sideways. Scrolling
 * shoves it along: speed and slant follow scroll velocity, then ease back.
 * Scrolling up reverses it.
 */
export function ScrollMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let boost = 0;
    let direction = 1;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy !== 0) direction = dy > 0 ? 1 : -1;
      boost += (Math.abs(dy) * 6 - boost) * 0.12;

      x -= direction * (BASE_SPEED + boost * 8) * dt;
      // The track holds two identical halves, so wrapping by one half is seamless.
      const half = track.scrollWidth / 2;
      if (half > 0) x = ((x % half) - half) % half;
      const skew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, direction * boost * 0.15));
      track.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {WORDS.map((w, i) => (
        <span key={w + i} className="flex items-center">
          <span className={i % 3 === 1 ? "marquee-fill" : "marquee-outline"}>{w}</span>
          <span className="mx-6 text-primary/60 sm:mx-10">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-border py-6 select-none"
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap text-5xl font-black uppercase tracking-tight will-change-transform sm:text-7xl"
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
