import React, { useEffect } from 'react';
import "./WhyUs.css";
import phone2 from '../../Assets/Screenshot (38).png';  // Import the image

const WhyUs = () => {
  useEffect(() => {
    // Animation for elements when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    // Observe all feature boxes
    document.querySelectorAll('.feature-box').forEach(box => {
      observer.observe(box);
    });

    // Observe the image
    const image = document.querySelector('.app-image');
    if (image) observer.observe(image);

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-white font-sans pt-24 bg-gradient-to-r from-[#030712] to-[#4d556b]" >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-slide-down">Why Choose BudgetBee?</h2>
        <p className="text-gray-300 text-center max-w-3xl mb-12 text-lg animate-slide-up" 
   style={{ margin: '0 auto' }}>
  We built BudgetBee to help you take control of your finances with ease. Here's what makes us different.
</p>
        
        {/* Main Content Wrapper: Flex layout */}
        <div className="flex justify-center items-center space-x-8">
          {/* Left Side - Features */}
          <div className="w-1/2 space-y-8">
            <div className="feature-box bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">AI-Powered Insights</h3>
              <p className="text-gray-400">
                Get personalized financial suggestions based on your spending habits with our smart AI engine.
              </p>
            </div>
            
            <div className="feature-box bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">All-in-One Dashboard</h3>
              <p className="text-gray-400">
                Track earnings, expenses, and savings from a single, clean interface. No more app switching!
              </p>
            </div>
            
            <div className="feature-box bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Privacy First</h3>
              <p className="text-gray-400">
                We never sell your data. Your financial journey is yours alone—safe, secure, and private.
              </p>
            </div>
          </div>
          
          {/* Centered Image */}
          <div className="flex-shrink-0 w-1/2 h-auto">
            <img
              src={phone2}
              alt="AI Powered Insights"
              className="app-image w-90 ml-40 rounded-lg transition-all duration-500 hover:scale-105"
            />
          </div>
          
          {/* Right Side - Features */}
          <div className="w-1/2 space-y-8">
            <div className="feature-box bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Custom Budget Goals</h3>
              <p className="text-gray-400">
                Set your own goals and let BudgetBee track and alert you as you move closer to achieving them.
              </p>
            </div>
            
            <div className="feature-box bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Expense Categorization</h3>
              <p className="text-gray-400">
                See where your money goes—automatically sorted into categories like food, transport, and bills.
              </p>
            </div>
            
            <div className="feature-box bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Friendly Support</h3>
              <p className="text-gray-400">
                Questions? Our support team is here to help—real humans who actually care about your success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;