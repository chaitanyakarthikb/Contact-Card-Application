import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Header from './components/Header/Header.tsx'
import Index from './components/LOGIN_SIGNUP_MODAL/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="app--container">
        <Header />
        <div className='main--container'>
          <Routes>
            <Route path='/login' element={<Index />} />
            <Route path='/signup' element={<Index />} />
            <Route path='/' element={<Index />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
