---
name: kaushal-kalas-portfolio-design-system
description: Use when building any user-facing artifact for kaushal-kalas-portfolio — landing pages, decks, posters, emails, dashboards, or app prototypes. Binds the registered kaushal-kalas-portfolio design system (dark-first ink canvas, single warm amber-gold voltage, Debian-style terminal as the signature artifact). Trigger words: kaushal portfolio, kaushal-kalas-portfolio, terminal portfolio, Debian-style portfolio.
---

# kaushal-kalas-portfolio design system

A dark, developer-oriented portfolio brand. Near-black ink floor, one warm amber-gold voltage, and an amber phosphor Debian-style terminal as the signature artifact. Quiet, technical, self-assured — a Debian manual, not a marketing site. The amber-gold (#F5A623) was chosen for dual-theme usability: vibrant on dark (9.71:1 AAA), deployable as fills/borders on light with dark text inside.

## When to use

- Building any UI for the kaushal-kalas-portfolio brand (the active design system for this project).
- Layouts that must read as "developer portfolio" without marketing gloss: single-page sites, decks, posters, emails, forms.

## Tokens (bind these — never invent hex values)

```css
:root {
  --ink: #0b0b0c;        /* background    oklch(0.150 0.002 286.1) */
  --surface: #141417;    /* surface       oklch(0.193 0.006 285.8) */
  --paper: #f5f2e8;      /* foreground    oklch(0.961 0.014 93.0) */
  --muted: #9a9aa3;      /* muted         oklch(0.689 0.013 286.1) */
  --hairline: #26262b;   /* border        oklch(0.271 0.009 285.8) */
  --primary: #f5a623;    /* accent        oklch(0.784 0.159 73.0) */
  --primary-active: #e08f1a; /* accent-secondary oklch(0.717 0.151 68.3) */
  --display: 'Unbounded', 'Space Grotesk', system-ui, sans-serif;
  --body: 'Instrument Sans', Inter, system-ui, sans-serif;
  --mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', monospace;
}
```

Use the self-hosted `fonts/` bundle (Unbounded 400–900, Instrument Sans 400–700, JetBrains Mono 400–700) for local `@font-face`.

## Workflow

1. Read `DESIGN.md` (visual contract) and `BRAND.md` (voice + do/don'ts) before building.
2. Bind the seven role tokens; derive any other color with `oklch()` from this palette only.
3. Match component shapes to `system/kit.html` / `system/kit.dark.html`; use `system/artifacts/*.html` as starter patterns.
4. Ship `fonts/fonts.css` for the three families.
5. After delivery, run the design-system verified-rule checks (layout posture, palette only, typography fallbacks, logo usage) and emit the verify-scorecard.

## Posture rules (non-negotiable)

- Radius: 2px tags/labels, 4px interactive (buttons, cards, gallery, terminal output well), 8px terminal window only. No pills, no `border-radius: 9999px`.
- Elevation: one shadow tier (`0 1px 2px rgba(0,0,0,0.4)` on card hover) plus the terminal glow (`0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,166,35,0.06)`). Nothing else casts a shadow.
- Single accent: warm amber-gold `#f5a623` for CTAs, links, active states, focus rings, terminal prompt. The amber `#ffb200` is the terminal phosphor only.
- Dark-first canvas: ink floor, paper text; the dark kit is the default. A shipped light inversion (`light-theme.html`, same seed, engine-derived) keeps `#f5a623` as the primary on paper.
- Light-theme amber: amber as button fills/borders with dark text inside (9.71:1); structural amber on light — links get an amber underline with ink text, eyebrows/tags step down to dark amber ink `#824400`, never full-strength amber as text.
- Touch targets ≥ 48px (CTAs), 44px (nav), 40px (terminal input, with up/down history).
- Focus: 2px amber-gold outline + 2px offset via `:focus-visible` on every interactive element.
- Spacing: 4px base unit (2px micro-step for tag/label gutters); 128px section rhythm desktop, 72px below 640px.

## Do / don't

- Do: keep the terminal monochrome amber (one output color, one prompt color, one cursor color); use `$`-eyebrows (`$ projects`, `$ skills`) mapping to real terminal commands; render terminal output as real DOM text (selectable, copyable, `aria-live="polite"`); spend amber on exactly three things — interactive signals, eyebrows, terminal prompt; use amber as button fills on light backgrounds with dark text inside.
- Don't: add a second accent, gradients, or emoji icons; use numbering/percentage bars/icon walls; style the rest of the site like a terminal (it is an object, not a theme); fake shell behavior; animate over 600ms; transform anything but opacity and transform; put amber on white as text or below 4.5:1 contrast.

## Regeneration

`od brand finalize kaushal-kalas-portfolio-2c9cff` rebuilds `DESIGN.md`, `guide.md`, and `system/` from `brand.json`. Overrides live in the `seed` block of `brand.json`, mirrored in `brand.json.seed`. Never edit `system/` or `DESIGN.md` directly.