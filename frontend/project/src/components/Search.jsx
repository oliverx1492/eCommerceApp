import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";


const Search = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [result, setResult] = useState()

    const getResult = async (input) => {
        setResult()
        try {
            const response = await fetch("http://localhost:5000/search", {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({"search": input})
            })

            if(response.ok) {
                const data = await response.json()
                console.log(data)
                setResult(data)
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

    useEffect( ()=> {
        getResult(id)
    },[id] )

    const showDetails = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <div>
            <Header />
            <div className="container container1">
                <div className="row container1">
            
            {
                
                result ? 
                (
                    
                     result.map((item, index) => (
                        // <Link to="/product/1">
                        <div onClick={() => showDetails(item.id)} key={index} className="col-sm-3 oCard">
                            <div className="card h-100 imageCard">

                                <img className="card-img-top img-fluid h-75 imageHover" src={item.img} alt="Card image cap" />

                                <div className="card-body">
                                    <h4 className="card-title">{item.name}</h4>
                                    <h5>{item.artist}</h5>
                                    <hr />
                                    <button className="btn btn-info">View</button>
                                </div>
                            </div>
                        </div>

                        // </Link>
                    ))
                )
                :
                (<div className="alert alert-warning mt-4">No result</div>)
            }
        </div>
        </div>
        </div>
        
    )
}

export default Search