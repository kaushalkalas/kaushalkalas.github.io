# kaushal-kalas-portfolio — Brand Guide

*A dark, developer-oriented single-page portfolio whose single job is to communicate an AI/ML-focused profile within the first few seconds and make the visit memorable.*

Extracted from the pasted `DESIGN.md` (designmd://kaushal-kalas-portfolio) and enriched from its prose.

## Positioning

Near-black ink canvas, one voltage of signal yellow, and an amber phosphor Debian-style terminal as the signature artifact. The hero is intentionally quiet by developer-portfolio standards — no gradients, no orbiting badges. The terminal is the thesis: everything above the fold exists to explain it; everything below is its manual. Every section opens with a mono `$`-eyebrow (`$ projects`, `$ skills`) that maps 1:1 to a working terminal command, so a visitor can scroll or type to the same content.

## Color system

The palette is rooted in high-contrast neutrals on a dark floor, with yellow as the single interactive voltage. Roles below are the seven semantic roles the design system registers.

### Roles

| Role | Token | Hex | OKLCh | Usage |
| --- | --- | --- | --- | --- |
| background | Ink | `#0B0B0C` | `oklch(0.150 0.002 286.1)` | page canvas; near-black with a hair of blue so it never reads warm brown |
| surface | Surface | `#141417` | `oklch(0.193 0.006 285.8)` | cards, terminal chrome; 1–2 steps off ink |
| foreground | Paper | `#F5F2E8` | `oklch(0.961 0.014 93.0)` | headlines, hero, titles (~16:1 on ink) |
| muted | Muted | `#9A9AA3` | `oklch(0.689 0.013 286.1)` | meta rows, inactive nav, tags, titlebar (~6.5:1 on surface) |
| border | Hairline | `#26262B` | `oklch(0.271 0.009 285.8)` | 1px dividers, card borders, terminal outline |
| accent | Primary | `#F5A623` | `oklch(0.784 0.159 73.0)` | warm amber-gold — CTAs, links, active nav, focus rings, terminal prompt. Shifted from pure yellow for dual-theme usability and premium Gen-Z aesthetic. 9.71:1 on ink (AAA). |
| accent-secondary | Primary Active | `#E08F1A` | `oklch(0.717 0.151 68.3)` | hover/press step — deeper amber (8.65:1 on ink); button hover/active states |

### Extended tokens (documented, used in prose guidance)

- **Body** `#C9C6BD` — secondary running text where paper would be too loud (~11.9:1 on ink).
- **Muted Soft** `#7A7A84` — captions and footer (~4.6:1 floor, never below 14px).
- **Primary Disabled** `#2E2A16` — desaturated dark-yellow fill for disabled CTAs, paired with `Muted` text (~5.8:1).
- **Surface Strong** `#1C1C20` — terminal titlebar, menu panels.
- **Hairline Soft** `#1E1E22` — inside-card separations, meta rows.
- **On Primary** `#0B0B0C` — ink text on signal fills (~10:1).
- **Terminal BG** `#08080A` — the output well, the darkest surface on the page.
- **Terminal Text** `#FFB200` — amber phosphor for all command output, echoes, and errors (~11:1 on terminal-bg). Deliberately monochrome, like an old CRT.
- **Terminal Prompt** `#F5A623` — the `kaushal@debian:~$` prefix and block cursor — the only brand amber inside the machine (matches the primary accent).
- **Scrim** `rgba(0,0,0,0.5)` — global overlay backdrop (mobile menu, future lightbox).

### Rules

- Spend amber on exactly three things: interactive signals, section eyebrows, and the terminal prompt. If an amber element is none of those, cut it.
- Keep the terminal monochrome amber — one output color, one prompt color, one cursor color. No green, no purple, no syntax rainbow.
- Never put amber text on white, or any combination below 4.5:1. Primary/ink ≈9.7:1 (AAA), ink on primary ≈9.7:1.
- On light backgrounds: use amber as button fills and border accents with dark text inside (9.7:1), not as link text color. Focus rings are decorative and don't need contrast.

## Typography

Three families, three jobs — the opposite of a single variable-font system. Display and body must remain different faces.

| Role | Family | Weights | Fallbacks | Notes |
| --- | --- | --- | --- | --- |
| Display | Unbounded | 400 / 600 / 700 | Space Grotesk, system-ui, sans-serif | wide technical geometric sans; hero name (700) and section titles (600) only |
| Body | Instrument Sans | 400 / 500 / 700 | Inter, system-ui, sans-serif | neutral humanist sans; all running text, cards, nav |
| Mono | JetBrains Mono | 400 / 500 | IBM Plex Mono, ui-monospace, SFMono-Regular, monospace | machine layer — terminal, eyebrows, meta, tags, buttons, dates |

### Hierarchy

| Token | Family | Size | Weight | Line Height | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- |
| display-hero | Unbounded | 4.5rem | 700 | 1.05 | -0.02em | Hero name ("Kaushal Kalas") |
| display-xl | Unbounded | 2.25rem | 600 | 1.15 | -0.01em | Section titles ("Projects") |
| display-lg | Unbounded | 1.5rem | 600 | 1.25 | 0 | Featured project titles |
| display-md | Unbounded | 1.25rem | 600 | 1.3 | 0 | Card titles |
| title | Instrument Sans | 1.125rem | 500 | 1.4 | 0 | Sub-heads, contact labels |
| body-md | Instrument Sans | 1rem | 400 | 1.6 | 0 | Running text (max 60ch) |
| body-sm | Instrument Sans | 0.875rem | 400 | 1.5 | 0.01em | Card descriptions |
| caption | JetBrains Mono | 0.75rem | 400 | 1.4 | 0.04em | Tags, dates, titlebar |
| eyebrow | JetBrains Mono | 0.75rem | 500 | 1.4 | 0.08em | Section `$`-eyebrows |
| meta | JetBrains Mono | 0.75rem | 400 | 1.4 | 0.04em | Card meta ("python · pytorch · 2025") |
| button-md | JetBrains Mono | 0.875rem | 500 | 1.2 | 0 | Button labels |
| nav-link | Instrument Sans | 0.875rem | 500 | 1.5 | 0.01em | Nav links |
| terminal | JetBrains Mono | 0.875rem | 400 | 1.6 | 0 | All terminal content |

### Principles

- Display weights sit at 600–700 but the display face is rationed: the hero name (the loudest typographic moment, deliberately) and one section title per band.
- Fixed rem tokens; scale display-hero to 2.5rem and display-xl to 1.75rem below 640px (prose rule — never invent new sizes).
- Track tight on display, never negative below -0.02em. Use Unbounded at 700 for the hero name only.
- The single color-plus-type lockup is the prompt line `kaushal@debian:~$ ▊` — the system's logo moment.
- Load the three families via Google Fonts with `font-display: swap`, latin + latin-ext. No serif role exists in this system — do not introduce one.

## Layout

- **Base unit:** 4px (with a 2px micro-step for tag and label gutters). Spacing tokens: 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 128 (section).
- **Max content width:** 72rem centered, 16px inline padding at viewport edges. The terminal is capped at 64rem, centered, so it reads as an object not a band.
- **Section rhythm:** 128px between major bands on desktop, 72px below 640px. Generous, because hairlines need air to read as rules rather than boxes.
- **Columns:** About/Skills 2-column (55/45) at desktop, stacked below 1024px. Experience strip 3-column (Experience / Education / Achievements) at desktop, stacked below 640px. Projects: one featured row then a 2-column grid. Gallery: 3-column desktop, 2-column below 1024px, 2-column mobile, reserved 4:3 at every width.
- **Footer:** single hairline row — copyright left, links center, "Back to top" right.
- Nothing floats, nothing parallaxes, nothing is sticky except the nav.

## Elevation & shapes

- **One shadow tier:** `0 1px 2px rgba(0,0,0,0.4)` card hover only. **Terminal glow:** `0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,166,35,0.06)` — the single atmospheric moment, terminal only. 95% of surfaces cast nothing.
- **Radius:** 2px chips, 4px interactive elements (buttons, cards, tags, gallery items, terminal output well), 8px on the terminal window only. No pill shapes, no `border-radius: 9999px`.
- **The roundel:** the only circle — the 28px nav mark (signal-yellow fill, ink mono "K") and three 8px titlebar dots (muted-soft, deliberately not traffic-light colors).
- **The cursor:** the terminal block cursor is a rectangle, not a bar — it is part of the type, in terminal-prompt.

## Components

- **Nav** — ink, 64px, bottom hairline, `backdrop-filter: blur(8px)` at 92% ink. Warm amber roundel flush left, links flush right (About, Skills, Projects, Gallery, Contact) in muted, flipping to paper with a 2px amber underline when active. Below 640px: roundel + mono "menu" button opening the full-screen scrim **menu-overlay** whose links render in Unbounded with their `$`-eyebrows as secondary labels.
- **Buttons** — `button-primary`: warm amber fill, ink text, 4px radius, mono 500 label, 48px height; labels are action verbs in sentence case; a `→` appears on hover; hover/active step to primary-active, no transform. `button-secondary`: transparent, paper text, 1px hairline border; on hover border and text step to primary. Disabled uses the desaturated fill with muted text. One primary CTA per viewport.
- **Terminal** (signature) — `terminal-window` surface chrome, 8px radius, hairline border, the dedicated glow. `terminal-titlebar` 40px strong-surface bar: three muted-soft dots, `kaushal@debian:~ — bash` center, mono "copy" right. `terminal-output` terminal-bg well (darkest surface), 16px padding, amber mono; errors render as `bash: <cmd>: command not found` + `Type 'help' to see available commands.` — directions, not apologies. `prompt-line` prompt in signal yellow, input echo in paper, blinking block cursor at 1s steps. Boot types a welcome on load (≤1.2s), never blocks input.
- **Cards** — `project-card`: surface, 4px radius, hairline border, 24px padding; meta row (muted mono), title in display-md paper, description in body-sm, tag-chip stack, mono link row. Hover: hairline steps toward primary, title gains `→`, one shadow tier. `featured-card`: same anatomy at 32px padding, display-lg title, mono "featured" tag in primary.
- **Section headers** — `section-eyebrow` (`$ projects` in primary amber mono) above the title in display-xl paper. The eyebrow is a working command — no numbering, no badges; the `$` is the numbering.
- **Gallery** — `gallery-item`: surface, 4px radius, hairline border, 4:3 reserved image (`object-fit: cover`, lazy-loaded) with caption beneath in caption muted. Hover: border steps to primary. No zoom, no overlay.
- **Contact & footer** — `contact-row`: full-width rows (48px+, the largest tap targets) separated by hairlines, body-md paper with muted mono domain suffix; hover steps text to primary. `footer`: ink, top hairline, caption at muted-soft.

## Do's and Don'ts

**Do**

- Do spend amber on exactly three things: interactive signals, section eyebrows, and the terminal prompt.
- Do keep the terminal monochrome amber — one output color, one prompt color, one cursor color.
- Do use the `$`-eyebrow above every section and keep names identical between nav, section headers, and terminal commands.
- Do render terminal output as real DOM text — selectable, copyable, screen-reader-accessible, `aria-live="polite"`.
- Do give the hero 128px of air below the nav and the terminal 128px below the hero CTAs.
- Do respect reduced motion: entrances render final state instantly, boot prints immediately, cursor blink slows to 2s.
- Do use amber as button fills/borders on light backgrounds with dark text inside — never as link text on light surfaces.

**Don't**

- Don't add a second accent color, gradients, or emoji icons anywhere on the page.
- Don't use numbering (01/02/03), percentage skill bars, or icon walls — this content is not a sequence and skills are not measurable.
- Don't style the rest of the site like a terminal — the terminal is an object, not a theme.
- Don't put amber text on white, or any combination below 4.5:1.
- Don't let the terminal look like a real shell — no arbitrary command execution, no fake sudo prompts.
- Don't animate anything for more than 600ms, and never transform anything but opacity and transform.
- Don't load more than the three specified families, and don't give Unbounded a body-text role.

## Motion

GSAP Core + ScrollTrigger only; CSS transitions for every hover state. Durations under 600ms; only transform and opacity animate.

| Moment | Trigger | Animation | Duration | Easing |
| --- | --- | --- | --- | --- |
| Hero entrance | Page load | Name → role → copy → CTAs, stagger 0.08s, rise 24px + fade | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Terminal boot | After hero | Typed welcome + prompt blink-in | 600ms | linear |
| Section reveal | ScrollTrigger @ 15% viewport | Fade + rise 24px | 400ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Card/gallery stagger | ScrollTrigger | Children stagger 0.04s | 400ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Mobile menu | Click | Overlay fade + link stagger | 400ms | cubic-bezier(0.65, 0, 0.35, 1) |
| Hover states | `:hover` | CSS transitions | 150ms | cubic-bezier(0.16, 1, 0.3, 1) |

Constraints: no floating elements, no parallax, no scroll hijacking, no continuous background motion. Kill ScrollTrigger instances on teardown. `prefers-reduced-motion: reduce` — all entrances and reveals render final state instantly; the boot prints immediately; cursor blink slows to 2s; no functional interaction is removed.

## Responsive

| Breakpoint | Width | Key changes |
| --- | --- | --- |
| Mobile | < 640px | Nav → roundel + overlay menu; hero scales (display-hero 2.5rem); terminal max-height 50vh; About/Skills 1-column; experience strip stacks; gallery 2-column; section rhythm 72px |
| Tablet | 640–1024px | About/Skills 2-column; gallery 2–3 column; featured row wraps |
| Desktop | > 1024px | Full spec: 64px nav, 72rem content, 64rem terminal, 3-column gallery |

Touch targets: primary/secondary CTAs ≥ 48×48px; contact rows full-width at 48px+; nav links padded to 44px; terminal input 40px min height with `↑/↓` history. The terminal is the one component that must survive mobile intact — it narrows with the container and scrolls; it never collapses.

## Accessibility

- Focus: 2px warm amber outline + 2px offset via `:focus-visible` on every interactive element.
- Keyboard: full page operable — nav, overlay menu, buttons, terminal input, `↑/↓` history.
- Contrast: every documented pairing meets AA — paper/ink ≈16:1, primary/ink ≈9.7:1, amber/terminal-bg ≈11:1, muted-soft/ink ≈4.6:1 floor.
- Terminal: real DOM text — selectable, copyable, readable by assistive tech, `aria-live="polite"`. The terminal is content, not a canvas.
- Images: meaningful alt text; captions are supplementary, never the only description.
- Semantics: `lang="en"`, landmarks (header/main/nav/footer), single `h1`, sections headed by their `$`-eyebrow + title pair.

## Light-theme strategy (shipped)

The warm amber-gold (#F5A623) is the primary accent in **both** themes — verified by the engine: deriving the same seed through the light algorithm keeps `colorPrimary = #F5A623` on paper. On dark backgrounds it reads as luminous and vibrant (9.71:1 AAA). On light backgrounds, yellow cannot pass WCAG AA as text (a physical constraint of the hue), so the light theme deploys amber structurally:

- **Buttons:** amber fill with dark ink text inside — 9.71:1 contrast, AAA. Hover `#FFC24D`, active `#CF8213`.
- **Links:** dark ink text with a 2px amber underline or border accent — the amber is structural, not textual.
- **Active nav:** 2px amber underline with dark text.
- **Focus rings:** 2px amber outline + 2px offset (decorative, no contrast requirement).
- **Tags:** amber tint fill `#FFFCF0` with dark amber ink `#824400` and amber border `#FFE49E`.
- **Eyebrows:** dark amber ink `#824400` (legible on paper), not the full-strength amber.
- **Terminal:** unchanged — the dark well `#08080A` with amber phosphor `#FFB200` / prompt `#FFD200` carries over as the same object.

The light-mode palette inverts ink ⇄ paper while keeping the amber voltage. A live, self-contained demonstration is shipped as `light-theme.html` at the project root (paper canvas, amber buttons/links/focus/tags, terminal unchanged). Full derived light token set: primary `#F5A623`, primary-bg `#FFFCF0`, primary-border `#FFE49E`, primary-hover `#FFC24D`, primary-active `#CF8213`, link `#E08F1A`, text `#272726`, text-secondary `#5D5C59`, bg-layout `#ECE9DF`, bg-container `#F5F2E8`, border `#D2CFC7`, border-secondary `#E7E4DB`.

## Known gaps

- **Hover precision:** exact glow radii and arrow offsets need in-browser tuning against the amber terminal; verify the terminal glow on OLED panels.
- **Light-mode polish:** the shipped `light-theme.html` covers core components (nav, buttons, terminal, cards, tags, contact, footer); the full-width **menu-overlay** on paper is not yet illustrated — follow the same structural-amber rule when built.
- **AI response formatting:** long `ask`/`ai` terminal answers need a formatting decision (collapse vs. full-text, source footers).
- **Gallery lightbox (PRD §17.4):** later phase; the scrim token is ready.
- **Terminal phase 2 (PRD §21):** tab autocomplete, aliases, and terminal themes each need palette scoping to preserve the amber monochrome discipline.
- **Resume failure state (PRD §25):** the disabled-button token exists, but a full empty-state pattern for a missing PDF is not yet specified.