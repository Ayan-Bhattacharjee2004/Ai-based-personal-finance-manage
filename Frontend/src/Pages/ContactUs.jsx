import React from "react"
import "../Components/ContactPage/Contact.css"
import Footer from '../Components/AboutPage/Footer';
import FAQ from "../Components/ContactPage/FAQ";
import Form from "../Components/ContactPage/Form";

function ContactUs () {
    return (
        <div className="ContactPageWrapper">
        <Form/>
        <FAQ/>
        <Footer/>
        </div>
    ) 
}
export default ContactUs