import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


const Checkout = () => {

    //erst wird gecheckt ob das profile ausgefüllt ist, dann ob sachen im warenkorb sind
    const [profileInfo, setProfileInfo] = useState()
    const [cart, setCart] = useState()
    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const [deleteAll, setDeleteAll] = useState(false)

   

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
                setProfileInfo(data)
                
                
                
                if((data.first_name == null) || 
                    (data.last_name == null) || 
                    (data.address == null) || 
                    (data.country == null) || 
                    (data.email == null)|| 
                    (data.phone_number == null) || 
                    (data.payment_method == null)) {
                    console.log("missing infos")
                    setMessage("Infos missing. Please check your profile infos")
                }

                const c = JSON.parse(data.shopping_cart)
              

                if(c.length < 1) {

                    
                    setMessage("No items in cart")
                }
            }

            else {
                const data = await response.json()
                console.log(data)
            }

            setMessage("your purchase was successul")
            setDeleteAll(true)
           
            
        }

        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {


        const token = localStorage.getItem("token")
        let id = localStorage.getItem("id")
        if (token) {
           
            fetchProfileInfo(id)
        }

        else {
            navigate("/login")
        }

    }, [])

    const deleteWholeCart = async (id) => {
        console.log(id)
        const response = await fetch("http://localhost:5000/deleteWholeCart", {
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({"id": id})
        })

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            setTimeout( ()=> {
                
                navigate("/cart")
            },2000 )
            
        }
        else {
            const data = await response.json()
            console.log(data)
        }
    }

    useEffect( ()=>{
        if(deleteAll == true) {
            console.log("delete all")
            console.log(profileInfo)
            deleteWholeCart(profileInfo.id)
        }
    },[deleteAll] )



    return (
        <div>
            <Header />
            {message && <div className="alert alert-info">{message}</div>}
            Here is the checkout
        </div>
    )
}

export default Checkout