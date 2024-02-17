import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

const Profile = () => {

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

    let id

    useEffect(() => {
        id = localStorage.getItem("id")
        console.log(JSON.stringify(id))

        fetchProfileInfo(id)

    }, [])

    useEffect(() => {
        if (profileInfo) {
            console.log("PROFILE INFO: ", profileInfo)
        }
    }, [profileInfo])

    //TODO
    //neue react hook form, die die daten bearbeiten kann 
    //und die daten aus der db übernimmt falls das input feld leer ist
    //handleing form
    const { register, handleSubmit, setValue, isSubmitting, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        data.id = profileInfo.id
        
        try {
            const response = await fetch("http://localhost:5000/editProfile", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if(response.ok) {
                const data = await response.json()
                console.log(data)
                setTimeout( ()=> {
                    navigate("/")
                
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
            <Header />
            <h1>Profile</h1>
            <div className="d-flex justify-content-center align-items-center ">

                {profileInfo && <div className="card w-75 p-5">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="row">

                            <div className="col-md-6">
                                <p className="mb-0">First Name</p>

                                <div className="input-group mb-3">
                                    <input {...register("first_name", {
                                        validate: (value) => {
                                            if (!value) {

                                                console.log("NO VALUE")
                                            }
                                        },

                                    })} defaultValue={profileInfo.first_name} type="text" className="form-control" placeholder="First Name" />
                                </div>
                            </div>


                            <div className="col-md-6">
                                <p className="mb-0">Last Name</p>

                                <div className="input-group mb-3">
                                    <input {...register("last_name", {
                                        validate: (value) => {
                                            if (!value) {

                                                console.log("NO VALUE")
                                            }
                                        },
                                    })} defaultValue={profileInfo.last_name} type="text" className="form-control" placeholder="Last Name" />
                                </div>
                            </div>

                        </div>



                        <div className="row">

                            <div className="col-md-12">
                                <p className="mb-0">Phonenumber</p>

                                <div className="input-group mb-3">
                                    <input {...register("phone_number", {

                                    })} defaultValue={profileInfo.phone_number} type="number" className="form-control" placeholder="Phonenumber" />
                                </div>
                            </div>

                            <div className="col-md-12">
                                <p className="mb-0">Email</p>

                                <div className="input-group mb-3">
                                    <input {...register("email", {

                                    })} defaultValue={profileInfo.email} type="email" className="form-control" placeholder="e-Mail" />
                                </div>
                            </div>



                        </div>



                        <div className="row">

                            <div className="col-md-6">
                                <p className="mb-0">Adress</p>

                                <div className="input-group mb-4">
                                    <input {...register("address", {

                                    })} defaultValue={profileInfo.address} type="text" className="form-control" placeholder="Address" />
                                </div>
                            </div>



                            <div className="col-md-6">
                                <p className="mb-0">Country</p>

                                <div className="input-group mb-4">
                                    <input {...register("country", {

                                    })} defaultValue={profileInfo.country} type="text" className="form-control" placeholder="Country" />
                                </div>
                            </div>

                        </div>

                        <div className="col-md-12">
                            <p className="mb-0">Payment method</p>

                        
                            <div className="col-md-12 ">

                                <select  {...register("payment_method")} defaultValue={profileInfo.payment_method} className="input-group mb-4 ">

                                    <option value="credit_card">Credit Card</option>
                                    <option value="paypal">Paypal</option>
                                    <option value="apple_pay">Apple Pay</option>

                                </select>

                            </div>
                        </div>




                        <div className="d-flex justify-content-center">
                            <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-md">Save</button>
                        </div>
                    </form>

                </div>




                }

            </div>

        </div>
    )
}

export default Profile