import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup'
import Home from './components/Home'
import Test from './components/Test'
import Profile from './components/Profile';
import ShoppingCart from './components/ShoppingCart';
import Catalog from './components/Catalog';
import About from './components/About';
import FAQ from './components/FAQ';
import EditCatalog from './components/EditCatalog';


function App() {

 
   
  const [isToken, setIsToken] = useState()

  useEffect( ()=> {
    const token = localStorage.getItem("token")
   
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

          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/profile" element={<Profile />} /> 
          <Route path="/cart" element={<ShoppingCart />} />

          <Route path="/editCatalog" element={<EditCatalog />} />
         


       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
