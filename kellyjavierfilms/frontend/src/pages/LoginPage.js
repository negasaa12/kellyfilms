import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Track error state changes
  useEffect(() => {
    if (error) {
      console.log('🔴 ERROR STATE UPDATED:', error);
    }
  }, [error]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters';
    }
    
    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const response = await login(email, password);
      console.log('✅ Login successful:', response);
      console.log('Navigating to dashboard...');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('❌ Login error caught:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      let errorMessage = 'Login failed';
    
      console.log(error.response?.status);
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error.response?.status === 429) {
        errorMessage = '⛔ Account locked for security. Too many login attempts. Try again in 2 hours.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || 'Invalid credentials';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = '🌐 Cannot connect to server. Is the backend running on port 5000?';
      } else if (error.response?.status >= 500) {
        errorMessage = '⚠️ Server error. Please try again later.';
      } else if (error.message === 'Network Error') {
        errorMessage = '🌐 Network error. Check your internet connection.';
      } else {
        errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      }
      
      console.log('Setting error message:', errorMessage);
      setError(errorMessage);
      console.log('Error state should be:', errorMessage);
      console.log('Current error state variable:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">KellyJavier Films</h1>
        <h2 className="login-subtitle">Sign In</h2>

        {/* DEBUG: Simple error display */}
        {error && <div style={{background: '#ff4444', color: 'white', padding: '15px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>⚠️ ERROR: {error}</div>}

        {/* Main error display */}
        {error && (
          <div className="error-message error-alert">
            <div className="error-icon">❌</div>
            <div className="error-content">
              <div className="error-title">Login Failed</div>
              <div className="error-text">{error}</div>
              {error.includes('Invalid') && (
                <div className="error-hint">💡 Tip: Check your email and password are correct</div>
              )}
              {error.includes('locked') && (
                <div className="error-hint">💡 Tip: Try again later or reset your password</div>
              )}
              {error.includes('Cannot connect') && (
                <div className="error-hint">💡 Tip: Make sure the server is running</div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className={`form-input ${fieldErrors.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: '' }));
                if (error) setError(''); // Clear error when user starts typing
              }}
              disabled={loading}
            />
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-input ${fieldErrors.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: '' }));
                if (error) setError(''); // Clear error when user starts typing
              }}
              disabled={loading}
            />
            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-links">
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>

        <div className="signup-section">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
