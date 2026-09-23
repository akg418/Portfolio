import { stats } from "@/data/profile";

export function Stats() {
  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {stats.map((s) => (
          <div key={s.label} className="bg-card p-6">
            <div className="text-2xl font-bold tracking-tight">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </section>
    </>
  );
}
