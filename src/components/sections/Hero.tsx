import { ArrowUpRight, Code2, FileText, Github, Linkedin, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/Typewriter";
import { linkOf, profile, roles } from "@/data/profile";
import avatar from "@/assets/me.jpeg";

export function Hero() {
  return (
    <>
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
            I build production-grade systems and scalable backend services for AI-driven products —
            APIs, microservices, and event-driven architectures with{" "}
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
    </>
  );
}
