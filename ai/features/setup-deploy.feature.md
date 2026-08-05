# Feature: Setup & Deploy

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

Scaffold the React+Vite app and get it automatically building and deploying to GitHub
Pages on every push to `main`, with Supabase env vars securely injected at build time.

### In scope
- Vite React scaffold, `base: '/'` config
- GitHub Actions workflow: build + deploy on push to `main`
- GitHub Pages configured to serve from GitHub Actions
- Repo secrets for `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`

### Out of scope
- Any page content or feature logic (covered by other feature specs)
- Supabase project provisioning itself (see the Supabase setup notes in `../ai-spec.md`)

## Requirements Breakdown & User Flow

1. Developer pushes to `main` (via the `feature → dev → main` branch flow).
2. GitHub Actions workflow triggers automatically.
3. Workflow installs deps (`npm ci`), builds (`npm run build`), deploys `dist/` to
   GitHub Pages.
4. Visitor loads `https://adil782khan-art.github.io` and sees the live, built app — not
   a 404 or blank page.

## Interfaces Involved

- `vite.config.js`
- `.github/workflows/deploy.yml`
- GitHub repo Settings → Pages (source: GitHub Actions)
- GitHub repo Settings → Secrets and variables → Actions

## Data, Validation & Expected Behavior

- `vite.config.js` sets `base: '/'`.
- Workflow triggers on `push` to `main` only (not `dev`, not feature branches).
- Workflow steps: checkout → setup-node → `npm ci` → `npm run build` (with
  `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` passed via `env:`) → upload artifact →
  deploy via `actions/deploy-pages`.
- No `.env` file is ever committed; the workflow relies solely on repo secrets.

## Acceptance Criteria

- [ ] `vite.config.js` has `base: '/'`
- [ ] `.github/workflows/deploy.yml` exists and triggers on push to `main`
- [ ] Workflow runs `npm ci`, `npm run build`, deploys `dist/`
- [ ] GitHub Pages source is set to "GitHub Actions" in repo settings
- [ ] `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set as Actions secrets and
      passed to the build step
- [ ] Pushing to `main` triggers a workflow run that completes successfully
- [ ] `https://adil782khan-art.github.io` loads the live app after deploy

Note: routing behavior (HashRouter, per-page paths) is scoped to the
`header-footer` feature, not this one — verify it there.
