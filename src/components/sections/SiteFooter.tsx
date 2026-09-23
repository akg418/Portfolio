import { links, profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <>
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
          <span className="text-foreground font-medium">{profile.name}</span> — implementation made
          by AI.
        </p>
        <p className="mt-2 font-mono text-primary/80">Hi there i love u &lt;3 :)</p>
      </div>
    </>
  );
}
