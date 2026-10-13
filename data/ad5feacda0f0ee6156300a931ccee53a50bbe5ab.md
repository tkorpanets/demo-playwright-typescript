# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/checkout/form-behavior.test.ts >> Cancel after filling form with faker data
- Location: tests/ui/checkout/form-behavior.test.ts:55:18

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1522/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-Ok5EYi -juggler-pipe -silent
  - <launched> pid=3679
  - [pid=3679][err] [3679] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=3679][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by pwuser.)
  - [pid=3679] <process did exit: exitCode=1, signal=null>
  - [pid=3679] starting temporary directories cleanup
  - [pid=3679] <gracefully close start>
  - [pid=3679] <kill>
  - [pid=3679] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=3679] finished temporary directories cleanup
  - [pid=3679] <gracefully close end>

```