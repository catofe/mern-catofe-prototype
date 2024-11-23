import { useState, useContext, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './page/Login'
import Orders from './page/Orders'
import Cart from './page/Cart'
import Home from './page/Home'

export const UserContext = createContext()

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={[userId, setUserId]}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
