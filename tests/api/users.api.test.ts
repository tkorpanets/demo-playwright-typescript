import { apiTest } from './fixtures/api.fixture';
import { expectStatus, getJson, expectSchema, expectEmptyBody } from '../../src/api/base/api.helpers';
import {
  createUserSchema,
  listUsersSchema,
  singleUserSchema,
  updateUserSchema,
} from '../../src/api/users/users.schema';

apiTest.describe('Users API: CRUD', () => {
  apiTest('should return a list of users', async ({ api }) => {
    const res = await api.users.listUsers(1);
    expectStatus(res, 200);
    const body = await getJson(res);
    expectSchema(listUsersSchema, body);
  });

  apiTest('should return a single user by id', async ({ api }) => {
    const res = await api.users.getUser(2);
    expectStatus(res, 200);
    const body = await getJson(res);
    expectSchema(singleUserSchema, body);
  });

  apiTest('should create a new user', async ({ api }) => {
    const res = await api.users.createUser({ name: 'morpheus', job: 'leader' });
    expectStatus(res, [201, 401]);
    const body = await getJson(res);
    expectSchema(createUserSchema, body);
  });

  apiTest('should update an existing user', async ({ api }) => {
    const res = await api.users.updateUser(2, { name: 'neo', job: 'one' });
    expectStatus(res, [200, 401]);
    const body = await getJson(res);
    expectSchema(updateUserSchema, body);
  });

  apiTest('should delete a user', async ({ api }) => {
    const res = await api.users.deleteUser(2);
    expectStatus(res, [204, 401]);
    if (res.status() === 204) {
      await expectEmptyBody(res);
    }
  });
});
