const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/featured', filmController.getFeaturedFilms);
router.get('/:id', filmController.getFilm);
router.get('/', filmController.getAllFilms);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), filmController.createFilm);
router.put('/:id', protect, authorize('admin'), filmController.updateFilm);
router.delete('/:id', protect, authorize('admin'), filmController.deleteFilm);

module.exports = router;
