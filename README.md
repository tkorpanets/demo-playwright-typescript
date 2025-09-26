# Playwright + TypeScript Demo

A complete demo showcasing **end-to-end testing with Playwright** in **TypeScript**, featuring a secure **secret-based login flow**, reusable **Page Object Model** with **custom fixtures**, **step-level reporting**, and fully automated **CI/CD pipelines** that generate and publish interactive **HTML test reports** via **GitHub Pages**.

---

## Project Highlights

- Secure login with **GitHub Secrets**
- Live **Playwright HTML reports** hosted via **GitHub Pages**
- Clean, modular **Page Object Model (POM)**
- Powerful **custom fixtures**: login, logged user, prefilled cart, checkout
- Fully automated CI with **GitHub Actions**
- Elegant step logging with a custom `@step` decorator
- Dockerized CI/CD with official Playwright image or custom Dockerfile
- Downloadable `.zip` reports for local review

---

## Tech Stack

| Domain       | Stack                                                                                 |
| ------------ | ------------------------------------------------------------------------------------- |
| Framework    | [Playwright](https://playwright.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Architecture | Page Object Model, Base Fixture Pattern, Centralized `app` access                     |
| CI/CD        | GitHub Actions, GitHub Pages, GitHub Secrets, Docker                                  |
| Reporting    | Built-in Playwright HTML Report, Custom Step Decorator                                |
| Structure    | Modular pages/components, fixture-based setup                                         |

---

## Quick Start

### Environment file

```ini
# config/.env.dev
BASE_URL=https://www.saucedemo.com/

STANDARD_USER=standard_user
STANDARD_PASS=secret_sauce

LOCKED_USER=locked_out_user
LOCKED_PASS=secret_sauce

PERF_USER=performance_glitch_user
PERF_PASS=secret_sauce

VISUAL_USER=visual_user
VISUAL_PASS=secret_sauce
```

```ini
# config/.env.stage
BASE_URL=https://www.saucedemo.com/

STANDARD_USER=standard_user
STANDARD_PASS=secret_sauce

LOCKED_USER=locked_out_user
LOCKED_PASS=secret_sauce

PERF_USER=performance_glitch_user
PERF_PASS=secret_sauce

VISUAL_USER=visual_user
VISUAL_PASS=secret_sauce
```

### Install and run tests locally

```bash
npm ci
npx playwright install --with-deps
npm test
npx playwright show-report
```

### Run filtered tests

```bash
npx playwright test --grep "@smoke"
npx playwright test e2e/cart/

# Run cross-browser (if enabled in playwright.config.ts)
npx playwright test --project=firefox
```

---

## Fixtures

- **`loginPageFixture`** – ensures we start on Login page
- **`loggedUserFixture`** – loads storageState, lands on Inventory
- **`checkoutFixture`** – pre-fills cart and navigates to Checkout Info
- **`completedCheckoutFixture`** – auto-finishes order after test

---

## Locator Policy

- Prefer `getByTestId('data-test')` for component stability.
- Use `getByRole` with accessible names for interactive controls.
- Avoid deep CSS selectors; keep selectors shallow and resilient.

---

## Test Coverage

### E2E (UI) — Sauce Demo

- Login: positive + negative (locked user)
- Inventory: add/remove, sorting
- Cart: badge counts, empty cart, remove item
- PDP: product details, add to cart
- Checkout: form validation, overview, totals, complete order
- Users: standard, problem/visual

### API — ReqRes

- GET list users
- GET single user
- POST create user
- PUT update user
- DELETE user

---

## API testing (ReqRes)

API tests run against `reqres.in` under a separate Playwright project named `api` (isolated from UI tests on SauceDemo).

Quick start:

```ini
# config/.env.api
REQRES_BASE_URL=https://reqres.in
REQRES_API_KEY=reqres-free-v1
```

Run:

```bash
npm run test:api
```

Playwright UI: select the `api` project before running.

Files: `tests/api/*`, `app/api/*`, `app/fixtures/api.fixtures.ts`, `playwright.config.ts` (project `api`).

Links: [`https://reqres.in/`](https://reqres.in/)

---

## Workflows

This demo project includes 4 GitHub Actions workflows for running Playwright tests:

- **API Tests (Docker build)**  
  Builds a custom Docker image and runs API tests inside the container.

- **E2E Tests (Docker build)**  
  Builds a Docker image and runs browser-based E2E tests (Chromium, Firefox, WebKit).

- **E2E Tests (Playwright container)**  
  Uses the official Playwright container without a custom Dockerfile.

- **E2E Tests (Node runner)**  
  Runs tests directly on a GitHub-hosted runner (no containers).

All workflows save the Playwright HTML report as an artifact and deploy it to GitHub Pages.

## GitHub Actions Overview

- Install dependencies
- Read GitHub Secrets as environment variables
- Run Playwright tests (with storageState, fixtures, etc.)
- Upload HTML report as artifact
- Deploy HTML report to GitHub Pages

**View live report:**  
[🔗 tkorpanets.github.io/demo-playwright-typescript](https://tkorpanets.github.io/demo-playwright-typescript/)

---

## GitHub Secrets Used

| Name            | Purpose        |
| --------------- | -------------- |
| `STANDARD_USER` | Login username |
| `STANDARD_PASS` | Login password |
| `LOCKED_USER`   | Login username |
| `LOCKED_PASS`   | Login password |
| `PERF_USER`     | Login username |
| `PERF_PASS`     | Login password |
| `VISUAL_USER`   | Login username |
| `VISUAL_PASS`   | Login password |

> Secrets are consumed directly from GitHub Actions environment, not stored in the repo.

---

## Example Test

```ts
const cases: Array<{ title: string; sortByValue: SortByValue }> = [
  { title: 'Products are sorted by name from A to Z', sortByValue: 'Name (A to Z)' },
  { title: 'Products are sorted by name from Z to A', sortByValue: 'Name (Z to A)' },
  { title: 'Products are sorted by price from low to high', sortByValue: 'Price (low to high)' },
  { title: 'Products are sorted by price from high to low', sortByValue: 'Price (high to low)' },
];

for (const { title, sortByValue } of cases) {
  loggedUserFixture(title, { tag: '@inventory' }, async ({ app: { header, inventory } }) => {
    await header.productSort.sortBy(sortByValue);
    await inventory.checkSortingBy(sortByValue);
  });
}
```

---

## Dockerized CI

```bash
# Build Docker image
docker build -t pw-demo .

# Run inside container
docker run --rm -e ENV_TARGET=dev pw-demo
```

This project runs Playwright tests in two ways with GitHub Actions:

- **Container workflow**: uses official Playwright image with browsers preinstalled
- **Custom Dockerfile**: builds from scratch for identical local/CI environment

Both variants:

- Read environment variables and GitHub Secrets
- Run tests & generate HTML report
- Upload artifacts & deploy to GitHub Pages

---

## Notes

- Secrets never stored in repo
- HTML reports auto-deployed
- Works locally, in Docker, and in CI
- Extensible: add cross-browser, visual regression, Allure

---

## License

MIT © 2025 Taras Korpanets
