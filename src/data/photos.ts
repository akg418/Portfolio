import type { AvatarPhoto } from "@/components/AvatarCarousel";
import acpc from "@/assets/me-acpc.jpeg";
import portrait from "@/assets/me.jpeg";

/**
 * Photos cycled by the hero portrait, in order. The first one is what visitors
 * see first and what search engines and social cards pick up.
 *
 * To add another, drop the file in src/assets, import it here and append an
 * entry — the carousel handles any number, and falls back to a single static
 * image when there is only one.
 */
export const photos: AvatarPhoto[] = [
  { src: acpc, alt: "Ahmed Khaled holding balloons at the ACPC finals" },
  { src: portrait, alt: "Ahmed Khaled" },
];
