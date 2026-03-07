# Error Messages & User Feedback Guide

## Overview

The KellyJavier Films app now provides comprehensive, user-friendly error messages and validation feedback across all pages. This guide documents all error messages and what they mean.

---

## Authentication Pages

### Login Page (`/login`)

#### Form Validation Errors

These appear when you try to submit the form with invalid data:

| Error Message                            | What It Means           | How to Fix                                             |
| ---------------------------------------- | ----------------------- | ------------------------------------------------------ |
| Email is required                        | Email field is empty    | Enter your email address                               |
| Please enter a valid email address       | Email format is invalid | Use format: example@domain.com                         |
| Password is required                     | Password field is empty | Enter your password                                    |
| Password should be at least 6 characters | Password is too short   | Use a longer password (your actual password is longer) |

#### Server Response Errors

These appear after the form is submitted:

| Error Message                                                     | Cause                                           | What to Do                                           |
| ----------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| ❌ Invalid email or password                                      | Wrong email or password                         | Check your email and password are correct            |
| ⛔ Account locked for security. Too many login attempts           | You tried logging in too many times incorrectly | Try again in 2 hours. Account is locked for security |
| Invalid credentials                                               | Email or password incorrect                     | Verify email/password and try again                  |
| 🌐 Cannot connect to server. Is the backend running on port 5000? | Backend server is not running                   | Start backend: `npm run dev` in root directory       |
| ⚠️ Server error. Please try again later.                          | Server encountered an error                     | Try again later                                      |
| 🌐 Network error. Check your internet connection.                 | Internet connection issue                       | Check your internet and try again                    |

---

### Sign Up Page (`/signup`)

#### Field-Level Validation

Errors appear under each field as you type:

| Error Message                       | Fix                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------ |
| First name is required              | Enter your first name                                                    |
| Last name is required               | Enter your last name                                                     |
| Email is required                   | Enter your email address                                                 |
| Email is not valid                  | Use correct format: example@domain.com                                   |
| Password is required                | Enter a password                                                         |
| Password does not meet requirements | Password must have: 8+ chars, uppercase, lowercase, number, special char |
| Passwords do not match              | Confirm password must match the password above                           |

#### Password Requirements Checklist

As you type your password, you see real-time feedback:

- ✅ 8+ characters
- ✅ Uppercase letter (A-Z)
- ✅ Lowercase letter (a-z)
- ✅ Number (0-9)
- ✅ Special character (!@#$%^&\*)

**Password Example**: `MyPassword@123` ✅ (meets all requirements)

#### Server Response Errors

| Error Message                                                             | Meaning                    | Solution                                    |
| ------------------------------------------------------------------------- | -------------------------- | ------------------------------------------- |
| ✅ Account created successfully!                                          | Registration worked        | Check email to verify your account          |
| 📧 This email is already registered. Try logging in or use another email. | Email is taken             | Use a different email or login instead      |
| 🔐 Password does not meet security requirements.                          | Password too weak          | Use stronger password with all requirements |
| Invalid input. Please check your information.                             | One or more fields invalid | Check all fields and try again              |
| ⚠️ Server error. Please try again later.                                  | Server issue               | Try again later                             |
| 🌐 Network error. Check your internet connection.                         | No internet                | Check connection and try again              |

---

### Forgot Password Page (`/forgot-password`)

#### Validation Error

| Error Message                      | Fix                                    |
| ---------------------------------- | -------------------------------------- |
| Please enter your email address    | Enter your email                       |
| Please enter a valid email address | Use correct format: example@domain.com |

#### Server Response Errors

| Error Message                                      | Meaning              | Action                          |
| -------------------------------------------------- | -------------------- | ------------------------------- |
| ✅ Password reset link has been sent to your email | Success!             | Check inbox/spam for reset link |
| ❌ No account found with this email address.       | Email not registered | Sign up for an account instead  |
| Invalid email format                               | Email format wrong   | Use valid email format          |
| ⚠️ Server error. Please try again later.           | Server issue         | Try again later                 |
| 🌐 Network error. Check your internet connection.  | No connection        | Check internet and retry        |

---

### Reset Password Page (`/reset-password/:token`)

#### Validation Errors

| Error Message                          | Fix                                                           |
| -------------------------------------- | ------------------------------------------------------------- |
| Both passwords are required            | Fill in both password fields                                  |
| ❌ Passwords do not match              | Make sure both passwords are identical                        |
| 🔐 Password does not meet requirements | Include: 8+ chars, uppercase, lowercase, number, special char |

#### Server Response Errors

| Error Message                                     | Meaning                 | Solution                      |
| ------------------------------------------------- | ----------------------- | ----------------------------- |
| ✅ Password has been reset successfully           | Success!                | Login with new password       |
| ❌ Invalid or expired reset link                  | Link expired or invalid | Request new password reset    |
| ❌ Reset token not found or expired.              | Token expired           | Use new reset link from email |
| ⚠️ Server error. Please try again later.          | Server error            | Try again later               |
| 🌐 Network error. Check your internet connection. | No internet             | Check connection              |

---

## Film Pages

### Films Page (`/films`)

#### Errors

| Error Message        | Cause                             | Fix                                    |
| -------------------- | --------------------------------- | -------------------------------------- |
| Error fetching films | Server couldn't retrieve films    | Page auto-retries, refresh browser     |
| No films found       | No films match your search/filter | Try different search or remove filters |

---

### Film Detail Page (`/films/:filmId`)

#### Errors

| Error Message      | Cause                      | Fix                             |
| ------------------ | -------------------------- | ------------------------------- |
| Loading...         | Page is loading film data  | Wait for page to load           |
| Error loading film | Server couldn't fetch film | Refresh page                    |
| Film not found     | Film doesn't exist         | Go back and select another film |

---

### Review Form

#### Validation Errors

| Error Message                   | Fix                            |
| ------------------------------- | ------------------------------ |
| Please log in to leave a review | Login before submitting review |
| Please write a comment          | Add a comment/review text      |

#### Server Response Errors

| Error Message                      | Cause            | Solution                          |
| ---------------------------------- | ---------------- | --------------------------------- |
| ✅ Review posted successfully!     | Success!         | Review appears on film page       |
| Error posting review               | Server error     | Try again                         |
| You can only review each film once | Already reviewed | Edit your existing review instead |

---

## Common Error Scenarios

### Scenario 1: Wrong Password

**What happens:**

1. You enter wrong password
2. Click Sign In
3. See error: `❌ Invalid email or password`

**What to do:**

- Check Caps Lock is off
- Verify email address is correct
- Click "Forgot Password?" to reset
- Try again with correct password

---

### Scenario 2: Account Locked (Too Many Failed Attempts)

**What happens:**

1. You try logging in 5+ times with wrong password
2. See error: `⛔ Account locked for security. Too many login attempts. Try again in 2 hours.`

**What to do:**

- Wait 2 hours (security feature)
- Reset password: Click "Forgot Password?" and follow steps
- Try logging in with new password

---

### Scenario 3: Backend Not Running

**What happens:**

1. You try to login
2. See error: `🌐 Cannot connect to server. Is the backend running on port 5000?`

**What to do:**

```bash
# In root directory
npm run dev
# Both backend and frontend will start
```

---

### Scenario 4: Email Already Registered

**What happens:**

1. During signup, you use an email that's already registered
2. See error: `📧 This email is already registered...`

**What to do:**

- Use a different email address, OR
- Go to login page and sign in instead
- Click "Forgot Password?" if you forgot your password

---

### Scenario 5: Weak Password

**What happens:**

1. During signup, your password doesn't meet requirements
2. Password strength indicator shows red X marks
3. Can't submit form

**What to do:**

- Add uppercase letter: A-Z
- Add lowercase letter: a-z
- Add a number: 0-9
- Add special character: !@#$%^&\*
- Make it at least 8 characters total

**Example valid passwords:**

- ✅ `MyFilmPass@1`
- ✅ `SecurePass123!`
- ✅ `FPS2024!secure`

**Example weak passwords (won't work):**

- ❌ `password` (no uppercase, no number, no special char)
- ❌ `Pass123` (no special character)
- ❌ `Pass!` (too short)

---

## Success Messages

### Green Success Boxes ✅

| Message                                            | What It Means                             |
| -------------------------------------------------- | ----------------------------------------- |
| ✅ Account created successfully!                   | Account registered, check email to verify |
| ✅ Password reset link has been sent to your email | Check inbox for reset link                |
| ✅ Password has been reset successfully            | New password is active, login with it     |
| ✅ Email verified successfully                     | Email confirmed, account active           |
| ✅ Review posted successfully!                     | Your review is now visible                |

---

## Error Message Icons Guide

| Icon | Meaning                                         |
| ---- | ----------------------------------------------- |
| ❌   | Error/failure - action failed                   |
| ✅   | Success - action completed                      |
| ⛔   | Security lock - feature temporarily unavailable |
| 🔐   | Security/password related                       |
| 🌐   | Network/internet related                        |
| 📧   | Email related                                   |
| ⚠️   | Warning - server issue                          |

---

## Prevention Tips

### Login Issues

- Keep password safe and don't share
- Use strong passwords from the start
- Enable password manager (LastPass, 1Password)
- If locked out, wait 2 hours or reset password

### Signup Issues

- Use a valid email you have access to
- Check Caps Lock when typing password
- Use password manager to generate strong password
- Don't use the same email twice

### General Tips

- Check internet connection if you see 🌐 errors
- Make sure both servers are running: `npm run dev`
- Clear browser cache if pages look broken
- Use a modern browser (Chrome, Firefox, Safari)

---

## Help & Support

### If You Get Stuck

1. **Check the error message** - it usually tells you what to do
2. **Follow the Fix column** in the tables above
3. **Check internet connection** - see if other websites work
4. **Verify backend is running** - run `npm run dev` in root
5. **Refresh the page** - sometimes temporary glitches

### Common Fixes

```bash
# Start both servers
npm run dev

# Clear backend cache and restart
cd backend
npm cache clean --force
npm run dev

# Frontend issues
cd frontend
npm cache clean --force
npm start
```

---

## Developer Notes

### Error Handling Code

The app handles errors at multiple levels:

1. **Field Validation** - Before form submit
   - Real-time as you type
   - Shows specific required format

2. **Form Validation** - Before API call
   - Checks all fields at once
   - Shows "red border" on invalid fields

3. **API Errors** - From server
   - Specific error codes (401, 404, 429, 500)
   - User-friendly messages based on error type

4. **Network Errors** - Connection issues
   - Detects network failures
   - Shows connection error message

---

**Last Updated**: March 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
