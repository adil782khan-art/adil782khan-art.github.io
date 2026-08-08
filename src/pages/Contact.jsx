import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './Contact.css'

// Simple regex check for "something@something.something" - not a full RFC
// email validator, just enough to catch obviously malformed input
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Reused both to initialize state and to reset the form after a successful submit
const initialForm = { name: '', email: '', message: '' }

function Contact() {
  // The three form fields, kept together in one object
  const [form, setForm] = useState(initialForm)
  // Per-field validation error messages, keyed by field name
  const [errors, setErrors] = useState({})
  // Tracks where we are in the submit lifecycle, drives which UI is shown
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  // Generic change handler shared by all three inputs - uses the input's
  // "name" attribute to know which field of `form` to update
  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Runs all field validations and returns an object of error messages -
  // an empty object means the form is valid
  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email.'
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) nextErrors.message = 'Please enter a message.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    // Stop the browser's default full-page-reload form submission
    event.preventDefault()

    // Validate client-side first - if anything's wrong, show the errors and
    // stop here without ever calling Supabase
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')

    // If there's no Supabase connection at all (e.g. missing .env locally),
    // fail gracefully with the same error UI a real Supabase error would show,
    // instead of crashing when supabase is null
    if (!isSupabaseConfigured) {
      setStatus('error')
      return
    }

    // Insert the message into the "messages" table. RLS policies on that
    // table allow public INSERT but not SELECT, so this works for anyone
    // without needing to be logged in.
    const { error } = await supabase.from('messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    })

    if (error) {
      setStatus('error')
      return
    }

    // Success: clear the form and show the success message, which
    // auto-dismisses itself after 4 seconds
    setForm(initialForm)
    setStatus('success')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <div className="contact">
      <section className="contact-intro">
        <h1>Contact</h1>
        <p>Have a question or want to work together? Send me a message.</p>
      </section>

      <section className="contact-form-section">
        {/* noValidate disables the browser's built-in validation bubbles so
            our own custom error messages are the only ones shown */}
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {/* Only shown if validate() put an error under "name" */}
          {errors.name && <p className="field-error">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
          />
          {errors.message && <p className="field-error">{errors.message}</p>}

          {/* Disabled while a request is in flight, to prevent double-submits */}
          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>

          {/* Success/failure banners - only one can show at a time since
              status is a single value */}
          {status === 'success' && (
            <p className="form-feedback form-feedback-success">
              ✓ Message sent! Thanks for reaching out.
            </p>
          )}
          {status === 'error' && (
            <p className="form-feedback form-feedback-error">
              ✕ Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </section>
    </div>
  )
}

export default Contact
