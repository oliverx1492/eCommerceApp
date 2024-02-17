import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {

    useEffect( ()=> { 
        const token = localStorage.getItem("token")
        if(token) {
            navigate("/")
        }

        
    },[] )

    const [message, setMessage] = useState()
     //dieser usestate nur zum style
     const [messageAlertClass, setMessageAlertClass] = useState()
    const navigate = useNavigate()
    const { watch, register, isSubmitting, handleSubmit, formState: { errors } } = useForm()

    //Submit Function
    const onSubmit = async (data) => {

        setMessage("")

        
        console.log(data)
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if(response.ok) {
                const data = await response.json()
                
                setMessageAlertClass("alert alert-success")
                setMessage("Sign up successful. You get redirected to login")
                setTimeout( ()=> {
                    navigate("/login")
                },1000 )
            }

            else {
                const data = await response.json()
                setMessageAlertClass("alert alert-danger")
                setMessage(data.message)
            }

        }

        catch(error) {
            console.log(error)
        }

        
    }

    return (
        <div className="login">
            <div className="card col-md-6 rounded">
                <div className="card-body">

                    
                        <h1>Sign up</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        {message && <div className={messageAlertClass} role="alert">
                            {message}
                        </div>}
                        <div className="mb-3">

                            <input {...register("username", {
                                required: "Username is required",
                                validate: (value) => {
                                    if(value.includes(" ")) {
                                        return "Spaces are not allowed in username"
                                    }
                                    return true
                                }
                            })} type="text" className="form-control"  placeholder="Enter username" />
                        </div>
                        {errors.username && <div className="alert alert-danger" role="alert">
                            {errors.username.message}
                        </div>}

                        <div className="mb-3">
                            <input {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 4,
                                    message: "Password must have at least 4 characters"
                                }
                            })} type="password" className="form-control"  placeholder="Enter password" />
                        </div>
                        {errors.password && <div className="alert alert-danger" role="alert">
                            {errors.password.message}
                        </div>}

                        <div className="mb-3">

                            <input {...register("repeat_password", {
                                required: "Password is required",
                                validate: (val) => {
                                    if (watch('password') != val) {
                                      return "Your passwords do no match";
                                    }
                                  },
                            })} type="password" className="form-control" placeholder="Repeat password" />
                        </div>
                        {errors.repeat_password && <div className="alert alert-danger" role="alert">
                            {errors.repeat_password.message}
                        </div>}

                        <button disabled={isSubmitting} className="btn btn-success">Sign Up</button>
                        <hr />
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup