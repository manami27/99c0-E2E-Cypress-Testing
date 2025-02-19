# 99.co Website - Cypress E2E Testing

## 📌 Overview

This repository contains automated end-to-end (E2E) tests for **99.co Website** using Cypress. The tests cover various search filters, property types, price ranges, and rental options, ensuring a seamless and bug-free experience.

## 🚀 Features

- **Cypress + Page Object Model (POM)** for better maintainability
- **Headless Mode Execution** for fast and efficient testing
- **Reusable Fixtures & Commands** to streamline test cases
- **GitHub Actions Integration** for automated test execution
- **Comprehensive Test Coverage** for buy & rent filters

## 🛠️ Setup Instructions

### 1️⃣ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Cypress](https://www.cypress.io/)
- Git

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/manami27/99co-Cypress-Test-Suite.git
cd your-repo-name
```

### 3️⃣ Install Dependencies

```sh
npm install
```

## 🔍 Running Tests

### Run Cypress in Headless Mode

```sh
npm test
```

This runs all test files inside `cypress/e2e/` using Electron in headless mode.

### Run Cypress in Interactive Mode

```sh
npx cypress open
```

This opens the Cypress test runner, where you can manually run and debug tests.

## 🎯 Folder Structure

```
📂 cypress
 ├── 📂 e2e            # Test cases
 ├── 📂 fixtures       # Test data (JSON)
 ├── 📂 pageObjects    # Page Object Model (POM) structure
 ├── 📂 support        # Custom Cypress commands
 ├── 📂 plugins        # Plugin configurations
```

## 🏗️ GitHub Actions

This repository supports **manual GitHub Actions trigger** to execute tests. Navigate to **Actions** in your GitHub repo and trigger a new run.

## 💡 Contributing

1. Fork this repository
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push the branch: `git push origin feature-branch`
5. Open a pull request

## 📜 License

This project is licensed under the MIT License.

---

💡 **Happy Testing! 🚀**
