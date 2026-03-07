const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating cannot be below 1'],
    max: [10, 'Rating cannot exceed 10']
  },
  comment: {
    type: String,
    maxlength: [5000, 'Comment cannot exceed 5000 characters']
  },
  helpful: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index to prevent duplicate reviews
reviewSchema.index({ film: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
