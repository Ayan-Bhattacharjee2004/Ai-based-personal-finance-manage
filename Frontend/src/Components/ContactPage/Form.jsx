import React, { useState } from "react";
import faq2 from "../../assets/faq2.jpg";

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
    <div className="contactFormSection">
      <section className="formLeftImage">
        <img src={faq2} alt="left side illustration" />
      </section>
      <section className="contactFormRight">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </section>
    </div>
  );
};

export default ContactForm;
