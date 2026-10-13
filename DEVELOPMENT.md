## Type Checking

### `npx tsc --noEmit`

Runs the TypeScript compiler in **type-check only** mode without generating any `.js` output files.  
Ensures that code strictly matches the defined TypeScript types and interfaces.

Detects:

- Missing required fields
- Extra or misspelled keys
- Incorrect value types

## Local quality gate

### `npm run check`

Runs the same non-network quality gate used by pull requests:

1. strict TypeScript compilation;
2. ESLint with zero warnings;
3. Playwright test discovery for every configured project.

Test discovery catches invalid imports, duplicate project matching, malformed fixtures, and configuration errors without executing external UI or API calls.

---

## Linting

### `npx eslint . --max-warnings=0`

Runs ESLint across the project with strict rules enabled.  
Prevents merging code that violates style or best practices.

Detects:

- Unused variables and imports
- Unsafe `any` usage
- Incorrect `const` / `let`
- Code style violations

> Using `--max-warnings=0` enforces zero tolerance: even warnings block the pipeline.

## Test design rules

- Page objects contain locators and user actions, not random test-data generation.
- `expectLoaded()` is a hard precondition and must fail immediately.
- Soft assertions are reserved for deliberate multi-field verification inside tests.
- Negative API requests have explicit client methods instead of bypassing TypeScript with casts.
- Functional API and OpenAPI contract suites are isolated Playwright projects.
- Cleanup fixtures must not add secondary errors after the test has already failed.

## Run with Docker locally

Build the image:
`docker build -t demo-pw-e2e .`

Run tests with environment variables from .env.dev or .env.stage (stored under config/):

Dev environment
`docker run --rm --shm-size=1g --env-file ${PWD}\config\.env.dev -v ${PWD}\playwright-report:/app/playwright-report demo-pw-e2e`

Stage environment
`docker run --rm --shm-size=1g --env-file ${PWD}\config\.env.stage -v ${PWD}\playwright-report:/app/playwright-report demo-pw-e2e`

View Playwright Report
After the run, the HTML report is available in the playwright-report folder.
Windows (PowerShell): `start .\playwright-report\index.html`
macOS: `open ./playwright-report/index.html`
Linux: `xdg-open ./playwright-report/index.html`
