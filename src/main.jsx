import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CoinProvider from './context/CoinContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CoinProvider>
        <App/>
      </CoinProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
