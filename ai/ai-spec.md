# AI Specification — Personal Portfolio (adil782khan-art.github.io)

IMPORTANT: This file must be read before implementing any feature. Each feature also has
its own spec in `./ai/features/*.feature.md` — read the relevant one alongside this file
before writing code for that feature.

## 1. Project Identity

**What this is:** A personal portfolio website for the developer, a Full-Stack Development
student transitioning into the job market. Built with React + Vite, deployed as a static
site to GitHub Pages, backed by Supabase for the contact form and admin authentication.
There is no fictional client framing — this is the developer's real professional presence.

**Primary audience:** Recruiters, hiring managers, and technical interviewers evaluating
the developer's work.

### In scope
- Public pages: Home, Portfolio, Links, Contact
- Secret admin flow: Login, Back Office (message inbox)
- Supabase-backed contact form (`messages` table)
- Supabase Auth (email/password) for the single admin account
- Automated CI/CD deploy to GitHub Pages via GitHub Actions
- Responsive layout (desktop top nav / mobile bottom icon nav)
- AI-generated logo and images (documented per feature)

### Out of scope
- Any custom backend server (Node/Express/etc.) — Supabase is the only backend
- Server-side rendering — static SPA only
- Multi-user accounts — one fixed admin user only
- Public registration / sign-up flow
- Payment processing, blogging/CMS, e-commerce

## 2. Architecture & Repo Structure

Root is a GitHub Pages **user site** (`username.github.io`), so it deploys at the domain
root — no sub-path.

```
adil782khan-art.github.io/
├── .github/workflows/deploy.yml   # CI/CD: build + deploy to Pages
├── ai/
│   ├── ai-spec.md                 # this file
│   └── features/*.feature.md      # one spec per feature, read before coding it
├── docs/                          # elevator pitch scripts, feedback
├── LeetCode-Challenges/*.png      # solution screenshots
├── public/                        # static assets (favicon, resume PDF, etc.)
├── src/
│   ├── main.jsx                   # entry, Router setup
│   ├── App.jsx                    # routes + Layout
│   ├── lib/
│   │   └── supabaseClient.js      # single Supabase client instance
│   ├── components/                # shared, reused across pages
│   │   ├── Layout.jsx / .css
│   │   ├── Header.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   └── Modal.jsx / .css
│   ├── pages/                     # one component per route
│   │   ├── Home.jsx / .css
│   │   ├── Portfolio.jsx / .css
│   │   ├── Links.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   ├── Login.jsx / .css
│   │   └── BackOffice.jsx / .css
│   ├── assets/                    # images, AI-generated art, logo
│   ├── App.css
│   └── index.css
├── vite.config.js                 # base: '/'
├── CONCEPTS.md
└── README.md
```

### Routing
- `react-router-dom`, `HashRouter` (avoids GitHub Pages 404-on-refresh issues since Pages
  has no server-side rewrite rules for a static SPA).
- Routes: `/` Home, `/portfolio` Portfolio, `/links` Links, `/contact` Contact,
  `/login` Login (not in nav), `/backoffice` Back Office (not in nav, auth-gated).
- Every route renders inside `Layout` (Header + page content + Footer) — no exceptions.

## 3. Allowed Tech & Constraints

| Concern | Choice |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | react-router-dom, `HashRouter` |
| Backend | Supabase only (DB + Auth). No custom server. |
| Styling | Plain CSS per component (co-located `.css` files), CSS custom properties for shared tokens (colors, spacing) |
| State | React built-ins (`useState`, `useEffect`, `useContext`). No external state library. |
| Env vars | Must be prefixed `VITE_`. Local: `.env` (gitignored). CI: GitHub Actions repo secrets injected via `env:` in the workflow. |
| Deployment | GitHub Actions → `npm ci` → `npm run build` → deploy `dist/` via `actions/deploy-pages` |
| Admin credentials | Fixed: `admin@codeboxx.com` / `C0deB0xx4dm!n`, created manually in the Supabase dashboard — never created programmatically |

Hard constraints:
- `.env` is never committed (verify `.gitignore` before every commit).
- No public `SELECT` on `messages` — only `INSERT` is public; reading messages requires
  an authenticated session (RLS-enforced, not just hidden in the UI).
- The login route is reachable only by typing the URL — it must never appear in `Header`,
  `Footer`, or mobile nav markup.

## 4. Coding Standards

- Functional components + hooks only. No class components.
- One component per file, PascalCase filenames matching the component name
  (`Header.jsx`, not `header.jsx`).
- Co-locate a component's CSS file next to it (`Header.jsx` + `Header.css`), imported
  directly in the component.
- Props destructured in the function signature, not accessed via `props.x`.
- No inline styles except for values computed at runtime. Everything else lives in CSS.
- All Supabase calls go through `src/lib/supabaseClient.js` — never instantiate a
  second client.
- Forms are controlled components; validation happens before any Supabase call fires.
- Every image has a meaningful `alt`. Decorative-only images use `alt=""`.
- Every interactive element must be keyboard reachable (buttons/links, not `<div onClick>`).

## 5. Global Definition of Done

A feature is "done" only when **all** of the following hold:
1. Matches its `./ai/features/*.feature.md` spec's acceptance criteria.
2. Works at both desktop (>768px) and mobile (≤768px) breakpoints — no horizontal
   scroll, no overflow.
3. No console errors/warnings in dev or the built `preview`.
4. Builds cleanly (`npm run build`) with no new lint errors (`npm run lint`).
5. Committed on a `feature/*` branch off `dev`, merged back into `dev` — never a direct
   commit to `main` or `dev`.
6. Manually verified against the live GitHub Pages deploy after merging to `main`, not
   just `localhost`.

## 6. Cross-Feature Rules

- **Layout is universal**: every public page renders through the same `Header` +
  `Footer`. Login and Back Office render through `Layout` too, but those two routes are
  never linked from `Header`/`Footer` nav.
- **Single Supabase client**: imported from `src/lib/supabaseClient.js` everywhere; no
  feature creates its own client instance.
- **Auth state**: Back Office checks the Supabase session on mount before rendering
  anything sensitive; unauthenticated access redirects to `/login` immediately (no
  flash of protected content).
- **Consistent feedback pattern**: success/error messages across the Contact form and
  Login form use the same visual language (green/check for success, red/X for failure)
  — implement this once as a shared pattern, don't reinvent it per feature.
- **AI-generated assets**: every AI-generated image/logo used anywhere in the app must
  be noted in that feature's spec (or `README.md`) with the tool used.
