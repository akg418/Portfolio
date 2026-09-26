/**
 * Single source of truth for everything that comes off the CV.
 * The page, the terminal, the nav bar and the page metadata all read from here,
 * so updating the CV means editing this file only.
 */

export const profile = {
  name: "Ahmed Khaled",
  role: "Software Engineer",
  location: "Cairo, Egypt",
  email: "ahmedkhaledgomaa404@gmail.com",
  phone: "+201014908696",
  phoneDisplay: "+20 101 490 8696",
  tagline:
    "Software Engineer building production-grade systems and scalable backend services for AI-driven products — APIs, microservices, and event-driven architectures with FastAPI, NestJS, TypeScript, and Kubernetes.",
  cvUrl: "https://drive.google.com/drive/folders/1f1RdcHVjX5iOhlRSjPa2McB0ZXaRS4l3?usp=sharing",
  /** Host shown in the nav-bar wordmark and the terminal prompt. */
  domain: "ahmed.dev",
  /** Canonical site URL, used for SEO metadata. */
  siteUrl: "https://ahmed.dev",
} as const;

/** The domain split at the first dot, for the two-tone nav-bar wordmark. */
export const domainParts: readonly [string, string] = [
  profile.domain.slice(0, profile.domain.indexOf(".")),
  profile.domain.slice(profile.domain.indexOf(".")),
];

export const links = [
  { label: "GitHub", url: "https://github.com/akg418" },
  { label: "LinkedIn", url: "https://linkedin.com/in/ahmed-khaled-gom3a" },
  { label: "Codeforces", url: "https://codeforces.com/profile/gom3a_" },
  { label: "LeetCode", url: "https://leetcode.com/u/falta_404/" },
] as const;

export type LinkLabel = (typeof links)[number]["label"];

const linkUrls = Object.fromEntries(links.map((l) => [l.label, l.url])) as Record<
  LinkLabel,
  string
>;

export const linkOf = (label: LinkLabel): string => linkUrls[label];

export const roles = [
  "Software Engineer.",
  "Backend & Microservices.",
  "FastAPI · NestJS.",
  "ACPC Finalist.",
];

export const stats = [
  { label: "Users in production", value: "15,000+" },
  { label: "Microservices in prod", value: "~20" },
  { label: "Problems solved", value: "2000+" },
  { label: "Process speedup", value: "7m → 9s" },
];

export type Experience = {
  company: string;
  /** Short name used in the terminal's one-line summaries. */
  shortName: string;
  /** Company LinkedIn page. The company name links here when set, and stays
   *  plain text when it is not, so a missing URL is never a broken link. */
  linkedin?: string;
  /** Public site shown next to the company name, e.g. getXplain.ai. */
  website?: { label: string; url: string };
  role: string;
  /** Full-time / Freelance — rendered next to the role on the page. */
  employment: string;
  period: string;
  /** True while this role is ongoing — drives the terminal's "currently @" line. */
  current?: boolean;
  points: string[];
};

export const experiences: Experience[] = [
  {
    company: "Xplain AI",
    shortName: "Xplain AI",
    linkedin: "https://www.linkedin.com/company/getxplain-ai/",
    website: { label: "getXplain.ai", url: "https://getxplain.ai" },
    role: "Software Engineer",
    employment: "Full-time",
    period: "Jul 2026 – Present",
    current: true,
    points: [
      "Build an AI learning platform for kids that turns any question into a structured bilingual EN/AR lesson with narrated audio and illustrated sub-lessons — in production for 15,000+ users.",
      "Work across ~20 FastAPI microservices on Kubernetes with ArgoCD GitOps and an event-driven Gemini pipeline (ARQ, Redis, S3).",
      "Fixed a Free Plan revenue leak where users downgrading from Premium kept Premium access; entitlement now derives from live subscription state, shipped without breaking installed apps.",
      "Own the 1v1 challenge lifecycle (offer TTLs, deadline-accurate XP settlement, age-matched invites) and account-wide timezone resolution synced to Customer.io; extend the Flutter Web admin dashboard.",
    ],
  },
  {
    company: "Shipd",
    shortName: "Shipd",
    linkedin: "https://www.linkedin.com/company/shipd-datacurve/",
    role: "Problem Author",
    employment: "Freelance",
    period: "Aug 2024 – Present",
    current: true,
    points: [
      "Selected through a competitive assessment to contribute to an AI training platform, designing and validating algorithmic problems used for model training.",
      "Contributed 60+ hard problems and 90+ optimized solutions with a strong emphasis on time-efficient implementations.",
    ],
  },
  {
    company: "Rehabitaire",
    shortName: "Rehabitaire",
    linkedin: "https://www.linkedin.com/company/rehabitaire/",
    role: "Software Engineer",
    employment: "Full-time",
    period: "Nov 2025 – Mar 2026",
    points: [
      "Backend for an AI-powered physical therapy platform managing clinics, doctors, patients, sessions, and multi-clinic access (NestJS, PostgreSQL, Prisma, Redis, Docker) in a 5-engineer Agile team.",
      "Built real-time notifications with Server-Sent Events after evaluating SSE vs WebSockets trade-offs.",
      "Implemented JWT access/refresh auth with OTP email verification, and applied the Strategy Pattern to switch image storage between local and AWS S3 per environment.",
      "Wrote unit, integration, and E2E tests (Playwright) with CI/CD pipelines; ~95% task delivery accuracy and led internal problem-solving sessions.",
    ],
  },
  {
    company: "ECS (Enterprise Consultancy Services)",
    shortName: "ECS",
    linkedin: "https://www.linkedin.com/company/enterprise-consultancy-services/",
    role: "Backend Developer",
    employment: "Full-time",
    period: "Aug 2025 – Oct 2025",
    points: [
      "Built a procurement management system with AI-powered workflows (Python Flask, PostgreSQL) in a multi-company environment.",
      "Built an AI chatbot that identifies procurement needs, recommends product specifications, suggests suppliers, and generates supplier emails.",
      "Refactored core modules, implemented RBAC, and optimized a critical backend process from 7 minutes to under 9 seconds.",
    ],
  },
  {
    company: "Quick R",
    shortName: "Quick R",
    role: "Backend Developer",
    employment: "Freelance",
    period: "Nov 2024 – Jan 2025",
    points: [
      "Designed and shipped a multi-restaurant digital menu platform end-to-end with .NET, MySQL, and AWS in a 2-person team.",
      "Built subscription management, dynamic menus, QR generation, and admin dashboard workflows.",
    ],
  },
];

export type Project = {
  title: string;
  /** Short name + one-liner used in the terminal's `projects` output. */
  shortName: string;
  short: string;
  tag: string;
  description: string;
  stack: string[];
  /** Design patterns the project applies, listed under the stack on the card. */
  patterns?: string[];
  /** Two or three bullets, folded behind the card's "Highlights" toggle so the
   *  section stays scannable. */
  highlights?: string[];
  /** Public repo. The whole card links here when it is set. */
  repo?: string;
  /** Overrides the "GitHub" wording when the repo needs naming, e.g. one half
   *  of a split frontend/backend project. */
  repoLabel?: string;
  /** Extra public links shown next to the repo, e.g. a playable build or a demo. */
  links?: { label: string; url: string }[];
  /** True when the source is private: the card says so instead of linking to a
   *  repo that would 404 for visitors. Cards with neither say the link is coming. */
  privateRepo?: boolean;
  /** Replaces the private-repo wording, e.g. for something already shipped. */
  privateNote?: string;
  /** My part in it, when the project is not a solo build. */
  role?: string;
  /** Marks the one card that should stand out in the deck with its own colour. */
  accent?: boolean;
};

export const projects: Project[] = [
  {
    title: "getXplain.ai — AI Learning Platform",
    shortName: "getXplain.ai",
    short: "23-service AI learning platform, live in production",
    tag: "Production · 23 services",
    accent: true,
    role: "Backend Engineer",
    description:
      "An AI learning platform for kids that turns any question — typed, spoken or photographed — into a structured bilingual EN/AR lesson with narrated audio and AI-generated illustrations, serving 15,000+ users in production.",
    stack: [
      "Python",
      "FastAPI",
      "Flask",
      "Django",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "ARQ",
      "S3",
      "Docker",
      "Kubernetes",
      "ArgoCD",
      "Gemini",
      "WorkOS",
      "Stripe",
      "Flutter",
    ],
    patterns: ["Microservices", "Event-driven pipeline", "GitOps", "API versioning"],
    highlights: [
      "23 services in production: ~20 Python services and Flutter Web on a Kubernetes cluster (Hetzner Cloud) synced by ArgoCD GitOps, plus the marketing site and Teacher GPT on Cloudflare Workers.",
      "Microservice architecture rather than one backend: an API hub, five pipeline workers, a similarity checker, a worlds navigator, a URL shortener and a set of marketing services, each deployed from its own repo and Docker image.",
      "The FastAPI hub owns everything user-facing — WorkOS + JWT auth, learner profiles, lessons, XP, squads, 1v1 challenges, leaderboards, search, notifications and the RevenueCat / Stripe / Customer.io webhooks — and coordinates the pipeline by enqueueing jobs instead of doing inference itself.",
      "Event-driven lesson pipeline over Redis and ARQ queues: question-enricher → lesson-builder (a 13-step Gemini pipeline) → images-manager (Gemini image generation + Pillow) and audio-manager (Gemini TTS), each writing its output to S3 and patching status back to the hub.",
      "lesson-similarity-checker embeds every incoming question with Gemini and searches pgvector in PostgreSQL, so a lesson that already exists is reused instead of rebuilt.",
      "My work on the backend: fixed a revenue leak where users downgrading from Premium kept Premium access by deriving entitlement from live subscription state; built the 1v1 challenge lifecycle (offer TTLs, deadline-accurate XP settlement, age-matched invites); and resolved account-wide timezones synced to Customer.io.",
      "Every change is shipped behind API versioning so mobile builds already installed on phones keep working, and Docker images go to a private Harbor registry that ArgoCD rolls out.",
      "Clients: a Flutter iOS/Android app, a Next.js admin dashboard, a Flask + Jinja worlds navigator and a Django teachers portal.",
    ],
    links: [{ label: "getxplain.ai", url: "https://getxplain.ai/" }],
    privateRepo: true,
    privateNote: "Private repo · live in production · app available to install",
  },
  {
    title: "Character Simulation System",
    shortName: "Character Simulation System",
    short: "Mistral 7B + RAG (A+ grad project)",
    tag: "Graduation Project — A+ (98/100)",
    description:
      "FastAPI chatbot simulating real and fictional personas using fine-tuned Mistral 7B (LoRA) with a RAG architecture (FAISS + LangChain) for coherent multi-character conversations.",
    stack: ["FastAPI", "LangChain", "FAISS", "RAG", "Mistral 7B", "LoRA"],
  },
  {
    title: "Social Media Platform",
    shortName: "Social Media Platform",
    short: "Spring Boot microservices",
    tag: "May 2024",
    description:
      "Microservices-based social platform with posts, comments, likes, friends, and JWT/Spring Security auth. Built with Spring Boot and Spring Data JPA.",
    stack: ["Java", "Spring Boot", "Microservices", "JWT", "JPA"],
  },
  {
    title: "Copy for Claude — VS Code Extension",
    shortName: "Copy for Claude",
    short: "merged PR to the VS Code extension",
    tag: "Open Source Contribution",
    description:
      "Contributed a pull request that was reviewed and merged into the Copy for Claude VS Code extension.",
    stack: ["TypeScript", "VS Code API", "Open Source"],
  },
  {
    title: "3l sari3 — Real-time Ephemeral Chat",
    shortName: "3l sari3",
    short: "self-destructing real-time chat channels",
    tag: "Full-stack · Real-time",
    description:
      "Temporary chat channels that live 1–60 minutes, then self-destruct with all their messages — with live countdowns, presence, attachments and instant expiry broadcasts over WebSockets.",
    stack: ["Node.js", "Express", "MongoDB", "WebSocket", "React", "Vite", "Zod"],
    patterns: ["Repository", "Dependency Injection", "Observer (domain events)"],
    highlights: [
      "Layered backend (routes → validators → controllers → services → repositories) with dependency injection; REST and WebSocket share the same services so rules are enforced once.",
      "Race-proof per-user channel cap enforced by a unique DB index; UUIDv7 message IDs for correct ordering and keyset pagination; domain-event bus drives expiry notifications.",
      "Resilient React client: reconnect with exponential backoff + jitter, subscription replay, optimistic sends reconciled by correlation ID, server-clock-synced countdowns; ~68 kB gzipped bundle, no CSS framework.",
    ],
    repo: "https://github.com/akg418/3l-sari3-backend",
    repoLabel: "Backend repo",
    links: [
      { label: "Live demo", url: "https://3l-sari3-frontend.vercel.app/login" },
      { label: "Frontend repo", url: "https://github.com/akg418/3l-sari3-frontend" },
    ],
  },
  {
    title: "Database Backup CLI",
    shortName: "Database Backup CLI",
    short: "backup/restore CLI built on classic design patterns",
    tag: "Low-Level Design · CLI",
    description:
      "Extensible CLI to back up, restore and schedule backups for MySQL and PostgreSQL (local or Dockerized), with Gzip compression and email notifications.",
    stack: ["TypeScript", "Node.js", "MySQL", "PostgreSQL", "Docker", "Cron", "Winston"],
    patterns: ["Factory", "Adapter", "Template Method", "Command", "Strategy"],
    highlights: [
      "Built to practice LLD: Factory, Adapter, Template Method, Command and Strategy patterns, with SOLID throughout.",
      "Adding a new database, compression, storage (e.g. S3) or notification channel means one new class + one factory case — no existing code changes.",
    ],
    repo: "https://github.com/akg418/databaseBackup",
  },
  {
    title: "Snake Game in C",
    shortName: "Snake Game in C",
    short: "the classic, from scratch in C, shipped on itch.io",
    tag: "Game · C",
    description:
      "The classic Snake game written from scratch in C: steer with the arrow keys, eat food to grow, and don't hit the walls or your own tail — published on itch.io as a playable Windows build.",
    stack: ["C", "Game Loop", "Console Graphics"],
    highlights: [
      "Built from scratch in plain C: game loop, keyboard input, collision detection, and a snake that grows each time it eats.",
      "Shipped as a downloadable .exe on itch.io, with a video demo.",
    ],
    repo: "https://github.com/akg418/snake-game-in-c",
    links: [
      { label: "Play on itch.io", url: "https://gom3a.itch.io/snake-game" },
      { label: "Demo video", url: "https://www.loom.com/share/3eebb538eaff4d10ac58308bd3a7d318" },
    ],
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "C++", "C", "Java"],
  Backend: [
    "Node.js",
    "NestJS",
    "Express",
    "Fastify",
    "FastAPI",
    "Flask",
    "REST APIs",
    "WebSockets",
    "SSE",
    "JWT",
    "Google OAuth",
    "RBAC",
    "Zod",
    "BullMQ/Queues",
    "Microservices",
  ],
  "Databases & ORM": [
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "MySQL",
    "Oracle PL/SQL",
    "Prisma",
    "Mongoose",
    "Hibernate",
  ],
  Frontend: ["React", "Vite", "Tailwind CSS"],
  "DevOps & Tools": [
    "Docker",
    "Kubernetes",
    "ArgoCD",
    "AWS (S3)",
    "CI/CD",
    "Git",
    "Playwright",
    "Jest",
    "Supertest",
    "Swagger/OpenAPI",
  ],
  Concepts: [
    "OOP",
    "Data Structures & Algorithms",
    "Design Patterns",
    "Linux",
    "Event-driven architecture",
  ],
};

export const education = {
  school: "Helwan University",
  degree: "B.Sc. Computer Science",
  detail: "GPA 3.3/4.0 (Sep 2021 – Jan 2025)",
};

export type Competition = {
  title: string;
  detail: string;
};

export const competitions: Competition[] = [
  {
    title: "ECPC 2025",
    detail: "5th at Helwan Qualifiers → ECPC Finals → Qualified to ACPC Finals.",
  },
  {
    title: "ECPC 2024",
    detail: "4th at Helwan Qualifiers → ECPC Finals.",
  },
  {
    title: "ICPC Helwan Community",
    detail: "Vice President & Problem Setting Head — designed problems accepted at ACPC level.",
  },
];

/** Links referenced from the original problem-setting blurb on the page. */
export const problemSetting = {
  friendName: "MUZAN",
  friendUrl: "https://codeforces.com/profile/MUZAN",
  groupUrl: "https://codeforces.com/group/5EfwxVFSaS/contests",
} as const;
