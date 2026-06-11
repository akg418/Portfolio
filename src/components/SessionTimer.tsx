import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";

function fmt(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function SessionTimer() {
  const startRef = useRef<Date>(new Date());
  const [now, setNow] = useState<Date>(new Date());
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = Math.max(0, Math.floor((now.getTime() - startRef.current.getTime()) / 1000));
  const h = Math.floor(elapsed / 3600);
  const m = Math.floor((elapsed % 3600) / 60);
  const s = elapsed % 60;
  const arrivedAt = startRef.current.toLocaleString(undefined, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short",
  });

  return (
    <div
      className="fixed right-4 top-20 z-30 hidden sm:block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-2 rounded-md border border-border bg-background/70 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur-md">
        <Clock className="h-3.5 w-3.5 text-primary" />
        <span className="tabular-nums">{fmt(elapsed)}</span>
      </div>
      {hover && (
        <div className="absolute right-0 mt-2 w-72 rounded-md border border-border bg-popover/95 p-3 text-xs text-popover-foreground shadow-lg backdrop-blur-md">
          <div className="mb-1 font-semibold text-foreground">Session</div>
          <div className="text-muted-foreground">
            You arrived at <span className="text-foreground">{arrivedAt}</span>
          </div>
          <div className="mt-1 text-muted-foreground">
            Time here:{" "}
            <span className="text-foreground">
              {h} {h === 1 ? "hour" : "hours"}, {m} {m === 1 ? "minute" : "minutes"}, {s}{" "}
              {s === 1 ? "second" : "seconds"}
            </span>
          </div>
          <div className="mt-2 border-t border-border pt-2 text-muted-foreground leading-relaxed">
            I&apos;m glad you&apos;re here — I&apos;d love it even more if you reached out. What would you like to build together?
          </div>
        </div>
      )}
    </div>
  );
}