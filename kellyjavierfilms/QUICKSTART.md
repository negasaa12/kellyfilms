# KellyJavier Films - Quick Start Guide

## 🎯 What Was Created

A complete full-stack authentication system with:

- **Backend**: Express.js + MongoDB with JWT authentication
- **Frontend**: React with Context API for state management
- **Security**: Bcrypt hashing, rate limiting, email verification, password reset
- **Modern Stack**: Both running on localhost with hot-reload support

## ⚡ Quick Start (5 Minutes)

### Prerequisites

- Node.js installed
- MongoDB running locally (or MongoDB Atlas connection string)

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

**Edit `.env` with your settings:**

```env
# For local development, these defaults are fine:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kellyjavierfilms
JWT_SECRET=dev_secret_key_change_in_production
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=dev_refresh_secret_change_in_production
REFRESH_TOKEN_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=noreply@kellyjavierfilms.com
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Start backend:**

```bash
npm run dev
```

Expected output:

```
Server running on port 5000
MongoDB connected: localhost
```

### 2. Frontend Setup

**In a new terminal:**

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

**Start frontend:**

```bash
npm start
```

React app will automatically open at `http://localhost:3000`

## 🧪 Test the System

1. **Sign Up**: Create account at `http://localhost:3000/signup`
   - Email: test@example.com
   - Password: TestPass123! (must include uppercase, lowercase, number, special char)

2. **Login**: Go to `http://localhost:3000/login`
   - Use same credentials
   - You'll see the Dashboard

3. **Forgot Password**: Click "Forgot Password?" link
   - Enter your email
   - Check console for "reset link" (email won't send in dev without setup)

4. **Dashboard**: View your profile

## 📧 Email Setup (Optional for Development)

To enable real email sending:

1. **Gmail Setup**:
   - Enable 2-factor authentication
   - Create App Password: https://myaccount.google.com/apppasswords
   - Copy the 16-character password
   - Paste into EMAIL_PASS in `.env`

2. **Other Email Services**:
   - SendGrid: Update EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS
   - Mailgun: Similar process

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB

```bash
# Install MongoDB Community Edition
# Then start MongoDB service
mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kellyjavierfilms
```

## 📁 Project Structure

```
kellyjavierfilms/
├── backend/          # Node.js + Express API on port 5000
│   ├── models/      # MongoDB schemas
│   ├── controllers/ # Business logic
│   ├── routes/      # API endpoints
│   ├── middleware/  # Auth, validation, rate limiting
│   └── server.js    # Entry point
│
├── frontend/        # React app on port 3000
│   ├── src/
│   │   ├── pages/   # Login, Signup, Dashboard, etc.
│   │   ├── context/ # Auth state management
│   │   ├── api/     # Backend API calls
│   │   └── App.js   # Main component
│   └── public/      # Static files
│
└── README.md       # Full documentation
```

## 🔐 Security Features Implemented

✅ **Backend**

- Bcrypt password hashing (10 salt rounds)
- JWT token authentication
- Rate limiting (10 login attempts per 15 min)
- Account lockout (5 attempts = 2 hour lock)
- Email verification system
- Secure password reset tokens
- CORS protection
- Security headers (Helmet)
- Input validation

✅ **Frontend**

- Token-based authentication
- Protected routes
- Automatic logout on expiration
- Password strength meter
- Secure token storage

## 🚀 API Endpoints

### Authentication

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/forgot-password` - Request reset link
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Sign out (protected)

## 📱 User Flow

1. User signs up → Email verification sent → Dashboard
2. User forgot password → Reset link sent via email → New password set
3. User logs in → JWT token stored → Protected dashboard access
4. User logs out → Token cleared

## 🐛 Common Issues & Solutions

### "MongoDB connection failed"

- Ensure MongoDB is running: `mongod`
- Or update MONGODB_URI to use MongoDB Atlas

### "Email not sending in development"

- Normal! Just check backend console for reset token
- Set up real email service using Gmail/SendGrid for production

### "CORS error"

- Backend not running? Start it: `cd backend && npm run dev`
- Port 5000 already in use? Kill process or change PORT in `.env`

### "Frontend not connecting to backend"

- Check REACT_APP_API_URL in `frontend/.env`
- Ensure backend is running on port 5000

## 📚 Next Steps

1. ✅ **Test the full flow** (signup → login → logout)
2. ✅ **Review the code** to understand the structure
3. ✅ **Customize UI** - Change colors/fonts in CSS files
4. ✅ **Add features** - User profile, settings, etc.
5. ✅ **Deploy** - Use Heroku/Railway (backend) and Vercel/Netlify (frontend)

## 📖 Full Documentation

See [README.md](./README.md) for:

- Detailed API documentation
- Password requirements
- Deployment instructions
- Technology stack
- Troubleshooting guide

## 🎉 You're All Set!

Your authentication system is ready to use. Start building! 🚀

---

**Questions?** Check the full README.md or see the code comments in the backend/frontend files.
