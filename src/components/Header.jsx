// NavLink is like Link but knows when its route is active, for styling
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'
import './Header.css'

// Single source of truth for nav links - used to render both the desktop
// horizontal nav and the mobile icon-based bottom nav from the same data,
// so they can never drift out of sync
const navItems = [
  {
    to: '/',
    label: 'Home',
    // Hand-drawn inline SVG icons (house shape) - avoids pulling in an icon
    // library for just a handful of simple glyphs
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    to: '/portfolio',
    label: 'Portfolio',
    // Briefcase icon
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    to: '/links',
    label: 'Links',
    // Chain-link icon
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M9 15l6-6" />
        <path d="M11 5l1-1a4 4 0 0 1 6 6l-1 1" />
        <path d="M13 19l-1 1a4 4 0 0 1-6-6l1-1" />
      </svg>
    ),
  },
  {
    to: '/contact',
    label: 'Contact',
    // Envelope icon
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  // Note: Login and Back Office are intentionally NOT in this list - the login
  // route must only be reachable by typing the URL directly, never linked here
]

function Header() {
  return (
    // position: sticky (in Header.css) keeps this pinned to the top while scrolling
    <header className="header">
      <div className="header-bar">
        {/* Logo + name, wrapped in a Link to "/" so clicking it goes home */}
        <NavLink to="/" className="logo" aria-label="Home">
          <img src={logo} alt="Adil Khan logo" className="logo-image" />
          Adil Khan
        </NavLink>

        {/* Horizontal nav shown on desktop widths (hidden on mobile via CSS) */}
        <nav className="nav nav-desktop" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              // "end" makes the Home link only match the exact "/" path, not
              // every path (otherwise it would always show as active)
              end={item.to === '/'}
              className="nav-link"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Visible in the header bar on every page/breakpoint, not just desktop -
            see Extra Mile: light-dark-mode.feature.md */}
        <ThemeToggle />
      </div>

      {/* Icon-only nav fixed to the bottom of the viewport, shown on mobile
          widths only (hidden on desktop via CSS) */}
      <nav className="nav nav-mobile" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className="nav-mobile-link"
          >
            {item.icon}
            {/* Visually hidden text label, still readable by screen readers */}
            <span className="sr-only">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
