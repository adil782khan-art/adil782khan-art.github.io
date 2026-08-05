import './Footer.css'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contact">
        <a href="mailto:adil.782khan@gmail.com">adil.782khan@gmail.com</a>
        <a
          href="https://github.com/adil782khan-art"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
      <p className="footer-copyright">&copy; {year} Adil Khan. All rights reserved.</p>
    </footer>
  )
}

export default Footer
