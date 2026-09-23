import { useEffect, useState } from "react";
import { STORAGE_KEYS, readFlag, writeFlag } from "@/lib/storage";

/** Fired on `window` when gaming mode is toggled from the terminal. */
export const GAMING_MODE_EVENT = "gamingmode";

/** Gaming mode is on unless the visitor has explicitly turned it off. */
export function isGamingModeEnabled(): boolean {
  return readFlag(STORAGE_KEYS.gamingMode, true);
}

/** Flips gaming mode, persists it, and notifies every subscriber. */
export function toggleGamingMode(): boolean {
  const next = !isGamingModeEnabled();
  writeFlag(STORAGE_KEYS.gamingMode, next);
  window.dispatchEvent(new CustomEvent<boolean>(GAMING_MODE_EVENT, { detail: next }));
  return next;
}

/**
 * Gaming mode, kept in sync across the page and the nav bar.
 *
 * Starts false so server and first client render agree; the stored value is
 * read after mount.
 */
export function useGamingMode(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isGamingModeEnabled());
    const onChange = (e: Event) => setEnabled((e as CustomEvent<boolean>).detail);
    window.addEventListener(GAMING_MODE_EVENT, onChange);
    return () => window.removeEventListener(GAMING_MODE_EVENT, onChange);
  }, []);

  return enabled;
}
