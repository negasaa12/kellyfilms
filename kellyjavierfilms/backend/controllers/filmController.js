const Film = require('../models/Film');

// @desc    Get all films
// @route   GET /api/films
// @access  Public
exports.getAllFilms = async (req, res) => {
  try {
    const { genre, search, sortBy = '-createdAt', page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by genre
    if (genre) {
      query.genre = genre;
    }

    // Search in title and description
    if (search) {
      query.$text = { $search: search };
    }

    const films = await Film.find(query)
      .sort(sortBy)
      .limit(limit * 1)
      .skip(skip)
      .select('-__v');

    const total = await Film.countDocuments(query);

    res.status(200).json({
      success: true,
      count: films.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      films
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching films',
      error: error.message
    });
  }
};

// @desc    Get single film
// @route   GET /api/films/:id
// @access  Public
exports.getFilm = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id)
      .populate('createdBy', 'firstName lastName email');

    if (!film) {
      return res.status(404).json({
        success: false,
        message: 'Film not found'
      });
    }

    // Increment views
    film.views += 1;
    await film.save();

    res.status(200).json({
      success: true,
      film
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching film',
      error: error.message
    });
  }
};

// @desc    Create film (Admin only)
// @route   POST /api/films
// @access  Private/Admin
exports.createFilm = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admins can create films'
      });
    }

    const filmData = req.body;
    filmData.createdBy = req.user._id;

    const film = await Film.create(filmData);

    res.status(201).json({
      success: true,
      message: 'Film created successfully',
      film
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating film',
      error: error.message
    });
  }
};

// @desc    Update film (Admin only)
// @route   PUT /api/films/:id
// @access  Private/Admin
exports.updateFilm = async (req, res) => {
  try {
    let film = await Film.findById(req.params.id);

    if (!film) {
      return res.status(404).json({
        success: false,
        message: 'Film not found'
      });
    }

    // Check authorization
    if (req.user.role !== 'admin' && film.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this film'
      });
    }

    film = await Film.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Film updated successfully',
      film
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating film',
      error: error.message
    });
  }
};

// @desc    Delete film (Admin only)
// @route   DELETE /api/films/:id
// @access  Private/Admin
exports.deleteFilm = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);

    if (!film) {
      return res.status(404).json({
        success: false,
        message: 'Film not found'
      });
    }

    // Check authorization
    if (req.user.role !== 'admin' && film.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this film'
      });
    }

    await Film.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Film deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting film',
      error: error.message
    });
  }
};

// @desc    Get featured films
// @route   GET /api/films/featured
// @access  Public
exports.getFeaturedFilms = async (req, res) => {
  try {
    const films = await Film.find()
      .sort('-averageRating -views')
      .limit(6)
      .select('title poster rating views genre');

    res.status(200).json({
      success: true,
      films
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured films',
      error: error.message
    });
  }
};
