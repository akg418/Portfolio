import { useEffect, useState } from "react";
import { solveMystery } from "@/lib/mysteries";

const ZONE = "Africa/Cairo";

function now() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

/** A ticking clock for Cairo, so visitors know when a reply is likely. Client only. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(now());
    const id = window.setInterval(() => setTime(now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const hour = time ? Number(time.slice(0, 2)) : -1;
  // Between midnight and one in Cairo there's an owl (a hidden mystery).
  const owl = hour === 0;
  useEffect(() => {
    if (owl) solveMystery("midnight");
  }, [owl]);

  if (!time) return null;
  const awake = hour >= 9 && hour < 24;

  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${awake ? "bg-emerald-400" : "bg-amber-400"}`} />
      Cairo · <span className="tabular-nums text-foreground">{time}</span> ·{" "}
      {owl
        ? "probably asleep… definitely solving Codeforces 🦉"
        : awake
          ? "probably awake"
          : "probably asleep"}
      {!owl && (
        // A sleeping owl: the night-owl mystery's clue.
        <span
          title="the owl only wakes at midnight, Cairo time"
          aria-label="a sleeping owl"
          className="cursor-help select-none opacity-40 grayscale transition-opacity hover:opacity-90"
        >
          🦉<span className="ml-0.5 text-[9px]">z</span>
        </span>
      )}
    </span>
  );
}
