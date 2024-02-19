import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  // id wird abgerufen
  const id = localStorage.getItem("id")

  // useState ob man admin ist
  const [isAdmin, setIsAdmin] = useState()

  // hier werden die userinfos geladen und gecheckt ob man admin ist oder nicht
  const fetchProfileInfo = async (id) => {
    try {
        const response = await fetch("http://localhost:5000/checkAdmin", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ "id": id })
        })

        if (response.ok) {
            const data = await response.json()
            
            if(data.isAdmin == "1") {
               
                setIsAdmin(true)
            }
           

        }

        else {
            const data = await response.json()
            console.log(data)
        }
    }

    catch (error) {
        console.log(error)
    }

}

  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsToken(true)
    }
    //wenn eine id im local storage ist, wird gecheckt ob der user angemeldet ist
    if(id) {
      fetchProfileInfo(id)
    }

  }, [])

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    navigate("/login")
    // location.reload()
  }


  return (<div>

    <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
      <div className="container">
        <Link className="link" to="/"><p className="navbar-brand" href="#"><i className="fa-solid fa-shop me-2"></i> <strong>ArtWave</strong></p>
        </Link>
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
              <input type="text" className="form-control border-info" />
              <button className="btn btn-info text-white">Search</button>
            </div>
          </div>
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link className="link" to="/catalog"><p className="nav-link mx-2 text-uppercase  " href="#">Catalog</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="link" to="/about"><p className="nav-link mx-2 text-uppercase" href="#">About Us</p></Link>
            </li>
            <li className="nav-item">
              <Link className="link" to="/faq"><p className="nav-link mx-2 text-uppercase" href="#">FAQ</p></Link>
            </li>

          </ul>
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link className="link" to="/cart"><p className="nav-link mx-2 text-uppercase" href="#"><i className="fa-solid fa-cart-shopping me-1"></i> Shopping Cart</p></Link>
            </li>
            
            
            {isAdmin ? (<li className="nav-item">
              <Link className="link" to="/editCatalog"><p className="nav-link mx-2 text-uppercase" href="#"><i className="fa-solid fa-circle-user me-1"></i> Edit Catalog</p></Link>
            </li>) : (<li className="nav-item">
              <Link className="link" to="/profile"><p className="nav-link mx-2 text-uppercase" href="#"><i className="fa-solid fa-circle-user me-1"></i> Profile</p></Link>
            </li>)}

            <li>
              {isToken ? (<button onClick={logout} className="btn btn-info">LOGOUT</button>) : 
              (<Link to="/login"><button className="btn btn-info">LOGIN</button></Link>)}
              </li>
          </ul>
        </div>
      </div>
    </nav>




  </div>)
}

export default Header