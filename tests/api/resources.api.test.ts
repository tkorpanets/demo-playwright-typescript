import { apiTest } from './fixtures/api.fixture';
import { expectStatus, getJson, expectSchema } from '../../src/api/base/api.helpers';
import { listResourcesSchema, singleResourceSchema } from '../../src/api/resources/resources.schema';

apiTest.describe('Resources API', () => {
  apiTest('should return a list of resources', async ({ api }) => {
    const res = await api.resources.list();
    expectStatus(res, 200);
    const body = await getJson(res);
    expectSchema(listResourcesSchema, body);
  });

  apiTest('should return a single resource by id', async ({ api }) => {
    const res = await api.resources.getOne(2);
    expectStatus(res, 200);
    const body = await getJson(res);
    expectSchema(singleResourceSchema, body);
  });

  apiTest('should support delayed response for users', async ({ api }) => {
    const res = await api.resources.delayedUsers(3);
    expectStatus(res, 200);
  });
});
