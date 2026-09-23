import { useCallback, useState } from "react";
import { Code2 } from "lucide-react";
import { ProjectDialog } from "@/components/sections/projects/ProjectDialog";
import { ProjectsFan } from "@/components/sections/projects/ProjectsFan";
import type { Project } from "@/data/profile";

/**
 * The projects, as a drifting deck of cards. Clicking one opens its details in
 * a dialog — there is no second layout to switch to.
 */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="mb-4 flex items-center gap-3">
        <Code2 className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-3xl font-bold tracking-tight">Selected projects</h2>
      </div>
      <p className="mb-10 text-sm text-muted-foreground">
        Pick a card for the full story. Pointing at the deck holds it still.
      </p>

      <ProjectsFan onSelect={setSelected} />
      <ProjectDialog project={selected} onClose={close} />
    </section>
  );
}
