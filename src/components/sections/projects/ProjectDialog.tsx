import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cardEdge } from "@/components/sections/projects/cardEdge";
import type { Project } from "@/data/profile";

/** Everything known about one project, opened from a card in the deck. */
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      {/* The dialog wears the same lit edge as the card it came from. */}
      <DialogContent
        className="max-h-[85vh] overflow-y-auto sm:max-w-2xl"
        style={project ? cardEdge(project, "dialog") : undefined}
      >
        {project && (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">{project.tag}</span>
                {project.role && (
                  <span className="rounded border border-primary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                    {project.role}
                  </span>
                )}
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                {project.description}
              </DialogDescription>
            </DialogHeader>

            {project.highlights && (
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden className="text-primary">
                      –
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="space-y-3 border-t border-border pt-4">
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <Badge key={s} variant="secondary" className="font-mono text-[10px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              {project.patterns && (
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Architecture & patterns
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    {project.patterns.join(" · ")}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs font-mono">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                >
                  {project.repoLabel ?? "GitHub"}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {project.links?.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                >
                  {l.label}
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
              {project.privateRepo && (
                <span className="text-muted-foreground/70">
                  {project.privateNote ?? "Private repo · available on request"}
                </span>
              )}
              {!project.repo && !project.privateRepo && (
                <span className="text-muted-foreground/70">Repo link coming soon</span>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
