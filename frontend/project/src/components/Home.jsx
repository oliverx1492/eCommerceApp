import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Home = () =>  {

    const navigate = useNavigate()

    // useEffect( ()=> {
    //     const token = localStorage.getItem("token")
    //     if(token) {
    //         console.log("HOME")
    //     }

    //     else {
    //         navigate("/login")
    //     }
    // },[] )

   
    
    return (
        <div>
            <Header />
            
            
        </div>
    )
}

export default Home