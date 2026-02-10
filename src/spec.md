# Specification

## Summary
**Goal:** Keep the Page 1 “No” button continuously visible while moving, upgrade fireworks to a live bursting animation on Pages 2–3, and replace the Page 3 finale video with the uploaded image.

**Planned changes:**
- Update Page 1 “No” button behavior so it moves continuously without disappearing/flickering, stays within viewport/container bounds, and still relocates immediately on click/tap.
- Replace the static/pulsing fireworks overlay with a continuously running “live fireworks bursts” animation on Page 2 (Celebration) and Page 3 (Finale), ensuring it doesn’t block interaction with foreground content and performs smoothly.
- Update Page 3 (Finale) to render `IMG_6912.jpeg` as the centered media (instead of a video) while keeping the caption “This could be us🤭” and existing Valentine/fireworks styling; add a non-blocking fallback message if the image can’t be loaded.
- Update `frontend/README.md` to document that Page 3 uses an image (not a video), including the expected filename `IMG_6912.jpeg` and the required placement path under `frontend/public`.

**User-visible outcome:** On Page 1, the “No” button stays visible while moving and jumps to a new spot when clicked; on Pages 2–3, fireworks appear as live, repeated bursts; and the finale page shows the uploaded image with the existing caption and styling.
