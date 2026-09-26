import { useEffect, useState } from "react";

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

  if (!time) return null;
  const hour = Number(time.slice(0, 2));
  const awake = hour >= 9 && hour < 24;

  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <span className={`h-1.5 w-1.5 rounded-full ${awake ? "bg-emerald-400" : "bg-amber-400"}`} />
      Cairo · <span className="tabular-nums text-foreground">{time}</span> ·{" "}
      {awake ? "probably awake" : "probably asleep"}
    </span>
  );
}
