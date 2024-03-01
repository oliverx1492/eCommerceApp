import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {

    const { id } = useParams()
    const [product, setProduct] = useState()

    const [profileInfo, setProfileInfo] = useState()
    
    const navigate = useNavigate()

    const fetchProfileInfo = async (id) => {
        try {
            const response = await fetch("http://localhost:5000/profile", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ "id": id })
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setProfileInfo(data)
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

    useEffect(() => {

        const token = localStorage.getItem("token")
        let idProfile = localStorage.getItem("id")

        if (token) {
            
            fetchProfileInfo(idProfile)
        }

        else {
            navigate("/login")
        }

        if (id) {
            getProduct(id)
        }
    }, [])

    const getProduct = async (id) => {

        try {
            const response = await fetch("http://localhost:5000/getProduct", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ "id": id })
            })

            if (response.ok) {
                const data = await response.json()

                setProduct(data)
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

    const addCart = async () => {
        try {
            console.log(product)

            const response = await fetch("http://localhost:5000/addCart", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({profileInfo, product})
            })

            if(response.ok) {
                const data = await response.json()
                console.log(data)
                navigate("/cart")
            }

            else {
                const data = await response.json()
                console.log(data)
            }
        }
        
        catch(error) {
            console.log(error)
        }
        
    }

    

    return (
        <div>
            <Header />

            {product && <div className="card productCard">
                <div className="row no-gutters">
                    <div className="col md-4">
                        <img className="img-fluid" src={product.img} alt="product image" />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body d-flex align-items-center justify-content-center h-100">
                            <div className="card productInfo w-75">
                            <h1  className="card-title">{product.name}</h1>
                            <h3 className="card-text">{product.artist}</h3>
                          
                            <p className="card-text">Price: {product.price} €</p>
                            <button onClick={addCart} className="btn btn-success">Add to cart</button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Product