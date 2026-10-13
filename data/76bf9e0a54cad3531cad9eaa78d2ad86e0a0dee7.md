# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/checkout/form-behavior.test.ts >> Submit without First Name
- Location: tests/ui/checkout/form-behavior.test.ts:34:18

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Firefox is unable to launch if the $HOME folder isn't owned by the current user.                                  ║
║ Workaround: Set the HOME=/root environment variable in your GitHub Actions workflow file when running Playwright. ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
Call log:
  - <launching> /ms-playwright/firefox-1522/firefox/firefox -no-remote -headless -profile /tmp/playwright_firefoxdev_profile-B7BHRt -juggler-pipe -silent
  - <launched> pid=3503
  - [pid=3503][err] [3503] Sandbox: CanCreateUserNamespace() clone() failure: EPERM
  - [pid=3503][err] Running Nightly as root in a regular user's session is not supported.  ($HOME is /github/home which is owned by pwuser.)
  - [pid=3503] <process did exit: exitCode=1, signal=null>
  - [pid=3503] starting temporary directories cleanup
  - [pid=3503] <gracefully close start>
  - [pid=3503] <kill>
  - [pid=3503] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=3503] finished temporary directories cleanup
  - [pid=3503] <gracefully close end>

```