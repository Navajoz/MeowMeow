import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './pages/AppRouter'
import { AuthProvider } from './contexts/AuthContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AppRouter />
  </React.StrictMode>,
)
