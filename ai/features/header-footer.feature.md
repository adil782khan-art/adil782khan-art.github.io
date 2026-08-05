# Feature: Project Layout (Header & Footer)

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

Provide a consistent site-wide shell — sticky header with navigation + logo, and a
footer with contact/social links — wrapping every page.

### In scope
- `Layout` component wrapping all routed pages
- `Header` with nav links + AI-generated logo
- `Footer` with contact info + copyright
- Responsive nav: horizontal links (desktop) / bottom icon bar (mobile)
- Minimal routing scaffold (`HashRouter`, route table) so the nav links have somewhere
  to go — one placeholder component per route (`Home`, `Portfolio`, `Links`, `Contact`),
  each rendering only a heading with the page name

### Out of scope
- Real page content for Home/Portfolio/Links/Contact — each gets its own feature spec
  and is built on its own feature branch
- Login/Back Office links in nav (explicitly excluded — those routes exist later but
  are never linked from `Header`/`Footer`)

## Requirements Breakdown & User Flow

1. User lands on any route → sees header at top, footer at bottom, page content
   between them.
2. User scrolls → header stays visible (sticky/fixed).
3. User clicks the logo → navigates to `/` (Home).
4. User clicks a nav link → navigates to that route, header/footer stay mounted.
5. On mobile, user sees icon-based nav pinned to the bottom of the viewport instead of
   the horizontal top nav.

## Interfaces Involved

- `src/main.jsx` (wraps `App` in `HashRouter`)
- `src/App.jsx` (route table, wraps routes in `Layout`)
- `src/components/Layout.jsx`
- `src/components/Header.jsx` / `Header.css`
- `src/components/Footer.jsx` / `Footer.css`
- `src/pages/Home.jsx`, `Portfolio.jsx`, `Links.jsx`, `Contact.jsx` (placeholder only)

## Data, Validation & Expected Behavior

- `Header` nav links: Home, Portfolio, Links, Contact (Login/Back Office never included).
- Logo: AI-generated image, `alt="[Name] logo"`, wrapped in a `<Link to="/">`.
- `Footer`: email (mailto link), at least one social link, and a copyright line
  (`© {year} [Name]`).
- Breakpoint at 768px: `>768px` → horizontal top nav; `≤768px` → icon bottom nav,
  header still present for logo/branding.
- Routes: `/` Home, `/portfolio` Portfolio, `/links` Links, `/contact` Contact — each
  placeholder renders only `<h1>{Page Name}</h1>` inside `Layout` until its own
  feature branch fills it in.

## Acceptance Criteria

- [ ] `Header` renders on every route, sticky/fixed at top
- [ ] `Header` contains links to Home, Portfolio, Links, Contact — nothing else
- [ ] Logo is AI-generated, has `alt` text, links to `/`
- [ ] `Footer` renders on every route, contains contact info + copyright
- [ ] At >768px, nav links display horizontally
- [ ] At ≤768px, nav becomes icon-based and sits at the bottom of the viewport
- [ ] No horizontal scrolling or overflow at any viewport width
- [ ] App is wrapped in `HashRouter`; navigating between routes changes only the hash
      (e.g. `/#/portfolio`), never a real path segment
- [ ] All four routes render their placeholder page through `Layout` without errors
