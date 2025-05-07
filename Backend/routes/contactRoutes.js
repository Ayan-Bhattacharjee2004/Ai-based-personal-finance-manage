const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Nodemailer setup using Gmail (from .env)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail email from .env
        pass: process.env.EMAIL_PASS,  // Your Gmail app password from .env
    },
});

// Route to handle POST request from contact form
router.post("/", (req, res) => {
    const { name, email, message } = req.body;  // Extract the data from the form submission

    // Mail options to send email
    const mailOptions = {
        from: email,  // Sender's email
        to: process.env.EMAIL_USER,  // Receiver's email (your Gmail)
        subject: `New message from ${name}`,  // Subject with sender's name
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,  // Body of the email
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);  // If there’s an error, log it
            return res.status(500).send("Error sending email");
        }
        console.log("Email sent: " + info.response);  // If the email was sent successfully, log the response
        return res.status(200).send("Message sent successfully!");  // Send success response to frontend
    });
});

module.exports = router;  // Export the router to be used in server.js