// Routes defines the route table; Route defines a single path -> component mapping
import { Routes, Route } from 'react-router-dom'
// Layout renders the Header + Footer around every page's content
import Layout from './components/Layout'
// Each page component below corresponds to one route
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Links from './pages/Links'
import Contact from './pages/Contact'
import Login from './pages/Login'
import BackOffice from './pages/BackOffice'

function App() {
  return (
    // Routes picks whichever child Route matches the current URL
    <Routes>
      {/* This parent Route has no path - it wraps every child route in Layout,
          so every page automatically gets the Header and Footer */}
      <Route element={<Layout />}>
        {/* Root path renders the Home page */}
        <Route path="/" element={<Home />} />
        {/* Education, work experience, and projects */}
        <Route path="/portfolio" element={<Portfolio />} />
        {/* Curated list of external profile links */}
        <Route path="/links" element={<Links />} />
        {/* Contact form that inserts into Supabase */}
        <Route path="/contact" element={<Contact />} />
        {/* Hidden admin login - intentionally not linked from any nav */}
        <Route path="/login" element={<Login />} />
        {/* Authenticated-only admin view of contact messages */}
        <Route path="/backoffice" element={<BackOffice />} />
      </Route>
    </Routes>
  )
}

export default App
