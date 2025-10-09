import { apiTest } from '../fixtures/api.fixture';
import { expectStatus, getJson } from '../../../src/api/base/api.helpers';
import { loadOpenApiLocal } from '../../../src/api/contract/api.openapiLoader';
import { getResponseSchema, validateBySchema } from '../../../src/api/contract/api.schemaValidator';
import { expect } from '@playwright/test';
import type { AnySchema } from 'ajv';
import type { APIResponse } from '@playwright/test';

let login200: AnySchema;
let login400: AnySchema;
let register200: AnySchema;
let register400: AnySchema;

apiTest.describe('Auth API - Contract (OpenAPI)', () => {
  apiTest.beforeAll(() => {
    const openapi = loadOpenApiLocal('default');
    login200 = getResponseSchema(openapi, '/api/login', 'post', 200);
    login400 = getResponseSchema(openapi, '/api/login', 'post', 400);
    register200 = getResponseSchema(openapi, '/api/register', 'post', 200);
    register400 = getResponseSchema(openapi, '/api/register', 'post', 400);
  });

  apiTest('should login successfully with valid credentials (200)', async ({ api }) => {
    const res: APIResponse = await api.auth.login({ email: 'eve.holt@reqres.in', password: 'cityslicka' });
    expectStatus(res, 200);
    const body = await getJson(res);
    const { ok, errors } = validateBySchema(login200, body);
    expect(ok, JSON.stringify(errors, null, 2)).toBe(true);
  });

  apiTest('should fail login when password is missing (400)', async ({ api }) => {
    const res: APIResponse = await api.auth.login({ email: 'peter@klaven', password: '' as unknown as string });
    expectStatus(res, 400);
    const body = await getJson(res);
    const { ok, errors } = validateBySchema(login400, body);
    expect(ok, JSON.stringify(errors, null, 2)).toBe(true);
  });

  apiTest('should register a new user with valid data (200)', async ({ api }) => {
    const res: APIResponse = await api.auth.register({ email: 'eve.holt@reqres.in', password: 'pistol' });
    expectStatus(res, 200);
    const body = await getJson(res);
    const { ok, errors } = validateBySchema(register200, body);
    expect(ok, JSON.stringify(errors, null, 2)).toBe(true);
  });

  apiTest('should fail registration when password is missing (400)', async ({ api }) => {
    const res: APIResponse = await api.auth.registerWithoutPassword('sydney@fife');
    expectStatus(res, 400);
    const body = await getJson(res);
    const { ok, errors } = validateBySchema(register400, body);
    expect(ok, JSON.stringify(errors, null, 2)).toBe(true);
  });
});
