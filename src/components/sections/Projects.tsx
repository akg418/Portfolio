import { ArrowUpRight, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/profile";

export function Projects() {
  return (
    <>
      <section id="projects" className="py-24 border-t border-border">
        <div className="flex items-center gap-3 mb-12">
          <Code2 className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-3xl font-bold tracking-tight">Selected projects</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group p-6 rounded-lg border border-border bg-card hover:border-foreground/30 transition-colors"
            >
              <div className="text-xs font-mono text-muted-foreground">{p.tag}</div>
              <h3 className="mt-2 text-lg font-semibold flex items-start justify-between gap-2">
                {p.title}
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Badge key={s} variant="secondary" className="font-mono text-[10px]">
                    {s}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
