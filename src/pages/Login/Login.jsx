import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './login.css';
import { setUserRedux } from "../../Redux/user.js";
import { useDispatch } from "react-redux";
import imglogin  from"./imgLogin.jpeg"
const Login = () => {
  const [user, setUser] = useState({
    email: "",
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
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, user);
      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        dispatch(setUserRedux(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
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
            type="email"
            name="email"
            placeholder="Enter your email address"
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
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <button className="sub-Auth" type="submit">Login</button>
        </form>
        <p className="PAuth">
          Don't have an account yet? <Link className="GoAuth" to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
