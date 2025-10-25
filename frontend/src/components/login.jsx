import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Signup from "./signup";
import axios from "axios";
import Users from "../utils/api.js";
import "./Login.css";

function Login() 
{
const [logindata,setlogindata] = useState({
    email:"",
    password:""
});
const navigate = useNavigate();
const handleonchange = (e) => 
{
    const {name,value} = e.target;
    setlogindata((prev)=>({
        ...prev,
        [name] : value,
    }));
}

const handleSubmit = async(e) =>
{
    e.preventDefault();
    try
    {
    const res = await Users.login(logindata);
    console.log(res);
    
    if (res.data.Message === "userverified Sucessfully") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        navigate("/dashboard");
    } else {
        alert("Login failed. Please check your credentials.");
    }
    }
    catch(err)
    {
        console.log(err);
        alert("Login failed. Please try again.");
    }

};
    return(
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        onChange={handleonchange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        placeholder="Enter your password"
                        name="password"
                        type="password"
                        onChange={handleonchange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Login</button>
                <div className="signup-link">
                    <Link to="/signup">
                        <button type="button">
                            Don't have an account? Sign up
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login;