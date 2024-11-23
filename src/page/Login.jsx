import React, { useContext, useState } from "react";
import '../styles/Login.css'
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const submitUserCredentials = () => {
    setLoading(true);
    console.log(userEmail)
    console.log(userPassword)
    axios
      .get(`http://localhost:3000/api/user/auth/${userEmail}/${userPassword}`)
      .then((res) => {
        setLoading(false);
        setUserId(res.data)
        navigate("/cart")
        console.log(res.data)
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Login to your Catofe account</p>

        <label htmlFor="" className="email-field-label">Email</label>
        <input className="email-field" type="email" onChange={(e) => setUserEmail(e.target.value)} />

        <label htmlFor="" className="password-field-label">Password</label>
        <input className="password-field" type="password" onChange={(e) => setUserPassword(e.target.value)} />

        <button type="submit" onClick={submitUserCredentials} className="login-submit"><b>Submit</b></button>

        <p className="sign-up-link">Don't have an account? <a href="/login">Create one here!</a></p>
      </div>
    </div>
  )
}

export default Login
