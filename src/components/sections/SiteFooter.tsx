import { useEffect, useState } from "react";
import { links, profile } from "@/data/profile";

/**
 * A status light polled from /status.json: the network-tab mystery's clue.
 * The file says more than the light shows.
 */
function StatusLight() {
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    fetch("/status.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { status?: string } | null) => setStatus(j?.status ?? null))
      .catch(() => setStatus(null));
  }, []);
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono" title="live from /status.json">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      all systems {status}
    </span>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="py-10 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-4">
        <span>
          © {new Date().getFullYear()} {profile.name}. Built with care.
        </span>
        <StatusLight />
        <div className="flex gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>
      <div className="pb-10 text-center text-xs text-muted-foreground">
        <p>
          Design, ideas, and implementation approach by{" "}
          <span className="text-foreground font-medium">{profile.name}</span> — implementation made
          by AI.
        </p>
        <p className="mt-2 font-mono text-primary/80">Hi there i love u &lt;3 :)</p>
        <p className="mt-3 select-text font-mono text-[10px] text-muted-foreground/40">
          {
            "// TODO(dev): remove the debug hook before launch. it's still listening in the console."
          }
        </p>
      </div>
    </>
  );
}
