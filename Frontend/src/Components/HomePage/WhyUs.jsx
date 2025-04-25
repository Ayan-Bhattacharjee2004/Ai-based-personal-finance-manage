import React from 'react';

const WhyUs = () => {
  return (
    <div className="bg-black min-h-screen min-w-screen overflow-x-hidden text-white font-sans pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Why Choose BudgetBee?</h2>
        <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12 text-lg">
          We built BudgetBee to help you take control of your finances with ease. Here’s what makes us different.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-gray-400">
              Get personalized financial suggestions based on your spending habits with our smart AI engine.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">All-in-One Dashboard</h3>
            <p className="text-gray-400">
              Track earnings, expenses, and savings from a single, clean interface. No more app switching!
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-400">
              We never sell your data. Your financial journey is yours alone—safe, secure, and private.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Custom Budget Goals</h3>
            <p className="text-gray-400">
              Set your own goals and let BudgetBee track and alert you as you move closer to achieving them.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Expense Categorization</h3>
            <p className="text-gray-400">
              See where your money goes—automatically sorted into categories like food, transport, and bills.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Friendly Support</h3>
            <p className="text-gray-400">
              Questions? Our support team is here to help—real humans who actually care about your success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;