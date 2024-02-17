import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup'
import Home from './components/Home'
import Test from './components/Test'
import Profile from './components/Profile';
import ShoppingCart from './components/ShoppingCart';


function App() {

 
   
  const [isToken, setIsToken] = useState(false)

  useEffect( ()=> {
    const token = localStorage.getItem("token")
    console.log("APP.JSX REFRESHED")
    if(token) {
        setIsToken(true)
    }

    else {
        setIsToken(false)
      
    }
},[] )

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          <Route path="/profile" element={<Profile />} /> 
          <Route path="/cart" element={<ShoppingCart />} /> 
          
          {/* { isToken && <Route path="/cart" element={<ShoppingCart />} />}
          { isToken && <Route path="/profile" element={<Profile />} />}
           */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
