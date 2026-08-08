# Extra Mile: Light & Dark Mode

IMPORTANT: Must be used alongside `../ai-spec.md`.

## Goal

Let visitors manually switch between light and dark themes, on top of the
automatic OS-preference-based theming that already exists.

### In scope
- Toggle button, accessible on every page (placed in the Header)
- CSS custom properties already cover every themed color — no new tokens needed,
  just a way to override which set applies
- Persist the chosen theme in `localStorage`
- Respect the OS/browser `prefers-color-scheme` as the default when no explicit
  choice has been made yet
- Smooth transition when switching
- No flash of the wrong theme on page load

### Out of scope
- A three-way "system / light / dark" selector — this is a simple two-state toggle;
  once a user picks a theme explicitly it stays picked until they toggle again,
  overriding the OS preference from then on
- Any new color tokens — `src/index.css` already defines a full light and dark
  palette via `@media (prefers-color-scheme: dark)`, added when the project was
  scaffolded

## Requirements Breakdown & User Flow

1. First-time visitor with no saved preference: site renders using their OS/browser
   theme preference, exactly as it already does today.
2. Visitor clicks the toggle → theme flips immediately, with a smooth color
   transition (not an instant snap).
3. Choice is saved to `localStorage`. On their next visit (even with a different OS
   theme), the site loads directly in their last-picked theme — with no flash of
   the wrong theme first.
4. Toggle is visible and works identically on every page, since it lives in the
   Header.

## Interfaces Involved

- `index.html` — a small inline script in `<head>`, run before first paint, applies
  any saved theme immediately (this is what prevents a flash of the wrong theme —
  waiting for React to mount and run an effect would be too late)
- `src/index.css` — add `:root[data-theme="dark"]` / `:root[data-theme="light"]`
  override selectors alongside the existing `prefers-color-scheme` media query
- `src/components/ThemeToggle.jsx` / `.css` — the toggle button itself
- `src/components/Header.jsx` — renders `ThemeToggle` so it's present on every page

## Data, Validation & Expected Behavior

- Theme state lives in exactly one place: the `data-theme` attribute on
  `<html>`, plus a mirrored value in `localStorage` under the key `theme`.
- Inline script in `index.html` runs synchronously before any CSS/React loads:
  reads `localStorage.theme`; if it's `"light"` or `"dark"`, sets
  `data-theme` immediately. If nothing is saved, sets nothing and lets the
  existing `prefers-color-scheme` media query decide, same as today.
- `ThemeToggle` computes its initial displayed state the same way (saved value, or
  else `window.matchMedia('(prefers-color-scheme: dark)')`), so the icon always
  matches what's actually rendered.
- Clicking the toggle flips `data-theme` on `<html>`, updates `localStorage`, and
  re-renders the icon.
- CSS specificity handles the override cleanly: `:root[data-theme="light"]` has
  higher specificity than the bare `:root` inside the dark media query, so an
  explicit light choice correctly wins even when the OS prefers dark (and vice
  versa via `:not([data-theme="light"])` guarding the media-query rule).

## Acceptance Criteria

- [x] Toggle button visible and functional on every page (via Header) — verified
      live on Home, Portfolio, Links, Contact, and Login; renders in `Header`,
      which every page shares, so Back Office gets it too
- [x] No new color tokens added — reuses the existing CSS custom properties
- [x] Theme choice persists in `localStorage` across a page refresh — verified live
- [x] With no saved preference, OS `prefers-color-scheme` is respected — verified
      live for both light and dark OS settings
- [x] No flash of the wrong theme on initial page load with a saved preference —
      verified live: `data-theme` is set before React even mounts
- [x] Switching themes transitions smoothly, not an instant snap
- [x] Works correctly on every existing page, including mobile (no overflow, toggle
      visible in the shared header bar)

## Status Note

Feature complete. All 14 Playwright checks pass, covering: OS-preference defaults
(both light and dark), toggle click behavior, `localStorage` persistence, the
no-flash-on-reload guarantee, explicit override correctly beating OS preference in
both directions, toggle visibility across every route, and mobile (no overflow,
toggle present).
