# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/auth/login.positive.test.ts >> Login performance glitch user
- Location: tests/ui/auth/login.positive.test.ts:13:17

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1522/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-OmGfsJ -juggler-pipe -silent
  - <launched> pid=2719
  - [pid=2719][err] [2719] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=2719][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by pwuser.)
  - [pid=2719] <process did exit: exitCode=1, signal=null>
  - [pid=2719] starting temporary directories cleanup
  - [pid=2719] <gracefully close start>
  - [pid=2719] <kill>
  - [pid=2719] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=2719] finished temporary directories cleanup
  - [pid=2719] <gracefully close end>

```