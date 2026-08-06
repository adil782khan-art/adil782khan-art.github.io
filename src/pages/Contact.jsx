import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import './Contact.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialForm = { name: '', email: '', message: '' }

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

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
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')

    if (!isSupabaseConfigured) {
      setStatus('error')
      return
    }

    const { error } = await supabase.from('messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    })

    if (error) {
      setStatus('error')
      return
    }

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

          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>

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
