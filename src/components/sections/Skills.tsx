import { skills } from "@/data/profile";

export function Skills() {
  return (
    <>
      <section id="skills" className="py-24 border-t border-border">
        <h2 className="text-3xl font-bold tracking-tight mb-12">Tech stack</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
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
      </section>
    </>
  );
}
