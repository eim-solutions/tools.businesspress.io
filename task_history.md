# Task History

## Summary

- Total Tasks Completed: 3
- Total Iterations: 1
- Score Progression: 89/120 → 93/120
- Visual Diffs Shipped: 1
- Lenses Used: First-time visitor

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
