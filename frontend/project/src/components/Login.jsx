import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"

const Login = () => {
    
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

    const { register, handleSubmit, isSubmitting,formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        setMessage("")
        console.log(data)

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(data)
            })

            if(response.ok) {
                const data = await response.json()
                console.log("DATA", data)
                localStorage.setItem("token", data.token)
                localStorage.setItem("id", data.userID)
                setMessageAlertClass("alert alert-success")
                setMessage("Login succesful.You get redirected")
                setTimeout( ()=> {
                    navigate("/")
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
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    {message && <div className={messageAlertClass} role="alert">
                            {message}
                        </div>}
                        <div className="mb-3">
                            <input {...register("username", {
                                required: "Username is required",
                                validate: (value) => {
                                    if (value.includes(" ")) {
                                        return "Spaces are not allowed in username"
                                    }
                                    return true
                                }
                            })} type="text" className="form-control" placeholder="Enter username" />
                        </div>
                        {errors.username && <div class="alert alert-danger" role="alert">
                            {errors.username.message}
                        </div>}

                        <div className="mb-3">

                            <input {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 4,
                                    message: "Password must have at least 4 characters"
                                },
                            })} type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        {errors.password && <div class="alert alert-danger" role="alert">
                            {errors.password.message}
                        </div>}

                        <button disabled={isSubmitting} type="submit" className="btn btn-success">Login</button>
                        <hr />
                        <p>No account? <Link to="/signup">Register here</Link></p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login