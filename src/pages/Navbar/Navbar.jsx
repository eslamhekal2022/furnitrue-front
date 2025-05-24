import React, { useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.js';
import { useUser } from '../../context/userContext.js';
import { useDispatch, useSelector } from 'react-redux';
 
import imgNav from "./imgLogin.jpeg"
import { clearUser } from '../../Redux/user.js';
export default function Navbar() {
  const { countCart, countWishList } = useCart();
  const { countUsers } = useUser();
  const token = localStorage.getItem("token");
  const user = useSelector((x) => x.user.user);
  const navigate = useNavigate();
const dispatch=useDispatch()
  const isPrivileged = user?.role === "admin" || user?.role === "moderator";

  const [menuOpen, setMenuOpen] = useState(false);

  function Logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("phone");
    navigate("/login");
    dispatch(clearUser())
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="nav-left">
          <Link to="/" className="logo">
<i className="fa-solid fa-chair"></i>
            <span className="brand-name">Domiata</span>
          </Link>
        </div>

        {/* Center: Main Links */}
        <div className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/allProducts">Shop</Link>
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
        </div>

        {/* Right: Icons and Auth */}
        <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
          <Link to="/search"><i className="fa fa-search"></i></Link>

          {token && (
            <>
              <Link to="/cart" className="icon-link">
                <i className="fa fa-shopping-cart"></i>
                <span className="count">{countCart}</span>
              </Link>

              <Link to="/WishList" className="icon-link">
                <i className="fa fa-heart"></i>
                <span className="count">{countWishList}</span>
              </Link>

              {isPrivileged && (
                <Link to="/AllUser" className="icon-link">
                  <i className="fa fa-user"></i>
                  <span className="count">{countUsers}</span>
                </Link>
              )}

              <Link to={`/userDet/${user?.id}`} className="profile-pic-link">
                <img
                  src={
                    user?.image
                      ? user.image.startsWith("http")
                        ? user.image
                        : `${process.env.REACT_APP_API_URL}${user.image}`
                      : `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random&color=fff`
                  }
                  className="profile-pic"
                  alt="user"
                />
              </Link>
            </>
          )}

         <Link to="/adminPanel" className="admin-button-link">
  <button className="admin-button">Admin Panel</button>
</Link>


          {token ? (
            <button onClick={Logout} className="logout-btn">Logout</button>
          ) : (
            <Link to="/login"><button className="login-btn">Login</button></Link>
          )}
        </div>

        {/* Hamburger for small screens */}
        <div className={menuOpen===true?"hamburger activehumburger":"hamburger"} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>

        </div>
      </div>
    </nav>
  );
}
