# Feature: Login Page

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

A hidden admin login using Supabase Auth, reachable only by direct URL, gating access
to the Back Office.

### In scope
- `/login` route (not in any nav)
- Email + password form
- `supabase.auth.signInWithPassword()`
- Redirect to `/backoffice` on success, error message on failure

### Out of scope
- Account creation/sign-up (admin is pre-created in Supabase dashboard)
- Password reset flow
- The Back Office page itself (separate feature — see `back-office.feature.md`)
- Header/Footer/routing (already built — see `header-footer.feature.md`)

## Requirements Breakdown & User Flow

1. Admin manually types `/login` (or `/#/login` with HashRouter) into the browser.
2. Enters `admin@codeboxx.com` / `C0deB0xx4dm!n`.
3. Submits → `supabase.auth.signInWithPassword()` called.
4. Success: session established, redirected to `/backoffice`; refreshing the page
   later keeps the session (no re-login needed).
5. Failure: red "Invalid login credentials" message shown, stays on `/login`.
6. If a valid session already exists and the admin revisits `/login`, they're
   redirected straight to `/backoffice`.

## Interfaces Involved

- `src/pages/Login.jsx` / `Login.css`
- `src/lib/supabaseClient.js`
- Supabase Auth (email/password provider)
- `/backoffice` route (destination only — the page itself is a separate feature; a
  minimal placeholder is added to `App.jsx` so the redirect has somewhere to land)

## Data, Validation & Expected Behavior

- Email input `type="email"`, password input `type="password"`, both required.
- On submit, calls `supabase.auth.signInWithPassword({ email, password })`.
- Session persistence relies on Supabase's default local storage session handling —
  no custom token storage.
- Route is excluded from `Header`, `Footer`, and mobile nav markup entirely (not just
  visually hidden) — already true today since `Header.jsx`'s `navItems` never
  included it.
- On mount, if a session already exists, redirect to `/backoffice` immediately
  instead of rendering the form.

## Acceptance Criteria

- [x] Accessible only at `/login` via direct URL — absent from all nav markup
- [x] Email input (`type="email"`), password input (`type="password"`), submit button
- [x] Valid credentials → `signInWithPassword` succeeds → redirect to `/backoffice`
- [x] Session persists across a page refresh
- [x] Existing valid session on `/login` → immediate redirect to `/backoffice`
- [x] Invalid credentials → visible red error message, no redirect

## Status Note

Feature complete and verified end-to-end against the live Supabase project via
Playwright, using the real admin account (`admin@codeboxx.com`): invalid login shows
an error and stays on `/login`; valid login redirects to `/backoffice`; the session
survives a page refresh; revisiting `/login` while authenticated redirects
immediately instead of re-showing the form.

A minimal `BackOffice.jsx` placeholder (`<h1>Back Office</h1>`) was added as the
redirect destination — the real Back Office page is a separate feature
(`back-office.feature.md`).
