import React, { useState } from "react";
import "../styles/theme.css"; // Global theme

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mailto link with form data
    const mailtoLink = `mailto:bhardwajsawan0@gmail.com?subject=Contact from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage: ${message}`;

    // Open user's email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-container">
      <h1 className="form-title">Contact Us</h1>
      <div className="card contact-wrapper">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            className="input-field"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input-field"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Message"
            className="input-field"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
