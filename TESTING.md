# KellyJavier Films - Testing Guide

## Backend Testing Setup

### Unit Tests

The backend includes comprehensive unit tests for core utilities:

#### Running Unit Tests

```bash
cd backend
npm test
```

#### Test Coverage

- **tokenUtils.test.js** - JWT and token generation
  - JWT generation and uniqueness
  - Password reset token generation
  - Hash consistency and differentiation

- **passwordValidation.test.js** - Password strength validation
  - Uppercase, lowercase, number, special character requirements
  - Length requirements (minimum 8 characters)

- **filmValidation.test.js** - Film field validation
  - Genre enum validation
  - Rating range validation (0-10)
  - Year range validation (1900-future)
  - Duration validation
  - Average rating calculation

### Integration Tests

Integration tests verify API endpoints with real database interactions:

#### Running Integration Tests

```bash
cd backend
npm run test:integration  # If script is added to package.json
```

Or:

```bash
cd backend
npx jest tests/integration/*.test.js
```

#### Test Coverage

- **films.test.js** - Film API endpoints
  - GET /api/films - List films with pagination, search, and filtering
  - GET /api/films/:id - Get film details and increment views
  - POST /api/films - Create film (admin only)
  - PUT /api/films/:id - Update film (admin only)
  - DELETE /api/films/:id - Delete film (admin only)
  - GET /api/films/featured - Get featured films

- **reviews.test.js** - Review API endpoints
  - POST /api/reviews - Create review with duplicate prevention
  - GET /api/reviews/:filmId - Get film reviews
  - PUT /api/reviews/:id - Update own review
  - DELETE /api/reviews/:id - Delete own review
  - Authorization enforcement

### Test Configuration

Jest is configured in `backend/jest.config.js`:

- **Environment**: Node.js
- **Test Pattern**: `tests/**/*.test.js`
- **Coverage Paths**: Controllers, utils, middleware
- **Timeout**: 10 seconds per test

## Frontend Testing Setup

### Component Tests

Frontend includes component tests using React Testing Library:

#### Running Tests

```bash
cd frontend
npm test
```

#### Test Coverage

- **FilmsPage.test.js** - Film catalog page
  - Renders film grid
  - Filters by genre
  - Searches by title
  - Handles loading and error states

- **FilmDetailPage.test.js** - Film detail page
  - Displays film information
  - Shows user reviews
  - Updates views on load
  - Handles missing films

- **ReviewForm.test.js** - Review submission component
  - Renders form for authenticated users
  - Validates rating selection
  - Accepts comment input
  - Submits review data
  - Shows success/error messages

### Test Setup

- **setupTests.js** - Test environment configuration
  - jest-dom matchers
  - window.matchMedia mock
  - Console error filtering

## Running All Tests

### Backend

```bash
cd backend

# All tests
npm test

# Watch mode (re-run on file changes)
npm run test:watch

# With coverage report
npm run test:coverage
```

### Frontend

```bash
cd frontend

# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

## Test Database Configuration

For integration tests to work properly:

1. Ensure MongoDB is running locally on `mongodb://localhost:27017`
2. Tests use a test database that's cleaned up after each test suite
3. Each test suite creates temporary test data and cleans it up in `afterAll()` hook

## Mocking in Tests

### Backend Tests

- Database operations use real MongoDB connection
- JWT tokens are generated for authenticated requests
- User roles (admin/user) are tested for authorization

### Frontend Tests

- API calls are mocked using `jest.mock()`
- React Router useParams is mocked for URL parameters
- AuthContext is mocked for authentication state

## Continuous Integration

To add CI/CD pipeline (GitHub Actions):

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:5
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Backend Tests
        run: |
          cd backend
          npm install
          npm test

      - name: Frontend Tests
        run: |
          cd frontend
          npm install
          npm test -- --coverage
```

## Common Issues

### MongoDB Connection Errors

- Ensure MongoDB is running: `mongod`
- Default connection: `mongodb://localhost:27017/kellyjavierfilms`

### Token Expiration in Tests

- Tests generate JWT tokens with extended expiry for testing
- Token secret uses environment variable or default: `JWT_SECRET`

### React Testing Library Warnings

- Console errors about ReactDOM.render are suppressed in setupTests.js
- Use `waitFor()` for async operations

## Test Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: afterEach/afterAll hooks clean up test data
3. **Mocking**: Mock external dependencies
4. **Assertions**: Use specific, descriptive assertions
5. **Coverage**: Aim for >80% code coverage
6. **Speed**: Keep individual tests under 100ms

## Next Steps

1. Run tests locally: `npm test` in backend and frontend
2. Fix any failing tests
3. Review coverage reports: `npm run test:coverage`
4. Integrate tests into CI/CD pipeline
5. Add more tests for edge cases as features are added
