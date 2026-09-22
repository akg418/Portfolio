import { useEffect, useState } from "react";

export type AvatarPhoto = {
  src: string;
  /** Describes the photo for screen readers and if the image fails to load. */
  alt: string;
};

const INTERVAL_MS = 4500;
const FADE_MS = 700;

/** Images fill the frame, so only the frame carries sizing and shape. */
const IMAGE_CLASS = "absolute inset-0 h-full w-full rounded-full object-cover";

/**
 * Cross-fading portrait stack.
 *
 * Photos are absolutely stacked inside a fixed frame and only opacity and
 * scale animate, so the browser composites the transition on the GPU and
 * nothing reflows. Cycling pauses on hover; a click or Enter advances.
 *
 * With a single photo it renders a plain image and starts no timer, and with
 * reduced motion it shows the first photo without cycling.
 */
export function AvatarCarousel({
  photos,
  className,
}: {
  photos: AvatarPhoto[];
  /** Sizing and shape of the frame, e.g. "w-56 h-56 rounded-full". */
  className: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const cycles = photos.length > 1 && !reduceMotion;

  useEffect(() => {
    if (!cycles || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [cycles, paused, photos.length]);

  if (!cycles) {
    const [first] = photos;
    return (
      <div className={className}>
        <img src={first.src} alt={first.alt} width={320} height={320} className={IMAGE_CLASS} />
      </div>
    );
  }

  const next = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <div
      className={`${className} cursor-pointer`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={next}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          next();
        }
      }}
      aria-label="Show the next photo"
      title="Click for the next photo"
    >
      {photos.map((photo, i) => {
        const active = i === index;
        return (
          <img
            key={photo.src}
            src={photo.src}
            alt={active ? photo.alt : ""}
            aria-hidden={!active}
            width={320}
            height={320}
            className={IMAGE_CLASS}
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(1.06)",
              transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
              willChange: "opacity, transform",
            }}
          />
        );
      })}
    </div>
  );
}
