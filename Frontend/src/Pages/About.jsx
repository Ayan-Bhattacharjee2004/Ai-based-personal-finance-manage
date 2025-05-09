import React, { useEffect } from 'react';
import '../Components/AboutPage/About.css';
import AyanImage from "../assets/IMG_20250428_183516091_HDR_PORTRAIT~2.png";
import KasifImage from "../assets/KasifImage.jpg"
import YounusImage from "../assets/YounusImage.jpg"

import { ToastContainer, toast } from "react-toastify";


function About() {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.step, .teamMember').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="aboutPageWrapper">

      {/* WHY WE EXIST SECTION */}
      <section className="whyWeExist bg-gradient-to-r from-[#030712] to-[#4d556b]">
        <h2>Why We Exist</h2>
        <p>
          Managing money shouldn’t be complicated. In a world full of overwhelming spreadsheets,
          scattered accounts, and unpredictable expenses, we believe finance should be smarter,
          simpler, and more personal.
        </p>
        <p>
          That’s why we created <strong>BudgetBee</strong> — your AI-powered finance companion.
          We exist to make financial decision-making easy, stress-free, and intelligent, for everyone.
        </p>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="howItWorks bg-gradient-to-r from-[#030712] to-[#4d556b]">
        <h2 className="animate-slide-down">How It Works</h2>
        <div className="stepsContainer">
          <div className="step bg-gray-900">
            <h3>1. Connect Your Accounts</h3>
            <p>Securely link your bank accounts, credit cards, and bills in just a few clicks.</p>
          </div>
          <div className="step bg-gray-900">
            <h3>2. Let AI Analyze</h3>
            <p>Our AI instantly tracks your spending, income, and financial patterns.</p>
          </div>
          <div className="step bg-gray-900">
            <h3>3. Get Smart Insights</h3>
            <p>Receive real-time suggestions, saving goals, and budget tips tailored to you.</p>
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM SECTION */}
      <section className="meetOurTeam bg-gradient-to-r from-[#030712] to-[#4d556b]">
        <h2 className="animate-slide-down">Meet Our Team</h2>
        <div className="teamContainer">
          <div className="teamMember">
            <img src={AyanImage} alt="Team Member 1" className="teamImage" />
            <h3>Ayan Bhattacharjee</h3>
            <p>CEO & Founder</p>
            <p>Ayan leads our mission to simplify personal finance using AI.</p>
          </div>
          <div className="teamMember">
            <img src="team-member-2.jpg" alt="Team Member 2" className="teamImage" />
            <h3>Robiul Sk</h3>
            <p>CTO & Co-Founder</p>
            <p>Robiul is the brains behind our innovative AI technology.</p>
          </div>
          <div className="teamMember">
            <img src={KasifImage} alt="Team Member 3" className="teamImage" />
            <h3>Kasif Sk</h3>
            <p>Head of Product</p>
            <p>Kasif ensures our product delivers value to our users every day.</p>
          </div>
          <div className="teamMember">
            <img src={YounusImage} alt="Team Member 4" className="teamImage " />
            <h3>Younus Hossain</h3>
            <p>Marketing Director</p>
            <p>Younus leads our outreach and communication strategies to grow our user base.</p>
          </div>
        </div> 
      </section>

    </div>
  );
}

export default About;