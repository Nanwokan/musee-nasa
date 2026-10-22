import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

// Monte l'application React dans l'élément "root" de la page HTML.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Active la navigation entre les pages avec leurs URL. */}
    <BrowserRouter>
      {/* App contient les pages et les routes du site. */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
