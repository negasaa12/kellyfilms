const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT token
const generateJWT = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Generate Refresh Token
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE
  });
};

// Verify JWT token
const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Verify Refresh Token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

// Generate password reset token
const generatePasswordResetToken = () => {
  // Create token as random bytes converted to hex
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token to store in database
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  return {
    token: resetToken, // Send to user
    hash: resetTokenHash // Store in database
  };
};

// Generate email verification token
const generateEmailVerificationToken = () => {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  
  const verificationTokenHash = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  return {
    token: verificationToken,
    hash: verificationTokenHash
  };
};

// Hash token for storage
const hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

module.exports = {
  generateJWT,
  generateRefreshToken,
  verifyJWT,
  verifyRefreshToken,
  generatePasswordResetToken,
  generateEmailVerificationToken,
  hashToken
};
