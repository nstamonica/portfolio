/**
 * All site copy lives here. Edit this file to update the portfolio:
 * every panel on the page reads from it, so there is nothing else to touch.
 *
 * Two small formatting tricks work in most text below:
 *   **double asterisks** give a phrase a little extra weight (used for numbers)
 *   [link text](#experience) makes a link (to a panel, or to any https:// URL)
 */

import halfMarathonPhoto from "@/assets/half-marathon.jpg";

export type Theme = "crimson" | "teal" | "violet" | "blue" | "amber";
export type Glyph = "shield" | "pulse" | "sparkle" | "code" | "database";

export const site = {
  name: "Nathan Sta Monica",
  /** The giant liquid word on the first screen. */
  wordmark: "sta monica",
  title: "Nathan Sta Monica - Portfolio Website",
  description:
    "Computer Science & Cybersecurity student at Carleton University. Previously at the RCMP, Shared Services Canada, Correctional Service Canada and the Canada Revenue Agency.",
  location: "Ottawa, Canada",
  email: "nathanstamonica@gmail.com",
  github: "https://github.com/nstamonica",
  linkedin: "https://www.linkedin.com/in/nathanstamonica",
  resume: "/resume.pdf",
  /** The small line under his name in the link preview (app/opengraph-image.tsx). */
  focus: "Software engineering, product management and cybersecurity",
  availability: "Open to co-op and internship opportunities",
  copyrightYear: 2026,
};

/** The first screen, above the wordmark. */
export const intro = {
  /**
   * One sentence, split where it should break: laptops and desktops show it
   * as these two lines, and phones and tablets wrap it as one sentence.
   */
  lines: [
    "I’m an undergraduate student passionate about software engineering,",
    "product management and building things that hold up.",
  ],
};

/** The casual one-line headings at the top of each panel. */
export const headings = {
  experience: "Where I’ve been working…",
  projects: "What I’ve been building…",
  tech: "Languages, frameworks and platforms I work with…",
};

export const about = {
  paragraph:
    "I’m Nathan, a Computer Science and Cybersecurity student at Carleton University. I like working where security, software and product meet: I’ve investigated phishing campaigns at [the RCMP](#exp-rcmp), built APIs, middleware and [full‑stack apps](#projects), and lately I’ve been diving into product management, figuring out what’s worth building and why. Away from the screen I’m a lifeguard, I play basketball, and I’ve run three half marathons (that’s one of them in the photo) and a full marathon. Right now I’m training for HYROX and chasing a half‑marathon PR. And I’m a big foodie: shawarma and pho are my go‑tos.",
  /**
   * The photo beside the paragraph. To swap it, replace the file in assets/
   * (any size; a 3:4 portrait fits best) and update the import at the top.
   */
  photo: {
    image: halfMarathonPhoto,
    alt: "Nathan and a friend holding up their finisher’s medals after a half marathon",
    caption: "21.1km, done.",
    /** What the cursor chip says over the photo. */
    cursor: "First ever half marathon!",
  },
};

export const contact = {
  heading: "Let’s build something secure.",
  lede: "Open to co-op and internship opportunities in software engineering, product management and cybersecurity. Whether it’s a role, a project or a question, my inbox is open.",
};

export const education = {
  school: "Carleton University",
  degree: "Honours BSc in Computer Science and Cybersecurity",
  period: "Sept 2023 – Apr 2028",
  location: "Ottawa, ON",
};

export type Role = {
  /** Used for the #exp-<slug> link and the ⌘K menu. */
  slug: string;
  org: string;
  role: string;
  period: string;
  theme: Theme;
  /** One line shown before the role is opened. */
  highlight: string;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    slug: "rcmp",
    org: "RCMP",
    role: "Cybersecurity Analyst",
    period: "May 2026 – Aug 2026",
    theme: "crimson",
    highlight: "Investigated phishing campaigns and automated vulnerability tracking, saving the team **10 hours a week**",
    points: [
      "Automated daily NVD vulnerability tracking with an Azure Logic App and PowerShell, saving the team **10 hours a week**",
      "Investigated coordinated phishing campaigns, detonating links and payloads in VirusTotal, urlscan.io and FortiSandbox and isolating compromised endpoints",
      "Triaged High and Medium severity alerts across hybrid cloud and on-premise FortiSIEM, mitigating active DDoS attempts",
      "Investigated UEBA anomalies: suspicious sign-ins, brute-force attacks and international travel risks",
    ],
    tags: ["Azure Logic Apps", "PowerShell", "FortiSIEM", "FortiSandbox", "VirusTotal"],
  },
  {
    slug: "shared-services-canada",
    org: "Shared Services Canada",
    role: "Network Operations Specialist",
    period: "May 2025 – May 2026",
    theme: "teal",
    highlight: "Kept national public-safety services at **99.9% availability**",
    points: [
      "Sustained **99.9% availability** for national public-safety services with proactive telemetry monitoring and automated health audits",
      "Cut average Tier-2 incident resolution time by **18%**, clearing escalation backlogs into Tier-3 engineering",
      "Standardized escalation workflows in Spectrum and wrote technical SOPs, shortening handoffs by **5%**",
      "Migrated a multi-tier Nginx, PHP and MariaDB stack from Docker to rootless Podman inside an air-gapped network",
    ],
    tags: ["Linux", "Windows Server", "Podman", "Nginx", "MariaDB"],
  },
  {
    slug: "correctional-service-canada",
    org: "Correctional Service Canada",
    role: "Junior Web Developer",
    period: "Feb 2025 – May 2025",
    theme: "blue",
    highlight: "Migrated **600+ courses** and **17,000+ user profiles** to D2L Brightspace",
    points: [
      "Built secure REST API endpoints across distributed microservices with response times **under 200ms**",
      "Rebuilt legacy interfaces with semantic HTML5, responsive CSS3 and vanilla JavaScript, passing UAT on the first try",
      "Migrated **600+ courses** and **17,000+ user profiles** to D2L Brightspace with complete data integrity",
    ],
    tags: ["REST APIs", "JavaScript", "HTML5", "CSS3", "D2L Brightspace"],
  },
  {
    slug: "canada-revenue-agency",
    org: "Canada Revenue Agency",
    role: "System Analyst Intern",
    period: "May 2024 – Dec 2024",
    theme: "amber",
    highlight: "Cut synchronization errors by **27%** in cross-platform middleware",
    points: [
      "Cut synchronization errors by **27%** in cross-platform Java, JavaScript and SAP middleware",
      "Reduced query latency by refactoring SQL joins and adding Oracle Database indexes",
      "Automated end-to-end tests across Java and SAP modules, keeping releases at **zero post-deployment downtime**",
    ],
    tags: ["Java", "JavaScript", "SAP APIs", "Oracle Database", "SQL"],
  },
];

export type Project = {
  /** Used for the #project-<slug> link and the ⌘K menu. */
  slug: string;
  name: string;
  /** Short badge next to the name, e.g. "Personal project". */
  kind: string;
  /** A few words, shown when the project is in the list. */
  tagline: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
  theme: Theme;
  glyph: Glyph;
  /** The GitHub repository. The big card becomes a link to it; in the list it shows as a link. */
  repo?: string;
  /** Any other links (a live demo, a write-up), shown as buttons. */
  links?: { label: string; href: string }[];
};

/**
 * Add a project by copying an entry below. Put your NEWEST project FIRST:
 * the first one becomes the big card, and the rest are listed beside it.
 * It also shows up in the ⌘K menu automatically.
 * Pick any theme ("crimson" | "teal" | "violet" | "blue" | "amber") and
 * glyph ("shield" | "pulse" | "sparkle" | "code" | "database") for its icon.
 */
export const projects: Project[] = [
  {
    slug: "ai-personal-trainer",
    name: "AI Personal Trainer",
    kind: "Personal project",
    tagline: "An AI coach that watches your form",
    period: "Dec 2025 – Apr 2026",
    summary:
      "An AI coach that watches your form: a full-stack Next.js app that sends workout videos to Gemini 2.5 Flash and turns its structured output into clear, actionable feedback.",
    points: [
      "Native multimodal video reasoning with the Gemini 2.5 Flash API and Google AI File Manager",
      "Asynchronous pipelines that handle high-latency video uploads and analysis end to end",
      "A type-safe TypeScript and Tailwind CSS dashboard that parses AI-generated JSON into feedback for each workout",
    ],
    stack: ["Next.js", "TypeScript", "Gemini 2.5 Flash", "Google AI File Manager", "Tailwind CSS", "Node.js"],
    theme: "violet",
    glyph: "sparkle",
    repo: "https://github.com/nstamonica/ai-gym-coach",
    // Add a live demo and it shows up as a button:
    // links: [{ label: "Live demo", href: "https://..." }],
  },
];

/**
 * The sliding logo tiles. `color` is the tile; the logo is drawn in white,
 * or in near-black when `dark: true` (for light tiles). The order is split
 * into three rows, so neighbours are mixed to keep similar colours apart.
 * Logos live in public/tech (Devicon, MIT licence; Node.js from Simple Icons, CC0).
 */
export type Tech = { name: string; logo: string; color: string; dark?: boolean };

export const techStack: Tech[] = [
  // Row 1
  { name: "Python", logo: "/tech/python.svg", color: "#3776ab" },
  { name: "HTML5", logo: "/tech/html5.svg", color: "#e34f26" },
  { name: "TypeScript", logo: "/tech/typescript.svg", color: "#3178c6" },
  { name: "JavaScript", logo: "/tech/javascript.svg", color: "#f7df1e", dark: true },
  { name: "Docker", logo: "/tech/docker.svg", color: "#2496ed" },
  { name: "Podman", logo: "/tech/podman.svg", color: "#892ca0" },
  { name: "React", logo: "/tech/react.svg", color: "#61dafb", dark: true },
  { name: "Node.js", logo: "/tech/nodejs.svg", color: "#5fa04e" },
  { name: "Microsoft Azure", logo: "/tech/azure.svg", color: "#0078d4" },
  { name: "Express", logo: "/tech/express.svg", color: "#ffffff", dark: true },
  // Row 2
  { name: "Java", logo: "/tech/java.svg", color: "#e76f00" },
  { name: "CSS3", logo: "/tech/css3.svg", color: "#1572b6" },
  { name: "Next.js", logo: "/tech/nextjs.svg", color: "#111110" },
  { name: "Linux", logo: "/tech/linux.svg", color: "#fcc624", dark: true },
  { name: "Tailwind CSS", logo: "/tech/tailwindcss.svg", color: "#06b6d4" },
  { name: "PHP", logo: "/tech/php.svg", color: "#777bb4" },
  { name: "VS Code", logo: "/tech/vscode.svg", color: "#007acc" },
  { name: "FastAPI", logo: "/tech/fastapi.svg", color: "#009688" },
  { name: "Windows Server", logo: "/tech/windows.svg", color: "#00a4ef" },
  // Row 3
  { name: "C / C++", logo: "/tech/cplusplus.svg", color: "#00599c" },
  { name: "Git", logo: "/tech/git.svg", color: "#f05032" },
  { name: "NumPy", logo: "/tech/numpy.svg", color: "#4d77cf" },
  { name: "GitHub", logo: "/tech/github.svg", color: "#181717" },
  { name: "PowerShell", logo: "/tech/powershell.svg", color: "#2c5591" },
  { name: "Bootstrap", logo: "/tech/bootstrap.svg", color: "#7952b3" },
  { name: "SQLite", logo: "/tech/sqlite.svg", color: "#0f80cc" },
  { name: "Flask", logo: "/tech/flask.svg", color: "#3babc3" },
  { name: "MariaDB", logo: "/tech/mariadb.svg", color: "#003545" },
];
