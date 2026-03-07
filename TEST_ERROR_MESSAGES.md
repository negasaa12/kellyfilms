# Testing Error Messages - Quick Guide

## How to Test Login Error Display

### 1. Start Both Servers

```bash
npm run dev
```

Both backend (5000) and frontend (3000) will start.

---

## Test Scenarios

### Test 1: Empty Fields

**Steps:**

1. Go to http://localhost:3000/login
2. Leave email and password empty
3. Click "Sign In"

**Expected:** Red errors appear below each field:

```
❌ Email is required
❌ Password is required
```

---

### Test 2: Invalid Email Format

**Steps:**

1. Type: `notanemail` (no @)
2. Click "Sign In"

**Expected:** Red error below email field:

```
❌ Please enter a valid email address
```

---

### Test 3: Wrong Password (Main Test - 401 Error)

**Steps:**

1. Email: `user@example.com` (use a real registered email)
2. Password: `WrongPassword123!`
3. Click "Sign In"
4. **Watch browser console** (F12 → Console tab)

**Expected in Console:**

```
Login error caught: {response: {status: 401, data: {...}}}
Error status: 401
Error data: {message: "Invalid credentials"}
Setting error message: ❌ Invalid email or password
Error state updated
```

**Expected on Screen:**
Red box at top of form with: `❌ Invalid email or password`

---

### Test 4: Account Locked (429 Error)

**Steps:**

1. Try wrong password **5+ times**
2. On 6th attempt, you'll see:

**Expected on Screen:**

```
⛔ Account locked for security. Too many login attempts.
Try again in 2 hours.
```

---

### Test 5: Backend Offline (Network Error)

**Steps:**

1. Stop backend server (Ctrl+C)
2. Try to login
3. Watch console

**Expected in Console:**

```
Login error caught: {code: "ECONNREFUSED"}
Setting error message: 🌐 Cannot connect to server. Is the backend running on port 5000?
```

**Expected on Screen:**
Red error box with connection message

---

## Debugging Checklist

If errors don't show, check:

### 1. Open Browser Console (F12)

Look for:

- `Login error caught:` messages
- `Setting error message:` messages
- Any JavaScript errors in red

If you see these logs but no error on screen → CSS issue

### 2. Inspect Element (F12 → Elements)

Search for `error-alert` class. Should see:

```html
<div class="error-message error-alert">❌ Invalid email or password</div>
```

If you don't see this → Error state not being set

### 3. Test Network Request (F12 → Network tab)

1. Try wrong password
2. Look for login request
3. Right-click → "Response" tab
4. Should show: `{"status": 401}`

---

## Common Issues & Fixes

### Issue: Error shows in console but not on screen

**Fix 1:** Force cache clear

```bash
# Frontend
cd frontend
npm cache clean --force
npm start
```

**Fix 2:** Check CSS
In browser inspector (F12 → Elements):

1. Find the `.error-alert` div
2. Look for `display: none` or `visibility: hidden`
3. Should show: `display: block; opacity: 1;`

### Issue: No console logs appear

**Possible causes:**

- Backend not running → Start with `npm run dev`
- Frontend not running → Should be on http://localhost:3000
- Network tab shows CORS error → Check CORS config

### Issue: Always shows "Loading..." button

**Possible causes:**

- Backend is offline
- Request is stuck
- Try clicking button again after 5 seconds

---

## Production Test Credentials

Before deploying, test with:

```
Email: test@example.com
Password: TestPass123!
```

After registering, try:

- Correct password → Success (redirects to dashboard)
- Wrong password → Shows 401 error
- Wait 2 hours → Try again (if account locked)

---

## Manual Testing Checklist

- [ ] Empty email + submit → Red error below email field
- [ ] Empty password + submit → Red error below password field
- [ ] Bad email format → Red error "not valid"
- [ ] Correct email + wrong password → RED BOX at top "Invalid email or password"
- [ ] Watch F12 Console → See "Login error caught" logs
- [ ] Red error disappears when user starts typing
- [ ] Error appears immediately after 401 response

---

## If Still Not Working

Try these troubleshooting steps:

```bash
# 1. Kill all node processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall dependencies
cd backend
npm install
cd ../frontend
npm install

# 4. Start fresh
cd ../..
npm run dev
```

Then test again with wrong password.

---

**Last Updated:** March 2026
**Status:** Error display should now show for all 401 errors ✅
