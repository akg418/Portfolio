import { useEffect, useState } from "react";
import { STORAGE_KEYS, readNumber, writeString } from "@/lib/storage";

/**
 * Counted once per page load. The terminal unmounts when closed and mounts
 * again when reopened, so incrementing on its mount inflated the number; this
 * module-level latch also absorbs StrictMode's double effect invocation.
 */
let countedThisLoad: number | null = null;

/** Number of times this browser has loaded the site, including this load. */
export function useVisitCount(): number {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    if (countedThisLoad === null) {
      countedThisLoad = readNumber(STORAGE_KEYS.visits, 0) + 1;
      writeString(STORAGE_KEYS.visits, String(countedThisLoad));
    }
    setVisits(countedThisLoad);
  }, []);

  return visits;
}
