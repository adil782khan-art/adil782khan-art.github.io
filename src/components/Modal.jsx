import { useEffect } from 'react'
import './Modal.css'

// Generic reusable modal - takes whatever content is passed as children, so
// it can be used for any popup (currently just the Back Office message view)
function Modal({ onClose, children }) {
  // Listen for the Escape key while the modal is mounted, so pressing it closes
  // the modal - the cleanup function removes the listener when the modal unmounts
  // (or before re-running the effect), preventing duplicate listeners piling up
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    // Clicking the dark backdrop (anywhere outside the modal box) closes it
    <div className="modal-backdrop" onClick={onClose}>
      {/* stopPropagation prevents clicks inside the modal box from bubbling up
          to the backdrop's onClick, which would otherwise close the modal
          every time something inside it is clicked */}
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Whatever content the caller passed in (e.g. message details) */}
        {children}
      </div>
    </div>
  )
}

export default Modal
