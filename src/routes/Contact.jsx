import React from "react";
import '../component/Contact/ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h1 className="title">Contact Us</h1>
      <div className="contact-wrapper">
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><i className="fas fa-map-marker-alt"></i> SoHo 94 Broadway St, New York, NY 1001</p>
          <p><i className="fas fa-phone"></i> +1 234-567-8900</p>
          <p><i className="fas fa-envelope"></i> hello@theme.com</p>
          <div className="map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24197.101708434827!2d-74.0104611!3d40.7195261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af50e44bdf%3A0xbee4e2ff87c3697!2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1644541234567!5m2!1sen!2sus"
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
