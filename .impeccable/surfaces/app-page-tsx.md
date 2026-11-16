---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Home (one-page portfolio)

Scope: `nathan-portfolio/app/page.tsx` and every panel it renders (intro, experience, projects, tech, about, contact). Visitor mode: Experience (portfolio); success is a resume open, an email or a look at the project's code.

Audience and job: software engineering hiring teams deciding in under a minute whether to reach out; security teams secondary. Proof comes from the resume only: four Government of Canada roles, projects, the tech stack, education. Nothing invented.

Constraints: Brandon David's paper world (brandondavid.dev) pinned by Nathan, with his own richer content; liquid only inside the wordmark; a scroll-linked panel deck on desktop like Brandon's (long scrolls that can rest halfway), ordinary scroll on phones; numbers understated; projects grow by content edits; works without JavaScript; WCAG AA; respects reduced motion.

## Direction contract

THESIS: A quiet paper deck that turns one idea per screen, opened by Nathan's name poured full of living liquid. It refuses the dashboard-of-cards bento and the long hero → stats → case-study scroll.

OWN-WORLD: Warm paper #EEEEE0 and ink #111110. DM Serif Display sets only the wordmark and the closing line; Inter sets everything else. Panel headings are casual sentences ending in an ellipsis, and links are underlined ink. Colour lives in two places: the WebGL liquid inside the "sta monica" letters (navy, cobalt, violet, iridescent rims) and the saturated brand tiles of the tech marquee. Role tones appear only as small dots, and the featured project is the one dark navy card.

STORY: A recruiter reads what Nathan does in one line, then scrolls through experience, projects (opening the code on GitHub), tech, about and contact, and opens the resume or emails him.

FIRST VIEWPORT (≥1024px, fine pointer): one full-screen paper panel.
- At about 30% height, right-aligned: the intro line alone, in two lines (Inter ~33px, medium), like Brandon's.
- Along the bottom edge: the giant lowercase "sta monica" wordmark, spanning the width, filled with the moving liquid and rising in on load.
- Primary actions live on the last panel (Resume, LinkedIn, GitHub, the copyable email) and in the ⌘K menu.

FORM: A page deck of six full-screen panels on desktop, scrolled along a track like Brandon's: each panel rests for a third of a screen, then the next slides over it one-to-one with the wheel and stops wherever the scrolling stops; keys, links and ⌘K glide a whole panel. Ordinary scroll on phones.
- Panels: Intro → Experience → Projects → Tech → About → Contact.
  - Experience: one panel with four expandable roles.
  - Projects: the newest as a big card that links to its GitHub repo, the rest listed beside it.
  - Tech: three rows of sliding brand tiles, sized like Brandon's.
  - About: one paragraph beside a photo print.
- Signature interaction: a cursor chip reading "sta monica" that names the tile or link it rests on, plus liquid letters that lens toward the pointer.
- Motion: the wordmark rises in; as the next panel slides over, the covered one blurs and fades behind it (see-through panels, as on Brandon's).
- seed: none (pinned). Nathan's words: "this is my favourite portfolio website… I love the design, the colours, the moving languages, stacks and frameworks… https://brandondavid.dev/" and "I like the content … that I have in my current portfolio". His answers:
  - Look: paper + a bit of liquid, inside the wordmark; same serif as Brandon's.
  - Wordmark: sta monica, rising in. Later (Nov 16): whole and uncut on mobile; cut off at the bottom on laptops is fine.
  - Navigation: panels like his; normal scroll on phones. Later (Nov 16): "I want the scrolls to be longer for the whole website and do halfway like … david's website", so the deck follows the wheel one-to-one and can rest halfway.
  - Experience: one panel with all 4 roles.
  - Projects: featured + list; the card links to the project's GitHub repo.
  - Touches: cursor pill; panels that blur as they're covered, like his.
  - About: paragraph only.
  - Security tools: left out.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Next co-op term not specified.
- AI Personal Trainer links to github.com/nstamonica/ai-gym-coach (from his local clone's remote); confirm the repo is public. More projects will be added by Nathan.
