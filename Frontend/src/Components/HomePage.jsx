// src/components/HomePage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import phone1 from "../assets/whoWeAre.jpg";
import phone2 from "../assets/Phoneai.jpg";
import logo from "../assets/BudgetBee.png";
import WhyUs from '../Components/HomePage/WhyUs';
import About from '../Pages/About';
import Footer from '../Components/AboutPage/Footer'; //footer section




const HomePage = () => {
  return (
    <div className="bg-black min-h-screen min-w-screen overflow-x-hidden  text-white font-sans">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          {/* <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-full">
            <span className="font-bold text-xl">F</span>
          </div> */}
          {/* <span className="text-2xl font-semibold">Fintt.te</span> */}
          <div className="img">
          <img src={logo} alt="BudgetBee logo" className="w-44 h-auto" />

          </div>
        </div>

        {/* <ul className="hidden md:flex gap-8 text-gray-300">
          <li className="hover:text-white cursor-pointer border-b-2 border-green-400">Home</li>
          <li className="hover:text-white cursor-pointer">Services</li>
          <li className="hover:text-white cursor-pointer">Features</li>
          <li className="hover:text-white cursor-pointer">Payments</li>
          <li className="hover:text-white cursor-pointer">About us</li>
        </ul> */}

        <div className="flex gap-4">
        <Link to="/login" className="text-gray-300 hover:text-white">
    Login
  </Link>
          <Link to="/SignUp">
    <button className="bg-gradient-to-r from-green-400 to-blue-500 px-5 py-2 rounded-full font-semibold hover:opacity-90">
      Sign Up
    </button>
  </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20">
        
        {/* Left Text */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Manage your <br /> 
            <span className="text-white">money</span> in the best <br />
            possible <span className="text-green-400">way.</span>
          </h1>
          <p className="text-gray-400 mb-8">
            BudgetBee is the app that manages your finance with its ever smart features.
          </p>
          <div className="flex items-center gap-6">
          <Link to="/login" className="text-gray-300 hover:text-white">
            <button className="bg-gradient-to-r from-blue-500 to-green-400 px-6 py-3 rounded-full font-semibold hover:opacity-90">
              Get Started
            </button>
            </Link>
            <button className="flex items-center gap-2 text-white">
              <div className="p-3 border-2 border-white rounded-full">
                <FaPlay size={14} />
              </div>
              Watch Video
            </button>
          </div>
        </div>

        {/* Right Images */}
        <div className="relative">
          <img src={phone1} alt="phone1" className="w-60 md:w-80 rotate-[20deg] absolute top-0 left-10" />
          <img src={phone2} alt="phone2" className="w-60 md:w-80 rotate-[-20deg] relative z-10" />
        </div>

      </section>
      {/* why us section */}
          <WhyUs/>
          {/* footer section */}
        {/* about section */}
        <About/>
          <Footer/>
    </div>
  );
};

export default HomePage;
