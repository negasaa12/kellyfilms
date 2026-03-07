# KellyJavier Films - Copilot Instructions

## Project Overview
This is a full-stack authentication system with a React frontend and Node.js/Express backend in a monorepo structure. It includes a complete login system with signup, login, forgot password, and email verification features, all following modern security best practices.

## Project Structure

### Backend (`/backend`)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Key Features**:
  - JWT-based authentication
  - Bcrypt password hashing
  - Email service integration
  - Rate limiting
  - Input validation
  - Security middleware (CORS, Helmet)

### Frontend (`/frontend`)
- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: Context API
- **Features**:
  - Login, Signup, Forgot Password, Password Reset pages
  - Protected routes
  - Automatic token management
  - Responsive UI

## Development Instructions

### Starting Development Servers

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

### Key Files and Their Purposes

#### Backend
- `/backend/models/User.js` - MongoDB schema with security features
- `/backend/controllers/authController.js` - Authentication logic
- `/backend/middleware/auth.js` - JWT verification
- `/backend/middleware/validation.js` - Input validation
- `/backend/middleware/rateLimiter.js` - Rate limiting
- `/backend/utils/tokenUtils.js` - Token generation and verification
- `/backend/utils/emailService.js` - Email sending logic

#### Frontend
- `/frontend/src/context/AuthContext.js` - Authentication state management
- `/frontend/src/pages/LoginPage.js` - Login interface
- `/frontend/src/pages/SignupPage.js` - Registration interface
- `/frontend/src/pages/ForgotPasswordPage.js` - Password recovery
- `/frontend/src/pages/ResetPasswordPage.js` - Password reset
- `/frontend/src/components/ProtectedRoute.js` - Route protection

## Security Considerations

1. **Backend**:
   - All passwords are hashed with bcrypt
   - JWT tokens used for authentication
   - Account lockout after 5 failed attempts
   - Rate limiting on auth endpoints
   - Email verification required
   - CORS and security headers enabled

2. **Frontend**:
   - Tokens stored securely
   - Protected routes check authentication
   - Password strength validation
   - Automatic logout on token expiration

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kellyjavierfilms
JWT_SECRET=change_this_in_production
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=change_this_in_production
REFRESH_TOKEN_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Common Tasks

### Adding a new route
1. Create controller method in `/backend/controllers/authController.js`
2. Add route in `/backend/routes/auth.js`
3. Add corresponding API method in `/frontend/src/api/api.js`
4. Use the API method in frontend components

### Adding new user fields
1. Update User schema in `/backend/models/User.js`
2. Update validation in `/backend/middleware/validation.js`
3. Update frontend forms as needed

### Modifying authentication flow
1. Update logic in `/backend/controllers/authController.js`
2. Update context methods in `/frontend/src/context/AuthContext.js`
3. Update page components as needed

## Testing

### Manual Testing Workflow
1. Register new account → Check email verification
2. Verify email → Confirm verification works
3. Login → Check token storage
4. Forgot password → Test email reset flow
5. Reset password → Verify new password works
6. Login with new password → Confirm success

## Deployment Checklist

- [ ] Set all environment variables in production
- [ ] Update JWT_SECRET and REFRESH_TOKEN_SECRET
- [ ] Configure production MONGODB_URI
- [ ] Set up email service (Gmail App Password or alternative)
- [ ] Configure FRONTEND_URL to production domain
- [ ] Enable HTTPS in production
- [ ] Test full authentication flow
- [ ] Set NODE_ENV=production

## Useful Commands

```bash
# Backend
cd backend && npm install          # Install dependencies
npm run dev                        # Start with auto-reload
npm start                          # Start production

# Frontend
cd frontend && npm install         # Install dependencies
npm start                          # Start development server
npm run build                      # Build for production

# Both from root
cd backend && npm install && cd ../frontend && npm install  # Install all
```

## Debugging

- **Backend logs**: Check console output when running `npm run dev`
- **Frontend logs**: Check browser console
- **Network requests**: Use browser DevTools Network tab
- **Database**: Use MongoDB Compass to inspect data
- **Rate limiting**: Check headers `RateLimit-*` in response

## Notes

- Password must meet all requirements (uppercase, lowercase, number, special char, 8+ chars)
- Account locks for 2 hours after 5 failed login attempts
- Email verification link valid for 24 hours
- Password reset token valid for 1 hour
- JWT tokens expire after JWT_EXPIRE value
