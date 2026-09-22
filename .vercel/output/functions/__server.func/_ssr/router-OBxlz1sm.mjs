import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-p_QQLBB5.css";
const profile = {
  name: "Ahmed Khaled",
  role: "Software Engineer",
  email: "ahmedkhaledgomaa404@gmail.com",
  phone: "+201014908696",
  phoneDisplay: "+20 101 490 8696",
  tagline: "Software Engineer building production-grade systems and scalable backend services for AI-driven products — APIs, microservices, and event-driven architectures with FastAPI, NestJS, TypeScript, and Kubernetes.",
  cvUrl: "https://drive.google.com/drive/folders/1f1RdcHVjX5iOhlRSjPa2McB0ZXaRS4l3?usp=sharing",
  /** Host shown in the nav-bar wordmark and the terminal prompt. */
  domain: "ahmed.dev",
  /** Canonical site URL, used for SEO metadata. */
  siteUrl: "https://ahmed.dev"
};
const domainParts = [
  profile.domain.slice(0, profile.domain.indexOf(".")),
  profile.domain.slice(profile.domain.indexOf("."))
];
const links = [
  { label: "GitHub", url: "https://github.com/akg418" },
  { label: "LinkedIn", url: "https://linkedin.com/in/ahmed-khaled-gom3a" },
  { label: "Codeforces", url: "https://codeforces.com/profile/gom3a_" },
  { label: "LeetCode", url: "https://leetcode.com/u/falta_404/" }
];
const linkUrls = Object.fromEntries(links.map((l) => [l.label, l.url]));
const linkOf = (label) => linkUrls[label];
const roles = [
  "Software Engineer.",
  "Backend & Microservices.",
  "FastAPI · NestJS.",
  "ACPC Finalist."
];
const stats = [
  { label: "Users in production", value: "15,000+" },
  { label: "Microservices in prod", value: "~20" },
  { label: "Problems solved", value: "2000+" },
  { label: "Process speedup", value: "7m → 9s" }
];
const experiences = [
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
      "Own the 1v1 challenge lifecycle (offer TTLs, deadline-accurate XP settlement, age-matched invites) and account-wide timezone resolution synced to Customer.io; extend the Flutter Web admin dashboard."
    ]
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
      "Contributed 60+ hard problems and 90+ optimized solutions with a strong emphasis on time-efficient implementations."
    ]
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
      "Wrote unit, integration, and E2E tests (Playwright) with CI/CD pipelines; ~95% task delivery accuracy and led internal problem-solving sessions."
    ]
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
      "Refactored core modules, implemented RBAC, and optimized a critical backend process from 7 minutes to under 9 seconds."
    ]
  },
  {
    company: "Quick R",
    shortName: "Quick R",
    role: "Backend Developer",
    employment: "Freelance",
    period: "Nov 2024 – Jan 2025",
    points: [
      "Designed and shipped a multi-restaurant digital menu platform end-to-end with .NET, MySQL, and AWS in a 2-person team.",
      "Built subscription management, dynamic menus, QR generation, and admin dashboard workflows."
    ]
  }
];
const projects = [
  {
    title: "Character Simulation System",
    shortName: "Character Simulation System",
    short: "Mistral 7B + RAG (A+ grad project)",
    tag: "Graduation Project — A+ (98/100)",
    description: "FastAPI chatbot simulating real and fictional personas using fine-tuned Mistral 7B (LoRA) with a RAG architecture (FAISS + LangChain) for coherent multi-character conversations.",
    stack: ["FastAPI", "LangChain", "FAISS", "RAG", "Mistral 7B", "LoRA"]
  },
  {
    title: "Social Media Platform",
    shortName: "Social Media Platform",
    short: "Spring Boot microservices",
    tag: "May 2024",
    description: "Microservices-based social platform with posts, comments, likes, friends, and JWT/Spring Security auth. Built with Spring Boot and Spring Data JPA.",
    stack: ["Java", "Spring Boot", "Microservices", "JWT", "JPA"]
  },
  {
    title: "Copy for Claude — VS Code Extension",
    shortName: "Copy for Claude",
    short: "merged PR to the VS Code extension",
    tag: "Open Source Contribution",
    description: "Contributed a pull request that was reviewed and merged into the Copy for Claude VS Code extension.",
    stack: ["TypeScript", "VS Code API", "Open Source"]
  }
];
const skills = {
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
    "Microservices"
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
    "Swagger/OpenAPI"
  ],
  Concepts: [
    "OOP",
    "Data Structures & Algorithms",
    "Design Patterns",
    "Linux",
    "Event-driven architecture"
  ]
};
const education = {
  school: "Helwan University",
  degree: "B.Sc. Computer Science",
  detail: "GPA 3.3/4.0 (Sep 2021 – Jan 2025)"
};
const competitions = [
  {
    title: "ECPC 2025",
    detail: "5th at Helwan Qualifiers → ECPC Finals → Qualified to ACPC Finals."
  },
  {
    title: "ECPC 2024",
    detail: "4th at Helwan Qualifiers → ECPC Finals."
  },
  {
    title: "ICPC Helwan Community",
    detail: "Vice President & Problem Setting Head — designed problems accepted at ACPC level."
  }
];
const problemSetting = {
  friendName: "MUZAN",
  friendUrl: "https://codeforces.com/profile/MUZAN",
  groupUrl: "https://codeforces.com/group/5EfwxVFSaS/contests"
};
const STORAGE_KEYS = {
  theme: "theme",
  username: "username",
  visits: "visits",
  gamingMode: "gamingMode",
  termMode: "termMode_v2",
  termColors: "term-colors",
  termAliases: "term-aliases",
  termSound: "term-sound",
  termWindowPos: "term-winpos",
  termWindowSize: "term-winsize"
};
function readString(key) {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeString(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
  }
}
function removeKey(key) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
  }
}
function readJson(key, parse) {
  const raw = readString(key);
  if (raw === null) return void 0;
  try {
    return parse(JSON.parse(raw));
  } catch {
    return void 0;
  }
}
function writeJson(key, value) {
  try {
    writeString(key, JSON.stringify(value));
  } catch {
  }
}
function readNumber(key, fallback) {
  const raw = readString(key);
  if (raw === null) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}
function readFlag(key, fallback) {
  const raw = readString(key);
  if (raw === null) return fallback;
  return raw !== "0";
}
function writeFlag(key, value) {
  writeString(key, value ? "1" : "0");
}
const THEME_EVENT = "themechange";
function getStoredTheme() {
  const stored = readString(STORAGE_KEYS.theme);
  return stored === "light" || stored === "dark" ? stored : "dark";
}
function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  writeString(STORAGE_KEYS.theme, theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}
function toggleTheme() {
  const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
  applyTheme(next);
  return next;
}
const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEYS.theme}');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){}})();`;
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$1 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${profile.name} — ${profile.role}` },
      { name: "description", content: `Portfolio of ${profile.name} — ${profile.tagline}` },
      { name: "author", content: profile.name },
      { property: "og:title", content: `${profile.name} — ${profile.role}` },
      { property: "og:description", content: profile.tagline },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: profile.siteUrl },
      { property: "og:site_name", content: profile.domain },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: `${profile.name} — ${profile.role}` },
      { name: "twitter:description", content: profile.tagline }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: profile.siteUrl }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: themeInitScript } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
const $$splitComponentImporter = () => import("./index-Bdpw3w5h.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreloadStaleTime: 0
});
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  STORAGE_KEYS as S,
  THEME_EVENT as T,
  applyTheme as a,
  problemSetting as b,
  competitions as c,
  domainParts as d,
  education as e,
  experiences as f,
  getStoredTheme as g,
  roles as h,
  projects as i,
  links as j,
  stats as k,
  linkOf as l,
  readJson as m,
  writeJson as n,
  readString as o,
  profile as p,
  writeString as q,
  readFlag as r,
  skills as s,
  toggleTheme as t,
  readNumber as u,
  removeKey as v,
  writeFlag as w,
  router as x
};
