import { apiTest } from './fixtures/api.fixture';
import { expectStatus, getJson, expectSchema } from '../../src/api/base/api.helpers';
import { loginSuccessSchema, registerSuccessSchema, errorSchema } from '../../src/api/auth/auth.schema';

apiTest.describe('Auth API', () => {
  apiTest('should login successfully with valid credentials', async ({ api }) => {
    const res = await api.auth.login({ email: 'eve.holt@reqres.in', password: 'cityslicka' });
    expectStatus(res, 200);
    const body = await getJson(res);
    expectSchema(loginSuccessSchema, body);
  });

  apiTest('should fail login when password is missing', async ({ api }) => {
    const res = await api.auth.login({ email: 'peter@klaven', password: '' as unknown as string });
    expectStatus(res, 400);
    const body = await getJson(res);
    expectSchema(errorSchema, body);
  });

  apiTest('should register a new user with valid data', async ({ api }) => {
    const res = await api.auth.register({ email: 'eve.holt@reqres.in', password: 'pistol' });
    expectStatus(res, 200);
    const body = await getJson(res);
    expectSchema(registerSuccessSchema, body);
  });

  apiTest('should fail registration when password is missing', async ({ api }) => {
    const res = await api.auth.registerWithoutPassword('sydney@fife');
    expectStatus(res, 400);
    const body = await getJson(res);
    expectSchema(errorSchema, body);
  });
});
