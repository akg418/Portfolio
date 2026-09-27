import { Scramble } from "@/components/fx/Scramble";
import { useCallback, useState } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { ProjectDialog } from "@/components/sections/projects/ProjectDialog";
import { ProjectIndex } from "@/components/sections/projects/ProjectIndex";
import { SystemMap } from "@/components/sections/projects/SystemMap";
import { projects, type Project } from "@/data/profile";

const flagship = projects.find((p) => p.accent);
const rest = projects.filter((p) => !p.accent);

/**
 * Two tiers. The flagship gets the live, breakable system map; everything else
 * is an editorial index that scans in seconds. Both open the same full-story
 * dialog.
 */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="mb-10 flex items-center gap-3">
        <Code2 className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-3xl font-bold tracking-tight">
          <Scramble text="Selected projects" />
        </h2>
      </div>

      <TierLabel n="01" label="Flagship" note="in production · 15,000+ users" />
      <SystemMap />
      {flagship && (
        <button
          type="button"
          onClick={() => setSelected(flagship)}
          className="group mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Read the full story of {flagship.shortName}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      )}

      <div className="mt-20">
        <TierLabel
          n="02"
          label="More work"
          note={`${rest.length} projects · open any for the full story`}
        />
        <ProjectIndex projects={rest} onSelect={setSelected} />
      </div>

      <ProjectDialog project={selected} onClose={close} />
    </section>
  );
}

function TierLabel({ n, label, note }: { n: string; label: string; note: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
      <span className="text-primary">{n}</span>
      <span className="text-foreground">{label}</span>
      <span className="h-px flex-1 translate-y-[-3px] bg-border" />
      <span className="normal-case tracking-normal text-muted-foreground">{note}</span>
    </div>
  );
}
