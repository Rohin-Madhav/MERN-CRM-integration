import React from 'react'
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

import Customers from './pages/Customers'
import RegistrationForm from './pages/Register'
import LoginForm from './pages/Login'

function App() {
  return (
    <>
    < Router>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/register' element={<RegistrationForm/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/customers' element={<Customers/>} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
