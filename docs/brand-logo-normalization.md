# Brand logo normalization (CMS ↔ frontend)

Brand logos come from media kits in many shapes, sizes, and aspect ratios. This doc describes how we **normalize** them so a "regular" user can upload any logo and the site shows it cleanly inside a consistent frame **without clipping**.

## Contract

- **Frame** = the visible card area. Its **aspect ratio** is set per card by **Logo Fit** (standard / wide / tall).
- **Normalization** = the logo is always **fully visible** inside the frame:
  - No cropping of the logo.
  - Letterboxing (empty space) is allowed so the logo fits.
  - Optional **Logo Position** (center / top / bottom) controls where the logo sits when letterboxed.
  - **Logo Size** (0.5–1) controls how much of the frame the logo is allowed to fill; values &gt; 1 are not used (they would clip).

## CMS (this repo)

- **Brand** document: `logo` (image, hotspot). No changes required; uploads stay as-is.
- **Homepage → Shop by Brand** entries (Brand Card):
  - **Logo Fit**: Frame aspect — Standard (3.6:1), Wide (4.8:1), Tall (2.8:1).
  - **Logo Position**: Alignment when letterboxed — Center, Top, Bottom.
  - **Logo Size**: 0.5–1 only (validation). How much of the frame the logo fills.
  - **Logo Background**: White / Transparent / Gray.

Logo Scale values above 1 are no longer allowed; the frontend clamps to 1 so existing data does not clip.

## Frontend (dolphin-website)

- **Image URL**: `getBrandLogoUrl(source, logoFit)` requests dimensions that **match the frame aspect** (e.g. standard → 360×100) with `fit('max')`, so the CDN returns a letterboxed image that matches the card.
- **Layout**: Logo is rendered with `object-contain` inside the frame. No `transform: scale()` that could clip; **Logo Size** is applied via `max-width` / `max-height` so the logo can only shrink within the frame.
- **Position**: `object-position` is set from **Logo Position** (center / top / bottom).

## Summary

| Control        | CMS (Brand Card)     | Frontend behavior                                      |
|----------------|----------------------|---------------------------------------------------------|
| Frame shape    | Logo Fit             | Aspect ratio + CDN request size                         |
| Clipping       | —                    | Never: contain-only, size ≤ 1                           |
| Letterbox align| Logo Position        | `object-position`                                       |
| Logo “size”    | Logo Size (0.5–1)    | max-width/max-height % (no scale &gt; 1)                 |
