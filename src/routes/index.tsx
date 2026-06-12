import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone, ArrowUpRight, Code2, Trophy, Briefcase, GraduationCap, TerminalSquare, FileText, Globe, MapPin } from "lucide-react";
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

export const Route = createFileRoute("/")({
  component: Index,
});

const experiences = [
  {
    company: "Rehabitaire",
    role: "Software Engineer — Full-time",
    period: "Nov 2025 – Present",
    points: [
      "Backend for an AI-powered physical therapy platform (NestJS, PostgreSQL, Prisma, Redis, Docker) in a 5-engineer team.",
      "Built real-time notifications with Server-Sent Events after evaluating SSE vs WebSockets trade-offs.",
      "Implemented JWT access/refresh auth with OTP email verification and applied the Strategy Pattern for local/S3 storage.",
      "Wrote unit, integration, and E2E tests (Playwright) with CI/CD pipelines; ~95% first-pass task delivery accuracy.",
    ],
  },
  {
    company: "ECS (Enterprise Consultancy Services)",
    role: "Backend Developer — Full-time",
    period: "Aug 2025 – Oct 2025",
    points: [
      "Built a procurement platform with AI-powered chatbot (Python Flask, PostgreSQL) for supplier recommendation and email generation.",
      "Optimized a critical backend process from 7 minutes to under 9 seconds.",
      "Refactored core modules and added role-based access control (RBAC).",
    ],
  },
  {
    company: "Quick R",
    role: "Freelance Backend Developer",
    period: "Nov 2024 – Jan 2025",
    points: [
      "Designed and shipped a multi-restaurant digital menu platform end-to-end with .NET, MySQL, and AWS.",
      "Built subscription management, dynamic menus, QR generation, and admin dashboard workflows.",
    ],
  },
  {
    company: "Shipd",
    role: "Problem Author — Freelance",
    period: "May 2024 – Jan 2025",
    points: [
      "Contributed 60+ hard algorithmic problems and 90+ optimized solutions used to train AI models.",
    ],
  },
];

const projects = [
  {
    title: "Character Simulation System",
    tag: "Graduation Project — A+ (98/100)",
    description:
      "FastAPI chatbot simulating real and fictional personas using fine-tuned Mistral 7B (LoRA) with a RAG architecture (FAISS + LangChain) for coherent multi-character conversations.",
    stack: ["FastAPI", "LangChain", "FAISS", "RAG", "Mistral 7B", "LoRA"],
  },
  {
    title: "Social Media Platform",
    tag: "May 2024",
    description:
      "Microservices-based social platform with posts, comments, likes, friends, and JWT/Spring Security auth. Built with Spring Boot and Spring Data JPA.",
    stack: ["Java", "Spring Boot", "Microservices", "JWT", "JPA"],
  },
  {
    title: "Copy for Claude — VS Code Extension",
    tag: "Open Source Contribution",
    description:
      "Contributed a pull request that was reviewed and merged into the Copy for Claude VS Code extension.",
    stack: ["TypeScript", "VS Code API", "Open Source"],
  },
];

const skills = {
  Languages: ["TypeScript", "JavaScript", "C++", "C", "Java", "Python"],
  Backend: ["Node.js", "NestJS", "REST APIs", "WebSockets", "SSE", "JWT", "RBAC", "BullMQ", "Microservices"],
  "Databases & ORM": ["PostgreSQL", "Redis", "MySQL", "Oracle PL/SQL", "Prisma", "Hibernate"],
  "Tools & Testing": ["Playwright", "Jest", "Supertest", "Swagger", "Git", "Docker", "WSO2"],
};

function Index() {
  const [termMode, setTermMode] = useState<TerminalMode | "closed">(() => {
    if (typeof window === "undefined") return "closed";
    try {
      const saved = localStorage.getItem("termMode") as TerminalMode | "closed" | null;
      // first visit → open in float mode
      if (!saved) return "float";
      return saved;
    } catch {
      return "float";
    }
  });
  const [mounted, setMounted] = useState(false);
  const [gamingMode, setGamingMode] = useState(false);
  const [terminalUser, setTerminalUser] = useState("guest");

  useEffect(() => {
    setMounted(true);
    try {
      setGamingMode(localStorage.getItem("gamingMode") !== "0");
    } catch {}
    const onGaming = (e: Event) => setGamingMode(!!(e as CustomEvent).detail);
    window.addEventListener("gamingmode", onGaming as EventListener);
    return () => window.removeEventListener("gamingmode", onGaming as EventListener);
  }, []);

  useEffect(() => {
    const read = () => {
      try {
        const u = localStorage.getItem("username") || "guest";
        setTerminalUser(u);
      } catch {}
    };
    read();
    const onChange = (e: Event) => setTerminalUser((e as CustomEvent).detail || "guest");
    window.addEventListener("usernamechange", onChange as EventListener);
    return () => window.removeEventListener("usernamechange", onChange as EventListener);
  }, []);

  const persistMode = (m: TerminalMode | "closed") => {
    try {
      localStorage.setItem("termMode", m);
    } catch {}
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

  const handleToggleFull = () => {
    setTermMode((m) => {
      const next = m === "full" ? "float" : "full";
      persistMode(next);
      return next;
    });
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
          onToggleFull={handleToggleFull}
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
              Ahmed Khaled.
            </h1>
            <div className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
              <Typewriter
                words={[
                  "Backend Engineer.",
                  "NestJS Specialist.",
                  "ACPC Finalist.",
                  "API Architect.",
                ]}
                className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              />
            </div>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              I build production-grade backend systems and scalable APIs — currently with{" "}
              <span className="text-foreground font-medium">NestJS</span> and{" "}
              <span className="text-foreground font-medium">TypeScript</span>. 2000+ problems
              solved on Codeforces.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#projects">
                  <span>View my work</span>
                  <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://github.com/akg418" target="_blank" rel="noreferrer">
                  <Github />
                  <span>GitHub</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://linkedin.com/in/ahmed-khaled-gom3a" target="_blank" rel="noreferrer">
                  <Linkedin />
                  <span>LinkedIn</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://codeforces.com/profile/gom3a_" target="_blank" rel="noreferrer">
                  <Code2 />
                  <span>Codeforces</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://leetcode.com/u/falta_404/" target="_blank" rel="noreferrer">
                  <Trophy />
                  <span>LeetCode</span>
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://drive.google.com/drive/folders/1f1RdcHVjX5iOhlRSjPa2McB0ZXaRS4l3?usp=sharing" target="_blank" rel="noreferrer">
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
                alt="Ahmed Khaled"
                width={320}
                height={320}
                className="rounded-full w-56 h-56 sm:w-72 sm:h-72 object-cover bg-card relative z-10"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {[
            { label: "Problems solved", value: "2000+" },
            { label: "ACPC", value: "Finalist" },
            { label: "Task accuracy", value: "~95%" },
            { label: "Process speedup", value: "7m → 9s" },
          ].map((s) => (
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
                  <p className="text-sm text-muted-foreground mt-1">{exp.role}</p>
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
              <p className="text-muted-foreground">5th at Helwan Qualifiers → ECPC Finals → Qualified to ACPC Finals.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">ECPC 2024</h3>
              <p className="text-muted-foreground">4th at Helwan Qualifiers → ECPC Finals.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">ICPC Helwan Community</h3>
              <p className="text-muted-foreground">Vice President & Problem Setting Head — designed problems accepted at ACPC level.</p>
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
                <h3 className="font-semibold mb-2">Helwan University</h3>
                <p className="text-muted-foreground">B.Sc. Computer Science — GPA 3.3/4.0 (Sep 2021 – Jan 2025).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 border-t border-border">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Let's build something.</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Open to full-time roles — onsite, hybrid, or remote — and to freelance projects.
            Comfortable working with any framework; currently deep-diving into Node.js and NestJS.
            The fastest way to reach me is email.
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
              <a href="mailto:ahmedkhaledgomaa404@gmail.com">
                <Mail />
                <span>Email me</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:+201014908696">
                <Phone />
                <span>+20 101 490 8696</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://codeforces.com/profile/gom3a_" target="_blank" rel="noreferrer">
                <Code2 />
                <span>Codeforces</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://leetcode.com/u/falta_404/" target="_blank" rel="noreferrer">
                <Trophy />
                <span>LeetCode</span>
              </a>
            </Button>
          </div>
        </section>

        <footer className="py-10 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-4">
          <span>© {new Date().getFullYear()} Ahmed Khaled. Built with care.</span>
          <div className="flex gap-4">
            <a href="https://github.com/akg418" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
            <a href="https://linkedin.com/in/ahmed-khaled-gom3a" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
            <a href="https://codeforces.com/profile/gom3a_" target="_blank" rel="noreferrer" className="hover:text-foreground">Codeforces</a>
            <a href="https://leetcode.com/u/falta_404/" target="_blank" rel="noreferrer" className="hover:text-foreground">LeetCode</a>
          </div>
        </footer>
        <div className="pb-10 text-center text-xs text-muted-foreground">
          <p>
            Design, ideas, and implementation approach by{" "}
            <span className="text-foreground font-medium">Ahmed Khaled</span> — implementation made
            by AI.
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
