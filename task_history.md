# Task History

## Summary

- Total Tasks Completed: 6
- Total Iterations: 2
- Score Progression: 89/120 → 93/120 → 99/120
- Visual Diffs Shipped: 2
- Lenses Used: First-time visitor, Skeptical buyer

## Iteration 1 — 2026-07-11

- Primary Focus: Conversion
- Secondary Focus: Visual Design
- Perspective Lens: First-time visitor
- Mode: REFINE
- Weakest Link Targeted: Repeating the tool-selection decision between the hero and detailed directory

### Reflection

- Previous task impact ratings: First iteration; no previous batch
- Stagnation detected: No
- Rebuild-from-scratch insight: Keep the real-tool showcase, but let it own the initial choice instead of adding another navigation layer

### Completed

- [x] TASK-001 | Conversion | Removed the duplicate tool chooser below the hero
- What changed: The page now moves directly from the hero into the PDF detail.
- Files modified: `public/index.html`, `public/assets/css/site.css`, `tests/site.test.mjs`
- Business rationale: Removes a repeated decision and shortens the path to product proof.
- Before → After: Two consecutive tool choosers → one chooser followed by useful detail.

- [x] TASK-002 | Usability | Made hero tool tiles explicitly communicate their action
- What changed: Every tile now says `Open ↗` and has a descriptive new-tab label.
- Files modified: `public/index.html`, `tests/site.test.mjs`
- Business rationale: Makes the primary conversion affordance unmistakable for sighted and assistive-technology users.
- Before → After: Category-only secondary text → explicit opening action.

- [x] TASK-003 | Performance | Self-hosted Onest
- What changed: Added local Latin and Latin Extended WOFF2 files plus the SIL Open Font License; removed Google Fonts connections.
- Files modified: `public/index.html`, `public/assets/css/site.css`, `public/assets/fonts/*`, `tests/site.test.mjs`
- Business rationale: Removes a third-party request from a privacy-led page and improves resilience.
- Before → After: Google-hosted typography → locally served typography with the same visual identity.

### Visual Diff

- [x] TASK-001 | Hero-to-directory transition | Removed the pale duplicate tool index so detailed proof starts immediately below the hero.

### Deferred

- [ ] TASK-004 | Privacy proof requires verified shared behavior across all five tools.
- [ ] TASK-005 | Click measurement should be based on the live Stats setup rather than invented events.

### Notes

- Baseline and after screenshots are stored in `docs/audits/2026-07-11-iteration-1/`.
- Next iteration should prioritize verified trust content, not decorative expansion.

## Iteration 2 — 2026-07-11

- Primary Focus: Visual Design
- Secondary Focus: Content
- Perspective Lens: Skeptical buyer
- Mode: REFINE
- Weakest Link Targeted: Privacy-led positioning lacked specific evidence beside the first action

### Reflection

- Previous task impact ratings: TASK-001 HIGH; TASK-002 MEDIUM; TASK-003 MEDIUM
- Stagnation detected: No
- Rebuild-from-scratch insight: Put concise proof beside the decision instead of creating a separate trust section.

### Completed

- [x] TASK-004 | Content | Added verified trust assurances beside the hero actions
- What changed: Added `Free to use`, `No account needed`, and the verified PDF/CSV file-storage assurance.
- Files modified: `public/index.html`, `public/assets/css/site.css`, `tests/site.test.mjs`
- Business rationale: Answers basic cost, signup, and file-handling objections before a visitor opens a tool.
- Before → After: Privacy positioning without evidence → three specific assurances at the first decision point.

- [x] TASK-005 | Conversion | Added granular tool-open measurement
- What changed: The existing Stats property now receives `Tool Open` events with `tool`, `location`, and `element` properties from all 20 tool links.
- Files modified: `public/index.html`, `public/assets/js/site.js`, `tests/site.test.mjs`
- Business rationale: Creates a usable baseline for comparing hero, detail, and footer conversion paths.
- Before → After: Only pageviews and UTM referrals → first-party tool-open events with placement context.

- [x] TASK-009 | SEO / Accessibility | Corrected the directory heading outline
- What changed: Promoted the five tool titles from `h3` to `h2` and retained their visual scale.
- Files modified: `public/index.html`, `public/assets/css/site.css`, `tests/site.test.mjs`
- Business rationale: Makes each product a true top-level section for search engines and assistive technology.
- Before → After: H1 followed by orphaned H3s → a clear H1-to-H2 document outline.

### Visual Diff

- [x] TASK-004 | Hero | Added a quiet proof line below the primary actions without introducing another card or section.

### Deferred

- [ ] TASK-006 | Structured data still requires search evidence.
- [ ] TASK-007 | Task-led labels should wait for a click baseline.
- [ ] TASK-008 | FAQ content still requires observed objections or queries.

### Notes

- Trust claims were checked against the five live tools; PDF and CSV explicitly state in-memory processing without permanent storage.
- Verification: 20/20 tests pass; desktop and 320px browser checks show no horizontal overflow; no console errors were introduced.
