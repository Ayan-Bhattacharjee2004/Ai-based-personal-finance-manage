import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">BudgetBee</h2>
            <p className="footer-tagline">Track expenses smarter, save better</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h3>Navigation</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/#">Dashboard</Link></li>
                <li><Link to="/reports">Reports</Link></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h3>Support</h3>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} BudgetBee. All Rights Reserved.</p>
          <div className="social-links">
            <a href="https://twitter.com" aria-label="Twitter" className="social-icon">
              <TwitterIcon/>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="social-icon">
              <FacebookIcon/>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="social-icon">
              <InstagramIcon/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;