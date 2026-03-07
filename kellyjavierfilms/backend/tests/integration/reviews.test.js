const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Film = require('../../models/Film');
const Review = require('../../models/Review');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

describe('Reviews API Endpoints', () => {
  let token;
  let userId;
  let adminId;
  let adminToken;
  let filmId;

  beforeAll(async () => {
    // Create test user
    const user = await User.create({
      firstName: 'Test',
      lastName: 'Reviewer',
      email: 'reviewer@test.com',
      password: 'Test@1234',
      role: 'user'
    });
    userId = user._id;
    token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '7d' }
    );

    // Create admin
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@test.com',
      password: 'Admin@1234',
      role: 'admin'
    });
    adminId = admin._id;
    adminToken = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '7d' }
    );

    // Create test film
    const film = await Film.create({
      title: 'Film for Reviews',
      description: 'Description',
      director: 'Director',
      releaseYear: 2023,
      duration: 120,
      genre: ['Action'],
      createdBy: adminId
    });
    filmId = film._id;
  });

  afterAll(async () => {
    await Review.deleteMany({});
    await Film.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/reviews', () => {
    test('should create a review when authenticated', async () => {
      const reviewData = {
        film: filmId,
        rating: 8,
        comment: 'Great film!'
      };

      const response = await request(app)
        .post('/api/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send(reviewData);

      expect(response.status).toBe(201);
      expect(response.body.review.rating).toBe(8);
      expect(response.body.review.comment).toBe('Great film!');
    });

    test('should reject review creation without authentication', async () => {
      const reviewData = {
        film: filmId,
        rating: 8,
        comment: 'Great film!'
      };

      const response = await request(app)
        .post('/api/reviews')
        .send(reviewData);

      expect(response.status).toBe(401);
    });

    test('should validate rating range (0-10)', async () => {
      const reviewData = {
        film: filmId,
        rating: 11, // Invalid rating
        comment: 'Great film!'
      };

      const response = await request(app)
        .post('/api/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send(reviewData);

      expect(response.status).toBe(400);
    });

    test('should prevent duplicate reviews from same user', async () => {
      // First review already created above
      const reviewData = {
        film: filmId,
        rating: 9,
        comment: 'Another review!'
      };

      const response = await request(app)
        .post('/api/reviews')
        .set('Authorization', `Bearer ${token}`)
        .send(reviewData);

      expect(response.status).toBe(400);
    });

    test('should update film average rating', async () => {
      // Create second user and review
      const user2 = await User.create({
        firstName: 'Second',
        lastName: 'Reviewer',
        email: 'reviewer2@test.com',
        password: 'Test@1234'
      });
      const token2 = jwt.sign(
        { id: user2._id, role: user2.role },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '7d' }
      );

      const reviewData = {
        film: filmId,
        rating: 10,
        comment: 'Perfect!'
      };

      await request(app)
        .post('/api/reviews')
        .set('Authorization', `Bearer ${token2}`)
        .send(reviewData);

      const film = await Film.findById(filmId);
      expect(film.averageRating).toBeGreaterThan(0);
    });
  });

  describe('GET /api/reviews/:filmId', () => {
    test('should retrieve reviews for a film', async () => {
      const response = await request(app)
        .get(`/api/reviews/${filmId}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.reviews)).toBe(true);
      expect(response.body.reviews.length).toBeGreaterThan(0);
    });

    test('should return empty array for film with no reviews', async () => {
      const film2 = await Film.create({
        title: 'Film with No Reviews',
        description: 'Description',
        director: 'Director',
        releaseYear: 2023,
        duration: 90,
        genre: ['Drama'],
        createdBy: adminId
      });

      const response = await request(app)
        .get(`/api/reviews/${film2._id}`);

      expect(response.status).toBe(200);
      expect(response.body.reviews.length).toBe(0);
    });
  });

  describe('PUT /api/reviews/:id', () => {
    let reviewId;

    beforeAll(async () => {
      const review = await Review.findOne({ user: userId });
      if (review) reviewId = review._id;
    });

    test('should update own review', async () => {
      const response = await request(app)
        .put(`/api/reviews/${reviewId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          rating: 9,
          comment: 'Updated review'
        });

      expect(response.status).toBe(200);
      expect(response.body.review.rating).toBe(9);
      expect(response.body.review.comment).toBe('Updated review');
    });

    test('should prevent updating other user\'s review', async () => {
      const user2 = await User.create({
        firstName: 'Other',
        lastName: 'User',
        email: 'other@test.com',
        password: 'Test@1234'
      });
      const token2 = jwt.sign(
        { id: user2._id },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '7d' }
      );

      const response = await request(app)
        .put(`/api/reviews/${reviewId}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({ rating: 1 });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/reviews/:id', () => {
    test('should delete own review', async () => {
      const review = await Review.findOne({ user: userId });

      const response = await request(app)
        .delete(`/api/reviews/${review._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);

      const deleted = await Review.findById(review._id);
      expect(deleted).toBeNull();
    });

    test('should prevent deleting other user\'s review', async () => {
      // Create a review to delete
      const user2 = await User.create({
        firstName: 'User2',
        lastName: 'Reviewer',
        email: 'user2.reviewer@test.com',
        password: 'Test@1234'
      });
      const token2 = jwt.sign(
        { id: user2._id },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '7d' }
      );

      const film2 = await Film.create({
        title: 'Film for Delete Test',
        description: 'Description',
        director: 'Director',
        releaseYear: 2023,
        duration: 120,
        genre: ['Action'],
        createdBy: adminId
      });

      const review = await Review.create({
        film: film2._id,
        user: user2._id,
        rating: 8,
        comment: 'Test'
      });

      // Try to delete with different user's token
      const response = await request(app)
        .delete(`/api/reviews/${review._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(403);
    });
  });
});
