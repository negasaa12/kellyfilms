# Quick Start Guide - KellyJavier Films

Get up and running with KellyJavier Films in 5 minutes!

## Prerequisites

- ✅ Node.js 14+ ([Download](https://nodejs.org/))
- ✅ MongoDB 4.4+ ([Download](https://www.mongodb.com/try/download/community) or [Cloud](https://www.mongodb.com/cloud/atlas))
- ✅ Git

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kellyfilms
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kellyjavierfilms
JWT_SECRET=your_secret_key_here_change_in_production
REFRESH_TOKEN_SECRET=your_refresh_secret_here
NODE_ENV=development
EOF

# Start server
npm run dev
```

**Backend will be running at:** `http://localhost:5000`

### 3. Frontend Setup (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF

# Start frontend
npm start
```

**Frontend will be running at:** `http://localhost:3000`

## 🎬 First Steps

1. **Visit**: http://localhost:3000
2. **Sign Up**: Create a new account
3. **Verify Email**: (In development, skip or use test mode)
4. **Browse Films**: Navigate to /films section
5. **Submit Review**: Add your first review!

## 📝 Running Tests

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Watch mode (re-run on changes)
npm run test:watch

# With coverage report
npm run test:coverage

# Integration tests only
npm run test:integration
```

### Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Coverage report
npm test -- --coverage
```

## User Roles

### Regular User

- Browse films
- Search and filter films
- Submit reviews
- Edit/delete own reviews
- View dashboard

### Admin User

- All regular user features
- Create films
- Edit all films
- Delete films
- Manage film catalog

## Demo Credentials

**For Testing:**

Regular User:

```
Email: user@example.com
Password: TestUser@123
```

Admin User:

```
Email: admin@example.com
Password: AdminUser@123
```

## File Structure Quick Reference

```
backend/
├── models/          # Database schemas
├── controllers/     # Business logic
├── routes/          # API endpoints
├── middleware/      # Auth, validation, rate limiting
├── tests/           # Unit & integration tests
└── server.js        # Express app

frontend/
├── pages/           # Page components
├── components/      # Reusable components
├── context/         # Global state (Auth)
├── api/             # API client
├── __tests__/       # Component tests
└── App.js           # Router setup
```

## Common Tasks

### Add a New Film (Admin)

1. Get admin token from login
2. POST to `/api/films` with film data
3. Use frontend admin page (to be built)

### Create a Review

1. Login
2. Navigate to film detail
3. Fill review form
4. Submit

### Search Films

1. Go to /films
2. Use search box or filter by genre
3. Browse results

## Environment Variables

### Backend (.env)

```
PORT=5000                          # Server port
MONGODB_URI=mongodb://...          # MongoDB connection
JWT_SECRET=your_secret_key         # JWT signing key
REFRESH_TOKEN_SECRET=your_secret   # Refresh token secret
SMTP_EMAIL=your_email@gmail.com    # Email sending (optional)
SMTP_PASSWORD=your_app_password    # Email password (optional)
NODE_ENV=development               # Environment
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
```

## Troubleshooting

### MongoDB Connection Error

```bash
# Start MongoDB
mongod

# Or if using MongoDB Community Edition
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use

```bash
# Kill process using port 5000 (Linux/Mac)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Dependencies Installation Issues

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Tests Not Running

```bash
# Clear Jest cache
npx jest --clearCache

# Run with verbose output
npm test -- --verbose
```

## Next Steps

1. ✅ **Setup Complete** - Both servers running
2. 📚 **Read Documentation** - Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. 🧪 **Run Tests** - `npm test` in backend
4. 🔑 **Explore API** - See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
5. 🎨 **Build Features** - Add new pages/endpoints

## Development Tips

### Hot Reload

- **Backend**: Using `nodemon`, servers restart automatically
- **Frontend**: React auto-refreshes on code changes

### Debug Mode

```bash
# Backend with debugging
node --inspect server.js

# Then open chrome://inspect in Chrome
```

### Mock Data

Tests automatically create temporary test data. Data is cleaned up after tests.

## Production Deployment

### Heroku (Backend)

```bash
heroku create kellyfilms-api
heroku config:set JWT_SECRET=production_secret
git push heroku main
```

### Vercel (Frontend)

```bash
npm i -g vercel
vercel
```

## Additional Resources

- 📖 [Project Summary](./PROJECT_SUMMARY.md)
- 🌐 [API Documentation](./API_DOCUMENTATION.md)
- 🧪 [Testing Guide](./TESTING.md)

## Support & Help

- Check console logs for error messages
- Run tests to verify setup: `npm test`
- Review `.env` configuration
- Ensure MongoDB is running
- Check both servers are on correct ports (5000, 3000)

## What's Included

✅ Complete Authentication System
✅ Film Management & Reviews
✅ Unit & Integration Tests
✅ Component Tests
✅ 45+ Test Cases
✅ Security Features (JWT, Bcrypt, Rate Limiting)
✅ Database Indexes & Optimization
✅ API Documentation
✅ Error Handling
✅ Role-Based Authorization

---

**Ready to code? Let's go! 🚀**

Head over to http://localhost:3000 and start exploring!
