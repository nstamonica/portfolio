# Nathan Sta Monica — Portfolio

Personal portfolio of Nathan Sta Monica, a Computer Science & Cybersecurity student at Carleton University, previously at the RCMP, Shared Services Canada, Correctional Service Canada and the Canada Revenue Agency.

An Apple-inspired, one-page, fully static site built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**.

## Highlights

- **One page, one screen.** On a desktop the bento (name, About me, Experience, Tech, Projects, Education) fits on a single screen, with a compact layout for shorter laptop windows. On tablets and phones it reflows into a single scroll.
- **Live WebGL wallpaper.** A hand-written GLSL fragment shader (iterated domain warping with iridescent rims) sits behind the whole page and drifts toward the pointer. It caps its resolution, lowers it further on slow GPUs, pauses when the tab is hidden, renders one still frame for `prefers-reduced-motion`, and falls back to a CSS gradient without WebGL2.
- **Experience timeline.** Four roles, colour-coded, scrolling inside their card on desktop.
- **Projects that grow.** Add an entry to `projects` in `lib/content.ts`. It appears in the Projects section, the project count and the ⌘K menu.
- **⌘K command menu.** Spotlight-style search across sections, roles, projects and links, with full keyboard support and ARIA combobox semantics.
- **Fully static.** `ensureStatic = "navigation"` in the root layout fails the build if any route would need request-time rendering.
- **Hardened headers.** Content-Security-Policy, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, Referrer-Policy, Permissions-Policy and COOP; `X-Powered-By` removed.
- **Accessible.** WCAG AA text contrast, a skip link, visible focus states, reduced-motion support, and content that stays readable without JavaScript.

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

All copy lives in [`lib/content.ts`](lib/content.ts).

- **Add a project:** copy the entry in `projects` and change it. Pick a `theme` and `glyph` for its cover art, and add `links` (e.g. a GitHub repo or live demo) to show buttons.
- **Edit experience:** each role has `points` and `tags`. Wrap a phrase in `**double asterisks**` to give it a little extra weight.
- **About me:** `about.facts` are the icon rows. Each has an `icon` (`lifebuoy`, `basketball`, `medal`, `dumbbell`, `stopwatch`, `bowl`) and a colour `tone`.
- **Tech logos:** `techStack` points at SVGs in `public/tech`.
- **Update the résumé:** replace `public/resume.pdf`.

## Project structure

```
app/
  layout.tsx              root layout, metadata, liquid background, command menu
  page.tsx                the one page: bento, projects, contact
  not-found.tsx           404
  opengraph-image.tsx     social preview image
  icon.svg                favicon
components/
  cards/                  identity, about, experience, tech, projects, education
  sections/               projects list and contact close
  liquid-canvas.tsx       WebGL2 background
  command-palette.tsx     ⌘K menu
lib/
  content.ts              all site copy
public/
  tech/                   technology logos
  resume.pdf
```

## Deployment

The simplest path is [Vercel](https://vercel.com/new): import the repository and keep the defaults. The headers defined in `next.config.ts` are applied automatically.

Any Node.js host also works with `npm run build && npm run start`. Outside Vercel, set `NEXT_PUBLIC_SITE_URL` to the site's public URL so social previews resolve.

## Credits

Technology logos from [Devicon](https://devicon.dev) (MIT licence). They are trademarks of their respective owners.
