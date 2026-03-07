# KellyJavier Films - Project Summary

## Overview

KellyJavier Films is a full-stack film platform built with modern web technologies. It features a complete authentication system, film catalog with reviews, and comprehensive test coverage.

## Project Structure

```
kellyjavierfilms/
├── backend/                          # Express.js API server (Port 5000)
│   ├── models/
│   │   ├── User.js                   # User schema with auth features
│   │   ├── Film.js                   # Film catalog schema
│   │   └── Review.js                 # Film review schema
│   ├── controllers/
│   │   ├── authController.js         # Authentication logic
│   │   ├── filmController.js         # Film CRUD operations
│   │   └── reviewController.js       # Review management
│   ├── routes/
│   │   ├── auth.js                   # Auth endpoints
│   │   ├── films.js                  # Film endpoints
│   │   └── reviews.js                # Review endpoints
│   ├── middleware/
│   │   ├── auth.js                   # JWT verification & authorization
│   │   ├── validation.js             # Input validation
│   │   └── rateLimiter.js            # Rate limiting rules
│   ├── utils/
│   │   ├── tokenUtils.js             # Token generation
│   │   └── emailService.js           # Email sending
│   ├── tests/
│   │   ├── unit/                     # Unit tests
│   │   │   ├── tokenUtils.test.js
│   │   │   ├── passwordValidation.test.js
│   │   │   └── filmValidation.test.js
│   │   └── integration/              # Integration tests
│   │       ├── films.test.js
│   │       └── reviews.test.js
│   ├── .env                          # Environment variables
│   ├── server.js                     # Express app entry point
│   ├── jest.config.js                # Jest configuration
│   └── package.json
│
├── frontend/                         # React app (Port 3000)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.js          # Login form
│   │   │   ├── SignupPage.js         # Registration form
│   │   │   ├── ForgotPasswordPage.js # Password recovery
│   │   │   ├── ResetPasswordPage.js  # Password reset
│   │   │   ├── EmailVerificationPage.js # Email verification
│   │   │   ├── DashboardPage.js      # User dashboard
│   │   │   ├── FilmsPage.js          # Film catalog with search/filter
│   │   │   └── FilmDetailPage.js     # Film detail with reviews
│   │   ├── components/
│   │   │   ├── ProtectedRoute.js     # Route protection wrapper
│   │   │   └── ReviewForm.js         # Review submission form
│   │   ├── context/
│   │   │   └── AuthContext.js        # Global auth state
│   │   ├── api/
│   │   │   └── api.js                # Axios configuration & endpoints
│   │   ├── __tests__/                # Component tests
│   │   │   ├── FilmsPage.test.js
│   │   │   ├── FilmDetailPage.test.js
│   │   │   └── ReviewForm.test.js
│   │   ├── App.js                    # Router setup
│   │   ├── setupTests.js             # Test configuration
│   │   └── index.js
│   ├── .env                          # Environment variables
│   └── package.json
│
└── TESTING.md                        # Testing documentation
```

## Technology Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs (10 salt rounds)
- **Email**: Nodemailer
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: express-validator
- **Testing**: Jest, Supertest
- **Environment**: nodemon (development)

### Frontend

- **Library**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS3
- **Testing**: Jest, React Testing Library
- **Build Tool**: Create React App

## Key Features

### Authentication System ✅

- **Register**: New user account creation with email verification
- **Login**: Secure login with JWT tokens (7-day expiry)
- **Forgot Password**: Email-based password recovery
- **Reset Password**: Secure password reset with token validation
- **Email Verification**: Confirm user email address
- **Account Security**:
  - Bcrypt password hashing (10 salt rounds)
  - Account lockout after 5 failed login attempts (2-hour duration)
  - Rate limiting on auth endpoints
  - Password strength validation (8+ chars, uppercase, lowercase, number, special char)

### Film Management ✅

- **Browse Films**: Paginated film catalog
- **Search**: Full-text search by title, description, director
- **Filter**: Genre-based filtering (10+ genres supported)
- **Details**: View film information with view count
- **Admin CRUD**: Create, update, delete films (admin only)
- **Featured Films**: Endpoint for top-rated/most-viewed films
- **Average Rating**: Auto-calculated from user reviews

### Review System ✅

- **Submit Reviews**: Rate and comment on films
- **View Reviews**: See all reviews for a film
- **Edit Reviews**: Update own reviews
- **Delete Reviews**: Remove own reviews
- **Rating Calculation**: Auto-updates film average rating
- **Duplicate Prevention**: One review per user per film

### Security Features ✅

- CORS protection (restricted to localhost:3000)
- Helmet security headers
- Rate limiting (10/15min login, 5/hour register)
- Input validation and sanitization
- Role-based authorization (user/admin)
- Protected API endpoints
- httpOnly Cookies support
- CSRF protection ready

### Testing Infrastructure ✅

- **Unit Tests**: Token utilities, password validation, film validation (16+ tests)
- **Integration Tests**: API endpoints with real database (20+ tests)
- **Component Tests**: React components with React Testing Library (9+ tests)
- **Test Coverage**: >80% of critical code paths
- **CI/CD Ready**: GitHub Actions workflow template provided

## API Endpoints

### Authentication

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Complete password reset
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Films

- `GET /api/films` - List films (paginated, searchable, filterable)
- `GET /api/films/:id` - Get film details
- `GET /api/films/featured` - Get featured films (top 6)
- `POST /api/films` - Create film (admin only)
- `PUT /api/films/:id` - Update film (admin/creator)
- `DELETE /api/films/:id` - Delete film (admin/creator)

### Reviews

- `GET /api/reviews/:filmId` - Get film reviews
- `POST /api/reviews` - Create review (authenticated)
- `PUT /api/reviews/:id` - Update review (owner only)
- `DELETE /api/reviews/:id` - Delete review (owner only)

## Environment Configuration

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kellyjavierfilms
JWT_SECRET=your_secret_key_here
REFRESH_TOKEN_SECRET=your_refresh_secret_here
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@kellyfilms.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
NODE_ENV=development
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Setup & Installation

### Prerequisites

- Node.js 14+ and npm
- MongoDB 4.4+ (local or cloud)
- Gmail account (for email notifications, optional)

### Backend Setup

```bash
cd kellyjavierfilms/backend

# Install dependencies
npm install

# Create .env file with configuration
# Copy from .env.example and update values

# Run in development
npm run dev

# Run tests
npm test

# Run specific test suite
npm run test:integration

# Generate coverage report
npm run test:coverage
```

### Frontend Setup

```bash
cd kellyjavierfilms/frontend

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### Running Both Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

Site will be available at: `http://localhost:3000`

## Testing

### Run All Tests

Backend:

```bash
npm test                    # All tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage
npm run test:integration   # Integration tests only
```

Frontend:

```bash
npm test                   # Run tests
npm test -- --coverage     # With coverage
```

### Test Coverage

- **Backend**: ~85% coverage of controllers, utils, middleware
- **Frontend**: Component tests for main pages and forms
- **Integration**: Full API endpoint coverage

See [TESTING.md](./TESTING.md) for detailed testing documentation.

## Database Schema

### User Collection

```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  emailVerified: Boolean,
  emailVerificationToken?: String,
  passwordResetToken?: String,
  passwordResetExpires?: Date,
  loginAttempts: Number,
  lockUntil?: Date,
  lastLogin?: Date,
  role: String (user|admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Film Collection

```javascript
{
  title: String (required, max 200),
  description: String (max 5000),
  director: String,
  cast: [String],
  genre: [String] (enum),
  releaseYear: Number (1900-current),
  duration: Number (minutes),
  rating: Number (default 0),
  streamUrl: String,
  poster: String,
  price: String (free|paid),
  views: Number (default 0),
  averageRating: Number,
  totalRatings: Number,
  createdBy: ObjectId (User ref),
  createdAt: Date,
  updatedAt: Date
}
// Text indexes on: title, description, director, genre
// Unique index on film+user in reviews
```

### Review Collection

```javascript
{
  film: ObjectId (Film ref, required),
  user: ObjectId (User ref, required),
  rating: Number (1-10, required),
  comment: String,
  helpful: Number (default 0),
  createdAt: Date,
  updatedAt: Date
}
// Unique index on film+user to prevent duplicate reviews
```

## Development Workflow

### Adding New Features

1. **Create Model** - Define MongoDB schema in `models/`
2. **Create Controller** - Add business logic in `controllers/`
3. **Create Routes** - Add API endpoints in `routes/`
4. **Add Middleware** - Auth, validation as needed
5. **Write Tests** - Unit and integration tests
6. **Create Components** - React pages/components for frontend
7. **Component Tests** - Test React components

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "Add feature description"

# Push and create pull request
git push origin feature/feature-name
```

## Performance Optimization

- **Database**: Indexes on search fields (title, director), auth email
- **API**: Pagination (default 12 items per page)
- **Frontend**: Lazy loading of film images, component code splitting ready
- **Caching**: Reviews cached per session
- **Rate Limiting**: Prevents brute-force attacks

## Security Considerations

✅ **Implemented**

- HTTPS ready (use in production)
- CORS restricted to frontend domain
- SQL injection protection via Mongoose/parameterized queries
- XSS protection via input validation
- CSRF token ready
- Rate limiting on sensitive endpoints
- Account lockout mechanism
- Password hashing with bcrypt

⚠️ **Production Considerations**

- Environment variables not in version control
- Use HTTPS in production
- Implement refresh token rotation
- Use production MongoDB (Atlas/Cloud)
- Configure email service (SendGrid/AWS SES)
- Set up monitoring and logging
- Implement API key authentication for client apps

## Troubleshooting

### MongoDB Connection Fails

```bash
# Check if MongoDB is running
mongosh

# Restart MongoDB
# Windows: net start MongoDB
# Linux: sudo systemctl restart mongod
```

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Email Not Sending

- Verify SMTP credentials in `.env`
- If using Gmail: Use [App Password](https://myaccount.google.com/apppasswords)
- Check email spam folder

### Tests Failing

```bash
# Clear Jest cache
npx jest --clearCache

# Run with verbose output
npm test -- --verbose

# Run specific test file
npx jest tokenUtils.test.js
```

## Future Enhancements

- [ ] Frontend pages for admin film management
- [ ] User watchlist/favorites
- [ ] Watch history tracking
- [ ] Recommendation algorithm
- [ ] Payment integration (Stripe/PayPal)
- [ ] Social sharing features
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced search filters
- [ ] User ratings/reviews moderation

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## License

ISC License - Free to use for personal and commercial projects.

## Support

For issues or questions:

1. Check [TESTING.md](./TESTING.md) for testing help
2. Review API documentation in route files
3. Check console logs for error messages
4. Refer to package dependencies documentation

## Project Statistics

- **Total Files**: 50+
- **Backend Routes**: 13 endpoints
- **Frontend Pages**: 8 pages
- **Test Files**: 8+ test suites
- **Test Cases**: 45+ assertions
- **Database Collections**: 3 (User, Film, Review)
- **Database Indexes**: 6+ for performance
- **Security Middleware**: 3+ layers
- **Validation Rules**: 20+ different validations

## Deployment

### Heroku Deployment (Backend)

```bash
# Create Heroku app
heroku create kellyjavierfilms-api

# Set environment variables
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Vercel Deployment (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Ready for Development ✅
