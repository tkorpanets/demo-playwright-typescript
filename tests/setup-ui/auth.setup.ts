import { loginPageFixture } from '../ui/fixtures/ui.fixture';
import { users } from '../../src/ui/helpers/users.helper';
import { mkdir } from 'node:fs/promises';
import {
  STORAGE_DIR,
  STORAGE_STATE_STANDARD_USER,
  STORAGE_STATE_VISUAL_USER,
} from '../../src/ui/constants/urls.constant';

loginPageFixture('Login with standard user and save storage', async ({ app: { login, header }, page }) => {
  const { username, password } = users.standard;
  await login.login(username, password);
  await header.expectLoaded();
  await mkdir(STORAGE_DIR, { recursive: true });
  await page.context().storageState({ path: STORAGE_STATE_STANDARD_USER });
});

loginPageFixture('Login with visual user and save storage', async ({ app: { login, header }, page }) => {
  const { username, password } = users.visual;
  await login.login(username, password);
  await header.expectLoaded();
  await mkdir(STORAGE_DIR, { recursive: true });
  await page.context().storageState({ path: STORAGE_STATE_VISUAL_USER });
});
