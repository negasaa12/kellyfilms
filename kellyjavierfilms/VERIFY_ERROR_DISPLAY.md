# Verify Error Display is Working ✅

## Quick Start Test (2 minutes)

### 1. Start Servers

```bash
cd c:\Users\gueba\kellyfilms\kellyjavierfilms
npm run dev
```

Wait for output:

```
✓ backend running on http://localhost:5000
✓ frontend running on http://localhost:3000
```

---

### 2. Open Browser DevTools FIRST

Before logging in:

1. Go to http://localhost:3000/login
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Leave it open while testing

---

### 3. Test Wrong Password (401 Error)

#### Step 1: Enter credentials

```
Email: test@example.com
Password: wrongpassword123
```

#### Step 2: Click "Sign In"

#### Step 3: Watch Console

You should see:

```
Login error caught: Error: Request failed with status code 401
Error status: 401
Error data: {message: "Invalid credentials"}
Setting error message: ❌ Invalid email or password
Error state updated
```

#### Step 4: Look at Screen

You should see a **red error box** at top of form:

```
❌ Invalid email or password
```

---

## If Error Shows in Console but NOT on Screen

**Step 1: Check if error div exists**

1. Press F12 (DevTools)
2. Click **Elements** tab
3. Press Ctrl+F to search
4. Type: `error-alert`
5. If found → check CSS is not hiding it
6. If NOT found → React not rendering it

---

## If Error NOT in Console Either

**Possible Issue 1: Backend not responding**

- Check if backend actually running on 5000
- Run this in PowerShell:

```powershell
Test-NetConnection -ComputerName localhost -Port 5000
```

Should show: `TcpTestSucceeded : True`

**Possible Issue 2: Test user doesn't exist**

- First, register a test account:
  1. Go to http://localhost:3000/signup
  2. Create: test@example.com / TestPass123!
  3. Then try login with wrong password

**Possible Issue 3: MongoDB not running**
If backend starts but won't respond to login:

- Check if MongoDB running (should start automatically)
- Run: `mongod --version` in PowerShell

---

## Complete Test Checklist

### Auth Error Tests

- [ ] **401 Wrong Password**
  - Input correct email, wrong password
  - Should show: ❌ Invalid email or password
  - In console should have: Error status: 401

- [ ] **429 Account Locked**
  - Wrong password 5+ times
  - Should show: ⛔ Account locked...
  - In console: Error status: 429

- [ ] **400 Invalid Email**
  - Input: notanemail (no @)
  - Should show field error immediately

- [ ] **Backend Offline**
  - Stop backend (Ctrl+C)
  - Try to login
  - Should show: 🌐 Cannot connect to server...
  - In console: code: ECONNREFUSED

---

## If Still Not Working

### Debug 1: Verify File Changes

Check if the error display code exists in LoginPage.js:

```javascript
{
  error && <div className="error-message error-alert">{error}</div>;
}
```

Run this in PowerShell to search:

```powershell
Select-String -Path "frontend/src/pages/LoginPage.js" -Pattern "error-alert"
```

### Debug 2: Force Refresh Browser

```
Ctrl+Shift+R  (Hard refresh)
```

### Debug 3: Clear Browser Cache

1. F12 → Application tab
2. Storage → Local Storage
3. Delete all entries
4. Close browser
5. Restart browser

### Debug 4: Check CSS is Applied

In browser DevTools:

1. F12 → Elements tab
2. Click on error div
3. Look at **Styles** panel on right
4. Should show `.error-alert` with `display: block !important`
5. If crossed out → something is overriding it

---

## Expected File Locations

```
backend/src/routes/auth.js         ← Login endpoint (returns 401 for wrong password)
frontend/src/pages/LoginPage.js    ← Error display code
frontend/src/pages/LoginPage.css   ← Error styling
frontend/src/context/AuthContext.js ← Error handling
```

---

## If Everything Works ✅

When wrong password entered, you should see:

**Console Output:**

```
Login error caught: Error: Request failed with status code 401
Error status: 401
Error data: {message: "Invalid credentials"}
Setting error message: ❌ Invalid email or password
Error state updated
```

**Screen:**

- Red box appears at top of login form
- Message reads: ❌ Invalid email or password
- Box disappears when user starts typing in a field
- Button shows "Signing in..." while processing

---

## Common Success Screenshots

### Working Error Display:

```
┌─────────────────────────────────────────┐
│ KellyJavier Films                       │
│ Sign In                                 │
│                                         │
│ ❌ Invalid email or password            │  ← RED BOX (this is what you want)
│                                         │
│ Email: [test@example.com               ]│
│ Password: [.....................]       │
│                                         │
│        [ Sign In ]                      │
│                                         │
│ Forgot Password?                        │
│ Don't have an account? Create one       │
└─────────────────────────────────────────┘
```

---

## Test Credentials

After first signup, use:

```
Email: test@example.com
Password: TestPass123! (correct)
WrongPassword123! (test 401 error)
```

Then try:

- Correct password → Redirects to dashboard ✅
- Wrong password → Shows error and stays on login ✅
- Wrong password 5+ times → Account locked for 2 hours ✅

---

## Troubleshooting Commands

**Check backend is running:**

```powershell
Get-Process -Name "node" | Where-Object {$_.Name -like "*backend*"}
```

**Check frontend is running:**

```powershell
Get-Process -Name "node" | Where-Object {$_.Name -like "*frontend*"}
```

**Kill all node processes (if needed):**

```powershell
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
```

**Check backend responds:**

```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/health -Method GET
```

---

## Still Need Help?

Check:

1. Browser console for errors
2. Backend terminal for errors
3. Network tab in DevTools to see actual response
4. Test with different email/password combinations
