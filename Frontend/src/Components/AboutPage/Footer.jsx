import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerLeft">
          <h3>BudgetBee</h3>
          <p>&copy; 2025 BudgetBee. All Rights Reserved.</p>
        </div>
        <div className="footerRight">
          <ul>
            <li><Link to="/">Home</Link></li> {/* Use Link instead of <a> */}
            <li><Link to="/about">About Us</Link></li> {/* Use Link instead of <a> */}
            <li><Link to="/contact">Contact Us</Link></li> {/* Use Link instead of <a> */}
            <li><Link to="/privacy-policy">Privacy Policy</Link></li> {/* Use Link instead of <a> */}
            <li><Link to="/terms-of-service">Terms of Service</Link></li> {/* Use Link instead of <a> */}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
