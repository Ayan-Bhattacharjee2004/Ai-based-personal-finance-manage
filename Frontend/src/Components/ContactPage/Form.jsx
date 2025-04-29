import React, { useState } from 'react';
import './Contact.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent successfully!');
    };

    return (
        <section className="contactFormSection">
            <div className="contactInfoLeft">
                <h2>Get in Touch</h2>
                <p>Have questions, suggestions, or feedback? We’d love to hear from you. Fill out the form and we’ll get back to you as soon as possible.</p>
                <p>You can also reach out via email or visit our FAQ section for quick help.</p>
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

                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
