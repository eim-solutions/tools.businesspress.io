# BusinessPress Tools Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a static, screenshot-led directory for all five BusinessPress tools.

**Architecture:** A semantic static page in `public/index.html` consumes a single stylesheet, a tiny enhancement script, and locally optimized screenshots. Node's built-in test runner verifies content, links, metadata, and accessibility-oriented markup without adding runtime dependencies.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js built-in tests, Forge, Cloudflare, GitHub.

## Global Constraints

- Include exactly the supplied PDF, CSV, VAT, QR, and Clock tool URLs.
- Use current product screenshots rather than invented UI.
- Target WCAG 2.2 AA and respect reduced-motion preferences.
- Keep deployment static and build-step free.

---

### Task 1: Behavioral contract and captured product assets

**Files:**
- Create: `tests/site.test.mjs`
- Create: `public/assets/screenshots/*.webp`

**Interfaces:**
- Consumes: the five supplied production URLs.
- Produces: assertions for page content and stable local screenshot paths used by the page.

- [ ] Write failing tests that require all tool links, semantic landmarks, metadata, image alt text, reduced-motion CSS, and local screenshot files.
- [ ] Run `node --test tests/site.test.mjs` and confirm the page contract fails because the implementation is absent.
- [ ] Capture each live tool at a consistent desktop viewport and convert the captures to WebP.

### Task 2: Static landing page implementation

**Files:**
- Create: `public/index.html`
- Create: `public/assets/css/site.css`
- Create: `public/assets/js/site.js`
- Create: `public/favicon.svg`
- Create: `README.md`

**Interfaces:**
- Consumes: screenshot assets from Task 1.
- Produces: the complete deployable site rooted at `public/`.

- [ ] Implement semantic HTML with hero, tool index, five product showcases, structured data, and footer navigation.
- [ ] Implement the responsive visual system from `DESIGN.md`, including focus-visible and reduced-motion behavior.
- [ ] Add minimal progressive enhancement for the current year and intersection-based entrance choreography.
- [ ] Run `node --test tests/site.test.mjs` and confirm all assertions pass.

### Task 3: Browser verification and repository publication

**Files:**
- Modify only files that fail visual or runtime verification.

**Interfaces:**
- Consumes: locally served `public/` directory.
- Produces: verified responsive page and a GitHub repository under `eim-solutions`.

- [ ] Serve locally and inspect desktop and mobile layouts in Chrome.
- [ ] Check the console, keyboard focus, image loading, page metadata, and all five direct URLs.
- [ ] Initialize git on `main`, commit the complete scoped worktree, create the GitHub repository, and push.

### Task 4: Forge, DNS, and production verification

**Files:**
- No local file changes expected unless deployment verification exposes a defect.

**Interfaces:**
- Consumes: the GitHub main branch.
- Produces: live HTTPS deployment at `https://tools.businesspress.io/`.

- [ ] Provision the site on the supplied Forge server with web directory `/public` and static deployment settings.
- [ ] Add or update the Cloudflare DNS record for `tools.businesspress.io` to the Forge server.
- [ ] Request/activate TLS, deploy the main branch, and verify the public response, screenshots, metadata, and external links.
- [ ] Send the deployment notification to the authenticated Gmail account.
