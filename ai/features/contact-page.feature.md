# Feature: Contact Page

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

Let visitors send a message that's persisted to Supabase, with client-side validation
and clear success/failure feedback.

### In scope
- `/contact` route
- Form: name, email, message
- Client-side validation before submit
- `INSERT` into Supabase `messages` table
- Success/failure feedback UI

### Out of scope
- Reading/managing messages (Back Office feature)
- Any server-side validation/backend (Supabase RLS is the only server-side gate)
- Header/Footer/routing (already built — see `header-footer.feature.md`)

## Requirements Breakdown & User Flow

1. Visitor navigates to `/contact`.
2. Fills name, email, message.
3. Submits — if any field is empty or email is malformed, sees an inline error, no
   network call fires.
4. On valid submit, an `INSERT` is sent to Supabase `messages` table via
   `src/lib/supabaseClient.js`.
5. On success: green success message shown, form fields cleared, message
   auto-dismisses after a few seconds.
6. On failure (network/Supabase error): red failure message shown, form fields
   retained so the user doesn't lose their input.

## Interfaces Involved

- `src/pages/Contact.jsx` / `Contact.css`
- `src/lib/supabaseClient.js`
- Supabase table: `messages` (columns: `id`, `name`, `email`, `message`, `created_at`)

## Data, Validation & Expected Behavior

- All three fields required; submission blocked client-side if any are empty.
- Email validated against a standard email pattern.
- Validation errors rendered near the relevant field or as a summary (e.g., "Please
  fill in all fields").
- Submit button disabled while a request is in flight (prevents double-submit).
- Payload sent: `{ name, email, message }` only — no extra fields.
- RLS on `messages` allows public `INSERT`, denies public `SELECT` (enforced at the
  Supabase level, not just in the UI).
- If `isSupabaseConfigured` is `false` (no `.env` set up), the form still validates
  and shows a failure message on submit rather than crashing — the existing
  `supabaseClient.js` fallback already guarantees `supabase` is `null` in that case.

## Acceptance Criteria

- [x] Accessible at `/contact`
- [x] Name (text), email (email), message (textarea) fields, all labeled
- [x] Empty-field submission blocked with a visible error
- [x] Invalid email format blocked with a visible error
- [x] Valid submission calls `supabase.from('messages').insert(...)` with
      `{ name, email, message }` — verified against the live Supabase project
      (real `201` response)
- [x] Success: distinct visual success message, form resets, message disappears
      after a few seconds or next interaction — verified end-to-end against live
      Supabase via Playwright
- [x] Failure: distinct visual failure message, form retains user input (verified
      both via the "Supabase not configured" path and is the same failure UI a real
      Supabase error would trigger)
- [x] Public role cannot `SELECT` from `messages` — verified live: anon `SELECT`
      returns `401 permission denied for table messages` (no `SELECT` grant exists
      for `anon`, so this is blocked at the Postgres permission layer, not just RLS)

## Status Note

Feature complete and fully verified end-to-end against the live Supabase project:
- Real insert: `POST /rest/v1/messages` → `201`, success message shown, form reset
- Real RLS/permission check: `GET /rest/v1/messages` as `anon` → `401`
- `.env` configured locally with the project's URL and publishable (anon) key
