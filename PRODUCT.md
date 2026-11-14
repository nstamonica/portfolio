# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: software engineering hiring teams (recruiters and engineers) screening Nathan for software co-op and internship roles. They usually arrive from his résumé, LinkedIn or GitHub and decide within a minute whether to dig deeper or reach out. Security hiring teams are a secondary audience.

## Product Purpose

Nathan Sta Monica's personal portfolio. In one page, a visitor learns who he is, what he has done, what he builds and how to reach him. Success means a recruiter or engineer opens the résumé or gets in touch.

## Positioning

A software engineering candidate who has already done real security work: phishing investigations, SIEM alert triage and automated vulnerability intelligence at the RCMP, plus engineering roles at Shared Services Canada, Correctional Service Canada and the Canada Revenue Agency. He defends systems and builds them.

Visitors should leave remembering two things: **real security work** and **defends and builds**.

## Operating Context

- Visitors read on a laptop between other candidates, and sometimes on a phone.
- The site lives in `nathan-portfolio/` (Next.js 16, React 19, Tailwind CSS 4). It is fully static and planned for Vercel.
- All copy lives in `nathan-portfolio/lib/content.ts`. Nathan edits it himself and will keep adding projects.

## Capabilities and Constraints

- One page: About, Experience, Tech, Education, Projects and Contact, plus a 404.
- Adding a project must only take a content edit.
- Fully static. No third-party scripts, fonts or images at runtime; a strict Content-Security-Policy is in place.
- Still open: the specific next co-op term. The site currently says "Open to co-op and internship opportunities".

## Brand Commitments

- Name: Nathan Sta Monica.
- Voice: first person, friendly and direct ("Hi! I'm Nathan").
- Visual constraints Nathan set:
  - Keep the original portfolio's Apple-inspired design choices.
  - Keep the moving liquid (WebGL) background, behind the whole page.
  - Layout modelled on marcvidal.vercel.app: a one-page bento with About Me, Experience, Tech and Projects. Projects is a section on the same page, not a separate route.
  - Numbers should be understated, not flashy.

## Evidence on Hand

- Résumé: `nathan-portfolio/public/resume.pdf`. It includes his phone number.
- Four roles, with metrics from the résumé:
  - RCMP: Cybersecurity Analyst, May–Aug 2026. Saved the team 10 hrs/week.
  - Shared Services Canada: Network Operations Specialist, May 2025–May 2026. 99.9% availability, 18% faster Tier-2 resolution, 5% shorter handoffs.
  - Correctional Service Canada: Junior Web Developer, Feb–May 2025. 600+ courses and 17,000+ users migrated; API responses under 200ms.
  - Canada Revenue Agency: System Analyst Intern, May–Dec 2024. 27% fewer sync errors, zero post-deployment downtime.
- Education: Honours BSc in Computer Science and Cybersecurity, Carleton University, Sept 2023 – Apr 2028.
- One personal project: AI Personal Trainer (Next.js + Gemini 2.5 Flash, Dec 2025 – Apr 2026). It has no public repo or demo link yet.
- Personal facts from Nathan:
  - Lifeguard; plays basketball.
  - Has run 3 half marathons and 1 marathon.
  - Training for HYROX and a half-marathon PR.
  - Big foodie (shawarma, pho).
- Does not exist, so never fabricate: testimonials, recommendation letters, awards, screenshots of government systems, or other projects.

## Product Principles

1. **Résumé-backed only.** Every claim and number traces to the résumé or to Nathan. No invented metrics, testimonials or projects.
2. **Government work stays high-level.** No internal system details beyond what the résumé says.
3. **Lead with real security work, framed for software teams.** He defends systems and builds them.
4. **Easy to grow.** Content is data; a new project is one entry in `content.ts`.
5. **Fast and accessible.** The site should be fast and accessible for everyone.

## Accessibility & Inclusion

- WCAG 2.2 AA contrast.
- Full keyboard support.
- Respects `prefers-reduced-motion`.
- Content readable without JavaScript.
