# Design System

## Direction

Mood: a precision workshop under clear daylight—calm surfaces, cyan drafting marks, and decisive warm signals. The aesthetic borrows Stripe's color clarity and Linear's product confidence, but uses a more physical, catalog-like composition built around real tool screenshots.

## Color

Use OKLCH values throughout.

- Background: `oklch(1 0 0)`
- Surface: `oklch(0.965 0.012 200)`
- Ink: `oklch(0.18 0.025 220)`
- Muted ink: `oklch(0.46 0.025 220)`
- Primary sky: `oklch(0.72 0.12 200)`
- Primary dark: `oklch(0.33 0.09 205)`
- Accent coral: `oklch(0.68 0.19 35)`
- Line: `oklch(0.88 0.018 205)`

The strategy is full palette with disciplined roles: white owns the canvas, cyan identifies the collection, coral marks decisive actions, and each tool may have one supporting tint.

## Typography

Use Onest as the single deliberate family, sourced from Google Fonts with a system-sans fallback. Its open forms feel approachable and operational. Use weight and scale—not a second decorative family—to create contrast.

- Display: 700–800, fluid `clamp()`, maximum 84px, tracking no tighter than `-0.035em`
- Headings: 650–750, balanced wrapping
- Body: 400–500, 1.6 line height, maximum 68ch
- Labels: 650, compact sentence case; avoid repeated tracked uppercase kickers

## Layout

- Maximum content width: 1240px with fluid side padding.
- Hero: asymmetric two-column composition with a stacked preview specimen.
- Product directory: alternating full-width showcase rows instead of interchangeable cards.
- Use generous section spacing and tighter internal groupings.
- On small screens, collapse showcases to a single column and keep the launch action close to the product title.

## Components

- Wordmark: compact BP monogram plus “BusinessPress Tools”.
- Primary button: coral fill, near-white text, modest radius, strong focus ring.
- Secondary text link: ink with animated directional arrow; underline on hover/focus.
- Product screenshot frame: browser-like chrome, subtle border, restrained shadow, real captured interface.
- Tool index: numbered navigation with tool name and one-word job cue.
- Footer: minimal ownership line and repeated direct tool links.

## Motion

One coordinated first-load sequence may reveal hero copy and the preview stack. Product screenshots lift subtly on hover. Disable transforms and reveal delays under `prefers-reduced-motion: reduce`.

## Responsive Behavior

- 320–639px: single column, 20px gutters, screenshot below copy, full-width primary actions.
- 640–959px: single-column showcases with larger preview frames.
- 960px and above: asymmetric hero and alternating 5/7 showcase columns.

## Imagery

Use current screenshots from the five live BusinessPress tools. Crop them consistently, preserve recognizable UI, compress to WebP, and provide outcome-focused alt text.
