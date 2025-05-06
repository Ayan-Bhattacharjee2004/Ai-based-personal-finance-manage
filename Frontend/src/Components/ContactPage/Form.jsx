import React, { useState } from 'react';
import './Contact.css';
import faq2 from "../../assets/FAQ2.JPG";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);  // To manage loading state
    const [success, setSuccess] = useState(null);   // To manage success or error states
    const [error, setError] = useState(null);       // To manage error state

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading

        try {
            // Send POST request to the backend API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);  // Success message if email sent
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                setError(data.message || "Something went wrong!");  // Handle any errors
            }
        } catch (err) {
            setError("Network error. Please try again.");  // Handle network errors
        }

        setLoading(false);  // Stop loading
    };

    return (
        <section className="contactFormSection bg-gradient-to-r from-[#030712] to-[#4d556b]">
            <div className="contactInfoLeft">
                <h2>Get in Touch</h2>
                <p>Have questions, suggestions, or feedback? We’d love to hear from you. Fill out the form and we’ll get back to you as soon as possible.</p>
                <p>You can also reach out via email or visit our FAQ section for quick help.</p><br />
                <img className="formLeftImage" src={faq2} alt="faq2 picture" />
            </div>
            <div className="contactFormRight">
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>

                {success && <p className="successMessage">Your message has been sent successfully!</p>}
                {error && <p className="errorMessage">{error}</p>}
            </div>
        </section>
    );
};

export default ContactForm;