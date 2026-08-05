# Feature: Home Page

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

Introduce the developer — name, role, a short bio, technical skills, and soft skills —
as the landing page recruiters see first.

### In scope
- Root route (`/`)
- Introduction section (name, title/tagline, bio paragraph)
- Technical skills section (≥3 skills, icon + supporting text each)
- Soft skills section (≥3 skills, icon + supporting text each)
- ≥2 AI-generated images

### Out of scope
- Education/work/project history (Portfolio page)
- Contact form (Contact page)
- Header/Footer/routing (already built — see `header-footer.feature.md`)

## Requirements Breakdown & User Flow

1. Visitor lands on `/` by default.
2. Sees name + role/tagline + intro paragraph.
3. Scrolls to see technical skills, then soft skills, each visually separated.

## Interfaces Involved

- `src/pages/Home.jsx` / `Home.css`
- Static content only — no Supabase calls on this page

## Data, Validation & Expected Behavior

- No dynamic data; all content is static JSX/text authored by the developer.
- Each skill entry: icon + name + 1–2 sentence description (not a bare word).
- ≥3 distinct visual sections, separated by spacing/background/divider.
- ≥2 images generated via an AI tool, each with descriptive `alt` text; tool used
  documented in this file.

## Acceptance Criteria

- [ ] Accessible at `/` and is the default route
- [ ] Name is prominently displayed
- [ ] Role/title/tagline is visible
- [ ] Intro paragraph present
- [ ] ≥3 technical skills, each with icon + supporting text, in a grid/card/list layout
- [ ] ≥3 soft skills, same structure
- [ ] ≥3 visually distinct, separated sections total
- [ ] ≥2 AI-generated images, relevant, with `alt` text, tool documented

## Status Note

Images are pending — two `.image-placeholder` blocks mark where they go (intro
section, end of soft skills section), each with a `TODO` comment showing the exact
`<img>` markup to swap in. Not done until real AI-generated images replace them and
the tool used is documented here.
