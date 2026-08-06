import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [checkingSession, setCheckingSession] = useState(isSupabaseConfigured)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate('/backoffice', { replace: true })
      } else {
        setCheckingSession(false)
      }
    })
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!isSupabaseConfigured) {
      setError('Invalid login credentials')
      return
    }

    setSubmitting(true)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setSubmitting(false)

    if (signInError) {
      setError('Invalid login credentials')
      return
    }

    navigate('/backoffice', { replace: true })
  }

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

          <button type="submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Log In'}
          </button>

          {error && <p className="login-error">{error}</p>}
        </form>
      </section>
    </div>
  )
}

export default Login
