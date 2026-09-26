import { Briefcase, Code2, Globe, Mail, MapPin, Phone, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalTime } from "@/components/fx/LocalTime";
import { Magnetic } from "@/components/fx/Magnetic";
import { ScrollLit } from "@/components/fx/ScrollLit";
import { linkOf, profile } from "@/data/profile";

export function Contact() {
  return (
    <>
      <section id="contact" className="py-24 border-t border-border">
        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.95]">
          Let's build
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            something.
          </span>
        </h2>
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
      </section>
    </>
  );
}
