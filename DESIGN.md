---
name: Nathan Sta Monica
description: A quiet paper deck, one idea per screen, signed with a giant serif name poured full of living liquid.
colors:
  paper: "#eeeee0"
  paper-2: "#e4e4d3"
  ink: "#111110"
  ink-2: "#2d2d29"
  muted: "#5b5b53"
  line: "rgb(17 17 16 / 0.13)"
  night: "#0b0e1d"
  on-night: "rgb(255 255 255 / 0.9)"
  on-night-2: "rgb(255 255 255 / 0.74)"
  on-night-3: "rgb(255 255 255 / 0.62)"
  night-border: "rgb(255 255 255 / 0.22)"
  night-line: "rgb(255 255 255 / 0.1)"
  night-fill: "rgb(255 255 255 / 0.08)"
  on-tile: "#ffffff"
  on-tile-light: "#141412"
  chip-glass: "rgb(250 250 241 / 0.78)"
  chip-glass-solid: "rgb(255 255 255 / 0.94)"
  focus: "#1f49d6"
  tone-crimson: "#cf2b3d"
  tone-teal: "#0b8577"
  tone-blue: "#1f5fd6"
  tone-amber: "#bf7605"
  tone-violet: "#6c3fd8"
  tone-crimson-on-dark: "#ff9096"
  tone-teal-on-dark: "#72e4d0"
  tone-blue-on-dark: "#8fbaff"
  tone-amber-on-dark: "#ffcb6b"
  tone-violet-on-dark: "#bba3ff"
typography:
  display-xl:
    fontFamily: "DM Serif Display, Georgia, Times New Roman, serif"
    fontSize: "clamp(96px, 18vw, 220px)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  wordmark:
    fontFamily: "DM Serif Display, Georgia, Times New Roman, serif"
    fontSize: "calc((100vw - 2 * clamp(10px, 1.4vw, 24px)) / 4.72)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.012em"
  display:
    fontFamily: "DM Serif Display, Georgia, Times New Roman, serif"
    fontSize: "clamp(44px, 5.2vw, 96px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(22px, 1.4vw + 13px, 34px)"
    fontWeight: 500
    lineHeight: 1.34
    letterSpacing: "-0.024em"
  lead:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(18px, 0.75vw + 12px, 24px)"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(19px, 0.9vw + 9px, 23px)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.016em"
  project-name:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(22px, 0.9vw + 13px, 27px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.022em"
  name:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(21px, 1.7vw, 25px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  email:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.4vw, 20.5px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  summary:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(16px, 0.25vw + 14px, 18px)"
    fontWeight: 500
    lineHeight: 1.55
  item:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.016em"
  body-lg:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(19px, 1.5vw, 22px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "-0.011em"
  body-sm:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
    fontFeature: "tnum"
  caption:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
  micro:
    fontFamily: "Inter, Segoe UI, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  focus: "6px"
  inset: "10px"
  option: "12px"
  row: "14px"
  dialog: "22px"
  card: "26px"
  tile: "26%"
  pill: "99px"
spacing:
  gutter: "clamp(16px, 4.4vw, 72px)"
  panel-flow: "clamp(56px, 10vw, 120px)"
  panel-deck: "clamp(36px, 7vh, 88px)"
  title-gap: "clamp(24px, 4.6vh, 48px)"
  row: "18px 14px"
  card: "clamp(22px, 2.3vw, 32px)"
components:
  link:
    textColor: "{colors.ink}"
  panel-heading:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  role-row:
    textColor: "{colors.ink}"
    rounded: "{rounded.row}"
    padding: "{spacing.row}"
  role-row-hover:
    backgroundColor: "{colors.paper-2}"
  feature-card:
    backgroundColor: "{colors.night}"
    textColor: "{colors.on-night}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
  tag:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  contact-email:
    textColor: "{colors.ink}"
    typography: "{typography.email}"
  tech-tile:
    rounded: "{rounded.tile}"
    size: "clamp(64px, min(8.6vw, 12.6vh), 124px)"
  cursor-chip:
    backgroundColor: "{colors.chip-glass}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  menu-dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.dialog}"
  menu-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.option}"
---

# Design System: Nathan Sta Monica

## Overview

**Creative North Star: "The Liquid Signature"**

Warm paper, black ink, and one living signature. The site is a deck of full-screen panels, each holding one idea: who Nathan is, where he has worked, what he has built, what he builds with, who he is outside work, and how to reach him. It is quiet on purpose, with wide margins, a single centred heading per panel and plenty of empty paper, so the two moments of colour carry the weight. The look follows brandondavid.dev, which Nathan chose as the reference, filled with his own, richer content.

The signature is the giant lowercase "sta monica" set in DM Serif Display along the bottom of the first screen. Its letters are filled with a WebGL liquid of navy, cobalt and violet with iridescent rims, which leans toward the pointer. Everything else stays typographic: Inter on paper, underlined ink links, hairline rows, small coloured dots for each employer. The only dark surface is the featured project card.

On laptops and desktops the panels behave like a deck. The wheel, the keys or a swipe move one panel at a time on a spring; the next panel slides up over the current one and sharpens from a blur while the one beneath fades. On phones and tablets the same panels scroll normally and sharpen as they enter. Without JavaScript the page is a plain, complete scroll with ink letters.

**Key Characteristics:**
- Warm paper ground (#eeeee0) and near-black ink; no white surfaces.
- One serif voice (DM Serif Display) for the wordmark and the closing line; Inter for everything else.
- Colour lives in two places only: the liquid inside the wordmark and the saturated brand tiles of the tech marquee.
- One idea per full-screen panel, headed by a casual sentence that ends in an ellipsis.
- Motion is structural: the wordmark rises, panels slide and sharpen, tiles slide; nothing decorative.

## Colors

A paper-and-ink palette with a deep navy card, a cobalt focus colour, and one muted tone per employer or project.

### Primary
- **Black Ink** (ink): every heading, body line, underlined link, the wordmark's fallback fill, the selected command-menu row and text selection.
- **Deep Ink** (ink-2): secondary reading text such as role highlights, bullet points and tag labels, where a hair less weight helps the hierarchy.

### Secondary
- **Liquid Abyss Navy** (night): the featured project card, the only dark surface on the page. On it, text steps down in white: on-night (summary, badge, stack chips), on-night-2 (points, the glyph) and on-night-3 (dates). Structure uses night-border (the badge outline), night-line (the divider) and night-fill (stack chips). Link pills on the card are Warm Paper.
- **Tile glyphs** (on-tile, on-tile-light): logos are white on brand tiles, and near-black on the light tiles (JavaScript, React, Linux, Express).
- **Chip glass** (chip-glass, chip-glass-solid): the cursor chip's translucent paper, which turns almost opaque white over the dark card.
- **Liquid Cobalt** (focus): keyboard focus rings only.

### Tertiary
- **Employer and project tones**: crimson (RCMP), teal (Shared Services Canada), blue (Correctional Service Canada), amber (Canada Revenue Agency), violet (projects). On paper each appears only as an 8px dot beside the organisation and as the bullet colour inside its role. On the dark card the lighter `-on-dark` variant colours the project name and bullets.

### Neutral
- **Warm Paper** (paper): the ground of every panel, the 404 page, the command menu and the link preview.
- **Pressed Paper** (paper-2): hover fill for rows and the surface of tags.
- **Graphite** (muted): dates, organisation names, the intro's credentials line, the contact lede and footer; 5.8:1 on paper.
- **Hairline** (line): row dividers and the footer rule.

The liquid's own colours live in the shader (components/liquid-canvas.tsx), not in CSS: abyss, navy, cobalt (#1236ff range), violet, sky, orchid and peach. They are always clamped darker than the paper.

### Named Rules
**The Two Homes Rule.** Saturated colour appears in exactly two places: inside the wordmark (the liquid) and on the tech tiles. Tones elsewhere are dots and bullets, never fills, borders or text on paper.

**The Paper Wins Rule.** The liquid canvas sits over the ink letters with `mix-blend-mode: lighten`, and every colour it draws is clamped to at most (0.86, 0.86, 0.82), darker than the paper. Over paper the paper wins and over the ink the liquid shows. Never let a liquid colour exceed the paper, or the canvas's rectangle appears around the letters.

## Typography

**Display Font:** DM Serif Display (with Georgia, Times New Roman)
**Body Font:** Inter (with Segoe UI, system-ui)

**Character:** A heavy, high-contrast display serif used like a signature, over a slightly tight Inter set in medium weight throughout, so the plain words carry some of the serif's heft (Nathan asked for everything bolder, like brandondavid.dev).

### Hierarchy
- **Wordmark** (400, sized so "sta monica" fills the width, 0.86): the h1 along the bottom of the first screen. It runs off the bottom edge, and on phones and portrait tablets it stacks as "sta" over "monica".
- **Display** (400, clamp(44px, 5.2vw, 96px), 1.02): the closing line "Let's build something secure." (balanced, max 16ch). **Display XL** is the 404's giant "lost".
- **Headline** (500, clamp(22px, 1.4vw + 13px, 34px), 1.34): the intro line, right-aligned on wide screens and centred on phones. The medium weight is deliberate; Nathan wanted it bolder than regular Inter, closer to brandondavid.dev.
- **Lead** (400, clamp(18px, 0.75vw + 12px, 24px), 1.5): the About paragraph, left-aligned beside the photo (centred on phones), max 40rem.
- **Title** (400, clamp(19px, 0.9vw + 9px, 23px), 1.3): the casual, centred panel headings ("Where I've been working…").
- **Project name** (700, clamp(22px, 0.9vw + 13px, 27px)) and **Summary** (500, clamp(16px, 0.25vw + 14px, 18px)): the featured card.
- **Name** (500, clamp(21px, 1.7vw, 25px), -0.03em) and **Email** (500, clamp(18px, 1.4vw, 20.5px)): the contact block, sized like brandondavid.dev's.
- **Item** (600, 17px; 18px on screens at least 1280×820): role titles and project names, one step above the body.
- **Body** (500, 17px, 1.55): default text. **Body large** (500, clamp(19px, 1.5vw, 22px), -0.03em) sets the contact links. **Body small** (15.5px; 16px on roomy screens) sets highlights and bullets, capped at 36rem (about 66 characters).
- **Label** (500, 14px, tabular figures): dates and organisation lines.
- **Caption** (500, 13px): tags, the footer, the cursor chip, the copy confirmation. **Micro** (12px): keycaps and command-menu hints.

### Named Rules
**The One Serif Voice Rule.** DM Serif Display appears only in the wordmark, the closing line, the 404 mark and the link preview. Never use it for headings, buttons or UI.

**The Casual Heading Rule.** Panel headings are lowercase-style sentences in Inter regular, centred, ending in an ellipsis. No kicker, eyebrow or section number above them.

**The Medium Ink Rule.** Every Inter text runs at 500 (one `--weight-text` setting). Hierarchy comes from size and colour first; names step up to 600, the featured project name to 700, and numbers marked in the copy to 700. Never set Inter below 500, and never ask DM Serif Display for a weight it does not have (it stays at 400).

## Layout

Six full-screen panels in a fixed order: Intro, Experience, Projects, Tech, About, Contact.

- **Deck mode** (at least 1024px wide and 560px tall, with a fine pointer): panels are fixed and fill the screen. Content centres vertically inside a vertical padding of panel-deck. A long list (open roles, extra projects) scrolls inside its panel before the deck moves.
- **Flow mode** (phones, tablets, no JavaScript): panels stack with panel-flow padding. The intro is at least one screen tall, with the wordmark at its bottom.
- **Containers**: content is max 1120px wide, or 1360px for the tech marquee and footer. The page gutter is clamp(16px, 4.4vw, 72px).
- **Intro grid**: rows of 0.82fr / the intro line / 1fr / wordmark. The intro line is the only copy on the first screen, right-aligned near 30% of the height on wide screens and centred under 768px.
- **Experience rows** form a four-column grid (date 10.5rem · role 16.5rem · highlight · chevron). From 768 to 1023px they become two columns, and under 768px a single stacked column.
- **Projects**: the newest project is the big card. With more projects, the card and a list sit side by side (1.25fr / 1fr), stacking under 900px.
- **About**: the photo print and the paragraph sit side by side (auto / 1fr, gap clamp(32px, 5vw, 88px), max 1080px). The photo is min(380px, 27vw, 44vh) wide so it always fits the screen height. Under 768px it stacks, photo first.
- **Rhythm**: more space above a heading than below it. The title gap is clamp(24px, 4.6vh, 48px).

## Elevation & Depth

Paper is flat. Depth comes from the deck itself: panels stack in z-order and slide over one another. Only four things cast shadows, all soft and offset downward.

### Shadow Vocabulary
- **Night card** (`box-shadow: 0 36px 70px -40px rgb(11 14 29 / 0.65), 0 2px 6px rgb(11 14 29 / 0.12)`): the featured project card.
- **Tile** (`box-shadow: inset 0 0 0 1px rgb(17 17 16 / 0.07), 0 14px 26px -18px rgb(17 17 16 / 0.5)`): each tech tile; the inset hairline keeps the white Express tile visible on paper.
- **Floating chip** (`box-shadow: 0 8px 22px -10px rgb(17 17 16 / 0.35), inset 0 0 0 1px rgb(17 17 16 / 0.07)`): the cursor chip.
- **Print** (`box-shadow: 0 34px 60px -36px rgb(17 17 16 / 0.55), 0 2px 6px rgb(17 17 16 / 0.12)`): the About photo.
- **Menu** (`box-shadow: 0 40px 100px -24px rgb(17 17 16 / 0.45)`): the ⌘K dialog.

### Named Rules
**The Flat Paper Rule.** Rows, tags, headings and links never cast shadows. If something needs separation on paper, use a hairline or the Pressed Paper fill.

## Shapes

- **Pills** (99px): tags, the copy button, the cursor chip and the project badge.
- **Rows** (14px): hover fills for role and project rows.
- **Card** (26px): the featured project card.
- **Tiles** (26%): app-icon squircles for the tech tiles.
- **Dialog** (22px), **options** (12px), **icon wells** (10px): the command menu.
- **Focus rings** (6px).
- **Lines**: hairline dividers only, never boxes around content. Links use a 1px underline at 0.22em offset that thickens to 2px on hover.

## Components

### Links
- **Style:** ink text with a 1px underline in the text colour, offset 0.22em. On hover the underline becomes 2px; there is no colour change.
- **Use:** links inside paragraphs (they move the deck, for example "the RCMP" opens that role) and the contact links stacked one per line. The first screen has no links; Resume, LinkedIn and GitHub live on the last panel and in the ⌘K menu.

### Role rows (Experience)
- **Character:** a quiet ledger. Each row is a native details/summary, so it works without JavaScript; opening one closes the others.
- **Summary:** period (Label, Graphite) · role (Item) over organisation (Label, Graphite, with a tone dot) · one highlight (Body small, Deep Ink, numbers in semibold) · a chevron that rotates 180° when open.
- **Body:** bullets with tone-coloured 6px dots, max 36rem, then tags.
- **States:** a Pressed Paper fill on hover; the content unfolds over 0.5s where `::details-content` is supported.

### Featured project card
- **Character:** the one dark object on the page, like a GitHub repository card.
- **Style:** a Night background, 26px corners and the night-card shadow, max 640px wide. A glyph icon, the name in its `-on-dark` tone (600 weight) and an outlined pill badge, then the summary, bullets, a hairline, stack chips (white at 0.08) and the dates.
- **Links:** white pills with navy text, each with an arrow icon.

### Project list
- **Style:** role-row anatomy (a tone dot, the name, a tagline in Graphite, the dates, a chevron). Each opens to a summary, bullets, tags and underlined links.

### Tech tiles (signature)
- **Character:** app icons sliding past, in brand colours.
- **Style:** squircles (26%) in each technology's brand colour. The single-colour logo is drawn as a CSS mask, in white or in #141412 on light tiles.
- **Motion:** three rows slide linearly in alternating directions (52s, 60s and 56s per loop) behind a 9% edge fade. A row pauses on hover; a hovered tile lifts 4px and scales to 1.04. Under reduced motion the tiles sit still in a centred grid.

### The liquid wordmark (signature)
- **Construction:** the h1 is real ink text; the WebGL canvas sits over it with lighten blending (see The Paper Wins Rule). The canvas pauses when its panel is covered or off screen, adapts its resolution, and renders one still frame under reduced motion.
- **Motion:** it rises 78% from below over 1.4s with exponential ease-out; the intro copy sharpens from a 10px blur after it.

### Cursor chip
- **Style:** a translucent paper pill (blur 10px) trailing the mouse at a +16/+14px offset with a light spring. It reads "sta monica", or the name in the `data-cursor` attribute of whatever it rests on (tiles, the project card). Over the dark card it becomes nearly opaque. It doesn't exist on touch screens.

### Command menu (⌘K)
- **Style:** a paper dialog with 22px corners and the menu shadow over a 25% ink scrim. Options use 12px corners; the selected one is ink with paper text. It jumps to panels, roles and projects, copies the email address, and opens external links.

### Photo print (About)
- **Character:** a real photo laid on the paper like a print: 3:4, 26px corners, the print shadow, tilted −2°. It straightens and lifts 4px on hover, and stays still under reduced motion.
- **Caption:** one short line in Caption type, Graphite, centred under the photo ("21.1km, done."). The cursor chip names the moment ("First ever half marathon!").
- **Blur reveal:** the photo arrives under a veil: the soft colour-wash preview Next.js shows while an image loads (the photo's tiny blur copy, smoothed with an SVG blur), inside the print's crisp rounded edges, with no label; the cursor chip is the only cue. A click fades the veil away over 0.8s with the exponential ease-out. It stays revealed while the About panel is on screen and comes back once the panel leaves: the deck's visibility event on laptops, an IntersectionObserver on phones.
- **Source:** served through next/image with a blur placeholder; the original lives in assets/ at 1200×1600 with no camera metadata.

### Copyable email (Contact)
- **Character:** the address itself is the control, as on brandondavid.dev: plain Email type, no underline, fading to 60% opacity on hover.
- **Behavior:** clicking copies the address; a Caption-sized "Copied to clipboard" note appears in a reserved line beneath (announced to screen readers) and the cursor chip reads "copied!" (it reads "click to copy" on hover). It is a mailto link underneath, so without JavaScript or clipboard access it opens the mail app.

## Do's and Don'ts

### Do:
- **Do** keep every panel on Warm Paper (#eeeee0). The paper is the brand.
- **Do** put new colour only on the tech tiles or inside the wordmark (The Two Homes Rule).
- **Do** head each panel with one casual, centred Inter sentence that ends in an ellipsis.
- **Do** make anything new keyboard-reachable inside its panel; the deck follows focus.
- **Do** keep numbers understated: bold weight inside running text, never big stat blocks.
- **Do** give anything that must survive without JavaScript a native element (details/summary, plain links).
- **Do** keep photography personal and singular: one real photo print in About, never stock imagery or decorative pictures.

### Don't:
- **Don't** add white cards, glass panels or a background behind the whole page. The liquid lives only inside the wordmark.
- **Don't** use DM Serif Display for headings, buttons or UI text (The One Serif Voice Rule).
- **Don't** put kickers, eyebrows or section numbers above panel headings.
- **Don't** add hero-metric blocks (big number, small label) for the resume figures.
- **Don't** let any liquid colour reach the paper's lightness (The Paper Wins Rule).
- **Don't** add a navigation bar or panel dots; the deck, the in-text links and ⌘K are the navigation.
