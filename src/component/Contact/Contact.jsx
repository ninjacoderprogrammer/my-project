import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../../styles/theme.css"; // Global theme
import "./ContactPage.css"; // Component-specific styles

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false); // To show success message

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const mailtoLink = `mailto:bhardwajsawan0@gmail.com?subject=Contact from ${encodeURIComponent(
      name
    )}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(
      email
    )}%0D%0A%0D%0AMessage: ${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    setIsSent(true); // Assume sent for feedback, real email sending is client-side
    // Reset form if needed, or redirect, or show persistent success message
    // setName("");
    // setEmail("");
    // setMessage("");
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-branding-section">
        <div className="logo">RetailConnect</div>
        <p className="tagline">
          We're here to help and answer any question you might have. We look
          forward to hearing from you!
        </p>
      </div>
      <div className="contact-form-section">
        <div className="contact-card-container">
          <h1 className="form-title">Get in Touch</h1>
          {isSent ? (
            <div className="success-message">
              Your message has been prepared for sending! Please check your email
              client.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-field"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Your Name"
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input-field"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Your Email"
                />
              </div>
              <div className="input-group">
                <textarea
                  placeholder="Your Message"
                  className="input-field"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="5"
                  aria-label="Your Message"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          )}
          <div className="contact-form-footer">
            <Link to="/">Go to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
