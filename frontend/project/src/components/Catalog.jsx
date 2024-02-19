import React, { useEffect, useState } from "react";
import Header from "./Header";


const Catalog = () => {

    const [catalog, setCatalog] = useState()

    const getCatalog = async () => {

        try {

            const response = await fetch("http://localhost:5000/getCatalog")

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setCatalog(data)
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
        getCatalog()
    }, [])

    return (
        <div>
            <Header />
            <h1>Catalog</h1>



            <div className="container container1">
                <div className="row container1">
                    {catalog && catalog.map((item, index) => (
                        <div key={index} className="col-sm-3 oCard">
                            <div className="card h-100">
                                <img className="card-img-top img-fluid h-75" src={item.img} alt="Card image cap" />
                                <div className="card-body">
                                    <h4 className="card-title">{item.name}</h4>
                                    <h5>{item.artist}</h5>
                                    <p className="card-text">Price: {item.price} €</p>
                                    <button className="btn btn-success">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>









        </div>
    )
}

export default Catalog