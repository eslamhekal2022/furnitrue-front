import React from 'react'
import chairImg from "../assest/imgLogin.jpeg"; // غيّر المسار حسب مكان الصورة
import { Link } from 'react-router-dom';
import './heroSec.css'
export default function HeroSec() {
  return (
 <div className="hero-section">
        <div className="hero-left">
          <h2 className="year-title">
            <span className="bold">2025</span> <span className="script">Summer</span>
          </h2>
          <h3 className="sub-title">Brand-New Arrival Alert</h3>
          <p className="desc">Your Next Favorite is Here!</p>
        <Link to={"/allProducts"}>     
        <button className="shop-btn">Shop Now</button>
        </Link>
        </div>

        <div className="hero-right">
          <div className="product-image">
            <img
              src={chairImg}
              alt="Aurora Flexible Sofa"
            />
            <div className="price-tag">
              <p>$140</p>
              <h4>Aurora Flexible Sofa</h4>
              <Link to={"/allProducts"}><span>Buy Now</span></Link>
            </div>
            <div className="discount-badge">-5% OFF</div>
          </div>
        </div>
      </div>  )
}
