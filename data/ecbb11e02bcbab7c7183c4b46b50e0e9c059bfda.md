# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/auth/login.positive.test.ts >> Login with valid user
- Location: tests/ui/auth/login.positive.test.ts:4:5

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1522/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-RidUgl -juggler-pipe -silent
  - <launched> pid=2687
  - [pid=2687][err] [2687] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=2687][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by pwuser.)
  - [pid=2687] <process did exit: exitCode=1, signal=null>
  - [pid=2687] starting temporary directories cleanup
  - [pid=2687] <gracefully close start>
  - [pid=2687] <kill>
  - [pid=2687] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=2687] finished temporary directories cleanup
  - [pid=2687] <gracefully close end>

```