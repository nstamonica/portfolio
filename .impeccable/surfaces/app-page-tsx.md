---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Home (one-page portfolio)

Scope: `nathan-portfolio/app/page.tsx` and every section it renders (bento, projects, contact close). Visitor mode: Experience (portfolio); success is a résumé open or an email.

Audience and job: software engineering hiring teams deciding in under a minute whether to reach out; security teams secondary. Proof comes from the résumé only: four Government of Canada roles, one personal project, the tech stack, education. Nothing invented.

Constraints: keep the incumbent Apple world; the liquid WebGL flow sits behind the whole page; numbers understated; projects grow by content edits; works without JavaScript; WCAG AA.

## Direction contract

THESIS: The whole portfolio fits on one screen of Apple-style widgets floating on Nathan's living liquid wallpaper. It refuses both the long hero → stats → case-study scroll and the flashy hero-metric template.

OWN-WORLD: The incumbent Apple system: SF Pro/Inter, ink #1d1d1f on opaque white cards with 28px radii (24px on phones) and soft offset shadows, and Apple blue for actions. Each role has its own tone (crimson RCMP, teal SSC, blue CSC, amber CRA, violet projects), used for timeline nodes, org lines and tinted chips. One night card (Education) and one violet case-art card (Projects). The ground is the WebGL liquid: navy, cobalt, violet and orchid folds with iridescent rims.

STORY: A hiring team sees who Nathan is (name, Carleton, four Government of Canada roles), sees real security work first (RCMP leads the timeline) and sees that he builds (tech grid, projects). Then they open the résumé or email him.

FIRST VIEWPORT (≥1280px): a two-row bento up to 1360px wide (1296px of content), centred on the liquid, in three height tiers (roomy ≥900px, compact, short) so it stays on one screen.
- Row 1: identity card (N mark, 44px name, Carleton line in link blue, "previously" line, GitHub/LinkedIn/Email/Résumé actions, ⌘K pill) | About me card (greeting, focus line, six icon facts, availability pill).
- Row 2: Tech logo grid with security chips | violet Projects card | night Education card.
- Right column: a full-height Experience timeline (four roles, scrolls inside the card).
- Primary actions: Résumé and Email in the identity card.

FORM: The bento pinned by the reference. seed: none (pinned). Pinned in Nathan's words: "remake my portfolio website into a one page one similar to the one i'm about to provide you. Keep my original design choices the same" and "I'd still love to have the moving flowy background". His answers: background "Behind everything (Recommended)"; projects "Section below the cards". Signature interaction: the liquid lens following the pointer through the gutters, plus the glass-icon tilt on project art. Motion: one staggered rise of the cards on load.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Next co-op term not specified.
- AI Personal Trainer has no public link yet.
