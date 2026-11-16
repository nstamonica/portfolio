---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Home (one-page portfolio)

Scope: `nathan-portfolio/app/page.tsx` and every panel it renders (intro, experience, projects, tech, about, contact). Visitor mode: Experience (portfolio); success is a résumé open or an email.

Audience and job: software engineering hiring teams deciding in under a minute whether to reach out; security teams secondary. Proof comes from the résumé only: four Government of Canada roles, projects, the tech stack, education. Nothing invented.

Constraints: Brandon David's paper world (brandondavid.dev) pinned by Nathan, with his own richer content; liquid only inside the wordmark; snap panels on desktop, ordinary scroll on phones; numbers understated; projects grow by content edits; works without JavaScript; WCAG AA; respects reduced motion.

## Direction contract

THESIS: A quiet paper deck that turns one idea per screen, opened by Nathan's name poured full of living liquid. It refuses the dashboard-of-cards bento and the long hero → stats → case-study scroll.

OWN-WORLD: Warm paper #EEEEE0 and ink #111110. DM Serif Display sets only the wordmark and the closing line; Inter sets everything else. Panel headings are casual sentences ending in an ellipsis, and links are underlined ink. Colour lives in two places: the WebGL liquid inside the "sta monica" letters (navy, cobalt, violet, iridescent rims) and the saturated brand tiles of the tech marquee. Role tones appear only as small dots, and the featured project is the one dark navy card.

STORY: A recruiter reads what Nathan does in one line and sees Carleton and four Government of Canada employers right under it. They page through experience, projects, tech, about and contact, then open the résumé or email him.

FIRST VIEWPORT (≥1024px, fine pointer): one full-screen paper panel.
- At about 30% height, right-aligned: the intro line (Inter ~30px), a muted line naming Carleton and the four employers, and an underlined link row (Résumé, LinkedIn, GitHub, Email).
- Along the bottom edge: the giant lowercase "sta monica" wordmark, spanning the width, filled with the moving liquid and rising in on load.
- Primary actions: Résumé and Email in that link row.

FORM: A page deck of six full-screen panels, moved by spring-physics wheel, keyboard and touch on desktop; ordinary scroll on phones.
- Panels: Intro → Experience → Projects → Tech → About → Contact.
  - Experience: one panel with four expandable roles.
  - Projects: the newest as a big card, the rest listed beside it.
  - Tech: three rows of sliding brand tiles.
  - About: one paragraph.
- Signature interaction: a cursor chip reading "sta monica" that names the tile or link it rests on, plus liquid letters that lens toward the pointer.
- Motion: the wordmark rises in, and panels sharpen from a blur as they slide in.
- seed: none (pinned). Nathan's words: "this is my favourite portfolio website… I love the design, the colours, the moving languages, stacks and frameworks… https://brandondavid.dev/" and "I like the content … that I have in my current portfolio". His answers:
  - Look: paper + a bit of liquid, inside the wordmark; same serif as Brandon's.
  - Wordmark: sta monica, rising in.
  - Navigation: snap panels like his; normal scroll on phones.
  - Experience: one panel with all 4 roles.
  - Projects: featured + list.
  - Touches: cursor pill, blur-in panels.
  - About: paragraph only.
  - Security tools: left out.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Next co-op term not specified.
- AI Personal Trainer has no public link yet; more projects will be added by Nathan.
