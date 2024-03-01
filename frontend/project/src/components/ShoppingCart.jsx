import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

const ShoppingCart = () => {

    const [totalPrice, setTotalPrice] = useState()

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

                setCart(JSON.parse(data.shopping_cart))
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


    useEffect(() => {
        let total = 0
        if (cart) {
            cart.map((item, index) => {

                total = total + item.price


            })
            console.log("TOTAL PRICE: ", total)
            setTotalPrice(total)
        }
    }, [cart])


    const deleteCart = async (id) => {

        try {
            const profileID = profileInfo.id
            console.log(profileID)

            const response = await fetch("http://localhost:5000/deleteCart", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ profileID, id })
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                location.reload()
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

    return (
        <div>
            <Header />
            
            <section className="h-100 h-custom md-6" >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12">
                            <div className="card card-registration card-registration-2" >
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-12">
                                            <div className="p-5">
                                                <div className="d-flex justify-content-between align-items-center mb-5">
                                                    <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>

                                                </div>
                                                <hr className="my-4" />



                                                {cart ? (
                                                    cart.map((item, index) => (


                                                        <div key={index} className="row mb-4 d-flex justify-content-between align-items-center">
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <img
                                                                    src={item.img}
                                                                    className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <h4 className="text-muted">{item.name}</h4>
                                                                <h6 className="text-black mb-0">{item.artist}</h6>
                                                            </div>

                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <h6 className="mb-0">€ {item.price}</h6>
                                                            </div>



                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">

                                                                <button onClick={() => { deleteCart(item.id) }} className="btn btn-danger">Delete</button>

                                                                <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                                                            </div>
                                                            <br />
                                                            <hr className="mt-3" />


                                                        </div>

                                                    ))

                                                ) : (
                                                    <div className="alert alert-warning">No items in cart</div>
                                                )}
                                                
                                                <div><p><strong>Total: {totalPrice}€</strong></p></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Link to="/checkout"><button className="btn btn-success">Checkout</button></Link>
        </div>
    )
}

export default ShoppingCart