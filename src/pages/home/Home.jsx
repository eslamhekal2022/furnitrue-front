import React from "react";
import "./home.css";
import chairImg from "../assest/imgLogin.jpeg"; // غيّر المسار حسب مكان الصورة
import { Link } from "react-router-dom";
import CategoryProduct from "../CategoryProduct/CategoryProduct";
import HeroSec from "../HeroSec/HeroSec";
import ReviewUsers from "../ReviewUsers/ReviewUsers.jsx";


const Home = () => {
  return (
    <div className="home">
     <HeroSec/>
      <CategoryProduct/>
      <ReviewUsers/>
    </div>
  );
};


export default Home;
