# Hero Tool Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the spherical, overlapping hero artwork with a polished interactive showcase of all five BusinessPress tools.

**Architecture:** Static HTML renders a fully functional set of tracked external tool links and a default PDF preview. Small progressive-enhancement JavaScript updates the main preview on selector hover or focus; CSS owns the sphere-free composition and responsive horizontal selector rail.

**Tech Stack:** Semantic HTML, CSS with existing OKLCH tokens, vanilla JavaScript, Node's built-in test runner.

## Global Constraints

- Preserve the approved hero copy, calls to action, tracking parameters, external-link behavior, and local screenshots.
- Remove orbit, sphere, blob, overlapping side-preview, and rotation treatments.
- Never crop or animate screenshots; use full images with `object-fit: contain`.
- Keep selector links functional without JavaScript and at least 44px tall.
- Keep WCAG 2.2 AA focus, contrast, and reduced-motion behavior.

---

### Task 1: Sphere-free tool deck structure and visual system

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `public/index.html`
- Modify: `public/assets/css/site.css`

**Interfaces:**
- Consumes: the existing five tracked tool URLs and local WebP screenshots.
- Produces: `[data-tool-deck]`, `[data-tool-preview-image]`, `[data-tool-preview-domain]`, `[data-tool-preview-category]`, and five `[data-tool-preview-option]` links for JavaScript enhancement.

- [ ] **Step 1: Write the failing structural test**

Add a test that requires the tool deck, five preview options, cache-busted CSS/JS, and rejects `.orbit`, `.preview-side`, radial hero backgrounds, and rotated hero previews.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site.test.mjs`

Expected: FAIL because the old orbit and side-preview hero is still present.

- [ ] **Step 3: Implement the semantic hero deck and CSS**

Replace the current `.hero-visual` contents with a `.tool-deck` containing one full preview frame and five tracked selector links. Update the hero field, frame, selector, active, focus, tablet, and mobile styles; delete all orphaned orbit, side-preview, blob, and rotation rules. Bump `site.css` to `?v=9` and `site.js` to `?v=2`.

- [ ] **Step 4: Run the tests**

Run: `node --test tests/site.test.mjs`

Expected: the new structural test passes and any link-count expectation identifies the intentional fourth tracked link per tool.

- [ ] **Step 5: Commit the structural redesign**

```bash
git add public/index.html public/assets/css/site.css tests/site.test.mjs
git commit -m "redesign hero as tool deck"
```

### Task 2: Progressive preview interaction and verification

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `public/assets/js/site.js`

**Interfaces:**
- Consumes: preview-option dataset keys `previewSrc`, `previewAlt`, `previewDomain`, and `previewCategory`.
- Produces: `activateToolPreview(option)` and `is-active` selector state on pointer entry and keyboard focus.

- [ ] **Step 1: Write the failing interaction contract test**

Read `public/assets/js/site.js` and assert that it queries `[data-tool-deck]`, defines `activateToolPreview`, handles `pointerenter` and `focus`, and updates the preview image `src` and `alt` plus the domain/category text.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site.test.mjs`

Expected: FAIL because preview behavior is not yet implemented.

- [ ] **Step 3: Implement minimal progressive enhancement**

Add one guarded tool-deck initializer. The activation function removes `is-active` from all options, adds it to the selected option, and copies its dataset values into the main preview. Bind the same function to `pointerenter` and `focus`; do not prevent link activation.

- [ ] **Step 4: Run automated and detector checks**

```bash
node --test tests/site.test.mjs
node /Users/robertakukyte/.codex/skills/impeccable/scripts/detect.mjs --json public/index.html public/assets/css/site.css public/assets/js/site.js
git diff --check
```

Expected: all tests pass, detector findings are reviewed and resolved where applicable, and the diff has no whitespace errors.

- [ ] **Step 5: Verify the experience in a browser**

Serve `public/` locally and inspect desktop, tablet, and mobile widths. Confirm no horizontal page overflow, full screenshots, five visible selector links, pointer/focus preview switching, tracked links opening in new tabs, visible focus, reduced-motion compatibility, and no console errors.

- [ ] **Step 6: Commit, push, and verify production**

```bash
git add public/assets/js/site.js tests/site.test.mjs
git commit -m "add hero tool preview interaction"
git push origin main
```

Confirm Forge deployed the pushed commit and that production serves the sphere-free deck, `site.css?v=9`, `site.js?v=2`, tracking snippet, and all five selector links.
