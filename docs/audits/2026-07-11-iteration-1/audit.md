# Iteration 1 baseline audit

## Audit scope

Homepage entry, tool selection, and transition into the detailed tool directory at 1280px. Accessibility observations from screenshots are risks, not a WCAG compliance claim.

## User goal

Recognize the available tools and open the right one with minimal hesitation.

## Evidence

1. `01-start.png` — strong first impression, concrete product imagery, clear headline, and five visible tool destinations.
2. `02-tool-directory.png` — the second tool index repeats the choice already offered in the hero before the useful PDF detail begins.

## Highest-leverage findings

- Conversion: remove the duplicate chooser so visitors move directly from the hero into tool detail.
- Usability: the hero cards look selectable but their small secondary labels describe categories rather than the action; show “Open” and make the new-tab behavior explicit to assistive technology.
- Performance and trust: the privacy-led page still loads its font from Google; self-host the existing Onest font without changing typography.

## Evidence limits

Screenshots do not prove screen-reader announcements, complete keyboard behavior, contrast ratios, or performance outcomes. Verify those in code and the rendered page after implementation.

## Implemented outcome

- `03-after.png` — accepted desktop result with the same hero identity, explicit `Open ↗` actions, and no second chooser.
- `04-mobile-320.png` — accepted 320px result with no page-level horizontal overflow.
- `05-comparison.png` — matched-viewport before/after comparison used for final visual review.
- Rendered checks confirmed the local Onest font is active, no Google Fonts links remain, all five tool actions are present, and no console errors were introduced.
