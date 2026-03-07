# KellyJavier Films - Full Stack Authentication System

A modern, full-stack React and Node.js authentication system with MongoDB, featuring secure login, registration, and password reset functionality built with industry best practices.

## 🚀 Features

### Backend

- ✅ Secure user authentication with JWT tokens
- ✅ Bcrypt password hashing
- ✅ Email verification system
- ✅ Password reset with secure token flow
- ✅ Account lockout after failed login attempts
- ✅ Rate limiting on authentication endpoints
- ✅ CORS and Helmet security middleware
- ✅ MongoDB schema with proper indexing
- ✅ Input validation with express-validator
- ✅ Comprehensive error handling

### Frontend

- ✅ Modern React with React Router v6
- ✅ Context API for state management
- ✅ Secure token storage (localStorage with httpOnly cookies)
- ✅ Protected routes with authentication checks
- ✅ Password strength indicator
- ✅ Responsive design
- ✅ Professional UI with gradient themes

## 📁 Project Structure

```
kellyjavierfilms/
├── backend/                 # Node.js/Express API
│   ├── models/             # MongoDB schemas
│   │   └── User.js         # User model with security features
│   ├── controllers/        # Route handlers
│   │   └── authController.js
│   ├── routes/             # API routes
│   │   └── auth.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js         # JWT verification
│   │   ├── validation.js   # Input validation
│   │   └── rateLimiter.js  # Rate limiting
│   ├── utils/              # Utility functions
│   │   ├── emailService.js # Email sending
│   │   └── tokenUtils.js   # Token generation
│   ├── server.js           # Express app
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/               # React app
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── context/       # Context API
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── public/            # Static files
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── README.md
└── .gitignore
```

## 🔧 Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kellyjavierfilms
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@kellyjavierfilms.com
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

5. Start the backend:

```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the React app:

```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 🔐 Security Features

### Backend Security

1. **Password Hashing**: Bcrypt with salt rounds of 10
2. **JWT Tokens**: Secure token-based authentication
3. **Account Lockout**: After 5 failed login attempts (2-hour lockout)
4. **Rate Limiting**:
   - Login: 10 attempts per 15 minutes
   - Registration: 5 per hour
   - Password Reset: 5 per hour
5. **Email Verification**: Required before account activation
6. **Password Reset**: Secure token-based flow with expiration
7. **CORS**: Restricted to frontend URL
8. **Helmet**: Security headers middleware
9. **Input Validation**: Comprehensive validation on all inputs
10. **SQL Injection Protection**: Using Mongoose ODM

### Frontend Security

1. **Protected Routes**: Authentication-based route protection
2. **Token Management**: Secure storage with httpOnly cookies
3. **Automatic Logout**: On token expiration
4. **Password Requirements**: Enforced strong password policy
5. **HTTPS Ready**: Configured for production SSL

## 📝 API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password

```http
POST /api/auth/reset-password/:resetToken
Content-Type: application/json

{
  "password": "NewSecurePass123!"
}
```

#### Verify Email

```http
GET /api/auth/verify-email/:token
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## 🎨 User Interface

### Pages Included

1. **Login Page**: User sign-in with email and password
2. **Signup Page**: Registration with password strength indicator
3. **Forgot Password**: Email-based password recovery
4. **Reset Password**: Secure password update
5. **Email Verification**: Confirmation flow
6. **Dashboard**: User profile and welcome screen

## 📱 Password Requirements

All passwords must contain:

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&\*)

## 🗄️ MongoDB Schema

The User model includes:

- Personal information (firstName, lastName)
- Authentication (email, password, emailVerified)
- Security (passwordResetToken, twoFactorEnabled, loginAttempts)
- Account management (role, isActive, lastLogin)
- Timestamps (createdAt, updatedAt)

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Vercel)

1. Set environment variables in your deployment platform
2. Deploy using Git or platform-specific CLI
3. Connect to production MongoDB Atlas

### Frontend Deployment (Vercel/Netlify)

1. Build the app: `npm run build`
2. Deploy the `build` folder
3. Set environment variables in deployment platform

## 🧪 Testing

### Manual Testing Steps

1. Register a new account
2. Verify email from link
3. Login with credentials
4. Try forgot password flow
5. Reset password with new credentials
6. Login with new password
7. Logout

## 📚 Technologies Used

### Backend

- Node.js & Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- Bcryptjs
- Nodemailer
- Express Validator
- CORS & Helmet

### Frontend

- React 18
- React Router v6
- Axios
- Context API
- CSS3

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally or check Atlas credentials
- Verify MONGODB_URI in `.env`

### Email Sending Issues

- For Gmail: Enable "Less secure app access" or use App Passwords
- Check EMAIL_USER and EMAIL_PASS in `.env`

### CORS Errors

- Verify FRONTEND_URL matches your React app URL
- Backend must be running before frontend

### Token Expiration

- Tokens expire after JWT_EXPIRE duration
- User will be automatically logged out and redirected to login

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please create an issue in the repository.

---

**Happy Coding! 🎬**
