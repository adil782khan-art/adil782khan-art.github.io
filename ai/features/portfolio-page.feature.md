# Feature: Portfolio Page

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

Show the developer's education, work experience, and projects — the substantive
"here's what I've done" page — plus a downloadable resume PDF.

### In scope
- `/portfolio` route
- Education section (reverse chronological)
- Work experience section (reverse chronological)
- Project section (≥1 project: name, tech, description, image)
- Downloadable resume PDF
- ≥2 AI-generated images

### Out of scope
- Contact form
- Links/resources page content
- Header/Footer/routing (already built — see `header-footer.feature.md`)

## Requirements Breakdown & User Flow

1. Visitor navigates to `/portfolio` from the header.
2. Sees education history, most recent first.
3. Sees work experience, most recent first, with responsibilities/achievements
   described.
4. Sees ≥1 project with name/tech/description/image.
5. Can click a "Download Resume" link/button that serves the PDF from `public/`.

## Interfaces Involved

- `src/pages/Portfolio.jsx` / `Portfolio.css`
- `public/resume.pdf` (static asset — no Supabase involvement)

## Data, Validation & Expected Behavior

- All content static, authored by the developer, reverse-chronological ordering
  enforced in the JSX/data structure.
- Each project entry: name, tech stack, description explaining purpose, and an image.
- Resume link points to a static PDF in `public/`, opens/downloads directly (no
  gating).
- ≥3 visually distinct sections (education, work, projects), separated by
  spacing/background/divider.
- ≥2 AI-generated images complementing the content (avatar, section headers,
  decorative), `alt` text present, tool used documented here.

## Acceptance Criteria

- [x] Accessible at `/portfolio`
- [x] ≥1 education entry with institution, degree/program, dates
- [x] ≥1 work entry with title, org, dates, description of responsibilities/achievements
- [x] Both education and work entries reverse-chronological
- [x] ≥1 project entry with name, tech, description, image (2 projects: CodeBloggs,
      Rocket Elevators)
- [x] Resume PDF is downloadable (`public/resume.pdf`)
- [x] ≥3 distinct, separated sections (Education, Work Experience, Projects)
- [x] ≥2 AI-generated images with `alt` text, tool documented

## AI-Generated Images

Both generated with **Canva AI** (image generation feature):

- `src/assets/resume-icon.png` — laptop displaying a resume with an approval
  checkmark, used at the top of the page near the "Download Resume" button
- `src/assets/career-journey.png` — briefcase connected by a winding path to a
  folder, representing career progression, used as a divider between Work Experience
  and Projects

## Status Note

- Content pulled from the developer's actual resume (education, work, project
  descriptions) — not placeholder text.
- Education dates: Hillsborough Community College graduation is confirmed by the
  developer as "expected December 2026"; Dr. Kiran C. Patel High School graduation
  year (2023) is the developer's best recollection, not resume-confirmed — verify if
  precision matters.
- The 2 required AI-generated images are done (see above). The 2 **project**
  screenshots (CodeBloggs, Rocket Elevators) are still pending — real screenshots of
  the deployed projects, not AI-generated — `.project-image-placeholder` blocks mark
  where they go, each with a `TODO` comment showing the exact `<img>` markup to swap
  in.
