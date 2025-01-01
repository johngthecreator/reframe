import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import LockWrapper from './lib/LockWrapper.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LockWrapper>
      <App />
    </LockWrapper>
  </React.StrictMode>,
)
