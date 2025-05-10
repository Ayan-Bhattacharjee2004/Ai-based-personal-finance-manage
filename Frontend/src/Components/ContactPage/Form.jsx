import React, { useState } from "react";
import faq2 from "../../assets/5124556.png";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    const contactData = { name, email, message };

    try {
      const response = await fetch("http://localhost:7500/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setResponseMessage("Error sending message. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
       <section className="heroSection bg-gradient-to-r from-[#030712] to-[#4d556b]">
      <div className="hero-content">
        <h1><b>Contact Us</b></h1>
        <br />
        <p>We're here for you!</p>
      </div>
    </section>
    <div className="min-h-screen bg-gradient-to-r from-[#030712] to-[#4d556b] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-6 overflow-hidden max-w-4xl w-full">
        {/* Left Image Section */}
        <div className="md:w-1/2">
          <img
            src={faq2}
            alt="Contact visual"
            className="contact-glow h-full "
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 !text-gray-800">Drop a message!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium !text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium !text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium !text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
          {responseMessage && (
            <p className="mt-4 text-sm text-center text-green-600">
              {responseMessage}
            </p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;
