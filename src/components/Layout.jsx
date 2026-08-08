// Outlet renders whichever child route matched, in place - this is what lets
// Layout wrap every page without knowing which page it is
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import './Layout.css'

function Layout() {
  return (
    // Flex column with min-height: 100vh (in Layout.css) keeps the footer pinned
    // to the bottom even on short pages
    <div className="layout">
      {/* Sticky nav bar, shown on every page */}
      <Header />
      <main className="layout-content">
        {/* The actual page content (Home, Portfolio, etc.) renders here */}
        <Outlet />
      </main>
      {/* Contact info + copyright, shown on every page */}
      <Footer />
    </div>
  )
}

export default Layout
