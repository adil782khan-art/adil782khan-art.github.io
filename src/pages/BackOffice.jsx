import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import Modal from '../components/Modal'
import './BackOffice.css'

function BackOffice() {
  const navigate = useNavigate()
  // Same "skip the flash" pattern as Login.jsx
  const [checkingSession, setCheckingSession] = useState(isSupabaseConfigured)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // The message currently open in the view modal, or null if the modal is closed
  const [selected, setSelected] = useState(null)

  // Auth gate: runs once on mount, before anything else. If there's no valid
  // session, bounce to /login immediately so protected content never renders
  // even briefly.
  useEffect(() => {
    if (!isSupabaseConfigured) {
      navigate('/login', { replace: true })
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate('/login', { replace: true })
      } else {
        setCheckingSession(false)
      }
    })
  }, [navigate])

  // Once the auth check passes, fetch every row from the "messages" table.
  // This only works because RLS grants SELECT to the "authenticated" role -
  // the same request would be denied for a logged-out (anon) visitor.
  useEffect(() => {
    if (checkingSession) return

    const fetchMessages = async () => {
      setLoading(true)
      setError('')
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        // Newest messages first
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError('Failed to load messages.')
      } else {
        setMessages(data)
      }
      setLoading(false)
    }

    fetchMessages()
  }, [checkingSession])

  // Deletes one message by id, then updates local state directly instead of
  // re-fetching the whole list, so the row disappears from the UI instantly
  const handleDelete = async (id) => {
    const { error: deleteError } = await supabase.from('messages').delete().eq('id', id)
    if (!deleteError) {
      setMessages((prev) => prev.filter((message) => message.id !== id))
      // If the message being deleted is the one currently open in the modal,
      // close the modal too
      setSelected((prev) => (prev?.id === id ? null : prev))
    }
  }

  // Signs out of Supabase Auth and sends the admin back to the public site
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  // Render nothing while the auth check is still in progress
  if (checkingSession) return null

  return (
    <div className="backoffice">
      <section className="backoffice-header">
        <h1>Back Office</h1>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </section>

      <section className="backoffice-content">
        {/* Three mutually-exclusive states: loading, error, or empty -
            only one of these (or the table below) renders at a time */}
        {loading && <p>Loading messages…</p>}
        {!loading && error && <p className="backoffice-error">{error}</p>}
        {!loading && !error && messages.length === 0 && <p>No messages yet.</p>}

        {/* The actual data table, only rendered once loaded successfully
            and there's at least one message */}
        {!loading && !error && messages.length > 0 && (
          <table className="messages-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                // Clicking anywhere on the row opens the view modal
                <tr
                  key={message.id}
                  className="message-row"
                  onClick={() => setSelected(message)}
                >
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{new Date(message.created_at).toLocaleString()}</td>
                  <td>
                    {/* stopPropagation prevents this click from also
                        triggering the row's onClick above (which would be
                        harmless here, but kept for clarity/consistency) */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        setSelected(message)
                      }}
                    >
                      View
                    </button>
                    {/* stopPropagation here matters more: without it,
                        deleting a row would also open the modal for a
                        message that's about to disappear */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleDelete(message.id)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal only renders when a message is selected - passing onClose
          lets Modal handle Escape/outside-click/close-button itself */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2>{selected.name}</h2>
          <p className="modal-meta">{selected.email}</p>
          <p className="modal-meta">{new Date(selected.created_at).toLocaleString()}</p>
          <p className="modal-message">{selected.message}</p>
        </Modal>
      )}
    </div>
  )
}

export default BackOffice
