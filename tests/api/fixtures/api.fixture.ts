import { test as base } from '@playwright/test';
import { API } from '../../../src/api/base/api.facade';

type APIFixtures = {
  api: API;
};

export const apiTest = base.extend<APIFixtures>({
  api: async ({ playwright, baseURL }, use) => {
    const reqresApiKey = process.env.REQRES_API_KEY;
    if (!reqresApiKey) {
      throw new Error('REQRES_API_KEY is not set');
    }
    const ctx = await playwright.request.newContext({
      baseURL, //playwright.config.ts
      extraHTTPHeaders: {
        Authorization: `Bearer ${reqresApiKey}`,
        'x-api-key': reqresApiKey,
      },
    });
    const api = new API(ctx);
    await use(api);
    await ctx.dispose();
  },
});
