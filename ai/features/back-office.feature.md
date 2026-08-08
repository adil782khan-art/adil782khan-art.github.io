# Feature: Back Office

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

An authenticated admin view listing all contact-form submissions, with the ability
to view full details and delete entries, plus logout.

### In scope
- `/backoffice` route (auth-gated, not in nav)
- Fetch + display all rows from `messages`
- Table columns: Name, Email, Date, Actions
- View-message modal
- Delete message
- Logout

### Out of scope
- Editing messages
- Any non-Supabase data source
- Header/Footer/routing (already built — see `header-footer.feature.md`)
- Login itself (already built — see `login-page.feature.md`)

## Requirements Breakdown & User Flow

1. Admin navigates to `/backoffice` after logging in.
2. App checks Supabase session on mount; if none, redirects to `/login` before
   rendering any table content.
3. If authenticated: fetches all `messages`, ordered by `created_at` descending,
   renders in a table.
4. Admin clicks a row/"View" → modal opens showing sender name, email, date/time,
   full message text.
5. Admin closes the modal via the close button, clicking outside, or Escape.
6. Admin clicks delete on a row → row is removed from Supabase and disappears from
   the table immediately.
7. Admin clicks Logout → `supabase.auth.signOut()` called, session cleared,
   redirected to Home or Login.

## Interfaces Involved

- `src/pages/BackOffice.jsx` / `BackOffice.css`
- `src/components/Modal.jsx` / `Modal.css`
- `src/lib/supabaseClient.js`
- Supabase table: `messages`, Supabase Auth session

## Data, Validation & Expected Behavior

- Auth check happens before any data fetch or render of sensitive content (no flash
  of protected UI).
- Fetch failure → visible error message instead of a blank/broken table.
- Empty `messages` table → "No messages yet" placeholder instead of an empty table.
- Delete calls `supabase.from('messages').delete().eq('id', id)`, then removes the
  row from local state immediately so the UI updates without a manual page reload.
- Modal closes on Escape/outside-click/close-button.
- Reading messages requires an authenticated session — the `messages` table's RLS
  currently only grants public `INSERT` (from the Contact feature). This feature
  must add a `SELECT` policy (and `DELETE`) scoped to the `authenticated` role only,
  so the admin session can read/delete but the public `anon` role still cannot.

## Acceptance Criteria

- [x] `/backoffice` while authenticated renders the table (verified live)
- [x] `/backoffice` while **not** authenticated redirects to `/login` before showing
      any data (verified live, both before login and after logout)
- [x] Route absent from all public nav markup (confirmed — `Header.jsx`'s `navItems`
      only has Home/Portfolio/Links/Contact)
- [x] Table columns: Name, Email, Date, Actions (verified live)
- [x] Rows ordered by `created_at` descending (`.order('created_at', { ascending:
      false })` in the query — verified by code, not enough live rows to visually
      confirm ordering)
- [x] Fetch error → visible error message (implemented, verified by code review —
      not exercised live since no fetch failure occurred during testing)
- [x] Empty table → "No messages yet" message (implemented, verified by code review
      — not exercised live since the table always had rows during testing)
- [x] Delete button per row removes it from Supabase and from the UI instantly
      (verified live — seeded a disposable row, deleted it, confirmed removal)
- [x] Row/View click opens a modal with name, email, date/time, full message
      (verified live, both entry points)
- [x] Modal closes via X, outside click, or Escape (X not explicitly tested live but
      identical code path to the tested close handler; outside-click and Escape
      verified live)
- [x] Logout button calls `signOut()`, clears session, redirects to Home or Login
      (verified live — logout redirects to Home, and `/backoffice` requires login
      again afterward)
- [x] `authenticated` role can `SELECT`/`DELETE` on `messages`; `anon` role still
      cannot (verified live via direct API calls with both an admin token and the
      anon key)
