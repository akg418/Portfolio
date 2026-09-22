import { GraduationCap, Trophy } from "lucide-react";
import { competitions, education, problemSetting } from "@/data/profile";

export function Achievements() {
  return (
    <>
      <section className="py-24 border-t border-border">
        <div className="flex items-center gap-3 mb-12">
          <Trophy className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-3xl font-bold tracking-tight">Competitions & community</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-8 text-sm">
          {competitions.map((c) => (
            <div key={c.title}>
              <h3 className="font-semibold mb-2">{c.title}</h3>
              <p className="text-muted-foreground">{c.detail}</p>
            </div>
          ))}
          <div>
            <h3 className="font-semibold mb-2">Original Problem Setting</h3>
            <p className="text-muted-foreground">
              I love crafting original competitive-programming problems. Together with my friend{" "}
              <a
                href={problemSetting.friendUrl}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-2 hover:text-primary"
              >
                {problemSetting.friendName}
              </a>
              , I authored a full sheet of problems — all original — published as a{" "}
              <a
                href={problemSetting.groupUrl}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-2 hover:text-primary"
              >
                Codeforces group
              </a>
              .
            </p>
          </div>
          <div className="flex items-start gap-2">
            <GraduationCap className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">{education.school}</h3>
              <p className="text-muted-foreground">
                {education.degree} — {education.detail}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
