import './Footer.css'

// Computed once at module load, not on every render, since the year won't
// change while the page is open
const year = new Date().getFullYear()

function Footer() {
  return (
    // Rendered at the bottom of every page via Layout.jsx
    <footer className="footer">
      <div className="footer-contact">
        {/* mailto link opens the visitor's email client */}
        <a href="mailto:adil.782khan@gmail.com">adil.782khan@gmail.com</a>
        {/* External link - target="_blank" opens a new tab, rel="noopener
            noreferrer" prevents the new tab from accessing this page via
            window.opener (a security best practice for external links) */}
        <a
          href="https://github.com/adil782khan-art"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
      {/* Copyright line with the auto-computed current year */}
      <p className="footer-copyright">&copy; {year} Adil Khan. All rights reserved.</p>
    </footer>
  )
}

export default Footer
