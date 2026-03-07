/**
 * Password validation tests
 */

describe('Password Validation', () => {
  const passwordRegex = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*]/
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: passwordRegex.uppercase.test(password),
      lowercase: passwordRegex.lowercase.test(password),
      number: passwordRegex.number.test(password),
      special: passwordRegex.special.test(password)
    };
  };

  it('should validate strong password', () => {
    const password = 'TestPass123!';
    const result = validatePassword(password);

    expect(result.length).toBe(true);
    expect(result.uppercase).toBe(true);
    expect(result.lowercase).toBe(true);
    expect(result.number).toBe(true);
    expect(result.special).toBe(true);
  });

  it('should reject password without uppercase', () => {
    const password = 'testpass123!';
    const result = validatePassword(password);

    expect(result.uppercase).toBe(false);
  });

  it('should reject password without number', () => {
    const password = 'TestPass!';
    const result = validatePassword(password);

    expect(result.number).toBe(false);
  });

  it('should reject password without special character', () => {
    const password = 'TestPass123';
    const result = validatePassword(password);

    expect(result.special).toBe(false);
  });

  it('should reject password shorter than 8 characters', () => {
    const password = 'Test1!';
    const result = validatePassword(password);

    expect(result.length).toBe(false);
  });
});
