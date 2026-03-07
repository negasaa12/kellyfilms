import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);

    try {
      await forgotPassword(email);
      setMessage('✅ Password reset link has been sent to your email. Check your inbox and spam folder.');
      setEmail('');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      let errorMessage = 'Failed to send password reset email';
      
      if (error.response?.status === 404) {
        errorMessage = '❌ No account found with this email address.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || 'Invalid email format';
      } else if (error.response?.status >= 500) {
        errorMessage = '⚠️ Server error. Please try again later.';
      } else if (error.message === 'Network Error') {
        errorMessage = '🌐 Network error. Check your internet connection.';
      } else {
        errorMessage = error.response?.data?.message || 'Failed to send reset email. Try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1 className="forgot-password-title">KellyJavier Films</h1>
        <h2 className="forgot-password-subtitle">Reset Password</h2>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <p className="forgot-password-description">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {!message ? (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : null}

        <div className="back-to-login">
          <Link to="/login" className="back-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
