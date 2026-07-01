# Playwright API

![Playwright Tests](https://github.com/NaomiMiyake/playwright-api/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black)

## API Under Test

This project uses the Restful-Booker API for learning and demonstration purposes.

## Overview

API automation practice project built with Playwright and TypeScript, demonstrating CRUD operations, authentication, negative test scenarios, reusable API client design, and CI integration with GitHub Actions.

## Tech Stack

- Playwright
- TypeScript
- GitHub Actions
- ESLint
- Prettier

## Features

- CRUD API automation
- Authentication testing
- Negative test scenarios
- Data-driven testing
- Reusable API client (BookingApi)
- Reusable assertion helper (verifyBooking)
- Type-safe API responses with TypeScript interfaces
- beforeAll / beforeEach hooks
- GitHub Actions CI
- ESLint for code quality
- Prettier for consistent code formatting

## Test Cases

### API-001 Create, retrieve, and delete booking successfully

**Test Steps**

1. Create a booking
2. Retrieve the created booking
3. Verify booking details
4. Delete the booking
5. Verify the booking is deleted

**Expected Result**

- Create returns HTTP 200
- Retrieve returns HTTP 200
- Booking details match the request data
- Delete returns HTTP 201
- Retrieve after delete returns HTTP 404

---

### API-002 Return 404 for nonexistent booking

**Test Steps**

1. Retrieve a nonexistent booking ID

**Expected Result**

- HTTP 404 is returned

---

### API-003 Reject delete request without authentication

**Test Steps**

1. Delete a booking without authentication

**Expected Result**

- HTTP 403 is returned

---

### API-004 Create, update, retrieve, and delete booking successfully

**Test Steps**

1. Create a booking
2. Retrieve the created booking
3. Verify booking details
4. Update the booking
5. Retrieve the updated booking
6. Verify updated booking details
7. Delete the booking
8. Verify the booking is deleted

**Expected Result**

- Create returns HTTP 200
- Retrieve returns HTTP 200
- Booking details match the request data
- Update returns HTTP 200
- Retrieve updated booking returns HTTP 200
- Updated booking details match the update request data
- Delete returns HTTP 201
- Retrieve after delete returns HTTP 404

---

### API-005 Reject authentication with invalid credentials

**Test Steps**

1. Send an authentication request with invalid credentials

**Expected Result**

- HTTP 200 is returned
- Authentication token is not returned
- Response contains "Bad credentials"

---

### API-006 Partially update booking successfully

**Test Steps**

1. Create a booking
2. Retrieve the created booking
3. Partially update the booking
4. Retrieve the updated booking
5. Verify only the specified field is updated
6. Delete the booking
7. Verify the booking is deleted

**Expected Result**

- Partial update returns HTTP 200
- Updated field matches the partial update request data
- Unchanged fields remain the same
- Delete returns HTTP 201
- Retrieve after delete returns HTTP 404

---

### API-007 Reject partial update request without authentication

**Test Steps**

1. Create a booking
2. Attempt to partially update the booking without authentication
3. Retrieve the booking
4. Verify the booking was not updated
5. Delete the booking

**Expected Result**

- Partial update returns HTTP 403
- Booking details remain unchanged
- Delete returns HTTP 201

---

### API-008 Reject full update request without authentication

**Test Steps**

1. Create a booking
2. Attempt to fully update the booking without authentication
3. Retrieve the booking
4. Verify the booking was not updated
5. Delete the booking

**Expected Result**

- Full update returns HTTP 403
- Booking details remain unchanged
- Delete returns HTTP 201

---

### API-009 Reject update request for nonexistent booking

**Test Steps**

1. Verify the booking ID does not exist
2. Attempt to update the nonexistent booking

**Expected Result**

- Retrieve nonexistent booking returns HTTP 404
- Update nonexistent booking returns HTTP 405

---

### API-010 Reject delete request for nonexistent booking

**Test Steps**

1. Verify the booking ID does not exist
2. Attempt to delete the nonexistent booking with authentication

**Expected Result**

- Retrieve nonexistent booking returns HTTP 404
- Delete nonexistent booking returns HTTP 405

## Run Tests

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

## Code Quality

Check code quality:

```bash
npm run lint
```

Format source code:

```bash
npm run format
```

Verify formatting:

```bash
npm run format:check
```

## HTML Report

Generate and open the Playwright HTML report:

```bash
npx playwright show-report
```

## CI

GitHub Actions automatically runs all API tests on every push and pull request.

## Project Structure

```text
.
├── .github
│   └── workflows
│       └── playwright.yml
├── api
│   └── booking-api.ts
├── data
│   ├── booking-data.ts
│   ├── booking-data-update.ts
│   └── constants.ts
├── tests
│   ├── api-001-booking-create-get-delete.spec.ts
│   ├── api-002-booking-get-negative.spec.ts
│   ├── api-003-booking-delete-negative.spec.ts
│   ├── api-004-booking-update.spec.ts
│   ├── api-005-auth-invalid-credentials.spec.ts
│   ├── api-006-booking-partial-update.spec.ts
│   ├── api-007-booking-partial-update-negative.spec.ts
│   ├── api-008-booking-full-update-negative.spec.ts
│   ├── api-009-booking-update-nonexisting.spec.ts
│   └── api-010-booking-delete-nonexisting.spec.ts
├── types
│   └── booking.ts
├── utils
│   ├── auth.ts
│   └── booking-assertions.ts
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Directory Descriptions

- **.github/workflows/**
    - GitHub Actions configuration for automated test execution.

- **api/**
    - Reusable API client classes for booking endpoints.

- **data/**
    - Test data and shared constants.

- **tests/**
    - Playwright API test suites.

- **types/**
    - TypeScript interfaces for request and response models.

- **utils/**
    - Shared utilities such as authentication and assertion helpers.

- **eslint.config.mjs**
    - ESLint configuration for code quality checks.

- **.prettierrc**
    - Prettier configuration for consistent code formatting.

- **playwright.config.ts**
    - Playwright test configuration.

- **tsconfig.json**
    - TypeScript compiler configuration.

- **README.md**
    - Project documentation.

## Future Improvements

- Add response schema validation
- Extend negative test scenarios
- Integrate API and UI end-to-end test scenarios
- Improve reusable utilities and assertions

## Author

Personal learning project demonstrating API test automation using Playwright and TypeScript.
