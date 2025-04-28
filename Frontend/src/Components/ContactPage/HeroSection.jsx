import React from "react";
import "./Contact.css";
import contactImage from "../../assets/contactImage.jpg";

function HeroSection() {
  return (
    <section className="heroSection">
      <div className="hero-content">
        <h1>Need Assistance? Let’s Connect.</h1>
        <p>Explore common questions or send us a message. We’re committed to making your experience smooth and stress-free.</p>
      </div>
      <div className="hero-image">
        <img src={contactImage} alt="Hero Illustration" className="contactHeroImage" />
      </div>
    </section>
  );
}

export default HeroSection;