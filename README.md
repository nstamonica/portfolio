# Nathan Sta Monica — Portfolio

Personal portfolio of Nathan Sta Monica, a Computer Science & Cybersecurity student at Carleton University, previously at the RCMP, Shared Services Canada, Correctional Service Canada and the Canada Revenue Agency.

A one-page, fully static site built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**. The look is warm paper and black ink, with a giant serif "sta monica" whose letters are filled with a live WebGL liquid.

## Highlights

- **Page deck.** On laptops and desktops the page is six full-screen panels: Intro, Experience, Projects, Tech, About, Contact. The scroll wheel, arrow keys, Page Up/Down, Space or a swipe move one panel at a time on a spring, and each panel sharpens from a blur as it arrives. Phones and tablets get the same panels as a normal scroll.
- **Liquid wordmark.** A hand-written GLSL shader (iterated domain warping with iridescent rims) fills the letters of "sta monica" and leans toward the pointer. The real text stays underneath (the canvas blends over it), so it falls back to ink letters without WebGL. The shader pauses when off screen and renders a single still frame for `prefers-reduced-motion`.
- **Experience.** All four roles on one panel. Each shows its headline result and opens (native `<details>`) to every point and tool.
- **Projects that grow.** The newest project is the big card; add more and they're listed beside it. Each also appears in the ⌘K menu.
- **Sliding tech tiles.** Three rows of app-icon tiles in brand colours.
- **Cursor chip.** A small "sta monica" label trails the mouse and names the tile or project under it.
- **⌘K command menu.** Jump to any panel, role or project, copy the email address, or open links.
- **Fully static and hardened.** `ensureStatic = "navigation"` fails the build if a route would need request-time rendering. Content-Security-Policy, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, Referrer-Policy, Permissions-Policy and COOP are set, and `X-Powered-By` is removed.
- **Accessible.** WCAG AA text contrast, full keyboard support (focus follows the deck), reduced-motion support, and a complete page without JavaScript.

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build: type-checks and validates static output
npm run start   # serve the production build (security headers apply here)
npm run lint
```

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts). In most text, `**double asterisks**` make a phrase a little heavier and `[text](#experience)` makes a link.

- **Add a project:** copy the entry in `projects` and put the newest one first (it becomes the big card). Pick a `theme` and `glyph`, and add `links` (e.g. a GitHub repo) to show buttons.
- **Edit experience:** each role has a one-line `highlight`, its `points` and `tags`.
- **Intro, About, Contact:** `intro`, `about.paragraph` and `contact`. The panel headings are in `headings`.
- **Tech tiles:** `techStack`: each has a logo in `public/tech` and a tile `color` (`dark: true` for light tiles).
- **Update the resume:** replace `public/resume.pdf`.
- **Change the wordmark:** `site.wordmark`. Then re-measure `--wordmark-em` (and `--wordmark-word-em` for phones) in `app/globals.css`, so it still fills the width.

## Project structure

```
app/
  layout.tsx              root layout, fonts, metadata, cursor chip, command menu
  page.tsx                the six panels inside the deck
  not-found.tsx           404
  opengraph-image.tsx     social preview image (built at build time)
  icon.svg                favicon
components/
  panels/                 intro, experience, projects, tech, about, contact
  deck.tsx                full-screen panel deck (desktop) and scroll reveals (mobile)
  liquid-canvas.tsx       WebGL2 liquid inside the wordmark
  cursor-chip.tsx         the label that trails the mouse
  command-palette.tsx     ⌘K menu
lib/
  content.ts              all site copy
  deck.ts                 lets the ⌘K menu move the deck
assets/
  fonts/                  fonts for the preview image (SIL Open Font License)
  og-liquid.png           a rendered still of the liquid, for the preview image
public/
  tech/                   technology logos
  resume.pdf
```

## Deployment

Deployed on [Vercel](https://vercel.com): every push to `main` redeploys, and other branches get preview URLs. The headers defined in `next.config.ts` are applied automatically.

Any Node.js host also works with `npm run build && npm run start`. Outside Vercel, set `NEXT_PUBLIC_SITE_URL` to the site's public URL so social previews resolve.

## Credits

- Technology logos from [Devicon](https://devicon.dev) (MIT licence) and, for Node.js, [Simple Icons](https://simpleicons.org) (CC0). They are trademarks of their respective owners.
- Fonts: DM Serif Display and Inter (SIL Open Font License).
- Design reference: [brandondavid.dev](https://brandondavid.dev).
