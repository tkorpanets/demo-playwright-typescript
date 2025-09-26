import type { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseAPI {
  constructor(protected request: APIRequestContext) {}
  //GET
  protected async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(endpoint);
  }
  //POST
  protected async post(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.post(endpoint, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  //PUT
  protected async put(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.put(endpoint, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  //DELETE
  protected async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint);
  }
}
