import React from 'react';
import '../Components/AboutPage/About.css';
import Footer from '../Components/AboutPage/Footer';

function About() {
  return (
    <div className="aboutPageWrapper">
      <div className="sectionDivider"></div>
      {/* WHY WE EXIST SECTION */}
      <section className="whyWeExist">
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

      <div className="sectionDivider"></div>

      {/* HOW IT WORKS SECTION */}
      <section className="howItWorks">
        <h2>How It Works</h2>
        <div className="stepsContainer">
          <div className="step">
            <h3>1. Connect Your Accounts</h3>
            <p>Securely link your bank accounts, credit cards, and bills in just a few clicks.</p>
          </div>
          <div className="step">
            <h3>2. Let AI Analyze</h3>
            <p>Our AI instantly tracks your spending, income, and financial patterns.</p>
          </div>
          <div className="step">
            <h3>3. Get Smart Insights</h3>
            <p>Receive real-time suggestions, saving goals, and budget tips tailored to you.</p>
          </div>
        </div>
      </section>

      <div className="sectionDivider"></div>

      {/* MEET OUR TEAM SECTION */}
      <section className="meetOurTeam">
        <h2>Meet Our Team</h2>
        <div className="teamContainer">
          <div className="teamMember">
            <img src="team-member-1.jpg" alt="Team Member 1" className="teamImage" />
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
            <img src="team-member-3.jpg" alt="Team Member 3" className="teamImage" />
            <h3>Kasif Sk</h3>
            <p>Head of Product</p>
            <p>Kasif ensures our product delivers value to our users every day.</p>
          </div>
          <div className="teamMember">
            <img src="team-member-4.jpg" alt="Team Member 4" className="teamImage" />
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
