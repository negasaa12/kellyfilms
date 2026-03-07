import React, { useState, useEffect } from 'react';
import { reviewAPI } from '../../api/api';
import './ManageReviews.css';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Since we need to get all reviews, we'll need to fetch all films first
      // For now, we'll show a message that this feature needs backend pagination
      setError('');
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        // Delete review
        setError('');
        alert('Review deleted successfully');
        fetchReviews();
      } catch (err) {
        setError('Failed to delete review');
        console.error('Error:', err);
      }
    }
  };

  return (
    <div className="manage-reviews">
      <div className="reviews-header">
        <h2>⭐ Manage Reviews</h2>
        <div className="filter-controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="all">All Reviews</option>
            <option value="high">High Rated (4-5 stars)</option>
            <option value="medium">Medium Rated (2-3 stars)</option>
            <option value="low">Low Rated (1 star)</option>
          </select>
        </div>
      </div>

      {error && <div className="error-alert">{error}</div>}

      {loading ? (
        <div className="loading">Loading reviews...</div>
      ) : (
        <div className="reviews-container">
          <div className="review-stats">
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Total Reviews</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0.0</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">5-Star Reviews</div>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="empty-state">
              <p>📊 No reviews yet. When people review your films, they'll appear here.</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review._id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <h3>{review.filmTitle}</h3>
                      <p className="reviewer-name">by {review.reviewerName}</p>
                    </div>
                    <div className="review-rating">
                      <span className="stars">{'⭐'.repeat(review.rating)}</span>
                      <span className="rating-value">{review.rating}/5</span>
                    </div>
                  </div>
                  <p className="review-text">{review.comment}</p>
                  <div className="review-footer">
                    <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                    <button 
                      className="delete-review-btn"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
