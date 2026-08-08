import connectionHub from '../assets/connection-hub.png'
import './Links.css'

// Each entry becomes one clickable card: title, destination URL, short
// description, and a hand-drawn inline SVG icon (same style as Header's nav
// icons, so no separate image file is needed per card)
const links = [
  {
    title: 'GitHub',
    url: 'https://github.com/adil782khan-art',
    description:
      'My GitHub profile — browse the source code for this portfolio and other projects, including CodeBloggs and Rocket Elevators.',
    // Git branch/merge icon, same as Home page's "Git & CI/CD" skill icon
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="12" r="2.5" />
        <path d="M6 8.5V15.5" />
        <path d="M6 10c0 3 4 4 9.5 4.5" />
      </svg>
    ),
  },
  {
    title: 'LeetCode',
    url: 'https://leetcode.com/u/adil782/',
    description:
      'My LeetCode profile, where I practice data structures, algorithms, and technical interview problem-solving.',
    // Trophy icon
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
        <path d="M8 5H5a3 3 0 0 0 3 4" />
        <path d="M16 5h3a3 3 0 0 1-3 4" />
        <path d="M12 12v4" />
        <path d="M9 20h6" />
        <path d="M10 20v-2.5a2 2 0 0 1 4 0V20" />
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/adilkhandev/',
    description:
      'My LinkedIn profile — professional background, education, and work experience.',
    // Rounded-square badge with a small "in" mark (dot + stem + hump), a
    // simplified nod to the LinkedIn logo without copying the real asset
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8" cy="8" r="0.75" fill="currentColor" stroke="none" />
        <path d="M8 11v6" />
        <path d="M12 17v-3.5a2 2 0 0 1 4 0V17" />
      </svg>
    ),
  },
]

function Links() {
  return (
    <div className="links">
      {/* Page intro with the required AI-generated image (Canva) */}
      <section className="links-intro">
        <h1>Links</h1>
        <img
          src={connectionHub}
          alt="Illustrated central node connected to four smaller nodes, representing a developer's connections across platforms"
          className="section-image"
        />
      </section>

      {/* Card grid - maps over the links array above */}
      <section className="links-list">
        {links.map((link) => (
          // The whole card is a single <a> tag, so clicking anywhere on it
          // opens the link. target="_blank" + rel="noopener noreferrer" opens
          // it safely in a new tab without giving that tab access back to this one.
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
            key={link.title}
          >
            <div className="link-icon">{link.icon}</div>
            <h3>{link.title}</h3>
            <p>{link.description}</p>
          </a>
        ))}
      </section>
    </div>
  )
}

export default Links
