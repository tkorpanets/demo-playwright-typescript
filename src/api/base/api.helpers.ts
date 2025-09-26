import type { APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';
import type Joi from 'joi';

export function expectStatus(res: APIResponse, expected: number | number[]) {
  const status = res.status();
  if (Array.isArray(expected)) {
    expect(expected).toContain(status);
  } else {
    expect(status).toBe(expected);
  }
}

export async function getJson(res: APIResponse): Promise<unknown> {
  expect(res.headers()['content-type']).toContain('application/json');
  return await res.json();
}

export function expectSchema(schema: Joi.Schema, body: unknown) {
  const { error } = schema.validate(body, { abortEarly: false });
  if (error) throw new Error(`Schema validation failed:\n${error.message}`);
}

export async function expectEmptyBody(res: APIResponse) {
  expect(await res.text()).toBe('');
}
