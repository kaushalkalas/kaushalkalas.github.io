# Plan — Fix the Light/Dark kit toggle and the color palette

## Intent summary

The design system's Light/Dark toggle shows no difference, and the shipped color
ramp drifts off the registered accent. Both are now root-caused to two engine
behaviors. This plan fixes them at the correct layer (the engine that regenerates
the system), then re-verifies the artifacts.

## Root causes (confirmed with evidence)

### 1. Palette drift — `#daa743` instead of `#f5a623`
- The engine generates its primary ramp with `generate(seed.colorPrimary,
  {theme:"dark", backgroundColor:"#0b0b0c"})` (`engine/derive.ts:294` →
  `engine/palette.ts:generate`).
- **In the dark algorithm the ladder re-derives the base** by mixing with the
  dark canvas: `generate('#f5a623', {theme:"dark"})` → step-6 = **`#daa743`**.
  The seed only sets the hue, not the output base.
- In the light algorithm the base is preserved: `generate('#f5a623',
  {theme:"default"})` → step-6 = **`#f5a623`** (verified).
- Resulting inconsistency: `theme.json` is written from the **raw seed**
  (`tokensToThemeJson` uses `seed.colorPrimary` = `#f5a623`, `export.ts:48`),
  but `variables.css`, `tokens.*.json`, and the kit inline CSS are written from
  the **derived** tokens (`#daa743`). The eye never sees `#f5a623`.
- Registered `#9a9aa3` (muted), `#26262b` (hairline), `#141417` (surface) also
  have zero hits in `system/*.css` / `system/*.json` — the neutral ramp is
  emitted from Ant-style neutral alphas, not the registered palette.

### 2. Toggle shows no difference — both kit files are dark
- `brand.html` preview builds a Light/Dark tab control that swaps the kit iframe
  between `sys.kitHref` (`system/kit.html`, labeled **"Light"**,
  `kit-i18n.ts:83`) and `sys.kitDarkHref` (`system/kit.dark.html`,
  `kit-render.ts:121-122`; toggle JS `brand.html:691-702`).
- `seedPrefersDark(seed)` is true (`colorBgBase #0b0b0c`, `colorTextBase
  #f5f2e8`), so `defaultThemeAlgorithm` returns `"dark"` (`derive.ts:110-120`).
  Thus `kit.html` (default) AND `kit.dark.html` are both generated with the dark
  algorithm — **byte-identical except title + label chip** (verified `diff`).
- So "Light" loads a dark page; "Dark" loads the same dark page. Nothing to toggle.

### 3. Constraint: `system/` is wiped on every finalize
- `system.ts:152-155` `rmSync`s the `system/` outDir then rewrites from engine
  output. Any hand-added file inside `system/` is removed on the next
  `od brand finalize`. Fixes must therefore live in the engine or a documented
  post-finalize step — not as hand-edited files under `system/`.

## Fix plan

### Fix A — Pin the primary base to the registered accent (palette drift)
- [ ] **A1** In `engine/derive.ts` (or the states mapping), set the primary base
  to `seed.colorPrimary` (#f5a623) for **both** algorithms instead of the
  dark-ladder step-6, and derive hover/active/text from the seed:
  hover `#ffc24d`, active `#cf8213`, text `#824400` (dark-canvas) — matching the
  brand amber family already validated in `light-theme.html`.
- [ ] **A2** Confirm `--brand-color-primary` and `palette-6` render as `#f5a623`
  in `variables.css`, `variables.dark.css`, `tokens.*.json`, and the kit inline
  block after regeneration.

### Fix B — Emit a real light kit and wire the toggle to it
- [ ] **B1** Generate a light kit page (`system/kit.light.html`) using the
  `"default"` algorithm with the paper inversion seed so its canvas is light
  (`bg-container #f5f2e8`, text `#272726`, primary `#f5a623`). Reuse the
  already-validated light token set from `light-theme.html` / `/tmp/light-vars.css`.
  Keep all component markup identical so kit coverage is unchanged.
- [ ] **B2** Update the preview so the Light tab points at the light kit:
  change `kit-render.ts` to expose `kitLightHref` (default
  `system/kit.light.html`) and point the Light tab there, keeping Dark →
  `system/kit.dark.html` (and Dark stays the brand's dark-first canvas).
- [ ] **B3** Keep dark-first posture intact: `kit.html`/`tokens.default.json`
  remain the dark default; the toggle's Light tab is the light kit, Dark tab is
  the dark kit.

### Fix C — Reconcile the neutrals to the registered palette
- [ ] **C1** Ensure the shipped neutral ramp includes the registered muted
  `#9a9aa3`, hairline `#26262b`, and surface `#141417` (as the layout/border/fill
  base) rather than only Ant neutral alphas. Verify presence in `variables.css`.

### Fix D — Regenerate + verify (in this repo, then via daemon)
- [ ] **D1** Build the daemon changes, then run `od brand preview` +
  `od brand finalize` to regenerate `DESIGN.md`, `guide.md`, `system/*`, `brand.html`.
- [ ] **D2** Verify: (a) Light tab renders paper `#f5f2e8`; Dark tab renders ink
  `#0b0b0c` — visibly different; (b) `palette-6`/primary = `#f5a623` in shipped
  CSS; (c) `#9a9aa3`/`#26262b`/`#141417` present; (d) light contrast pairs still
  pass (ink-on-amber 9.71:1, `#824400` on paper ≥6.75:1); (e) the light kit
  survives finalize (engine-generated, not hand-added).

## Decisions (resolved — recommended defaults in parentheses)
- **Dark-first default stays.** The design system's default remains dark; the
  toggle's Light tab shows the light kit (matches brand posture "dark-first
  canvas; light inversion shipped as light-theme.html").
- **Primary must be `#f5a623`.** Force it at the derive layer in both themes
  (Fix A). Do not accept `#daa743`.
- **Light kit is engine-generated** (`system/kit.light.html`) so it survives
  finalize, rather than a hand-patched file that gets wiped.

## Open questions (only if you want a different layer)
- [ ] Prefer keeping the fix entirely inside the design-system project (no daemon
  source change)? If so, the fallback is a documented post-finalize patch script
  that re-writes the primary + regenerates `kit.light.html` and patches
  `brand.html` after each finalize — less durable. State your preference.

## Next step
Confirm the layer choice (engine fix in this repo vs. post-finalize patch), then
hand off to Design mode to implement Fixes A–D, or edit this file and I'll
continue from your changes.