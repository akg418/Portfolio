import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileText, Mail, MapPin, Phone, Trophy, Zap } from "lucide-react";
import { Typewriter } from "@/components/Typewriter";
import { photos } from "@/data/photos";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  competitions,
  domainParts,
  education,
  experiences,
  links,
  profile,
  projects,
  roles,
  skills,
} from "@/data/profile";

const NAV = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/** Every link a project carries, repo first. */
function projectLinks(p: (typeof projects)[number]) {
  const out: { label: string; url: string }[] = [];
  if (p.repo) out.push({ label: p.repoLabel ?? "GitHub", url: p.repo });
  if (p.links) out.push(...p.links);
  return out;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </h2>
  );
}

/**
 * Types `text` out once, a letter at a time. The full text stays in the DOM
 * (invisible) so the layout never jumps and it is there without JS.
 */
function TypeOnce({
  text,
  delay = 300,
  speed = 70,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(text.length);
    let i = 0;
    let t = window.setTimeout(function step() {
      setN(++i);
      if (i < text.length) t = window.setTimeout(step, speed);
    }, delay);
    setN(0);
    return () => window.clearTimeout(t);
  }, [text, delay, speed]);
  const typing = n !== null && n < text.length;
  return (
    <span className="relative inline-block">
      <span className={n === null ? "" : "invisible"}>{text}</span>
      {n !== null && (
        <span aria-hidden className="absolute inset-0 whitespace-nowrap">
          {text.slice(0, n)}
          {typing && (
            <span className="caret-blink ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-primary" />
          )}
        </span>
      )}
    </span>
  );
}

/** Round portrait with a slowly turning ring; it leans toward the pointer. */
function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const photo = photos[0];
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      className="sv-rise relative mx-auto shrink-0 [perspective:800px]"
      style={{ animationDelay: "200ms" }}
    >
      <div className="sv-float">
        <div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative size-40 transition-transform duration-300 ease-out sm:size-52"
        >
          <div aria-hidden className="sv-ring absolute -inset-[3px] rounded-full" />
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-full bg-primary/15 blur-2xl"
          />
          <img
            src={photo.src}
            alt={photo.alt}
            width={320}
            height={320}
            className="relative size-full rounded-full border-4 border-background object-cover"
          />
          <span className="absolute -bottom-1 -right-3 inline-flex items-center gap-1 rounded-full border border-border bg-background/90 px-2.5 py-1 text-xs shadow-lg backdrop-blur">
            <Trophy className="size-3.5 text-amber-400" />
            ACPC Finalist
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * The default view: the CV, calmly. A little motion — the name types itself,
 * the portrait floats, sections ease in — but no sound and nothing loud. The
 * header button switches to the full experience.
 */
export function SimpleView({ onChaos }: { onChaos: (e: React.MouseEvent) => void }) {
  useScrollReveal("main > section");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-6">
          <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
            {domainParts[0]}
            <span className="text-muted-foreground">{domainParts[1]}</span>
          </a>
          <div className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={onChaos}
            className="chaos-btn group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium"
          >
            <Zap className="size-3.5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
            Chaos mode
          </button>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-3xl px-6 pb-24">
        {/* Intro */}
        <section className="flex flex-col-reverse items-center gap-10 pb-14 pt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-20">
          <div className="min-w-0">
            <p className="sv-rise font-mono text-sm text-primary">Hi, I'm</p>
            <h1 className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">
              <TypeOnce text={profile.name} />
            </h1>
            <p
              className="sv-rise mt-3 h-7 text-lg text-muted-foreground"
              style={{ animationDelay: "900ms" }}
            >
              <Typewriter words={roles} speed={60} pause={1800} />
            </p>
            <p
              className="sv-rise mt-6 max-w-xl leading-relaxed text-foreground/85"
              style={{ animationDelay: "1100ms" }}
            >
              {profile.tagline}
            </p>
            <div
              className="sv-rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
              style={{ animationDelay: "1250ms" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Mail className="size-4" />
                {profile.email}
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <FileText className="size-4" />
                CV
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {links.map((l, i) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ animationDelay: `${1350 + i * 80}ms` }}
                  className="sv-rise inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-sm text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
          <Portrait />
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-20 border-t border-border py-14">
          <SectionTitle>Experience</SectionTitle>
          <ol className="space-y-0 [&>li]:pb-10">
            {experiences.map((x) => (
              <li key={x.company} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <p className="pt-0.5 text-sm text-muted-foreground">{x.period}</p>
                <div className="relative sm:border-l sm:border-border sm:pl-6">
                  <span
                    aria-hidden
                    className={`absolute -left-[5px] top-1.5 hidden size-2.5 rounded-full border-2 border-background sm:block ${
                      x.current ? "sv-pulse bg-primary" : "bg-muted-foreground/50"
                    }`}
                  />
                  <h3 className="font-medium">
                    {x.role} ·{" "}
                    {x.linkedin ? (
                      <a
                        href={x.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {x.company}
                      </a>
                    ) : (
                      x.company
                    )}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {x.employment}
                    {x.website && (
                      <>
                        {" · "}
                        <a
                          href={x.website.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-foreground"
                        >
                          {x.website.label}
                        </a>
                      </>
                    )}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
                    {x.points.map((p) => (
                      <li key={p} className="relative pl-4">
                        <span className="absolute left-0 top-[0.6em] size-1 rounded-full bg-muted-foreground/60" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-20 border-t border-border py-14">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => {
              const ls = projectLinks(p);
              return (
                <article
                  key={p.title}
                  className={`flex flex-col rounded-lg border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_var(--color-primary)] ${
                    p.accent ? "sm:col-span-2" : ""
                  }`}
                >
                  <p className="text-xs text-muted-foreground">{p.tag}</p>
                  <h3 className="mt-1 font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{p.description}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {p.stack.join(" · ")}
                  </p>
                  {(ls.length > 0 || p.privateRepo) && (
                    <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm">
                      {ls.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 text-foreground/90 underline-offset-4 hover:underline"
                        >
                          {l.label}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      ))}
                      {p.privateRepo && ls.length === 0 && (
                        <span className="text-muted-foreground">Private repo</span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section className="border-t border-border py-14">
          <SectionTitle>Skills</SectionTitle>
          <dl className="space-y-3 text-sm">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-muted-foreground">{group}</dt>
                <dd className="text-foreground/85">{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Education & competitions */}
        <section id="education" className="scroll-mt-20 border-t border-border py-14">
          <SectionTitle>Education</SectionTitle>
          <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <p className="text-sm text-muted-foreground">2021 – 2025</p>
            <div>
              <h3 className="font-medium">{education.degree}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {education.school} · {education.detail}
              </p>
            </div>
          </div>

          <h2 className="mb-6 mt-14 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Competitions
          </h2>
          <ul className="space-y-5">
            {competitions.map((c) => (
              <li key={c.title} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-sm leading-relaxed text-foreground/80">{c.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 border-t border-border py-14">
          <SectionTitle>Contact</SectionTitle>
          <p className="max-w-xl text-foreground/85">
            Let's build something. The fastest way to reach me is email.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 font-medium text-background transition-opacity hover:opacity-90"
            >
              <Mail className="size-4" />
              Email me
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="size-4" />
              {profile.phoneDisplay}
            </a>
          </div>
        </section>

        <footer className="border-t border-border pt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </main>
    </div>
  );
}
