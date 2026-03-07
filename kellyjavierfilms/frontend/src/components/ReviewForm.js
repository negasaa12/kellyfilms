import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { reviewAPI } from '../api/api';
import './ReviewForm.css';

const ReviewForm = ({ filmId, onReviewSubmitted }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to leave a review');
      return;
    }

    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await reviewAPI.createReview({
        film: filmId,
        rating: parseInt(rating),
        comment
      });

      setComment('');
      setRating(5);
      setSuccess('Review posted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error posting review');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="login-prompt">Please log in to leave a review</div>;
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Rating</label>
        <div className="rating-selector">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
            <button
              key={r}
              type="button"
              className={`rating-btn ${rating === r ? 'active' : ''}`}
              onClick={() => setRating(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about this film..."
          rows="5"
          maxLength="500"
        />
        <div className="char-count">{comment.length}/500</div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <button
        type="submit"
        disabled={loading}
        className="submit-btn"
      >
        {loading ? 'Posting...' : 'Post Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
