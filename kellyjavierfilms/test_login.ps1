#!/usr/bin/env pwsh
# Test backend login endpoint directly
# Run with: .\test_login.ps1

Write-Host "🔍 Kelly Films - Backend Login Test" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if backend is running
Write-Host "1️⃣  Checking if backend is running on port 5000..." -ForegroundColor Yellow
try {
  $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET -ErrorAction Stop
  Write-Host "✅ Backend is running!" -ForegroundColor Green
  Write-Host "   Response: $($response.StatusCode)"
} catch {
  Write-Host "❌ Backend not responding!" -ForegroundColor Red
  Write-Host "   Make sure to run: npm run dev" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "2️⃣  Testing login with wrong password..." -ForegroundColor Yellow

# Test with wrong password
$loginData = @{
  email = "test@example.com"
  password = "wrongpassword123"
} | ConvertTo-Json

try {
  $response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $loginData `
    -ErrorAction Stop
  
  Write-Host "❌ ERROR: Login succeeded when it should have failed!" -ForegroundColor Red
  Write-Host "   This means the test user doesn't exist." -ForegroundColor Yellow
  Write-Host ""
  Write-Host "3️⃣  Registering test user..." -ForegroundColor Yellow
  
  # Register first
  $registerData = @{
    firstName = "Test"
    lastName = "User"
    email = "test@example.com"
    password = "TestPass123!"
  } | ConvertTo-Json
  
  try {
    $regResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
      -Method POST `
      -ContentType "application/json" `
      -Body $registerData `
      -ErrorAction Stop
    
    Write-Host "✅ Test user registered!" -ForegroundColor Green
    Write-Host ""
    Write-Host "4️⃣  Now testing login with WRONG password..." -ForegroundColor Yellow
    
    # Now test wrong password
    try {
      $wrongPassResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginData `
        -ErrorAction Stop
      
      Write-Host "❌ ERROR: Wrong password was accepted!" -ForegroundColor Red
    } catch {
      $errorResponse = $_.Exception.Response
      
      if ($errorResponse.StatusCode -eq 401) {
        Write-Host "✅ Backend correctly returned 401 error!" -ForegroundColor Green
        Write-Host "   Status Code: 401" -ForegroundColor Green
        
        # Try to read error message
        $reader = [System.IO.StreamReader]::new($errorResponse.GetResponseStream())
        $body = $reader.ReadToEnd()
        $reader.Close()
        
        Write-Host "   Response Body:" -ForegroundColor Green
        Write-Host "   $body" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "✅ Backend is working correctly!" -ForegroundColor Green
        Write-Host "   The error message should display in the frontend." -ForegroundColor Green
      } else {
        Write-Host "❌ Unexpected status code: $($errorResponse.StatusCode)" -ForegroundColor Red
        Write-Host "   Error: $_" -ForegroundColor Red
      }
    }
  } catch {
    Write-Host "❌ Registration failed: $_" -ForegroundColor Red
  }
  
} catch {
  $errorResponse = $_.Exception.Response
  
  if ($errorResponse.StatusCode -eq 401) {
    Write-Host "✅ Backend correctly returned 401 error!" -ForegroundColor Green
    Write-Host "   Status Code: 401" -ForegroundColor Green
    
    # Try to read error message
    try {
      $reader = [System.IO.StreamReader]::new($errorResponse.GetResponseStream())
      $body = $reader.ReadToEnd()
      $reader.Close()
      
      Write-Host "   Response Body:" -ForegroundColor Green
      Write-Host "   $body" -ForegroundColor Cyan
    } catch {
      Write-Host "   (Could not read response body)" -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "✅ Backend error handling is working!" -ForegroundColor Green
    Write-Host "   Now check if frontend displays this error..." -ForegroundColor Green
  } else {
    Write-Host "Backend responded with status: $($errorResponse.StatusCode)" -ForegroundColor Yellow
    Write-Host "Error: $_" -ForegroundColor Red
  }
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "5️⃣  Next steps:" -ForegroundColor Yellow
Write-Host "   1. Go to http://localhost:3000/login" -ForegroundColor Cyan
Write-Host "   2. Enter email and WRONG password (from test above)" -ForegroundColor Cyan
Write-Host "   3. Open browser DevTools (F12 → Console)" -ForegroundColor Cyan
Write-Host "   4. Look for red error box at top of form" -ForegroundColor Cyan
Write-Host "   5. Check console for 'Login error caught' messages" -ForegroundColor Cyan
Write-Host ""
