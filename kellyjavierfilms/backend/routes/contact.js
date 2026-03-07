const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.post('/', contactController.submitContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), contactController.getAllContacts);
router.get('/:id', protect, authorize('admin'), contactController.getContact);
router.put('/:id', protect, authorize('admin'), contactController.updateContact);
router.delete('/:id', protect, authorize('admin'), contactController.deleteContact);

module.exports = router;
