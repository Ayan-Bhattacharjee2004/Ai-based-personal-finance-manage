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
            <p>Start by setting up your personalized budget accounts — like Food, Travel, Bills, or Savings. These categories help you
              organize your spending and income in a way that makes sense for your lifestyle. Whether you're planning a trip or managing
              groceries, creating clear accounts keeps your finances simple, structured, and easy to track.</p>
          </div>
          <div className="step bg-gray-900">
            <h3>2. Let AI Analyze</h3>
            <p> Once you've added your income and expenses into your custom categories, our intelligent system steps in.
              BudgetBee automatically analyzes your financial activity, identifies spending trends, and highlights where
              you're saving — or overspending. It's like having a smart assistant that keeps an eye on your money 24/7.</p>
          </div>
          <div className="step bg-gray-900">
            <h3>3. Get Smart Insights</h3>
            <p>RTurn your data into action. BudgetBee gives you personalized tips, alerts, and savings goals based on your
              spending habits. Whether you're trying to cut back on dining out or save more for travel, you'll get
              real-time, AI-powered advice to stay on track and reach your financial goals faster.</p>
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
            <p>Project Leader, Coding</p>
            <p>Ayan drives our vision forward, blending technical expertise with a passion for making personal finance smarter through AI-powered solutions.</p>
          </div>
          <div className="teamMember">
            <img src="team-member-2.jpg" alt="Team Member 2" className="teamImage" />
            <h3>Robiul Sk</h3>
            <p>Authentication & Presentation Design</p>
            <p>Robiul built our secure login system and designs presentations that make our vision clear and compelling.</p>
          </div>
          <div className="teamMember">
            <img src={KasifImage} alt="Team Member 3" className="teamImage" />
            <h3>Kasif Sk</h3>
            <p>Quality Assurance & Testing</p>
            <p>Kasif rigorously tests every feature to ensure a seamless and reliable experience for our users.</p>
          </div>
          <div className="teamMember">
            <img src={YounusImage} alt="Team Member 4" className="teamImage " />
            <h3>Younus Hossain</h3>
            <p>Development & Documentation</p>
            <p>Younus combines technical expertise with clear documentation to ensure our platform is both powerful and easy to understand.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;