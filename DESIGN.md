# Design System

## Direction

Mood: a precision workshop under electric-blue light—deep ink confidence in the hero, calm white product surfaces, and decisive cobalt signals. The direction follows the upcoming BusinessPress brand's operational confidence and vivid blue actions, using one bold opening field before settling into a bright, catalog-like composition built around real tool screenshots.

## Color

Use OKLCH values throughout.

- Background: `oklch(1 0 0)`
- Surface: `oklch(0.965 0.012 264)`
- Ink: `oklch(0.18 0.025 264)`
- Muted ink: `oklch(0.44 0.025 264)`
- Primary sky: `oklch(0.72 0.14 264)`
- Primary dark: `oklch(0.36 0.16 264)`
- BusinessPress blue: `oklch(0.51 0.23 264)`
- Line: `oklch(0.88 0.018 264)`

The strategy is a committed BusinessPress blue system: white owns the canvas, cobalt marks decisive actions, deep blue identifies the collection, and each tool may retain one supporting screenshot tint.

## Typography

Use the native system sans-serif stack so the directory feels consistent with the wider BusinessPress tool family on every platform. Use weight and scale—not a second decorative family—to create contrast.

- Display: 700–800, fluid `clamp()`, maximum 70px, tracking no tighter than `-0.035em`
- Headings: 650–750, balanced wrapping, with product headings capped near 41px
- Body: 400–500, 1.6 line height, maximum 68ch
- Labels: 650, compact sentence case; avoid repeated tracked uppercase kickers

## Layout

- Maximum content width: 1240px with fluid side padding.
- Hero: full-bleed deep-blue field with an asymmetric two-column composition and stacked preview specimen.
- Product directory: alternating full-width showcase rows instead of interchangeable cards.
- Product previews: full uncropped screenshots capped at 620px wide so the interface remains legible without dominating each row.
- Use generous section spacing and tighter internal groupings.
- On small screens, collapse showcases to a single column and keep the launch action close to the product title.

## Components

- Wordmark: compact BP monogram plus “BusinessPress Tools”.
- Primary button: BusinessPress blue fill on light surfaces and near-white fill on the dark hero, modest radius, strong focus ring.
- Secondary text link: ink with animated directional arrow; underline on hover/focus.
- Product screenshot frame: browser-like chrome, subtle border, restrained shadow, real captured interface.
- Tool index: tool name with a short job category; avoid decorative numbering.
- Footer: minimal ownership line and repeated direct tool links.
- Geometry: compact 10–16px radii and crisp, low-blur shadows; avoid inflated cards and decorative metrics.
- Navigation: descriptive destinations with 44px minimum touch targets and complete hover, focus, and active states.

## Motion

One coordinated first-load sequence may settle hero copy and the preview stack into place without hiding content. Product screenshot frames respond through color and shadow rather than moving the image. Disable transforms and reveal delays under `prefers-reduced-motion: reduce`.

## Responsive Behavior

- 320–639px: single column, 20px gutters, screenshot below copy, full-width primary actions.
- 640–959px: single-column showcases with larger preview frames.
- 960px and above: asymmetric hero and alternating 5/7 showcase columns.

## Imagery

Use current screenshots from the five live BusinessPress tools. Show each full capture without cropping, scale the frame instead of trimming the interface, compress to WebP, and provide outcome-focused alt text.

## Copy

Name the task and the outcome in plain language. Prefer concrete verbs such as check, validate, calculate, create, and open. Keep action labels consistent, avoid describing the interface itself, and make external destinations clear through standalone link text.
