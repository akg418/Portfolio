import type { AvatarSlide } from "@/components/AvatarCarousel";
import acpc from "@/assets/me-acpc.jpeg";

/**
 * Slides cycled by the hero portrait, in order. The first one is what visitors
 * see first and what social cards and search results pick up.
 *
 * To add another photo, drop the file in src/assets, import it here and append
 * `{ src, alt }`. The carousel takes any number and falls back to a single
 * static image when there is one.
 */
export const photos: AvatarSlide[] = [
  { src: acpc, alt: "Ahmed Khaled holding balloons at the ACPC finals" },
];
