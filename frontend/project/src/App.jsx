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
import Artists from './components/Artists';
import FAQ from './components/FAQ';
import EditCatalog from './components/EditCatalog';
import Product from './components/Poduct';
import Checkout from './components/Checkout';
import Search from './components/Search';
import NotFound from "./components/NotFound"


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

          <Route path="/search/:id" element={<Search />}/>

          <Route path="/catalog" element={<Catalog />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/product/:id" element={<Product />}/>

          <Route path="/profile" element={<Profile />} /> 
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/editCatalog" element={<EditCatalog />} />

          <Route path ="*" element={<NotFound />} />
         


       
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
