import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerLeft">
          <h3>PowerUpMoney</h3>
          <p>&copy; 2025 PowerUpMoney. All Rights Reserved.</p>
        </div>
        <div className="footerRight">
          <ul>
            <li><a href="/">Homepage</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;