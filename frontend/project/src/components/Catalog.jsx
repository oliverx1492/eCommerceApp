import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";


const Catalog = () => {

    const [catalog, setCatalog] = useState()
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false);
    const [pagination, setPagination] = useState(8)

    const showMore = () => {
        setPagination(pagination + 8)
    }


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


        const timer = setTimeout(() => {
            setLoaded(true);
        }, 250);

        // Aufräumen
        return () => clearTimeout(timer);
    }, [])

    const showDetails = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <div>
            <Header />
            {loaded ?

                (<div className="container container1">
                    <div className="row container1">
                        {catalog && catalog.slice(0, pagination).map((item, index) => (
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
                        ))}
                        <i onClick={showMore} className="plus bi bi-plus-lg"></i>

                    </div>
                </div>)

                :

                (<div className="" style={{height: "100vh", paddingTop: "200px"}}>
                 
                    <div className="spinner-border" role="status">
                        
                    <span className="sr-only"></span>
                </div>
                </div>)


            }


        </div>
    )
}

export default Catalog