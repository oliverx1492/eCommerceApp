import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";


const Artists = () => {

    const [artists, setArtists] = useState([])

    useEffect(() => {
        fetchArtists()
    }, [])

    const fetchArtists = async () => {

        let arr = []

        try {
            const response = await fetch("http://localhost:5000/artists")
            const data = await response.json()


            data.artists.map((item, index) => {

                if (!arr.includes(item.artist)) {
                 
                    arr.push(item.artist)

                    // setArtists([...artists, item.artist])
                }
            })

            
            setArtists(arr)



        }

        catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Header />
            <h1>Artists</h1>
            <div className="d-flex justify-content-center">
                <ul  className="list-group w-75 link">
                    {artists && artists.map((item, index) => (

                        <li  key={index}>
                            <Link className="link" to={`/search/${item}`}>
                                <p className="list-group-item list-group-item-action">{item}</p>
                            </Link>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    )

}

export default Artists