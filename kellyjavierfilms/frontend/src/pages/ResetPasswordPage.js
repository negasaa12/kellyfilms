import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!password || !confirmPassword) {
      setError('Both passwords are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('❌ Passwords do not match');
      return;
    }

    if (!Object.values(passwordRequirements).every(Boolean)) {
      setError('🔐 Password does not meet requirements:\n• At least 8 characters\n• Uppercase letter\n• Lowercase letter\n• Number\n• Special character (!@#$%^&*)');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(resetToken, password);
      setMessage('✅ Password has been reset successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      let errorMessage = 'Failed to reset password';
      
      if (error.response?.status === 400) {
        errorMessage = '❌ Invalid or expired reset link. Request a new password reset.';
      } else if (error.response?.status === 404) {
        errorMessage = '❌ Reset token not found or expired.';
      } else if (error.response?.status >= 500) {
        errorMessage = '⚠️ Server error. Please try again later.';
      } else if (error.message === 'Network Error') {
        errorMessage = '🌐 Network error. Check your internet connection.';
      } else {
        errorMessage = error.response?.data?.message || 'Failed to reset password. Try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h1 className="reset-password-title">KellyJavier Films</h1>
        <h2 className="reset-password-subtitle">Create New Password</h2>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        {!message ? (
          <form onSubmit={handleSubmit} className="reset-password-form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <div className="password-requirements">
                <p className="requirements-title">Password Requirements:</p>
                <ul className="requirements-list">
                  <li className={passwordRequirements.length ? 'met' : ''}>
                    ✓ At least 8 characters
                  </li>
                  <li className={passwordRequirements.uppercase ? 'met' : ''}>
                    ✓ One uppercase letter
                  </li>
                  <li className={passwordRequirements.lowercase ? 'met' : ''}>
                    ✓ One lowercase letter
                  </li>
                  <li className={passwordRequirements.number ? 'met' : ''}>
                    ✓ One number
                  </li>
                  <li className={passwordRequirements.special ? 'met' : ''}>
                    ✓ One special character (!@#$%^&*)
                  </li>
                </ul>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
