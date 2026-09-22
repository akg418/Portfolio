import { Briefcase } from "lucide-react";
import { experiences } from "@/data/profile";

export function Experience() {
  return (
    <>
      <section id="experience" className="py-24">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
        </div>
        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.company} className="grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
              <div className="text-sm text-muted-foreground font-mono pt-1">{exp.period}</div>
              <div>
                <h3 className="text-xl font-semibold">{exp.company}</h3>
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
