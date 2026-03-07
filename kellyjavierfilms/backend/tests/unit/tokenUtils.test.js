/**
 * Token utilities unit tests
 */
const { 
  generateJWT, 
  generatePasswordResetToken, 
  hashToken 
} = require('../../utils/tokenUtils');

describe('Token Utilities', () => {
  describe('generateJWT', () => {
    it('should generate a valid JWT token', () => {
      const userId = 'test-user-id';
      const token = generateJWT(userId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });

    it('should generate different tokens for different user IDs', () => {
      const token1 = generateJWT('user-1');
      const token2 = generateJWT('user-2');
      
      expect(token1).not.toBe(token2);
    });
  });

  describe('generatePasswordResetToken', () => {
    it('should generate token and hash', () => {
      const result = generatePasswordResetToken();
      
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('hash');
      expect(result.token).toBeDefined();
      expect(result.hash).toBeDefined();
    });

    it('should generate unique tokens', () => {
      const result1 = generatePasswordResetToken();
      const result2 = generatePasswordResetToken();
      
      expect(result1.token).not.toBe(result2.token);
      expect(result1.hash).not.toBe(result2.hash);
    });
  });

  describe('hashToken', () => {
    it('should hash a token', () => {
      const token = 'test-token-123';
      const hash = hashToken(token);
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash.length).toBe(64); // SHA256 produces 64 character hex
    });

    it('should produce consistent hash for same token', () => {
      const token = 'test-token-123';
      const hash1 = hashToken(token);
      const hash2 = hashToken(token);
      
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different tokens', () => {
      const hash1 = hashToken('token-1');
      const hash2 = hashToken('token-2');
      
      expect(hash1).not.toBe(hash2);
    });
  });
});
