import { Scramble } from "@/components/fx/Scramble";
import { useEffect, useRef } from "react";
import { Briefcase } from "lucide-react";
import { type Experience as Role, experiences } from "@/data/profile";

/** Shared link styling: identical to plain text at rest, so the heading looks
 *  unchanged until hovered. */
const LINK_CLASS = "underline-offset-4 hover:underline hover:text-primary transition-colors";

function CompanyName({ role }: { role: Role }) {
  return (
    <h3 className="text-xl font-semibold">
      {role.linkedin ? (
        <a
          href={role.linkedin}
          target="_blank"
          rel="noreferrer"
          className={LINK_CLASS}
          title={`${role.company} on LinkedIn`}
        >
          {role.company}
        </a>
      ) : (
        role.company
      )}
      {role.website && (
        <>
          {" — "}
          <a href={role.website.url} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            {role.website.label}
          </a>
        </>
      )}
    </h3>
  );
}

/**
 * A glowing line down the left of the roles that draws itself as you scroll,
 * reaching the reading point. Written straight to the DOM, as it changes
 * every scroll frame.
 */
function useTimelineProgress() {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      const fill = fillRef.current;
      if (!list || !fill) return;
      const r = list.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
      fill.style.transform = `scaleY(${t})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { listRef, fillRef };
}

export function Experience() {
  const { listRef, fillRef } = useTimelineProgress();
  return (
    <>
      <section id="experience" className="py-24">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-3xl font-bold tracking-tight">
            <Scramble text="Experience" />
          </h2>
        </div>
        <div ref={listRef} className="relative space-y-12 pl-6">
          <div aria-hidden className="absolute left-0 top-1 bottom-1 w-px bg-border">
            <div
              ref={fillRef}
              className="timeline-fill absolute inset-0 origin-top bg-gradient-to-b from-primary to-accent"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="relative grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8"
            >
              <span
                aria-hidden
                className="absolute -left-6 top-2 h-2 w-2 -translate-x-[3.5px] rounded-full border border-primary/60 bg-background"
              />
              <div className="text-sm text-muted-foreground font-mono pt-1">{exp.period}</div>
              <div>
                <CompanyName role={exp} />
                <p className="text-sm text-muted-foreground mt-1">
                  {exp.role} — {exp.employment}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
                  {exp.points.map((p, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-foreground/40 mt-2 w-1 h-1 rounded-full bg-current shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
