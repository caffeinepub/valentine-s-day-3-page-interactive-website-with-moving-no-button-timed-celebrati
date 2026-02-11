# Specification

## Summary
**Goal:** Keep the “No” button next to “Yes” on the Question page, and make “No” shrink with each click until it disappears after 4 presses.

**Planned changes:**
- Update the Question page layout so “No” is placed adjacent to “Yes” within the existing responsive flex flow (no absolute positioning).
- Remove/stop using the moving/orbiting “No” behavior on the Question page (no translate(x,y) positioning, no requestAnimationFrame-driven motion, no useMovingNoButton-based interaction).
- Add frontend-only click tracking for the “No” button: shrink its visual size on each press, and after the 4th press hide/remove it so it is no longer visible or interactive.
- Ensure the “Yes” button remains unchanged and continues to call the existing onYesClick handler.

**User-visible outcome:** On the Question page, “No” stays next to “Yes”; clicking “No” makes it progressively smaller, and after 4 clicks it disappears and can no longer be clicked.
