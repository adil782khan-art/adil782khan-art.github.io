import resumeIcon from '../assets/resume-icon.png'
import careerJourney from '../assets/career-journey.png'
import './Portfolio.css'

const education = [
  {
    institution: 'Hillsborough Community College',
    degree: 'Associate of Arts (In Progress)',
    dates: 'Expected December 2026',
    note: 'Transferring to the University of South Florida (USF)',
  },
  {
    institution: 'Dr. Kiran C. Patel High School',
    degree: 'Diploma',
    dates: '2023',
  },
]

const experience = [
  {
    title: 'Small Business Assistant — Vending Machine Route',
    org: 'Independent Small Business (Dr. Hema Raj)',
    dates: '2023 – 2025',
    bullets: [
      "Independently managed and restocked a small vending machine route for a family friend's side business, handling inventory tracking, cash reconciliation, and basic equipment upkeep.",
      'Operated with minimal supervision over two years, demonstrating reliability and trustworthiness in a role built entirely on personal accountability.',
    ],
  },
]

const projects = [
  {
    name: 'CodeBloggs — Full-Stack Social Blogging Platform',
    tech: 'React, Redux, Node.js, Express, MongoDB, Selenium, GitHub Actions',
    description:
      'Frontend developer on a collaborative MERN social platform supporting posts, comments, likes, a member directory, and session-based authentication with an admin dashboard. Led a DevOps hardening pass, auditing the Login and Home pages with Lighthouse and raising Accessibility from 94 to 100 and SEO from 82 to 100. Built a 10-test Selenium regression suite covering navigation, form validation, and responsive layout.',
  },
  {
    name: 'Rocket Elevators — Front-End Website',
    tech: 'HTML5, CSS3, Bootstrap, JavaScript (ES6+), jQuery, REST API integration',
    description:
      'Built a multi-step quote calculator that dynamically computes elevator count and total pricing based on building type and live user input. Implemented a contact form with full client-side validation and a POST integration to a REST API, with real-time success/failure feedback. Built a sortable, filterable service-agents directory that fetches data from a GET endpoint, filters by rating threshold, and supports regional filtering.',
  },
]

function Portfolio() {
  return (
    <div className="portfolio">
      <section className="portfolio-intro">
        <h1>Portfolio</h1>
        <img
          src={resumeIcon}
          alt="Illustrated laptop displaying a resume document with an approval checkmark"
          className="section-image"
        />
        <a href="/resume.pdf" download className="resume-download">
          Download Resume (PDF)
        </a>
      </section>

      <section className="portfolio-section">
        <h2>Education</h2>
        <div className="entry-list">
          {education.map((item) => (
            <div className="entry-card" key={item.institution}>
              <h3>{item.institution}</h3>
              <p className="entry-meta">
                {item.degree} — {item.dates}
              </p>
              {item.note && <p className="entry-note">{item.note}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-section portfolio-section-alt">
        <h2>Work Experience</h2>
        <div className="entry-list">
          {experience.map((item) => (
            <div className="entry-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="entry-meta">
                {item.org} — {item.dates}
              </p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <img
          src={careerJourney}
          alt="Illustrated briefcase connected by a winding path to a folder, representing career progression"
          className="section-image"
        />
      </section>

      <section className="portfolio-section">
        <h2>Projects</h2>
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-card" key={project.name}>
              {/* TODO: replace with a real screenshot of the deployed project */}
              <div
                className="project-image-placeholder"
                role="img"
                aria-label={`Placeholder for a screenshot of ${project.name}`}
              >
                Project image coming soon
              </div>
              <h3>{project.name}</h3>
              <p className="entry-meta">{project.tech}</p>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Portfolio
