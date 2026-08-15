---
version: "alpha"
name: kaushal-kalas-portfolio
description: >-
  Dark, developer-oriented single-page portfolio for AI/ML developer Kaushal
  Kalas. Near-black ink canvas, a single signal-yellow voltage, and an amber
  phosphor Debian-style terminal as the signature artifact. Every section wears
  a $-command eyebrow that maps 1:1 to a working terminal command — the page is
  the terminal's manual, and the terminal is a shortcut for the page.
colors:
  primary: "#FFD200"
  primary-active: "#FFC400"
  primary-disabled: "#2E2A16"
  ink: "#0B0B0C"
  surface: "#141417"
  surface-strong: "#1C1C20"
  hairline: "#26262B"
  hairline-soft: "#1E1E22"
  paper: "#F5F2E8"
  body: "#C9C6BD"
  muted: "#9A9AA3"
  muted-soft: "#7A7A84"
  on-primary: "#0B0B0C"
  terminal-bg: "#08080A"
  terminal-text: "#FFB200"
  terminal-prompt: "#FFD200"
  scrim: "rgba(0, 0, 0, 0.5)"
typography:
  display-hero:
    fontFamily: "Unbounded"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  display-xl:
    fontFamily: "Unbounded"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  display-lg:
    fontFamily: "Unbounded"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  display-md:
    fontFamily: "Unbounded"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0
  title:
    fontFamily: "Instrument Sans"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Instrument Sans"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "Instrument Sans"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
  caption:
    fontFamily: "JetBrains Mono"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
  eyebrow:
    fontFamily: "JetBrains Mono"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
  meta:
    fontFamily: "JetBrains Mono"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.04em"
  button-md:
    fontFamily: "JetBrains Mono"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0
  nav-link:
    fontFamily: "Instrument Sans"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.01em"
  terminal:
    fontFamily: "JetBrains Mono"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
rounded:
  sm: 2px
  md: 4px
  lg: 8px
spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 128px
components:
  nav:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.nav-link}"
    height: 64px
  menu-overlay:
    backgroundColor: "{colors.scrim}"
    textColor: "{colors.paper}"
    typography: "{typography.display-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg} {spacing.xl}"
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.muted}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg} {spacing.xl}"
    height: 48px
  button-secondary:
    textColor: "{colors.paper}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg} {spacing.xl}"
    height: 48px
  button-secondary-hover:
    textColor: "{colors.primary}"
  terminal-window:
    backgroundColor: "{colors.surface}"
    typography: "{typography.terminal}"
    rounded: "{rounded.lg}"
  terminal-titlebar:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    height: 40px
  terminal-output:
    backgroundColor: "{colors.terminal-bg}"
    textColor: "{colors.terminal-text}"
    typography: "{typography.terminal}"
    rounded: "{rounded.md}"
    padding: "{spacing.base}"
  prompt-line:
    backgroundColor: "{colors.terminal-bg}"
    textColor: "{colors.terminal-prompt}"
    typography: "{typography.terminal}"
    padding: "{spacing.base}"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  featured-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.xl}"
  card-meta:
    textColor: "{colors.muted}"
    typography: "{typography.meta}"
  card-description:
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
  tag-chip:
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xxs} {spacing.sm}"
  section-header:
    textColor: "{colors.paper}"
    typography: "{typography.display-xl}"
  section-eyebrow:
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow}"
  divider:
    backgroundColor: "{colors.hairline}"
    height: 1px
  divider-soft:
    backgroundColor: "{colors.hairline-soft}"
    height: 1px
  gallery-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
  contact-row:
    textColor: "{colors.paper}"
    typography: "{typography.body-md}"
    padding: "{spacing.base} 0"
  footer:
    textColor: "{colors.muted-soft}"
    typography: "{typography.caption}"
    padding: "{spacing.xxl} {spacing.section}"
---

## Overview

A dark, developer-oriented single-page portfolio whose single job is to communicate an AI/ML-focused profile within the first few seconds and make the visit memorable. The base canvas is near-black ink (`{colors.ink}` — #0B0B0C) with one voltage of signal yellow (`{colors.primary}` — #FFD200) carrying every interactive signal: CTAs, links, active nav states, focus rings, and the terminal prompt. There is no second brand color. The amber (`{colors.terminal-text}` — #FFB200) is not a marketing accent — it is the phosphor of the signature artifact: a Debian-style simulated terminal (PRD §18) placed directly under the hero.

The hero is intentionally quiet by developer-portfolio standards — no gradients, no orbiting badges. The most characteristic thing in this developer's world, the terminal, is the thesis. Everything above the fold exists to explain it; everything below is its manual: every section opens with a mono `$`-eyebrow (`$ projects`, `$ skills`) that maps 1:1 to a working terminal command, so a visitor can scroll or type to the same content.

Structure comes from 1px hairlines dividing dark bands from darker bands, not from stacked shadows. Elevation is capped at one shadow tier plus a single terminal glow. Type is split by role: **Unbounded** carries the two loud moments (hero name, section titles); **Instrument Sans** carries the human voice; **JetBrains Mono** owns everything machine-flavored — eyebrows, meta, tags, buttons, and the entire terminal. Display restraint is the personality of the page.

**Key characteristics:**

- Single accent: `{colors.primary}` (#FFD200) for every CTA, link, active state, and focus ring — and the terminal prompt marker. Most of the page is ink + paper with one or two yellow moments per viewport.
- Signature artifact: the amber phosphor terminal — monochrome `{colors.terminal-text}` output on `{colors.terminal-bg}`, blinking block cursor, soft glow. No green, no purple, no syntax rainbow. The one ornamented thing on the page.
- Dual navigation: every nav link has a twin command; the `$`-eyebrow is the page's structural device (not numbering — the content is not a sequence).
- One shadow tier: `0 1px 2px rgba(0,0,0,0.4)` for card hover, plus the terminal's dedicated `0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,178,0,0.06)` glow. Nothing else casts a shadow.
- 4px base spacing with 128px section rhythm — generous vertical air so hairlines read as rules, not boxes; the terminal is the densest moment on the page and reads as its center of gravity.

## Colors

The palette is rooted in high-contrast neutrals on a dark floor, with yellow as the single interactive voltage.

### Brand & Accent

- **Primary (#FFD200)**: "Signal yellow" — the single brand color. CTA fills, inline links, active nav, focus rings, the nav roundel mark, terminal prompt prefix. ≈13.6:1 on ink (AAA); ink on it ≈10:1. Slightly green-shifted from amber so it reads luminous on dark, never golden.
- **Primary Active (#FFC400)**: Hover/press step — warmer toward amber. Used on `{component.button-primary-hover}` and `{component.button-primary-active}`.
- **Primary Disabled (#2E2A16)**: Desaturated dark-yellow fill for disabled CTAs, paired with `{colors.muted}` text (≈5.8:1).

### Surface

- **Ink (#0B0B0C)**: The page floor; near-black with a hair of blue so it never reads warm brown. Dark text on yellow surfaces.
- **Surface (#141417)**: Standard raised fill — cards, terminal chrome. 1–2 steps off ink; separation comes from hairlines, not brightness.
- **Surface Strong (#1C1C20)**: Heavier fill — terminal titlebar, menu panels.

### Hairlines

- **Hairline (#26262B)**: Default 1px border — section dividers, card borders, terminal outline.
- **Hairline Soft (#1E1E22)**: Inside-card separations, meta rows.

### Text

- **Paper (#F5F2E8)**: Dominant text on dark — headlines, hero, titles. Warm off-white tinted toward the yellow family so text never reads sterile blue-white. ≈16:1 on ink.
- **Body (#C9C6BD)**: Secondary running text where paper would be too loud. ≈11.9:1.
- **Muted (#9A9AA3)**: Meta rows, inactive nav, tags, titlebar labels. ≈6.5:1 on surface.
- **Muted Soft (#7A7A84)**: Captions and footer. ≈4.6:1 — the floor; never used below 14px.
- **On Primary (#0B0B0C)**: Ink text on signal fills.

### Terminal Palette

- **Terminal BG (#08080A)**: The output well — the darkest surface on the page, so the terminal reads as a window into a machine, not a card.
- **Terminal Text (#FFB200)**: Amber phosphor. All command output, echoes, and errors render in this single tone — deliberately monochrome, like an old CRT. ≈11:1 on terminal-bg (AAA).
- **Terminal Prompt (#FFD200)**: The `kaushal@debian:~$` prefix and block cursor — the only brand yellow inside the machine.

### Scrim

- **Scrim (rgba(0,0,0,0.5))**: Global overlay backdrop — mobile menu, future lightbox.

## Typography

### Font Families

Three families, three jobs — the opposite of a single variable-font system:

- **Unbounded** (display): a wide, technical geometric sans. The hero name and section titles only. Its wide set-width is the page's personality; rationing it is what keeps it from shouting.
- **Instrument Sans** (body): neutral modern humanist sans for all running text, cards, nav. Deliberately quiet.
- **JetBrains Mono** (mono): the machine layer — terminal, `$`-eyebrows, meta rows, tags, buttons, dates. If it is data about Kaushal, it is mono; if it is voice, it is Instrument Sans.

Fallbacks: `'Unbounded', 'Space Grotesk', system-ui, sans-serif` · `'Instrument Sans', 'Inter', system-ui, sans-serif` · `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace`. Load via Google Fonts, `font-display: swap`, latin + latin-ext. No serif role exists in this system — do not introduce one.

### Hierarchy

| Token | Family | Size | Weight | Line Height | Tracking | Use |
|---|---|---|---|---|---|---|
| `{typography.display-hero}` | Unbounded | 4.5rem | 700 | 1.05 | -0.02em | Hero name ("Kaushal Kalas") |
| `{typography.display-xl}` | Unbounded | 2.25rem | 600 | 1.15 | -0.01em | Section titles ("Projects") |
| `{typography.display-lg}` | Unbounded | 1.5rem | 600 | 1.25 | 0 | Featured project titles |
| `{typography.display-md}` | Unbounded | 1.25rem | 600 | 1.3 | 0 | Card titles |
| `{typography.title}` | Instrument Sans | 1.125rem | 500 | 1.4 | 0 | Sub-heads, contact labels |
| `{typography.body-md}` | Instrument Sans | 1rem | 400 | 1.6 | 0 | Running text (max 60ch) |
| `{typography.body-sm}` | Instrument Sans | 0.875rem | 400 | 1.5 | 0.01em | Card descriptions |
| `{typography.caption}` | JetBrains Mono | 0.75rem | 400 | 1.4 | 0.04em | Tags, dates, titlebar |
| `{typography.eyebrow}` | JetBrains Mono | 0.75rem | 500 | 1.4 | 0.08em | Section `$`-eyebrows |
| `{typography.meta}` | JetBrains Mono | 0.75rem | 400 | 1.4 | 0.04em | Card meta ("python · pytorch · 2025") |
| `{typography.button-md}` | JetBrains Mono | 0.875rem | 500 | 1.2 | 0 | Button labels |
| `{typography.nav-link}` | Instrument Sans | 0.875rem | 500 | 1.5 | 0.01em | Nav links |
| `{typography.terminal}` | JetBrains Mono | 0.875rem | 400 | 1.6 | 0 | All terminal content |

### Principles

- Display weights sit at 600–700, but the display face is rationed: hero name (the loudest typographic moment, deliberately) and one section title per band. Everything below the fold lets the amber terminal carry the atmosphere.
- Font sizes are fixed rem tokens; scale the display-hero to 2.5rem and display-xl to 1.75rem below 640px (prose rule — never invent new sizes).
- The single color-plus-type lockup is the prompt line `kaushal@debian:~$ ▊` — mono with the brand-yellow prompt prefix. It is the system's logo moment.
- Use Unbounded at weight 700 for the hero name only; titles sit at 600. Track tight on display, never negative below -0.02em.

## Layout

### Spacing System

- **Base unit:** 4px (with a 2px micro-step for tag and label gutters).
- **Tokens:** `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 128px.
- **Section rhythm:** `{spacing.section}` (128px) between major bands on desktop, 72px below 640px. Generous, because hairlines need air to read as rules rather than boxes.
- **Card internal padding:** `{spacing.lg}` (24px) standard, `{spacing.xl}` (32px) featured, `{spacing.base}` (16px) terminal output well.
- **Gutters:** `{spacing.base}` (16px) between gallery items; `{spacing.lg}` (24px) between columns; `{spacing.sm}` (8px) between tag chips.

### Grid & Container

- **Max content width:** 72rem centered, with `{spacing.base}` inline padding at viewport edges.
- **Terminal:** capped at 64rem, centered — narrower than content so it reads as an object, not a band.
- **About / Skills:** 2-column at desktop (55 / 45), stacking below 1024px.
- **Experience strip:** 3-column (Experience / Education / Achievements) at desktop, stacked below 640px.
- **Projects:** one featured row, then a 2-column grid. No icon walls, no percentage bars — skills are tag rows, never fake measurements (PRD §12).
- **Gallery:** 3-column desktop, 2-column below 1024px, 2-column mobile. Reserved 4:3 aspect ratio at every width to eliminate layout shift (PRD §17.5).
- **Footer:** single hairline row — copyright left, links center, "Back to top" right.

### Whitespace Philosophy

Editorial bands get 128px of vertical air; the terminal stays dense (60vh max of mono output); cards sit 16px apart. The contrast is deliberate: "open, quiet portfolio above — one dense machine below the hero" makes the terminal the unmistakable center of gravity. Nothing floats, nothing parallaxes, nothing is sticky except the nav.

## Elevation & Depth

The system has essentially one shadow tier plus a dedicated terminal glow, against a flat baseline.

- **Flat (no shadow):** the entire page — hero, all bands, footer, nav. 95% of surfaces cast nothing.
- **Card hover float:** `0 1px 2px rgba(0,0,0,0.4)` — the only card shadow, applied on pointer hover. No lift animation; the hairline border steps toward primary at 50% and the title gains a `→`.
- **Terminal glow:** `0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,178,0,0.06)` — a soft amber bloom reserved for the terminal window alone. The single atmospheric moment on the page; it is what marks the terminal as an artifact rather than a card.
- **Scrim:** `{colors.scrim}` for the mobile menu overlay and any future lightbox.

There are no progressive elevation tiers. Depth comes from dark-on-darker surface separation, hairlines, and the terminal's glow — never from layered shadows. The terminal glow should be verified on OLED panels during build.

## Shapes

The shape language is restrained and consistent — precise but not sharp, technical but not hostile.

- **Radius language:** `{rounded.md}` (4px) on all interactive elements — buttons, cards, tags, gallery items, the terminal output well. `{rounded.sm}` (2px) on chips. `{rounded.lg}` (8px) on the terminal window only — it is the largest radius on the page, reinforcing the window-as-object reading.
- **No pill shapes.** No `border-radius: 9999px` anywhere in the system — pill search bars and pill badges are the marketplace default this system deliberately avoids.
- **No hard 0px grid-square corners** on interactive elements; only the nav and the page grid itself are square.
- **The roundel:** the only circle in the system — the 28px nav mark (signal yellow fill, black mono "K"), and the three 8px titlebar dots (muted-soft, deliberately not traffic-light colors, preserving the amber discipline).
- **The cursor:** the terminal block cursor is a rectangle, not a bar — it is part of the type, in `{colors.terminal-prompt}`.
- **Tag chips** are 2px-radius mono rectangles with 1px hairline borders — they read as machine labels, not pills.

## Components

### Navigation

**`{component.nav}`** — Ink surface, 64px height, bottom `{component.divider}`, `backdrop-filter: blur(8px)` at 92% ink. The signal-yellow roundel mark sits flush left (the only yellow in the chrome), links flush right in `{typography.nav-link}` muted — About, Skills, Projects, Gallery, Contact — flipping to paper with a 2px signal underline when active. Below 640px: roundel + mono "menu" button opening **`{component.menu-overlay}`**, a full-screen scrim panel whose links render in Unbounded with their `$`-eyebrows as secondary labels.

### Buttons

**`{component.button-primary}`** — Signal yellow fill, ink text, 4px radius, mono 500 label, 48px height. The only CTA style in the system: "View projects", "Download resume". Labels are always action verbs in sentence case; a `→` appears on hover. **`{component.button-primary-hover}`** and **`{component.button-primary-active}`** step to `{colors.primary-active}` — no transform, no shadow change. **`{component.button-primary-disabled}`** uses the desaturated fill with `{colors.muted}` text (≈5.8:1), reserved for terminal-driven actions that are unavailable (e.g., missing resume file).

**`{component.button-secondary}`** — Transparent, paper text, 1px hairline border; on hover the border and text step to `{colors.primary}`. Used for "Download resume" when paired with a primary.

### Terminal (signature component)

**`{component.terminal-window}`** — `{colors.surface}` chrome, `{rounded.lg}`, 1px hairline border, the dedicated glow. Placed directly under the hero; the page's thesis object.

**`{component.terminal-titlebar}`** — 40px strong-surface bar: three muted-soft roundel dots left, `kaushal@debian:~ — bash` center in `{typography.caption}`, mono "copy" right.

**`{component.terminal-output}`** — The terminal-bg well (darkest surface on the page), 16px padding, `{typography.terminal}` in amber. All command output renders here in monochrome — `help` listings, `projects`, `gallery <n>` image placeholders, AI answers. Max-height 60vh, scrolls, pins to bottom. Errors render as `bash: <cmd>: command not found` + `Type 'help' to see available commands.` — directions, not apologies.

**`{component.prompt-line}`** — `kaushal@debian:~$` in `{colors.terminal-prompt}` (the only brand-yellow inside the machine), input echo in `{colors.paper}`, block cursor blinking at 1s steps. Boot sequence types a welcome on load (≤1.2s) and never blocks input (PRD §21). Full command set: PRD §19 — output stays inside the terminal; only `resume`/`github`/external links touch the browser, and those print feedback first ("Opening Kaushal_Kalas_Resume.pdf… ✓").

### Cards & Sections

**`{component.project-card}`** — Surface, 4px radius, hairline border, 24px padding. Anatomy: `{component.card-meta}` row (muted mono, `python · pytorch · 2025`), title in `{typography.display-md}` paper, `{component.card-description}` in body-sm, `{component.tag-chip}` stack, mono link row (GitHub / Live demo). Hover: hairline steps toward primary, title gains `→`, single shadow tier. **`{component.featured-card}`** — same anatomy at 32px padding, `{typography.display-lg}` title, and a mono "featured" tag in primary.

**`{component.section-header}`** — The structural device: **`{component.section-eyebrow}`** (`$ projects` in primary mono) above the section title in `{typography.display-xl}` paper. The eyebrow is a working command — no numbering, no badges; the `$` is the numbering.

### Gallery

**`{component.gallery-item}`** — Surface, 4px radius, hairline border. 4:3 reserved image (`object-fit: cover`, lazy-loaded) with the caption beneath in `{typography.caption}` muted. Hover: border steps to primary. No zoom, no overlay — captions stay readable (PRD §17.6).

### Contact & Footer

**`{component.contact-row}`** — Full-width rows (48px+, the largest tap targets on the page) separated by `{component.divider}`: Email / GitHub / LinkedIn / X in `{typography.body-md}` paper with a muted mono domain suffix. Hover: text steps to primary.

**`{component.footer}`** — Ink surface, top hairline, `{typography.caption}` at `{colors.muted-soft}`: `© 2026 Kaushal Kalas` · `GitHub · LinkedIn · Email` · `↑ Back to top`.

## Do's and Don'ts

**Do**

- Do spend yellow on exactly three things: interactive signals, section eyebrows, and the terminal prompt. If a yellow element is none of those, cut it.
- Do keep the terminal monochrome amber. One output color, one prompt color, one cursor color.
- Do use the `$`-eyebrow above every section, and keep names identical between nav, section headers, and terminal commands (PRD §19).
- Do render terminal output as real DOM text — selectable, copyable, screen-reader-accessible, `aria-live="polite"`.
- Do give the hero 128px of air below the nav and the terminal 128px below the hero CTAs.
- Do respect reduced motion: entrances render final state instantly, boot prints immediately, cursor blink slows to 2s.

**Don't**

- Don't add a second accent color, gradients, or emoji icons anywhere on the page.
- Don't use numbering (01/02/03), percentage skill bars, or icon walls — this content is not a sequence and skills are not measurable (PRD §12).
- Don't style the rest of the site like a terminal — the terminal is an object, not a theme (PRD §28).
- Don't put yellow text on white, or any combination below 4.5:1.
- Don't let the terminal look like a real shell — no arbitrary command execution, no fake sudo prompts (PRD §5, §18).
- Don't animate anything for more than 600ms, and never transform anything but opacity and transform (PRD §30.9).
- Don't load more than the three specified families, and don't give Unbounded a body-text role.

## Motion

GSAP Core + ScrollTrigger only; CSS transitions for every hover state (PRD §30.1, §30.6). Durations stay under 600ms; only transform and opacity animate (PRD §30.9).

| Moment | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| Hero entrance | Page load | Name → role → copy → CTAs, stagger 0.08s, rise 24px + fade | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Terminal boot | After hero | Typed welcome + prompt blink-in | 600ms | linear |
| Section reveal | ScrollTrigger @ 15% viewport | Fade + rise 24px | 400ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Card/gallery stagger | ScrollTrigger | Children stagger 0.04s | 400ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Mobile menu | Click | Overlay fade + link stagger | 400ms | cubic-bezier(0.65, 0, 0.35, 1) |
| Hover states | `:hover` | CSS transitions | 150ms | cubic-bezier(0.16, 1, 0.3, 1) |

Constraints (PRD §30.7): no floating elements, no parallax, no scroll hijacking, no continuous background motion. Kill ScrollTrigger instances on teardown. `prefers-reduced-motion: reduce` — all entrances and reveals render final state instantly; the boot prints immediately; cursor blink slows to 2s; no functional interaction is removed (PRD §30.8).

## Responsive Behavior

| Breakpoint | Width | Key changes |
|---|---|---|
| Mobile | < 640px | Nav → roundel + overlay menu; hero scales (display-hero 2.5rem); terminal max-height 50vh; About/Skills 1-column; experience strip stacks; gallery 2-column; section rhythm 72px |
| Tablet | 640–1024px | About/Skills 2-column; gallery 2–3 column; featured row wraps |
| Desktop | > 1024px | Full spec: 64px nav, 72rem content, 64rem terminal, 3-column gallery |

Touch targets: primary/secondary CTAs ≥ 48×48px; contact rows full-width at 48px+; nav links padded to 44px; terminal input 40px min height with `↑/↓` history (PRD §21). The terminal is the one component that must survive mobile intact — it narrows with the container and scrolls; it never collapses.

## Accessibility

- Focus: 2px `{colors.primary}` outline + 2px offset via `:focus-visible` on every interactive element — the signal yellow is the focus language of the whole site.
- Keyboard: full page operable — nav, overlay menu, buttons, terminal input, `↑/↓` history (PRD §21).
- Contrast: every documented pairing meets AA (see Colors): paper/ink ≈16:1, primary/ink ≈13.6:1, amber/terminal-bg ≈11:1, muted-soft/ink ≈4.6:1 floor.
- Terminal: real DOM text — selectable, copyable, readable by assistive tech, `aria-live="polite"` on the output well. The terminal is content, not a canvas.
- Images: meaningful alt text on every image; captions are supplementary, never the only description (PRD §17.6).
- Semantics: `lang="en"`, landmarks (header/main/nav/footer), single `h1`, sections headed by their `$`-eyebrow + title pair.

## Known Gaps & Future Work

- **Hover precision:** token-level hover behavior is specified, but exact glow radii and arrow offsets need in-browser tuning against the amber terminal; verify the terminal glow on OLED panels.
- **Light mode (PRD §29):** a future pass would invert ink ⇄ paper while keeping the yellow voltage; must not ship half-done.
- **AI response formatting:** `ask`/`ai` output renders in the terminal well, but long multi-paragraph answers need a formatting decision (collapse vs. full-text, source footers).
- **Gallery lightbox (PRD §17.4):** later phase; the scrim token is ready.
- **Terminal phase 2 (PRD §21):** tab autocomplete, aliases, and terminal themes each need palette scoping to preserve the amber monochrome discipline.
- **Resume failure state (PRD §25):** the disabled-button token exists, but a full empty-state pattern for a missing PDF is not yet specified.