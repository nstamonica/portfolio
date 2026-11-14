/**
 * All site copy lives here. Edit this file to update the portfolio:
 * every card on the page reads from it, so there is nothing else to touch.
 *
 * In `points`, wrap a phrase in **double asterisks** to give it a little
 * extra weight (used for the numbers).
 */

export type Theme = "crimson" | "teal" | "violet" | "blue" | "amber";
export type Glyph = "shield" | "pulse" | "sparkle" | "code" | "database";

export const site = {
  name: "Nathan Sta Monica",
  title: "Nathan Sta Monica — Software Engineering & Cybersecurity",
  description:
    "Computer Science & Cybersecurity student at Carleton University. Previously at the RCMP, Shared Services Canada, Correctional Service Canada and the Canada Revenue Agency.",
  location: "Ottawa, Canada",
  email: "nathanstamonica@gmail.com",
  github: "https://github.com/nstamonica",
  linkedin: "https://www.linkedin.com/in/nathanstamonica",
  resume: "/resume.pdf",
  availability: "Open to co-op and internship opportunities",
  copyrightYear: 2026,
};

/** The big card with your name. */
export const profile = {
  headline: "Computer Science & Cybersecurity @ Carleton University",
  previously:
    "Previously @ RCMP, Shared Services Canada, Correctional Service Canada & Canada Revenue Agency",
};

export type FactIcon = "lifebuoy" | "basketball" | "medal" | "dumbbell" | "stopwatch" | "bowl";

export const about = {
  greeting: "Hi! I’m Nathan, a Computer Science and Cybersecurity student at Carleton University.",
  focus:
    "I like working where security meets software: I’ve investigated phishing campaigns at the RCMP and built APIs, middleware and full-stack apps.",
  interestsLead: "Outside of academics and my career, I like staying active.",
  facts: [
    { icon: "lifebuoy", tone: "crimson", text: "I’m a lifeguard" },
    { icon: "basketball", tone: "amber", text: "I play basketball" },
    { icon: "medal", tone: "blue", text: "3 half marathons and 1 marathon" },
    { icon: "dumbbell", tone: "teal", text: "Training for HYROX" },
    { icon: "stopwatch", tone: "violet", text: "Chasing a half‑marathon PR" },
    { icon: "bowl", tone: "crimson", text: "Big foodie: shawarma and pho" },
  ] satisfies { icon: FactIcon; tone: Theme; text: string }[],
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
  /** Short line under the name, e.g. "Personal project". */
  kind: string;
  /** A few words for the Projects card in the bento. */
  tagline: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
  theme: Theme;
  glyph: Glyph;
  links?: { label: string; href: string }[];
};

/**
 * Add a project by copying an entry below. It appears in the Projects
 * section, the count on the Projects card and the ⌘K menu automatically.
 * Pick any theme ("crimson" | "teal" | "violet" | "blue" | "amber") and
 * glyph ("shield" | "pulse" | "sparkle" | "code" | "database") for its art.
 */
export const projects: Project[] = [
  {
    slug: "ai-personal-trainer",
    name: "AI Personal Trainer",
    kind: "Personal project · Full-stack & applied AI",
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
    // Add a repo or live demo and it shows up as a button:
    // links: [{ label: "View on GitHub", href: "https://github.com/nstamonica/..." }],
  },
];

export type Tech = { name: string; logo: string };

/** Logos live in public/tech (Devicon, MIT licence). */
export const techStack: Tech[] = [
  { name: "Python", logo: "/tech/python.svg" },
  { name: "Java", logo: "/tech/java.svg" },
  { name: "JavaScript", logo: "/tech/javascript.svg" },
  { name: "TypeScript", logo: "/tech/typescript.svg" },
  { name: "C / C++", logo: "/tech/cplusplus.svg" },
  { name: "PowerShell", logo: "/tech/powershell.svg" },
  { name: "PHP", logo: "/tech/php.svg" },
  { name: "HTML5", logo: "/tech/html5.svg" },
  { name: "CSS3", logo: "/tech/css3.svg" },
  { name: "React", logo: "/tech/react.svg" },
  { name: "Next.js", logo: "/tech/nextjs.svg" },
  { name: "Node.js", logo: "/tech/nodejs.svg" },
  { name: "Express", logo: "/tech/express.svg" },
  { name: "Flask", logo: "/tech/flask.svg" },
  { name: "FastAPI", logo: "/tech/fastapi.svg" },
  { name: "Tailwind CSS", logo: "/tech/tailwindcss.svg" },
  { name: "Bootstrap", logo: "/tech/bootstrap.svg" },
  { name: "NumPy", logo: "/tech/numpy.svg" },
  { name: "Microsoft Azure", logo: "/tech/azure.svg" },
  { name: "Docker", logo: "/tech/docker.svg" },
  { name: "Podman", logo: "/tech/podman.svg" },
  { name: "Linux", logo: "/tech/linux.svg" },
  { name: "Windows Server", logo: "/tech/windows.svg" },
  { name: "MariaDB", logo: "/tech/mariadb.svg" },
  { name: "SQLite", logo: "/tech/sqlite.svg" },
  { name: "Git", logo: "/tech/git.svg" },
  { name: "GitHub", logo: "/tech/github.svg" },
  { name: "VS Code", logo: "/tech/vscode.svg" },
];

/** Shown as chips under the logos. */
export const securityTools = [
  "Microsoft Sentinel",
  "Microsoft Defender",
  "FortiSIEM",
  "FortiSandbox",
  "VirusTotal",
  "urlscan.io",
  "CVSS",
];
