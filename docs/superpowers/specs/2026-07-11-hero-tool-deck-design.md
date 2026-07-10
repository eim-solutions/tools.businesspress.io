# Hero tool deck redesign

## Goal

Replace the decorative orbit-and-overlap hero visual with a clear product showcase that helps visitors understand the five BusinessPress tools immediately. Preserve the approved hero copy, calls to action, brand palette, full screenshots, tracking, and external-link behavior.

## Chosen direction

Use an interactive tool deck: one large, uncropped active screenshot above a five-item selector rail. Each selector shows a compact full screenshot, tool name, and job category. Hovering or focusing a selector updates the large preview; activating it opens the corresponding tracked tool link in a new tab.

This direction is preferred over a static contact sheet because the primary screenshot stays legible, and over a carousel because it adds no autoplay, hidden content, or unnecessary controls.

## Visual design

- Remove the orbit elements, circular hero pseudo-element, amorphous backing shape, overlapping side previews, rotation, and spherical/radial decoration.
- Keep the committed deep-blue hero but use a restrained linear tonal field instead of decorative objects.
- Present the active preview in a crisp rectangular frame with a compact domain/category bar.
- Place five equal selector links below the frame. The active selector uses the established BusinessPress blue and a clear outline/background state; other selectors remain quiet but legible.
- Show every screenshot in full with `object-fit: contain`; never crop or animate the images.
- Retain existing compact radii, low-blur shadows, Onest typography, and blue/white hierarchy.

## Interaction and accessibility

- Selector links remain fully functional tracked external links without JavaScript.
- JavaScript progressively enhances pointer hover and keyboard focus by swapping the large preview image, domain, and category.
- The active state changes on the selector surface only; screenshots never scale, rotate, or animate on hover.
- Selector links keep a minimum 44px touch target and visible focus treatment.
- On mobile the selector rail becomes a horizontally scrollable, snap-aligned row so labels and screenshots remain usable without shrinking excessively.
- Reduced-motion behavior remains intact; the preview swap is immediate.

## Verification

- Regression tests must reject the old orbit, blob, rotated side-preview markup and styles.
- Tests must confirm five tracked hero selector links, local screenshots, preview data, cache-busted assets, and responsive selector styles.
- Browser review covers desktop, tablet, and mobile layout, keyboard focus, selector preview swapping, external links, overflow, console errors, and production rendering after deployment.
