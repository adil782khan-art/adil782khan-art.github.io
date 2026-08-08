import { useEffect, useState } from 'react'
// useNavigate lets us redirect programmatically (e.g. after a successful login)
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // Starts true only if Supabase is configured, since only then is there a
  // session worth checking - avoids an unnecessary loading flash otherwise
  const [checkingSession, setCheckingSession] = useState(isSupabaseConfigured)
  const [submitting, setSubmitting] = useState(false)

  // On mount, check whether the admin is already logged in. If so, skip the
  // login form entirely and go straight to the Back Office.
  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // "replace: true" swaps the current history entry instead of adding
        // a new one, so the back button doesn't return to the login page
        navigate('/backoffice', { replace: true })
      } else {
        setCheckingSession(false)
      }
    })
  }, [navigate])

  const handleSubmit = async (event) => {
    // Stop the browser's default form submission (full page reload)
    event.preventDefault()
    setError('')

    // No Supabase connection at all - can't possibly log in, so fail the
    // same way invalid credentials would
    if (!isSupabaseConfigured) {
      setError('Invalid login credentials')
      return
    }

    setSubmitting(true)
    // Supabase Auth's built-in email/password sign-in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setSubmitting(false)

    if (signInError) {
      // Deliberately vague error message (doesn't reveal whether the email
      // exists) - standard practice for login forms
      setError('Invalid login credentials')
      return
    }

    // Success - Supabase has already stored the session, just navigate on
    navigate('/backoffice', { replace: true })
  }

  // While we're still checking for an existing session, render nothing
  // rather than flashing the login form and then immediately redirecting
  if (checkingSession) return null

  return (
    <div className="login">
      <section className="login-section">
        <h1>Admin Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Disabled while the sign-in request is in flight */}
          <button type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Log In'}
          </button>

          {/* Only rendered after a failed sign-in attempt */}
          {error && <p className="login-error">{error}</p>}
        </form>
      </section>
    </div>
  )
}

export default Login
