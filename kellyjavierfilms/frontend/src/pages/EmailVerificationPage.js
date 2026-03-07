import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EmailVerificationPage.css';

const EmailVerificationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setMessage('Email verified successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to verify email');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, verifyEmail, navigate]);

  return (
    <div className="email-verification-container">
      <div className="verification-box">
        <h1 className="verification-title">KellyJavier Films</h1>
        <h2 className="verification-subtitle">Email Verification</h2>

        {loading && (
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Verifying your email...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-message">{error}</div>
        )}

        {message && !loading && (
          <div className="success-message">{message}</div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
