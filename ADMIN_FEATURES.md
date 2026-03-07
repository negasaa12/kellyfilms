# Admin Control System & Contact Page Documentation

## Overview

The application now includes a comprehensive admin dashboard for cinematographers/artists/directors to manage their portfolio, along with a public contact page for client inquiries.

## New Features

### 1. **Admin Dashboard** (`/admin`)

A complete admin panel accessible only to users with `admin` role.

#### Features:

- **📊 Overview** - Dashboard summary with quick links to all admin functions
- **🎬 Manage Films** - Add, edit, and delete films from your portfolio
- **⭐ Reviews** - View and manage audience reviews
- **💬 Messages** - Manage client inquiries and booking requests

### 2. **Film Management**

Admin can perform CRUD operations on films:

**Add Film:**

- Title, description, genre(s)
- Director, cast, duration, release year
- Poster image URL
- Streaming URL
- Price (0 for free, any value for paid)

**Edit Film:**

- Update any film details
- Re-upload poster or streaming URL

**Delete Film:**

- Remove films from portfolio
- Confirmation required

**Supported Genres:**

- Action, Comedy, Drama, Horror, Science Fiction, Romance, Animation, Documentary, Thriller, Fantasy

### 3. **Contact Page** (`/contact`)

Public-facing contact form for potential clients and collaborators.

**Message Types Supported:**

- General Inquiry
- Collaboration
- Booking Request
- Feedback
- Other

**Admin Features:**

- View all messages in admin dashboard
- Filter by status: New, Read, Responded
- Add internal notes to messages
- Mark messages as read
- Delete messages

### 4. **User Roles & Authorization**

**User Roles:**

- `user` - Regular user (default)
- `admin` - Administrator with full access

**Access Control:**

- Admin routes are protected by `AdminRoute` component
- Redirects non-admin users to regular dashboard
- Backend API endpoints validate admin authorization

## Setup Instructions

### 1. **Create Admin Account**

Currently, you need to manually set a user's role to `admin` in the database:

```javascript
// Using MongoDB directly:
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

Or update via MongoDB GUI:

- Find the user document
- Set `role` field to `"admin"`

### 2. **Access Admin Dashboard**

After login, if user has `admin` role:

- **Navigate to:** `http://localhost:3000/admin`
- **Automatically redirected:** If accessing `/dashboard` as admin, consider showing admin option

> **Note:** Currently admin access requires manual database role assignment. In future, add user invite/registration system for admins.

### 3. **Public Contact Page**

Available to everyone at: `http://localhost:3000/contact`

**Features:**

- Clean, professional contact form
- Form validation
- Success/error notifications
- Message types for categorization

## API Endpoints

### Contact Endpoints

```
POST   /api/contact              - Submit contact form (public)
GET    /api/contact              - Get all contacts (admin only)
GET    /api/contact/:id          - Get contact details (admin only)
PUT    /api/contact/:id          - Update contact (admin only)
DELETE /api/contact/:id          - Delete contact (admin only)
```

### Film Endpoints (Extended)

```
GET    /api/films                - Get all films (public)
GET    /api/films/:id            - Get film details (public)
POST   /api/films                - Create film (admin only)
PUT    /api/films/:id            - Update film (admin only)
DELETE /api/films/:id            - Delete film (admin only)
```

## Database Collections

### Contact Model

```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  type: String (enum: ['collaboration', 'booking', 'inquiry', 'feedback', 'other']),
  status: String (enum: ['new', 'read', 'responded']),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Components

### New Components:

- `AdminRoute` - Protected route for admin-only pages
- `AdminDashboard` - Main admin panel
- `ManageFilms` - Film CRUD interface
- `ManageReviews` - Review management
- `ManageContacts` - Contact/message management
- `ContactPage` - Public contact form

### Updated Components:

- `App.js` - Added routes for `/admin` and `/contact`

## Styling

- Dark theme with teal/cyan accent colors (#6ba8ab)
- Responsive design for mobile/tablet/desktop
- Glassmorphism effects with backdrop blur
- Smooth transitions and hover effects

## Future Enhancements

1. **Admin User Invitation System**
   - Create admin account invitation via email
   - Accept invitations to become admin

2. **Email Notifications**
   - Send email to admin when new message received
   - Auto-reply to contact form submissions

3. **Advanced Analytics**
   - Views per film
   - Popular films
   - Message statistics

4. **Film Media Upload**
   - Upload poster images directly
   - Upload streaming videos
   - Replace URL-based storage

5. **Review Moderation**
   - Flag/approve reviews
   - Set review rating threshold

6. **Message Templates**
   - Pre-written response templates
   - Quick reply system

7. **Admin Activity Log**
   - Track all admin actions
   - Film add/edit/delete history

## Testing the Features

### Test Admin Film Management:

1. Login as admin
2. Go to `/admin`
3. Add a new film
4. Edit the film details
5. Delete the film

### Test Contact Form:

1. Go to `/contact`
2. Fill out the form
3. Submit
4. Login as admin and view message in dashboard

### Test Authorization:

1. Login as regular user
2. Try accessing `/admin` - should redirect to `/dashboard`
3. Try POST request to `/api/films` - should get 403 Forbidden

## Troubleshooting

### Cannot access admin dashboard

- Check that user role in database is set to `"admin"`
- Verify token is valid
- Check browser console for errors

### Contact form not submitting

- Verify all required fields are filled
- Check network tab for API errors
- Ensure backend is running on port 5000

### Films not loading in admin panel

- Check MongoDB connection
- Verify films collection has documents
- Look for errors in browser console

## Support

For issues or questions about the admin system, check:

- Browser console (F12) for client-side errors
- Server terminal for backend errors
- Network tab (F12) for API response status
