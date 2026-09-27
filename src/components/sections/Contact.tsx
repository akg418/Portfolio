import { Briefcase, Code2, Globe, Mail, MapPin, Phone, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AsciiPortrait } from "@/components/fx/AsciiPortrait";
import { LocalTime } from "@/components/fx/LocalTime";
import { Magnetic } from "@/components/fx/Magnetic";
import { ParticleHeading } from "@/components/fx/ParticleHeading";
import { ScrollLit } from "@/components/fx/ScrollLit";
import { photos } from "@/data/photos";
import { linkOf, profile } from "@/data/profile";

/** Stable across renders, so the particles are not rebuilt on every one. */
const HEADING = [{ text: "Let's build" }, { text: "something.", gradient: true }];

export function Contact() {
  return (
    <>
      <section
        id="contact"
        className="py-24 border-t border-border grid gap-12 lg:grid-cols-[1fr_300px] lg:items-center"
      >
        <div className="min-w-0">
          <ParticleHeading
            lines={HEADING}
            className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.95]"
          />
          <div className="mt-6">
            <LocalTime />
          </div>
          <ScrollLit
            className="mt-6 max-w-3xl text-xl font-medium leading-snug tracking-tight sm:text-2xl"
            text="Open to full-time roles — onsite, hybrid, or remote — and to freelance projects. Comfortable across stacks; currently building FastAPI microservices on Kubernetes and backend services with NestJS/TypeScript. The fastest way to reach me is email."
          />
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
            <Magnetic>
              <Button asChild size="lg">
                <a href={`mailto:${profile.email}`}>
                  <Mail />
                  <span>Email me</span>
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${profile.phone}`}>
                  <Phone />
                  <span>{profile.phoneDisplay}</span>
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="outline">
                <a href={linkOf("Codeforces")} target="_blank" rel="noreferrer">
                  <Code2 />
                  <span>Codeforces</span>
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="outline">
                <a href={linkOf("LeetCode")} target="_blank" rel="noreferrer">
                  <Trophy />
                  <span>LeetCode</span>
                </a>
              </Button>
            </Magnetic>
          </div>
        </div>
        {photos[0]?.src && (
          <figure className="relative mx-auto w-full max-w-[300px]">
            <AsciiPortrait
              src={photos[0].src}
              className="block h-[380px] w-full rounded-xl border border-border bg-background/40"
            />
            <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              ./me --ascii · hover to look closer
            </figcaption>
          </figure>
        )}
      </section>
    </>
  );
}
