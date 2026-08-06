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
      `{ name, email, message }` (code path verified — see status note for why the
      actual insert can't be exercised yet)
- [ ] Success: distinct visual success message, form resets, message disappears
      after a few seconds or next interaction — **not yet verified**, requires a
      working Supabase connection
- [x] Failure: distinct visual failure message, form retains user input (verified via
      the "Supabase not configured" path, which exercises the same failure UI as a
      real Supabase error would)
- [ ] Public role cannot `SELECT` from `messages` (verified via RLS policy, not just
      UI) — depends on the Supabase project existing; see status note

## Status Note

- The Supabase project doesn't exist yet (separate manual task, tracked outside this
  feature). Everything client-side is built and verified: field validation, error
  states, the exact `insert` call shape, and graceful failure handling when
  `isSupabaseConfigured` is `false` (confirmed via Playwright — submitting a valid
  form with no `.env` shows the failure UI instead of crashing).
- Once the Supabase project, `messages` table, and RLS policies exist and
  `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` are set in a local `.env`, re-verify:
  a real successful insert (success message + form reset), and that RLS actually
  blocks public `SELECT` (not just that the UI never calls it).
