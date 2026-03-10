import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api/api';
import './ProfileTab.css';

const ProfileTab = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Initialize form with user data
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.profile?.bio || '',
        phone: user.profile?.phone || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.updateProfile(formData);
      
      // Update user in context and localStorage
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccess('✅ Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update profile';
      setError('❌ ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-tab">
      <h2>Your Profile</h2>
      
      <div className="profile-container">
        <div className="profile-section">
          <h3>Your Portfolio Details</h3>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself, your style, and your work..."
                className="form-textarea"
                rows="6"
              />
              <p className="form-hint">Describe your cinematography style, experience, and expertise</p>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Contact Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="form-input"
              />
              <p className="form-hint">Your contact number for inquiries and bookings</p>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Saving...' : '💾 Save Changes'}
              </button>
            </div>
          </form>
        </div>

        <div className="profile-card-preview">
          <h3>Preview</h3>
          <div className="profile-card">
            <div className="profile-info">
              <h4>{formData.firstName} {formData.lastName}</h4>
              <p className="role">Cinematographer & Director</p>
              
              {formData.bio && (
                <div className="preview-bio">
                  <p>{formData.bio}</p>
                </div>
              )}

              {formData.phone && (
                <div className="preview-contact">
                  <p><strong>📞 Contact:</strong> {formData.phone}</p>
                </div>
              )}
              
              <p className="preview-email"><strong>📧 Email:</strong> {user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
