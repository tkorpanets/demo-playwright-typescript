import type { APIResponse } from '@playwright/test';
import { BaseAPI } from '../base/api.base';
import { USERS } from './users.endpoints';

export class UsersAPI extends BaseAPI {
  async listUsers(page: number = 1): Promise<APIResponse> {
    return this.get(USERS.list(page));
  }

  async getUser(id: number): Promise<APIResponse> {
    return this.get(USERS.one(id));
  }

  async createUser(body: { name: string; job: string }): Promise<APIResponse> {
    return this.post(USERS.base, body);
  }

  async updateUser(id: number, body: { name?: string; job?: string }): Promise<APIResponse> {
    return this.put(USERS.one(id), body);
  }

  async deleteUser(id: number): Promise<APIResponse> {
    return this.delete(USERS.one(id));
  }
}
