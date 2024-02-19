import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditCatalog = () => {

    const id = localStorage.getItem("id")
    const [isAdmin, setIsAdmin] = useState()
    const [message, setMessage] = useState()
    const navigate = useNavigate()

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
               
                if (data.isAdmin == "1") {
                    console.log("isadmin")
                    setIsAdmin(true)
                }
                else {
                    navigate("/")
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

    useEffect(() => {
        if (id) {
            fetchProfileInfo(id)
        }
    }, [])



    const { register, handleSubmit, isSubmitting, formState: { errors } } = useForm()

    const onSubmit =  async (data) => {
        console.log(data)

        try {
            const response = await fetch("http://localhost:5000/addCatalog", {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(data)
            })

            if(response.ok) {
                const data = await response.json()
                console.log(data)
                setMessage(data.message)
                setTimeout( ()=> {
                    navigate("/catalog")
                },1000 )
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
            <h2>only admins will see this<br/></h2>
            <h4><Link to="/">Go back home</Link></h4>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex justify-content-center align-items-center">

                    <div className="card w-75 p-5">
                        

                            <div className="row">
                                <div className="col-md-12">
                                    <p className="mb-0">Image title</p>
                                    <div className="input-group mb-3">
                                        <input {...register("name", {
                                            required: "Title is required"
                                        })} type="text" className="form-control" placeholder="Image Title" />
                                    </div>
                                </div>
                            </div>
                            {errors.name && <div className="alert alert-danger" role="alert">
                            {errors.name.message}
                        </div>}

                            <div className="row">
                                <div className="col-md-12">
                                    <p className="mb-0">Artist</p>
                                    <div className="input-group mb-3">
                                        <input {...register("artist", {
                                            required: "Artist is required"
                                        })} type="text" className="form-control" placeholder="Artist" />
                                    </div>
                                </div>
                            </div>
                            {errors.artist && <div className="alert alert-danger" role="alert">
                            {errors.artist.message}
                        </div>}

                            <div className="row">
                                <div className="col-md-12">
                                    <p className="mb-0">Image link</p>
                                    <div className="input-group mb-3">
                                        <input {...register("img", {
                                            required: "Image Link is required"
                                        })} type="text" className="form-control" placeholder="Image Link" />
                                    </div>
                                </div>
                            </div>
                            {errors.img && <div className="alert alert-danger" role="alert">
                            {errors.img.message}
                        </div>}

                            <div className="row">
                                <div className="col-md-12">
                                    <p className="mb-0">price</p>
                                    <div className="input-group mb-3">
                                        <input {...register("price", {
                                            required: "Price is required"
                                        })} type="number" className="form-control" placeholder="price" />
                                    </div>
                                </div>
                            </div>
                            {errors.price && <div className="alert alert-danger" role="alert">
                            {errors.price.message}
                        </div>}

                            <div className="d-flex justify-content-center">
                                <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-md">Save</button>
                            </div>
                        

                    </div>


                </div>
            </form>

        </div>
    )
}

export default EditCatalog