import React from 'react';
import './about.css';
import img1 from "../assest/imgAbout.jpeg"
const About = () => {
  return (
    <div className="about-container">
      <div className="about-image">
        <img
          src={img1}
          alt="Furniture Showroom"
        />
      </div>
      <div className="about-content">
        <h2>About Domiata</h2>
        <p>
          At Domiata, we transform spaces into elegant and cozy homes. With a passion for craftsmanship and quality,
          we offer unique furniture that blends modern design with traditional charm.
        </p>
        <h3>Our Mission</h3>
        <p>
          To deliver stylish, durable, and affordable furniture that meets the needs of every home.
          We are committed to quality, innovation, and customer satisfaction in every detail.
        </p>
        <h3>Visit Our Showroom</h3>
        <p>
          Experience the elegance of Domiata Furniture up close in our showroom — or browse online from the comfort of your home.
        </p>
      </div>
    </div>
  );
};

export default About;
