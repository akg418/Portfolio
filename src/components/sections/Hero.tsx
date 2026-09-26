import { useEffect, useRef } from "react";
import { ArrowUpRight, Code2, FileText, Github, Linkedin, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/Typewriter";
import { FluidCanvas } from "@/components/fx/FluidCanvas";
import { Magnetic } from "@/components/fx/Magnetic";
import { linkOf, profile, roles } from "@/data/profile";
import { AvatarCarousel } from "@/components/AvatarCarousel";
import { photos } from "@/data/photos";

/**
 * As the visitor scrolls away, the hero sinks back: it shrinks a little,
 * fades and blurs, so the next section seems to slide over it.
 */
function useSinkOnScroll() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight || 1)));
      el.style.transform = t ? `translateY(${t * 80}px) scale(${1 - t * 0.08})` : "";
      el.style.opacity = String(1 - t * 0.7);
      el.style.filter = t ? `blur(${t * 4}px)` : "";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return ref;
}

export function Hero() {
  const ref = useSinkOnScroll();
  return (
    <>
      <section
        ref={ref}
        className="py-20 sm:py-28 grid md:grid-cols-[1fr_320px] gap-12 items-center origin-top will-change-transform"
      >
        {/* Stirrable ink behind the hero, bleeding out to the window edges. */}
        <FluidCanvas className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 h-full w-screen -translate-x-1/2" />
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
            <Magnetic>
              <Button asChild>
                <a href="#projects">
                  <span>View my work</span>
                  <ArrowUpRight />
                </a>
              </Button>
            </Magnetic>
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
            <AvatarCarousel
              photos={photos}
              className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden bg-card"
            />
          </div>
        </div>
      </section>
    </>
  );
}
