// React's StrictMode wrapper - helps catch bugs during development
import { StrictMode } from 'react'
// createRoot is the React 18+ API for mounting a React app into the DOM
import { createRoot } from 'react-dom/client'
// HashRouter uses URL hashes (e.g. #/portfolio) for routing instead of real paths -
// this is required for GitHub Pages since it has no server-side rewrite rules
import { HashRouter } from 'react-router-dom'
// Global styles: CSS custom properties (colors, fonts) and base resets
import './index.css'
// The root App component, which contains the route table
import App from './App.jsx'

// Find the #root div in index.html and render the app into it
createRoot(document.getElementById('root')).render(
  // StrictMode double-invokes some functions in dev to surface side-effect bugs
  <StrictMode>
    {/* HashRouter must wrap the whole app so every page can use routing hooks */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
