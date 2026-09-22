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
} as const;

export const links = [
  { label: "GitHub", url: "https://github.com/akg418" },
  { label: "LinkedIn", url: "https://linkedin.com/in/ahmed-khaled-gom3a" },
  { label: "Codeforces", url: "https://codeforces.com/profile/gom3a_" },
  { label: "LeetCode", url: "https://leetcode.com/u/falta_404/" },
] as const;

export type LinkLabel = (typeof links)[number]["label"];

export const linkOf = (label: LinkLabel) => links.find((l) => l.label === label)!.url;

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
    company: "Xplain AI — getXplain.ai",
    shortName: "Xplain AI",
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
};

export const projects: Project[] = [
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
];

export const skills: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "C++", "C", "Java"],
  Backend: [
    "Node.js",
    "NestJS",
    "FastAPI",
    "Flask",
    "REST APIs",
    "WebSockets",
    "SSE",
    "JWT",
    "RBAC",
    "BullMQ/Queues",
    "Microservices",
  ],
  "Databases & ORM": ["PostgreSQL", "Redis", "MySQL", "Oracle PL/SQL", "Prisma", "Hibernate"],
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
