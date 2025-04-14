import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import "./contact.css";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We're here to help and answer any questions you might have</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-header">
            <h2>Contact Information</h2>
            <p>Fill out the form and we will get back to you within 24 hours</p>
          </div>

          <div className="info-items">
            <div className="info-item">
              <Phone className="info-icon" />
              <div className="info-content">
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri from 8am to 5pm</p>
              </div>
            </div>

            <div className="info-item">
              <Mail className="info-icon" />
              <div className="info-content">
                <h3>Email Us</h3>
                <p>support@beekeepers.com</p>
                <p>info@beekeepers.com</p>
              </div>
            </div>

            <div className="info-item">
              <MapPin className="info-icon" />
              <div className="info-content">
                <h3>Visit Us</h3>
                <p>123 Honey Street</p>
                <p>Bee Valley, BV 12345</p>
              </div>
            </div>

            <div className="info-item">
              <Clock className="info-icon" />
              <div className="info-content">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926156744775!3d48.858370079287466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647951481244!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="location"
            ></iframe>
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Share your questions or concerns with us</p>
            </div>

            <div className="form-group">
              <input type="text" id="name" required />
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="form-group">
              <input type="email" id="email" required />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="form-group">
              <input type="tel" id="phone" required />
              <label htmlFor="phone">Phone Number</label>
            </div>

            <div className="form-group">
              <select id="subject" required defaultValue="">
                <option value="" disabled>
                  Select Subject
                </option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="partnership">Partnership Opportunity</option>
              </select>
              <label htmlFor="subject">Subject</label>
            </div>

            <div className="form-group">
              <textarea id="message" rows="5" required></textarea>
              <label htmlFor="message">Your Message</label>
            </div>

            <button type="submit" className="submit-button">
              <span>Send Message</span>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>

      <div className="contact-cta">
        <div className="cta-content">
          <h2>Join Our Newsletter</h2>
          <p>Stay updated with our latest news and special offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
