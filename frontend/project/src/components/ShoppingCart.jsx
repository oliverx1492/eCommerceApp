import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {

    const [profileInfo, setProfileInfo] = useState()
    const [cart, setCart] = useState()
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
                console.log("Cart:  ", data.shopping_cart)
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
        let id = localStorage.getItem("id")
        if (token) {
            console.log("SHOPPING CART")
            fetchProfileInfo(id)
        }

        else {
            navigate("/login")
        }

    }, [])

    return (
        <div>
            <Header />
            <h1>Shopping Cart</h1>

            {cart ? (
                cart.map((item, index) => {
                    <p>{item}</p>
                })
            ) : (
                <div className="alert alert-warning">No items in cart</div>
            )}
        </div>
    )
}

export default ShoppingCart