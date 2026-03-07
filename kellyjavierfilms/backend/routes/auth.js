const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validatePasswordReset,
  handleValidationErrors
} = require('../middleware/validation');
const {
  loginLimiter,
  registerLimiter,
  passwordResetLimiter
} = require('../middleware/rateLimiter');

// Public routes
router.post(
  '/register',
  registerLimiter,
  validateRegister,
  handleValidationErrors,
  authController.register
);

router.post(
  '/login',
  loginLimiter,
  validateLogin,
  handleValidationErrors,
  authController.login
);

router.post(
  '/forgot-password',
  passwordResetLimiter,
  authController.forgotPassword
);

router.post(
  '/reset-password/:resetToken',
  passwordResetLimiter,
  validatePasswordReset,
  handleValidationErrors,
  authController.resetPassword
);

router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;
