import logo from '../../assets/logo.png'
import React from 'react';
import './Footer.css'; 
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact-info-container">
          <div className="footer-logo-container">
            
          </div>
          <div className="contact-info">
            <p>4/10, Vibha Complex,<br/> Nagarbhavi Main Road, Vijaya Nagar,<br/> Bangalore 560040</p>
            <p><a href="tel:+919066555546">+91 90665 55546</a></p>
            <p><a href="mailto:info@houseliv.com">info@houseliv.com</a></p>
          </div>
        </div>
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#service">Services</a></li>
            <li><a href="#testimonial">Testimonials</a></li>
          </ul>
        </div>
        <div className="footer-section newsletter">
          <div className="social-links">
          
            <a  target="_blank" href='https://www.youtube.com/@HOUSELIV/featured'><FaYoutubeSquare /></a>
            <a target="_blank" href="https://www.linkedin.com/in/houseliv-realty-a90958182/"><FaLinkedin /></a>
            <a  target="_blank" href='https://www.facebook.com/Houseliv.co/'><FaSquareFacebook /></a>
            <a  target="_blank" href="https://www.instagram.com/houselivrealty/"><FaInstagramSquare /></a>
            <a  target="_blank" href="https://x.com/houselivrealty"><FaSquareTwitter /></a>


          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© House Liv - All rights reserved</p>
        <ul>
         <li><Link  target="_blank" to='/terms' >Terms and Conditions</Link> </li>
         <li> <Link  target="_blank" to='/privacy'>Privacy Policy</Link>  </li> 
        
        </ul>
      </div>
      <div className="end">
        <div><p>Powered by BYTEDOCKER</p></div>
      </div>
    </footer>
  );
};

export default Footer;
