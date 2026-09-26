import { useEffect, useState } from "react";
import { Scramble } from "@/components/fx/Scramble";
import { SkillsPlayground } from "@/components/fx/SkillsPlayground";
import { skills } from "@/data/profile";

type View = "play" | "list";

/**
 * The tech stack, either as a physics pile to play with or as the plain
 * grouped list. The server renders the list, and the client switches to the
 * pile unless the visitor asked for reduced motion.
 */
export function Skills() {
  const [view, setView] = useState<View>("list");

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setView("play");
  }, []);

  const tab = (v: View, label: string) => (
    <button
      type="button"
      onClick={() => setView(v)}
      aria-pressed={view === v}
      className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
        view === v
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <section id="skills" className="py-24 border-t border-border">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">
            <Scramble text="Tech stack" />
          </h2>
          <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
            {tab("play", "Playground")}
            {tab("list", "List")}
          </div>
        </div>
        {view === "play" ? (
          <SkillsPlayground groups={skills} />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="spotlight rounded-xl border border-border bg-card/40 p-5">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-md border border-border text-sm bg-card"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
