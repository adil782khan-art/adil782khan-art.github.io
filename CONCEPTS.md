# Challenging Concepts

Three concepts I found genuinely challenging while building this project, why, and
where they show up in the code.

## 1. Row Level Security (RLS) + Postgres grants working together

**Purpose in the project**: The `messages` table needs different access for
different roles — anyone (even logged-out visitors) can submit a contact form
message (`INSERT`), but only the logged-in admin can read or delete messages
(`SELECT`/`DELETE`). This is enforced entirely at the database level, since there's
no custom backend server to put that logic in.

**Why it was challenging**: I assumed writing an RLS policy (`create policy ... for
insert to anon`) was the whole story. It isn't — Postgres has a separate, older
privilege system (`GRANT`/`REVOKE`) that sits *underneath* RLS. A policy only
controls *which rows* a role can touch; the `GRANT` controls whether the role can
touch the table *at all*. I hit this directly: the Contact form kept failing with a
`permission denied` error even after the `INSERT` policy existed, because I hadn't
also run `grant insert on table messages to anon;`. RLS and grants have to agree,
and the error messages don't always make that relationship obvious.

**Usage location**:
- `src/pages/Contact.jsx:64` — the `insert` call that depends on the `anon` role
  having both the RLS policy and the `INSERT` grant
- `src/pages/BackOffice.jsx:46` (`select`) and `:64` (`delete`) — same pattern, but
  for the `authenticated` role instead

## 2. Preventing a "flash of protected content" with async auth checks

**Purpose in the project**: `/login` should skip straight to `/backoffice` if
you're already logged in, and `/backoffice` should never show real data to someone
who isn't authenticated — not even for a split second while the check is running.

**Why it was challenging**: Checking a Supabase session is asynchronous
(`supabase.auth.getSession()` returns a Promise), but React renders synchronously
on mount. If you naively render the page first and redirect after the check
resolves, there's a brief window where the wrong thing renders — either an
unauthenticated user sees a flash of admin content, or an already-logged-in admin
sees the login form for a moment before bouncing away. I also ran into a linting
rule (`react-hooks/set-state-in-effect`) that flagged calling `setState`
synchronously inside `useEffect`, which forced me to restructure the initial state
itself (`useState(isSupabaseConfigured)`) rather than setting it inside the effect
body.

**Usage location**:
- `src/pages/Login.jsx:14` (initial state) and `:19-31` (the session check effect)
- `src/pages/BackOffice.jsx:10` and `:20-33` — same pattern, guarding the whole
  page instead of just redirecting away from login

## 3. Event bubbling with nested clickable elements

**Purpose in the project**: In the Back Office table, clicking anywhere on a row
opens a modal with that message's details — but each row also has its own "View"
and "Delete" buttons inside it.

**Why it was challenging**: Buttons nested inside a clickable row don't get their
own isolated click events by default — a click on the "Delete" button also
triggers the row's `onClick`, because DOM click events bubble upward from the
element clicked to every ancestor that's listening. Without accounting for this,
deleting a row would also pop open the view modal for a message that's about to be
removed. The fix is calling `event.stopPropagation()` inside the button handlers
so the click never reaches the row's handler.

**Usage location**:
- `src/pages/BackOffice.jsx:116` (row `onClick`)
- `src/pages/BackOffice.jsx:125-133` (View button) and `:137-145` (Delete button) —
  both call `event.stopPropagation()` before doing their own thing
