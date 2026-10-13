import type { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseAPI {
  constructor(protected request: APIRequestContext) {}

  protected get(endpoint: string): Promise<APIResponse> {
    return this.request.get(endpoint);
  }

  protected post(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.post(endpoint, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  protected put(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.put(endpoint, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  protected delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint);
  }
}
