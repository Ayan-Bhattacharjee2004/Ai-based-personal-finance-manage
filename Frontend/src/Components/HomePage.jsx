// src/components/HomePage.jsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import phone1 from "../assets/Screenshot (37).png";
import phone2 from "../assets/Phoneai.jpg";
import logo from "../assets/BudgetBee.png";
import WhyUs from "../Components/HomePage/WhyUs";
import About from "../Pages/About";
import Footer from "../Components/AboutPage/Footer"; //footer section


import AOS from 'aos';

const HomePage = () => {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="bg-[#1f2937] min-h-screen min-w-screen overflow-x-hidden text-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-22 py-0.7 bg-black/30 backdrop-blur-md transition-all duration-300 hover:bg-black/40">
        <div className="flex items-center gap-2">
          <div className="img w-30 transition-transform duration-300 hover:scale-105">
            <img src={logo} alt="BudgetBee logo" />
          </div>
        </div>

        <div className="flex gap-4">
          <Link to="/login">
            <button
              style={{
                color: 'white',
                backgroundColor: 'black',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="login-button"
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = 0.9;
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = 1;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/SignUp">
            <button 
              className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:transform hover:scale-105"
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseOver={(e) => {
                const button = e.currentTarget;
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.borderRadius = '50%';
                ripple.style.width = '100px';
                ripple.style.height = '100px';
                ripple.style.top = e.nativeEvent.offsetY - 50 + 'px';
                ripple.style.left = e.nativeEvent.offsetX - 50 + 'px';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                  button.removeChild(ripple);
                }, 600);
              }}
            >
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gradient-to-r from-[#030712] to-[#4d556b] relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full w-64 h-64 bg-blue-500/10 -top-20 -left-20 animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute rounded-full w-80 h-80 bg-green-400/10 -bottom-40 -right-20 animate-pulse" style={{animationDuration: '12s'}}></div>
        </div>

        {/* Left Text */}
        <div className="max-w-2xl pl-40 z-10" data-aos="fade-right">
          <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-green-400/20 text-green-400 text-sm font-medium mb-6 transform transition hover:scale-105 hover:shadow-md">
            Smart Financial Management
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Manage your <br />
            <span className="text-white relative inline-block">
              money
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </span> in the best <br />
            possible <span className="text-green-400 hover:text-green-300 transition-colors duration-300">way.</span>
          </h1>
          <p className="text-gray-400 mb-8 w-80" data-aos="fade-up" data-aos-delay="200">
            BudgetBee is the app that manages your finance with its ever smart
            features.
          </p>
          <div className="flex items-center gap-6" data-aos="fade-up" data-aos-delay="400">
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:transform hover:scale-105 hover:opacity-90">
                Get Started
              </button>
            </Link>
            <button 
              className="group"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                color: 'white', 
                backgroundColor: "black",
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ 
                backgroundColor: 'black', 
                color: 'white', 
                padding: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              className="group-hover:bg-green-400 group-hover:text-black"
              >
                <FaPlay size={8} className="group-hover:scale-125 transition-transform duration-300" />
              </div>
              Watch Video
            </button>
          </div>
        </div>

        {/* Right Images */}
        <div className="relative" data-aos="fade-left">
          <img
            src={phone1}
            alt="phone1"
            className="w-96 md:w-[500px] -ml-16 rotate-[-20deg] relative z-10 transition-all duration-700 hover:rotate-[-15deg] hover:scale-105 hover:filter hover:drop-shadow-2xl"
          />
          {/* Phone image glow effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/30 to-green-400/30 blur-3xl rounded-full opacity-50 transform scale-75 animate-pulse" style={{animationDuration: '4s'}}></div>
        </div>
      </section>

      {/* Additional CSS for animations */}
      <style >{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .login-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.7s;
        }
        
        .login-button:hover::before {
          left: 100%;
        }
      `}</style>
      
      {/* why us section */}
      <WhyUs />
      {/* footer section */}
      {/* about section */}
      <About />
      <Footer />
    </div>
  );
};

export default HomePage;