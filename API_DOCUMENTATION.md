# KellyJavier Films - API Documentation

## Base URLs

- **Production**: `https://api.kellyfilms.com`
- **Development**: `http://localhost:5000/api`

## Response Format

All endpoints return JSON responses with the following format:

```json
{
  "success": true,
  "data": {
    /* endpoint-specific data */
  },
  "message": "Success message"
}
```

Or on error:

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    /* validation errors */
  }
}
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Tokens are obtained from the login endpoint and expire after 7 days.

---

## Authentication Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully. Please check your email to verify your account.",
  "user": {
    "_id": "660abc123def456",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "emailVerified": false
  }
}
```

**Validation:**

- Email must be valid
- Password must be 8+ characters, contain uppercase, lowercase, number, and special character
- Email must be unique

---

### Login

**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "660abc123def456",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Status Codes:**

- 200: Login successful
- 400: Invalid credentials
- 429: Too many login attempts (account locked for 2 hours)

---

### Forgot Password

**POST** `/auth/forgot-password`

Request password reset email.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

---

### Reset Password

**POST** `/auth/reset-password/:token`

Complete password reset using token from email.

**Request Parameters:**

- `token` (URL) - Reset token from email link

**Request Body:**

```json
{
  "password": "NewPassword@456"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Status Codes:**

- 200: Password reset successful
- 400: Invalid or expired token
- 404: Token not found

---

### Verify Email

**GET** `/auth/verify-email/:token`

Verify user email address.

**Request Parameters:**

- `token` (URL) - Email verification token

**Response (200):**

```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

### Get Current User

**GET** `/auth/me` _(Protected)_

Get logged-in user information.

**Headers:**

```
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "user": {
    "_id": "660abc123def456",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "emailVerified": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Logout

**POST** `/auth/logout` _(Protected)_

Clear user session and invalidate token.

**Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Film Endpoints

### Get All Films

**GET** `/films`

Retrieve paginated list of films with optional search and filtering.

**Query Parameters:**

```
GET /api/films?search=action&genre=Action&page=1&limit=12
```

- `search` (optional) - Search term for title, description, director
- `genre` (optional) - Filter by genre (Action, Comedy, Drama, etc.)
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 12) - Items per page

**Response (200):**

```json
{
  "success": true,
  "films": [
    {
      "_id": "660abc123def456",
      "title": "The Great Adventure",
      "description": "An epic adventure film",
      "director": "Steven Director",
      "genre": ["Action", "Adventure"],
      "releaseYear": 2023,
      "duration": 120,
      "poster": "https://example.com/poster.jpg",
      "averageRating": 8.5,
      "views": 1500
    }
  ],
  "total": 45,
  "page": 1,
  "totalPages": 4
}
```

---

### Get Single Film

**GET** `/films/:id`

Retrieve detailed information for a single film. Increments view count.

**Request Parameters:**

- `id` (URL) - Film ID

**Response (200):**

```json
{
  "success": true,
  "film": {
    "_id": "660abc123def456",
    "title": "The Great Adventure",
    "description": "An epic adventure film...",
    "director": "Steven Director",
    "cast": ["Actor One", "Actor Two"],
    "genre": ["Action", "Adventure"],
    "releaseYear": 2023,
    "duration": 120,
    "poster": "https://example.com/poster.jpg",
    "streamUrl": "https://stream.example.com/film/123",
    "price": "free",
    "averageRating": 8.5,
    "totalRatings": 120,
    "views": 1501,
    "createdAt": "2024-01-10T12:00:00Z"
  }
}
```

---

### Get Featured Films

**GET** `/films/featured`

Get top 6 featured films (highest rated/most viewed).

**Response (200):**

```json
{
  "success": true,
  "films": [
    {
      /* film object */
    }
  ]
}
```

---

### Create Film _(Admin Only)_

**POST** `/films`

Create a new film entry.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "title": "New Blockbuster",
  "description": "Description of the film...",
  "director": "Director Name",
  "cast": ["Actor 1", "Actor 2"],
  "genre": ["Action", "Drama"],
  "releaseYear": 2024,
  "duration": 130,
  "poster": "https://example.com/poster.jpg",
  "streamUrl": "https://stream.example.com/film/456",
  "price": "free"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Film created successfully",
  "film": {
    /* film object */
  }
}
```

**Status Codes:**

- 201: Film created
- 400: Validation errors
- 403: Not authorized (not admin)

---

### Update Film _(Admin/Creator Only)_

**PUT** `/films/:id`

Update film information.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Request Parameters:**

- `id` (URL) - Film ID

**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated description...",
  "averageRating": 8.7
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Film updated successfully",
  "film": {
    /* updated film object */
  }
}
```

---

### Delete Film _(Admin/Creator Only)_

**DELETE** `/films/:id`

Remove a film from the database.

**Headers:**

```
Authorization: Bearer <admin-token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Film deleted successfully"
}
```

---

## Review Endpoints

### Get Film Reviews

**GET** `/reviews/:filmId`

Get all reviews for a specific film.

**Request Parameters:**

- `filmId` (URL) - Film ID

**Response (200):**

```json
{
  "success": true,
  "reviews": [
    {
      "_id": "660xyz789abc",
      "film": "660abc123def456",
      "user": {
        "_id": "660user123",
        "firstName": "John",
        "lastName": "Doe"
      },
      "rating": 9,
      "comment": "Absolutely amazing film!",
      "helpful": 15,
      "createdAt": "2024-01-20T15:30:00Z"
    }
  ]
}
```

---

### Create Review _(Protected)_

**POST** `/reviews`

Submit a review for a film.

**Headers:**

```
Authorization: Bearer <user-token>
```

**Request Body:**

```json
{
  "film": "660abc123def456",
  "rating": 8,
  "comment": "Great film, highly recommended!"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Review created successfully",
  "review": {
    "_id": "660xyz789abc",
    "film": "660abc123def456",
    "user": "660user123",
    "rating": 8,
    "comment": "Great film, highly recommended!",
    "helpful": 0,
    "createdAt": "2024-01-20T15:30:00Z"
  }
}
```

**Status Codes:**

- 201: Review created
- 400: Duplicate review from same user
- 401: Not authenticated

---

### Update Review _(Owner Only)_

**PUT** `/reviews/:id`

Update your own review.

**Headers:**

```
Authorization: Bearer <user-token>
```

**Request Body:**

```json
{
  "rating": 9,
  "comment": "Updated review comment..."
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Review updated successfully",
  "review": {
    /* updated review */
  }
}
```

---

### Delete Review _(Owner Only)_

**DELETE** `/reviews/:id`

Delete your own review.

**Headers:**

```
Authorization: Bearer <user-token>
```

**Response (200):**

```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "No token provided or token expired"
}
```

### 403 Forbidden

```json
{
  "success": false,
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 429 Rate Limited

```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

### 500 Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

- **Login**: 10 attempts per 15 minutes
- **Register**: 5 attempts per hour
- **Password Reset**: 5 attempts per hour
- **General**: 100 requests per 15 minutes

---

## Examples

### Using cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass@123"}'

# Get Films
curl http://localhost:5000/api/films?genre=Action&page=1

# Create Review
curl -X POST http://localhost:5000/api/reviews \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"film":"660abc123def456","rating":8,"comment":"Great!"}'
```

### Using JavaScript/Fetch

```javascript
// Login
const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "john@example.com",
    password: "SecurePass@123",
  }),
});
const data = await response.json();
const token = data.token;

// Get Films
const films = await fetch("http://localhost:5000/api/films?genre=Action").then(
  (r) => r.json(),
);

// Create Review
await fetch("http://localhost:5000/api/reviews", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    film: "660abc123def456",
    rating: 8,
    comment: "Great film!",
  }),
});
```

---

## Genres

Available film genres:

- Action
- Comedy
- Drama
- Horror
- Science Fiction
- Romance
- Animation
- Documentary
- Thriller
- Fantasy

---

## Status Codes Reference

| Code | Meaning                                 |
| ---- | --------------------------------------- |
| 200  | OK - Request successful                 |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input             |
| 401  | Unauthorized - Authentication required  |
| 403  | Forbidden - Access denied               |
| 404  | Not Found - Resource not found          |
| 429  | Too Many Requests - Rate limited        |
| 500  | Server Error - Internal server error    |

---

## Pagination

For endpoints returning lists, use page and limit parameters:

```
GET /api/films?page=1&limit=12
```

Response includes pagination info:

```json
{
  "films": [...],
  "total": 100,
  "page": 1,
  "totalPages": 9
}
```

---

**API Version**: 1.0.0  
**Last Updated**: 2024  
**Base URL**: http://localhost:5000/api
