const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a film title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  genre: {
    type: [String],
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Romance', 'Animation', 'Documentary', 'Thriller', 'Fantasy'],
    required: [true, 'Please select at least one genre']
  },
  releaseYear: {
    type: Number,
    required: [true, 'Please provide release year'],
    min: [1900, 'Year cannot be before 1900'],
    max: [new Date().getFullYear() + 5, 'Year cannot be in the far future']
  },
  director: {
    type: String,
    required: [true, 'Please provide director name']
  },
  cast: [String],
  duration: {
    type: Number,
    required: [true, 'Please provide duration in minutes']
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be below 0'],
    max: [10, 'Rating cannot exceed 10'],
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  poster: {
    type: String,
    default: '/images/placeholder-poster.jpg'
  },
  streamUrl: {
    type: String,
    required: [true, 'Please provide streaming URL']
  },
  price: {
    type: Number,
    default: 0 // 0 = free, >0 = paid
  },
  views: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

// Index for search
filmSchema.index({ title: 'text', description: 'text', genre: 1, director: 1 });

module.exports = mongoose.model('Film', filmSchema);
