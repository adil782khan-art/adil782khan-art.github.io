# Feature: Link Page

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

A curated list of useful links (GitHub, LinkedIn, other projects, articles, etc.)
presented as structured cards.

### In scope
- `/links` route
- ≥3 link cards: image, title, short description, clickable URL (new tab)
- ≥1 AI-generated image

### Out of scope
- Contact form, portfolio content
- Header/Footer/routing (already built — see `header-footer.feature.md`)

## Requirements Breakdown & User Flow

1. Visitor navigates to `/links`.
2. Sees a list/grid of cards, each representing an external resource.
3. Clicks a card (or its link) → opens the URL in a new tab, current page stays open.

## Interfaces Involved

- `src/pages/Links.jsx` / `Links.css`
- Static content — no Supabase involvement

## Data, Validation & Expected Behavior

- Each link entry: `{ image, title, description, url }`, rendered as a card.
- `<a href={url} target="_blank" rel="noopener noreferrer">` for every card.
- ≥3 entries minimum.
- ≥1 AI-generated image (thumbnail/decorative), `alt` text present, tool documented
  here.

## Acceptance Criteria

- [x] Accessible at `/links`
- [x] ≥3 link cards rendered (GitHub, LeetCode, LinkedIn)
- [x] Each card has image, title, 1–3 sentence description, clickable URL
- [x] Links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`)
- [x] ≥1 AI-generated image with `alt` text, tool documented

## AI-Generated Image

Generated with **Canva AI** (image generation feature): a central node connected to
four smaller nodes, representing a developer's connections across platforms. Stored
at `src/assets/connection-hub.png`, rendered at the top of the page above the link
cards.

## Status Note

- Card thumbnails are hand-crafted inline SVG icons (consistent with `Header.jsx`'s
  nav icons), not separate image files — satisfies "image (thumbnail or preview)" per
  card without a new dependency.
- All 3 links done: GitHub, LeetCode, and LinkedIn
  (`linkedin.com/in/adilkhandev`, cleaned up with a custom URL).
- Feature complete — all acceptance criteria satisfied.
