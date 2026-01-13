# 🚀 QA Automation Framework

Welcome to the **Web Ticketing System** automation project! This repository contains automated tests to ensure our application works perfectly.

We cover three main types of testing:
1.  **End-to-End (E2E)**: Simulating real user actions (like clicking buttons and logging in).
2.  **API**: Checking the backend server directly.
3.  **Performance**: Making sure the system is fast enough.

> **Note:** For deep details on our testing strategy, prioritization, and compliance, check out the [QA Strategy Document](./QA_STRATEGY.md).

---

## 🛠️ Prerequisites

Before you start, make sure you have these tools installed on your computer:

*   [Node.js](https://nodejs.org/) (Version 18 or higher) - The engine that runs our code.
*   [VS Code](https://code.visualstudio.com/) (Recommended) - A great code editor.
*   **Git** - For version control.

---

## 🏁 Getting Started

Follow these steps to get the project running on your machine.

### 1. Clone & Setup
Open your terminal (or command prompt) inside the project folder and run these commands:

```bash
# 1. Install all the necessary libraries (this might take a minute)
npm install

# 2. Install the browsers needed for Playwright (our testing tool)
npx playwright install
```

### 2. Configure Environment
We need to set up some "secret" variables like passwords and URLs so the tests know where to log in.

1.  **Create the config file**:
    ```bash
    cp .env.example .env
    ```
2.  **Edit the file**: Open the new `.env` file in your code editor.
3.  **Fill in the blanks**: Update the values (like `ADMIN_PASSWORD`) with the credentials provided by your team lead.

---

## 🧪 How to Run Tests

Here are the commands to run the different tests.

### 1️⃣ End-to-End (E2E) Tests
These simulate a real user clicking through the website.

*   **Run all tests (Headless)**:
    *Runs in the background, faster.*
    ```bash
    npm run test:e2e
    ```

*   **Run tests visually (Headed)**:
    *Opens a browser window so you can watch what's happening.*
    ```bash
    npx playwright test --project=chromium --headed
    ```

### 2️⃣ API Tests
These test the backend server responses directly, without a browser.

*   **Run API command**:
    ```bash
    npm run test:api
    ```

### 3️⃣ Performance Tests
These check if the system gets slow when many people use it.

*   **Run Load Test**:
    ```bash
    npm run test:perf
    ```

---

## 📊 Test Reports

After running tests, you can view professional reports to see what passed or failed.

*   **E2E Dashboard**: Run `npx allure serve allure-results` to see a nice web dashboard.
*   **API Report**: Open `reports/api-test-report.html` in your browser.
*   **Performance Report**: Open `reports/performance-report.html` in your browser.

---

## 📂 Project Structure

Here is a quick map of where everything is to help you navigate:

*   **`tests/`**
    *   **`e2e/`**: The main UI tests using Playwright.
    *   **`api/`**: Tests for the backend API.
    *   **`performance/`**: JavaScript scripts for load testing.
*   **`src/`**: Helper code and utilities used by the tests.
*   **`.env`**: Your local configuration (contains secrets - do not share!).
*   **`playwright.config.ts`**: The main settings file for Playwright.

---

## ❓ Troubleshooting

**"Playwright browsers not found"**
> Run `npx playwright install` again.

**"Environment configuration error"**
> Check your `.env` file and make sure all values are filled in correctly and the file is named exactly `.env`.
