import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowUpRight,
  Code2,
  Trophy,
  Briefcase,
  GraduationCap,
  TerminalSquare,
  FileText,
  Globe,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Terminal, type TerminalMode } from "@/components/Terminal";
import { MouseGlow } from "@/components/MouseGlow";
import { CustomCursor } from "@/components/CustomCursor";
import { Typewriter } from "@/components/Typewriter";
import { Starfield } from "@/components/Starfield";
import { CupGame } from "@/components/CupGame";
import { NavBar } from "@/components/NavBar";
import { SessionTimer } from "@/components/SessionTimer";

import avatar from "@/assets/me.jpeg";
import { STORAGE_KEYS, readString, writeString } from "@/lib/storage";
import { useGamingMode } from "@/hooks/useGamingMode";
import { useUsername } from "@/hooks/useUsername";
import {
  education,
  experiences,
  linkOf,
  links,
  profile,
  projects,
  roles,
  skills,
  stats,
} from "@/data/profile";

export const Route = createFileRoute("/")({
  component: Index,
});

/** Terminal window mode as persisted by the page, including the closed state. */
type WindowMode = TerminalMode | "closed";

const WINDOW_MODES: readonly WindowMode[] = ["float", "min", "closed"];

function isWindowMode(value: string | null): value is WindowMode {
  return value !== null && (WINDOW_MODES as readonly string[]).includes(value);
}

function Index() {
  const [termMode, setTermMode] = useState<WindowMode>(() => {
    const saved = readString(STORAGE_KEYS.termMode);
    // Anything unrecognised (including the removed "full" mode) falls back to closed.
    return isWindowMode(saved) ? saved : "closed";
  });
  const [mounted, setMounted] = useState(false);
  const gamingMode = useGamingMode();
  const terminalUser = useUsername();

  useEffect(() => setMounted(true), []);

  const persistMode = (m: WindowMode) => {
    writeString(STORAGE_KEYS.termMode, m);
  };

  const closeTerminal = () => {
    persistMode("closed");
    setTermMode("closed");
  };

  const handleMinimize = () => {
    persistMode("min");
    setTermMode("min");
  };

  const handleRestore = () => {
    persistMode("float");
    setTermMode("float");
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {mounted && <Starfield />}
      {mounted && <MouseGlow />}
      {mounted && <CustomCursor />}
      {mounted && termMode !== "closed" && (
        <Terminal
          mode={termMode}
          onClose={closeTerminal}
          onMinimize={handleMinimize}
          onRestore={handleRestore}
        />
      )}

      <NavBar />
      {mounted && <SessionTimer />}

      <main id="top" className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        {/* Hero */}
        <section className="py-20 sm:py-28 grid md:grid-cols-[1fr_320px] gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-muted-foreground">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to onsite · hybrid · remote — full-time & freelance
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] glow-text">
              {profile.name}.
            </h1>
            <div className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
              <Typewriter
                words={roles}
                className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              />
            </div>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              I build production-grade systems and scalable backend services for AI-driven products
              — APIs, microservices, and event-driven architectures with{" "}
              <span className="text-foreground font-medium">FastAPI</span>,{" "}
              <span className="text-foreground font-medium">NestJS</span>, and{" "}
              <span className="text-foreground font-medium">Kubernetes</span>. 2000+ problems solved
              on Codeforces.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#projects">
                  <span>View my work</span>
                  <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href={linkOf("GitHub")} target="_blank" rel="noreferrer">
                  <Github />
                  <span>GitHub</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href={linkOf("LinkedIn")} target="_blank" rel="noreferrer">
                  <Linkedin />
                  <span>LinkedIn</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href={linkOf("Codeforces")} target="_blank" rel="noreferrer">
                  <Code2 />
                  <span>Codeforces</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href={linkOf("LeetCode")} target="_blank" rel="noreferrer">
                  <Trophy />
                  <span>LeetCode</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href={profile.cvUrl} target="_blank" rel="noreferrer">
                  <FileText />
                  <span>CV</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="relative justify-self-center md:justify-self-end">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 to-accent/30 blur-2xl" />
            <div className="relative rounded-full p-[3px] avatar-ring">
              <img
                src={avatar}
                alt={profile.name}
                width={320}
                height={320}
                className="rounded-full w-56 h-56 sm:w-72 sm:h-72 object-cover bg-card relative z-10"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-6">
              <div className="text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Experience */}
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

        {gamingMode && <CupGame />}

        {/* Projects */}
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
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
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

        {/* Skills */}
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

        {/* Achievements */}
        <section className="py-24 border-t border-border">
          <div className="flex items-center gap-3 mb-12">
            <Trophy className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-3xl font-bold tracking-tight">Competitions & community</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-semibold mb-2">ECPC 2025</h3>
              <p className="text-muted-foreground">
                5th at Helwan Qualifiers → ECPC Finals → Qualified to ACPC Finals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">ECPC 2024</h3>
              <p className="text-muted-foreground">4th at Helwan Qualifiers → ECPC Finals.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">ICPC Helwan Community</h3>
              <p className="text-muted-foreground">
                Vice President & Problem Setting Head — designed problems accepted at ACPC level.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Original Problem Setting</h3>
              <p className="text-muted-foreground">
                I love crafting original competitive-programming problems. Together with my friend{" "}
                <a
                  href="https://codeforces.com/profile/MUZAN"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline underline-offset-2 hover:text-primary"
                >
                  MUZAN
                </a>
                , I authored a full sheet of problems — all original — published as a{" "}
                <a
                  href="https://codeforces.com/group/5EfwxVFSaS/contests"
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

        {/* Contact */}
        <section id="contact" className="py-24 border-t border-border">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Let's build something.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Open to full-time roles — onsite, hybrid, or remote — and to freelance projects.
            Comfortable across stacks; currently building FastAPI microservices on Kubernetes and
            backend services with NestJS/TypeScript. The fastest way to reach me is email.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Onsite
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" /> Hybrid
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" /> Remote
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5">
              <Briefcase className="w-3.5 h-3.5 text-accent" /> Freelance
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={`mailto:${profile.email}`}>
                <Mail />
                <span>Email me</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${profile.phone}`}>
                <Phone />
                <span>{profile.phoneDisplay}</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={linkOf("Codeforces")} target="_blank" rel="noreferrer">
                <Code2 />
                <span>Codeforces</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={linkOf("LeetCode")} target="_blank" rel="noreferrer">
                <Trophy />
                <span>LeetCode</span>
              </a>
            </Button>
          </div>
        </section>

        <footer className="py-10 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-4">
          <span>
            © {new Date().getFullYear()} {profile.name}. Built with care.
          </span>
          <div className="flex gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        </footer>
        <div className="pb-10 text-center text-xs text-muted-foreground">
          <p>
            Design, ideas, and implementation approach by{" "}
            <span className="text-foreground font-medium">{profile.name}</span> — implementation
            made by AI.
          </p>
          <p className="mt-2 font-mono text-primary/80">Hi there i love u &lt;3 :)</p>
        </div>
      </main>

      {/* Bottom command bar — reopens the terminal */}
      {mounted && termMode === "closed" && (
        <button
          onClick={() => setTermMode("float")}
          className="dark fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/80 backdrop-blur-md hover:bg-card/90 transition-colors group"
          aria-label="Open terminal"
        >
          <div className="max-w-5xl mx-auto px-6 h-11 flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <TerminalSquare className="w-4 h-4 text-primary" />
            <span className="text-primary">{terminalUser}@ahmed.dev</span>
            <span>:~$</span>
            <span className="opacity-60 group-hover:opacity-100">
              type <span className="text-accent">command</span> to open terminal…
            </span>
            <span className="caret-blink ml-1 inline-block h-3 w-[7px] bg-primary" />
            <span className="ml-auto hidden sm:inline opacity-60">click anywhere on this bar</span>
          </div>
        </button>
      )}
    </div>
  );
}
