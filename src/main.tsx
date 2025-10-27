import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SavedMoviesProvider } from './contexts/SavedMoviesContext' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SavedMoviesProvider> {/*  ครอบแอปทั้งหมด */}
        <App />
      </SavedMoviesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)