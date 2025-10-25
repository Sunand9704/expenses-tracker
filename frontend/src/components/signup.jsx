import React,{useEffect, useState}from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import axios from "axios";
import Users from "../utils/api";
import "./Signup.css";

function Signup()
{ 
const [registerform, setregisterform] = useState(
    {
        Username:"",
        email:"",
        password:""
    });

const handleOnChange = (e) => {
  const { name, value } = e.target;
  setregisterform((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const navigate = useNavigate();
const handleSubmit = async (e) =>
{
    e.preventDefault();
    try
    {
    // console.log("Form Data Submitted:", registerform);
    const result = await Users.signup(registerform);
    console.log(result);
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("userData", JSON.stringify(result.data.newuser));
    navigate("/login");
    }
    catch(err)
    {console.log(err);
    alert("Registration failed. Please try again.");
    }
}
    return(
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="Username"
                        type="text"
                        placeholder="Enter your username"
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        onChange={handleOnChange}
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
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Create Account</button>
            </form>
        </div>
    )
}

export default Signup;