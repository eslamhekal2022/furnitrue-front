import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './register.css';
import { setUserRedux } from "../../Redux/user.js";
import { useDispatch } from "react-redux";
import imglogin  from"./imgLogin.jpeg"
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, user);
      if (res.data?.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
         <img src={imglogin} alt="Login visual" />
      </div>
      <div className="login-form-container">
        <h2>Welcome back !</h2>
        <p className="sub-text">Buy & sale your exclusive product only on Domiata</p>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            name="name"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
          />
        <input
            type="email"
            name="email"
            placeholder="Enter your email "
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
          />
              <input
            type="phone"
            name="phone"
            placeholder="Enter your phone "
            value={user.phone}
            onChange={handleChange}
            required
          />
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <button className="sub-Auth" type="submit">Login</button>
        </form>
        <p className="PAuth">
          Do you have an account ? <Link className="GoAuth" to={"/login"}>login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
