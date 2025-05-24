import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import WhatsAppButton from '../whatsApp/WhatsaAPP';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Domiata</h2>
          <p>Your one-stop shop for everything!</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
           <li> <Link to={"/"}>Home</Link></li>
           <li> <Link to={"/allProducts"}>Shop</Link></li>
           <li> <Link to={"/About"}>About</Link></li>
           <li> <Link to={"/Contact"}>Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@Domiata.com</p>
          <p>Phone: +123 456 7890</p>
          <p><WhatsAppButton/></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Domiata. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
