import heroAvatar from '../assets/hero-avatar.png'
import skillsIllustration from '../assets/skills-illustration.png'
import './Home.css'

const technicalSkills = [
  {
    title: 'JavaScript & React',
    description:
      'I build interactive, component-based UIs with React, managing state and side effects to keep applications fast and maintainable.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M8 6L3 12l5 6" />
        <path d="M16 6l5 6-5 6" />
      </svg>
    ),
  },
  {
    title: 'Node.js & Express',
    description:
      'I design and build RESTful APIs and backend logic with Node.js and Express, handling authentication, data validation, and CRUD operations.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="3" y="16" width="18" height="4" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Databases (MongoDB/SQL)',
    description:
      'I model and query relational and document data, from SQL joins to Mongoose schemas, to support real application data needs.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
  },
  {
    title: 'Git & CI/CD',
    description:
      'I use Git for version control and GitHub Actions to automate testing and deployment, so code ships reliably without manual steps.',
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
]

const softSkills = [
  {
    title: 'Curiosity',
    description:
      "I don't stop at making something work — I dig into why it works, whether that's a token validation flow or a closure-based event system.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0 0 12 3Z" />
      </svg>
    ),
  },
  {
    title: 'Communication',
    description:
      'I make a habit of explaining what I build clearly enough to teach it, so teammates are never left guessing at my code.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 5h16v11H8l-4 4V5Z" />
      </svg>
    ),
  },
  {
    title: 'Discipline',
    description:
      'Years of playing competitive basketball taught me to stay focused under pressure and keep showing up consistently, on the court and in a sprint.',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3v18" />
        <path d="M5.5 5.5c3 3 3 10 0 13" />
        <path d="M18.5 5.5c-3 3-3 10 0 13" />
      </svg>
    ),
  },
  {
    title: 'Adaptability',
    description:
      "I've moved across different stacks and project types over the course of this program and pick up new tools quickly when a project demands it.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
]

function Home() {
  return (
    <div className="home">
      <section className="home-intro">
        <img
          src={heroAvatar}
          alt="Illustrated avatar of a developer working at a laptop, surrounded by code windows"
          className="home-image"
        />
        <h1>Adil Khan</h1>
        <p className="home-tagline">Full-Stack Developer</p>
        <p className="home-bio">
          I&apos;m a full-stack developer who builds real applications across the MERN
          stack — from CRUD dashboards with authentication to CI/CD pipelines deployed
          with GitHub Actions and AWS. I don&apos;t just implement a pattern, I dig into
          why it works, and I make a habit of explaining what I build clearly enough to
          teach it. Off-screen, you&apos;ll usually find me on the basketball court, or
          reading a book.
        </p>
      </section>

      <section className="home-skills">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {technicalSkills.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-skills home-skills-soft">
        <h2>Soft Skills</h2>
        <div className="skills-grid">
          {softSkills.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
        <img
          src={skillsIllustration}
          alt="Illustrated lightbulb, speech bubble, and gears representing ideas, communication, and problem-solving"
          className="home-image home-image-skills"
        />
      </section>
    </div>
  )
}

export default Home
