# QA Automation Framework for Web Ticketing System

This project contains the automated test suites for the web-based ticketing system, covering E2E, API, and Performance testing.

## Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **TypeScript**: Installed via dev dependencies

## Setup
1. Navigate to the automation directory:
   ```bash
   cd qa-automation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
4. Configure environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the values in `.env` with your actual test environment credentials and URLs.

## CI/CD Pipeline (GitHub Actions)
The project includes a GitHub Actions workflow that automatically runs your tests on every push.

### Setting up GitHub Secrets
To make the pipeline work, you must add the following **Secrets** to your GitHub Repository (`Settings > Secrets and variables > Actions`):

| Secret Name | Description |
|-------------|-------------|
| `APP_URL` | The base URL of your web application |
| `API_BASE_URL` | The base URL of your API |
| `ADMIN_EMAIL` | Admin user email for testing |
| `ADMIN_PASSWORD` | Admin user password |
| `AGENT_EMAIL` | Agent user email |
| `AGENT_PASSWORD` | Agent user password |

## Running Tests

### 1. End-to-End Tests (Playwright)
Validates UI workflows and Role-Based Access Control (RBAC).
```bash
npm run test:e2e
```
To run in headed mode:
```bash
npx playwright test --headed
```

### 2. API Tests (Jest + Supertest)
Validates backend endpoints, routing logic, and data validation.
```bash
npm run test:api
```

### 3. Performance Tests (k6)
Validates system load handling and response time thresholds.
*Note: Requires k6 installed on your system. Environment variables should be passed via CLI.*
```bash
k6 run -e API_BASE_URL=https://api.example.com -e PERF_TOKEN=your_token performance/scripts/load-test.js
```
Or use the npm script (uses defaults in script):
```bash
npm run test:perf
```

## Test Reporting
The project generates professional, visual reports for all test suites.

### 1. Unified E2E Dashboard (Allure)
- **Local:** `npx allure serve allure-results`
- **CI:** Download `allure-results` from GitHub Actions, or view the basic `playwright-report` HTML artifact.

### 2. API Test Report (HTML)
- **File:** `reports/api-test-report.html`
- Generated automatically after running `npm run test:api`.

### 3. Performance Summary (HTML)
- **File:** `reports/performance-report.html`
- Generated automatically after running `npm run test:perf`.

### Viewing CI Reports
All reports are uploaded as **Artifacts** on every GitHub Actions run. You can find them at the bottom of the Summary page for any specific run.

## Directory Structure
- `e2e/`: Contains Playwright tests and Page Objects.
- `api/`: Contains Jest/Supertest API tests.
- `performance/`: Contains k6 load testing scripts.
- `playwright.config.ts`: Main E2E configuration.
- `jest.config.js`: API testing configuration.
- `tsconfig.json`: TypeScript configuration.
# Web-Ticketing-Solution
