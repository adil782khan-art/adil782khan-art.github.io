# Adil Khan — Personal Portfolio

A personal portfolio website built with React and Vite, deployed to GitHub Pages,
with a Supabase-backed contact form and an authenticated admin back office. Built
as the final project of the Full-Stack Development program — no fictional client,
this is my own professional presence.

**Live site**: https://adil782khan-art.github.io

## What this project does

- Showcases who I am, my technical/soft skills, education, work experience, and
  projects (Home, Portfolio pages)
- Links out to my GitHub, LeetCode, and LinkedIn profiles (Links page)
- Lets visitors send me a message through a validated contact form, persisted to a
  Supabase database (Contact page)
- Gives me (and only me) a private admin view to read and manage those messages,
  gated behind Supabase Auth (Login + Back Office pages)

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 8, React Router (`HashRouter`) |
| Backend | Supabase (Postgres database + Auth) — no custom server |
| Styling | Plain CSS per component, CSS custom properties for shared tokens |
| Deployment | GitHub Pages, via a GitHub Actions CI/CD workflow |
| Testing (manual/verification) | Playwright, used during development to verify
  each feature end-to-end against the live Supabase project |

## Project Structure

```
adil782khan-art.github.io/
├── .github/workflows/deploy.yml   # CI/CD: build + deploy to GitHub Pages
├── ai/
│   ├── ai-spec.md                 # global project spec
│   └── features/*.feature.md      # one spec per feature (goal, acceptance criteria)
├── docs/                          # elevator pitch scripts + feedback
├── public/
│   └── resume.pdf                 # downloadable from the Portfolio page
├── src/
│   ├── main.jsx                   # entry point, wraps App in HashRouter
│   ├── App.jsx                    # route table
│   ├── lib/
│   │   └── supabaseClient.js      # single shared Supabase client instance
│   ├── components/                # shared across pages
│   │   ├── Layout.jsx             # Header + page content + Footer
│   │   ├── Header.jsx             # sticky nav, logo, responsive
│   │   ├── Footer.jsx             # contact links + copyright
│   │   └── Modal.jsx              # reusable popup (used by Back Office)
│   ├── pages/                     # one component per route
│   │   ├── Home.jsx               # intro, technical + soft skills
│   │   ├── Portfolio.jsx          # education, work experience, projects, resume
│   │   ├── Links.jsx              # GitHub / LeetCode / LinkedIn cards
│   │   ├── Contact.jsx            # form -> Supabase messages table
│   │   ├── Login.jsx              # hidden admin login (Supabase Auth)
│   │   └── BackOffice.jsx         # authenticated message inbox
│   └── assets/                    # AI-generated images + logo
├── CONCEPTS.md                    # 3 challenging concepts from this project
└── vite.config.js                 # base: '/' for GitHub Pages root deployment
```

## Installation / Setup

Assumes no prior knowledge of this specific setup beyond having Node.js installed.

```bash
# 1. Clone the repo
git clone https://github.com/adil782khan-art/adil782khan-art.github.io.git
cd adil782khan-art.github.io

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below) - copy the example file and fill it in
cp .env.example .env

# 4. Run the dev server
npm run dev
```

Other scripts:
```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Environment Variables

Set in a local `.env` file (never committed — see `.env.example` for the template).
In production, the same two values are stored as GitHub repository secrets and
injected at build time by the deploy workflow.

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | The Supabase project's API URL (Settings → API in the Supabase dashboard) |
| `VITE_SUPABASE_ANON_KEY` | The Supabase project's anon/publishable key — safe to expose client-side, since actual access is governed by Row Level Security policies, not by keeping this key secret |

If these aren't set, the app doesn't crash — `src/lib/supabaseClient.js` falls back
to a `null` client and logs a console warning, and any Supabase-dependent feature
(contact form, login, back office) shows a graceful failure message instead.

## API Documentation

There's no custom backend/API in this project — Supabase's auto-generated REST API
(PostgREST) is used directly from the client via the `supabase-js` library.

**`messages` table**

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key, auto-generated |
| `name` | `text` | From the contact form |
| `email` | `text` | From the contact form |
| `message` | `text` | From the contact form |
| `created_at` | `timestamptz` | Auto-set on insert |

Row Level Security policies:
- `anon` role: can `INSERT` only (the public contact form). Cannot `SELECT`,
  `UPDATE`, or `DELETE`.
- `authenticated` role (the logged-in admin): can `SELECT` and `DELETE`, used by
  the Back Office.

**Auth**: Supabase Auth, email/password provider. One fixed admin account
(`admin@codeboxx.com`), created directly in the Supabase dashboard rather than
through any sign-up flow in the app (there isn't one).

## Author

**Adil Khan**

LinkedIn update: cleaned up my profile for this module — changed the headline from
a generic "Student at Hillsborough College" to one that actually states my stack
(`Full-Stack Developer | React · Node.js · MongoDB`), set a custom profile URL,
wrote an About section summarizing my background, and enabled "Open to Work."

LinkedIn: https://www.linkedin.com/in/adilkhandev/
GitHub: https://github.com/adil782khan-art
