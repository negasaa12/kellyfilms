const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Film = require('../../models/Film');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

describe('Films API Endpoints', () => {
  let token;
  let adminToken;
  let userId;
  let adminId;
  let filmId;

  beforeAll(async () => {
    // Create test users
    const user = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'user@test.com',
      password: 'Test@1234',
      role: 'user'
    });
    userId = user._id;
    token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '7d' }
    );

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
  });

  afterAll(async () => {
    await Film.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/films', () => {
    test('should retrieve all films', async () => {
      await Film.create({
        title: 'Test Film',
        description: 'Test Description',
        director: 'Test Director',
        releaseYear: 2023,
        duration: 120,
        genre: ['Action'],
        createdBy: adminId
      });

      const response = await request(app).get('/api/films');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.films)).toBe(true);
      expect(response.body.films.length).toBeGreaterThan(0);
    });

    test('should filter films by genre', async () => {
      const response = await request(app)
        .get('/api/films')
        .query({ genre: 'Action' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.films)).toBe(true);
    });

    test('should search films by title', async () => {
      const response = await request(app)
        .get('/api/films')
        .query({ search: 'Test' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.films)).toBe(true);
    });

    test('should support pagination', async () => {
      const response = await request(app)
        .get('/api/films')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('films');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page');
    });
  });

  describe('GET /api/films/:id', () => {
    beforeEach(async () => {
      const film = await Film.create({
        title: 'Detail Test Film',
        description: 'Test Description',
        director: 'Test Director',
        releaseYear: 2023,
        duration: 120,
        genre: ['Drama'],
        createdBy: adminId
      });
      filmId = film._id;
    });

    test('should retrieve film details', async () => {
      const response = await request(app)
        .get(`/api/films/${filmId}`);

      expect(response.status).toBe(200);
      expect(response.body.film.title).toBe('Detail Test Film');
      expect(response.body.film.views).toBeGreaterThan(0); // Views should increment
    });

    test('should return 404 for non-existent film', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/films/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/films', () => {
    test('should create film as admin', async () => {
      const filmData = {
        title: 'New Film',
        description: 'New Description',
        director: 'New Director',
        releaseYear: 2023,
        duration: 150,
        genre: ['Action', 'Drama'],
        price: 'free'
      };

      const response = await request(app)
        .post('/api/films')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(filmData);

      expect(response.status).toBe(201);
      expect(response.body.film.title).toBe('New Film');
      filmId = response.body.film._id;
    });

    test('should reject film creation by non-admin', async () => {
      const filmData = {
        title: 'Unauthorized Film',
        description: 'Description',
        director: 'Director',
        releaseYear: 2023,
        duration: 150,
        genre: ['Action'],
        price: 'free'
      };

      const response = await request(app)
        .post('/api/films')
        .set('Authorization', `Bearer ${token}`)
        .send(filmData);

      expect(response.status).toBe(403);
    });

    test('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/films')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: '' }); // Missing required fields

      expect(response.status).toBe(400);
    });
  });

  describe('PUT /api/films/:id', () => {
    test('should update film as admin', async () => {
      const response = await request(app)
        .put(`/api/films/${filmId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(200);
      expect(response.body.film.title).toBe('Updated Title');
    });

    test('should not allow non-admin to update', async () => {
      const response = await request(app)
        .put(`/api/films/${filmId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Unauthorized Update' });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/films/:id', () => {
    test('should delete film as admin', async () => {
      const film = await Film.create({
        title: 'Film to Delete',
        description: 'Description',
        director: 'Director',
        releaseYear: 2023,
        duration: 120,
        genre: ['Action'],
        createdBy: adminId
      });

      const response = await request(app)
        .delete(`/api/films/${film._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);

      const deleted = await Film.findById(film._id);
      expect(deleted).toBeNull();
    });
  });

  describe('GET /api/films/featured', () => {
    test('should retrieve featured films', async () => {
      const response = await request(app)
        .get('/api/films/featured');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.films)).toBe(true);
    });
  });
});
