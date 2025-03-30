import React, { useState } from "react";
import '../component/Contact/ContactPage.css';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:rajupaju@gmail.com?subject=Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage: ${message}`;
    
    // Open user's email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-container">
      <h1 className="title">Contact Us</h1>
      <div className="contact-wrapper">
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea 
              placeholder="Your Message" 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><i className="fas fa-map-marker-alt"></i> Central University Himachal Pradesh, Shahpur, 176206</p>
          <p><i className="fas fa-phone"></i> +91 234-567-8900</p>
          <p><i className="fas fa-envelope"></i> yourcompanyemail@example.com</p>
          <div className="map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.4926970802267!2d76.15402567583222!3d32.224494212017085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b5ea0362d1c07%3A0x4b75f266ab9a9cc7!2sCentral%20University%20of%20Himachal%20Pradesh%20(CUHP)!5e1!3m2!1sen!2sin!4v1740759850602!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
