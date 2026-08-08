// createClient builds a Supabase client instance from a project URL + API key
import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars prefixed with VITE_ on import.meta.env at build time
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// True only if both env vars are actually set - used everywhere else in the app
// to decide whether Supabase-backed features (contact form, login, back office)
// can run at all
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// If someone runs the app without a .env file, warn loudly in the console instead
// of letting things fail silently or crash
if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ' +
      'in a local .env file (see .env.example). Features that depend on Supabase ' +
      '(contact form, login, back office) will not work until this is set.'
  )
}

// Export a single shared client instance so every file imports the same one -
// falls back to null when not configured so callers can check before using it
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
