import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {

  const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        navigate("/")
        location.reload()
    }


    return (<div>

    <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
      <div className="container">
        <p className="navbar-brand" href="#"><i className="fa-solid fa-shop me-2"></i> <strong>CityTrips</strong></p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    
        {/* <div className="mx-auto my-3 d-lg-none d-sm-block d-xs-block">
          <div className="input-group">
            <span className="border-info input-group-text bg-info text-white"><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" className="form-control border-info" />
            <button className="btn btn-info text-white">Search</button>
          </div>
        </div> */}

        <div className=" collapse navbar-collapse" id="navbarNavDropdown">
          <div className="ms-auto d-none d-lg-block">
            <div className="input-group">
              <span className="border-info input-group-text bg-info text-white"><i className="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" className="form-control border-info"  />
              <button className="btn btn-info text-white">Search</button>
            </div>
          </div>
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <p className="nav-link mx-2 text-uppercase active" aria-current="page" href="#">Catalog</p>
            </li>
            <li className="nav-item">
              <p className="nav-link mx-2 text-uppercase" href="#">Products</p>
            </li>
            <li className="nav-item">
              <p className="nav-link mx-2 text-uppercase" href="#">Catalog</p>
            </li>
            
          </ul>
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link to="/cart"><p className="nav-link mx-2 text-uppercase" href="#"><i className="fa-solid fa-cart-shopping me-1"></i> Shopping Cart</p></Link>
            </li>
            <li className="nav-item">
            <Link to="/profile"><p className="nav-link mx-2 text-uppercase" href="#"><i className="fa-solid fa-circle-user me-1"></i> Profile</p></Link>
            </li>
           <li>
           <button onClick={logout} className="btn btn-info">LOGOUT</button></li> 
          </ul>
        </div>
      </div>
    </nav>
    
    

        
    </div>)
}

export default Header