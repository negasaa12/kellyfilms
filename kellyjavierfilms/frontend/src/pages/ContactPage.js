import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import './ContactPage.css';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'inquiry'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await api.post('/contact', formData);
      
      setSuccessMessage('✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'inquiry'
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      setErrorMessage('❌ Failed to send message. Please try again later.');
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-container">
      <header className="contact-header">
        <div className="contact-header-content">
          <h1 className="contact-title">Kelly Javier</h1>
          <p className="contact-tagline">Cinematographer & Director</p>
        </div>
        <nav className="contact-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/films" className="nav-link">Portfolio</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link active">Contact</Link>
        </nav>
      </header>

      <div className="contact-content">
        <div className="contact-hero">
          <h1>Get In Touch</h1>
          <p>Let's discuss your next project or collaboration opportunity</p>
        </div>

        <div className="contact-body">
          <div className="contact-info">
            <h2>📞 Contact Information</h2>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <p>Get in touch via email for inquiries and proposals</p>
              </div>
              <div className="info-card">
                <div className="info-icon">🎬</div>
                <h3>Collaborations</h3>
                <p>Interested in working together? Let's talk about it</p>
              </div>
              <div className="info-card">
                <div className="info-icon">💼</div>
                <h3>Bookings</h3>
                <p>Available for hire on select projects and events</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>

            {successMessage && (
              <div className="success-alert">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="error-alert">{errorMessage}</div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className={errors.name ? 'input-error' : ''}
                disabled={loading}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={errors.email ? 'input-error' : ''}
                  disabled={loading}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="type">Inquiry Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="inquiry">General Inquiry</option>
                <option value="collaboration">Collaboration</option>
                <option value="booking">Booking Request</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What is this about?"
                className={errors.subject ? 'input-error' : ''}
                disabled={loading}
              />
              {errors.subject && <span className="field-error">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your inquiry..."
                rows={6}
                className={errors.message ? 'input-error' : ''}
                disabled={loading}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <footer className="contact-footer">
        <p>&copy; 2024 KellyJavier Films. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
