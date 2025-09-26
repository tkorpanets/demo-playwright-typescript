import type { APIResponse } from '@playwright/test';
import { BaseAPI } from '../base/api.base';
import { AUTH } from './auth.endpoints';

export class AuthAPI extends BaseAPI {
  login(body: { email: string; password: string }): Promise<APIResponse> {
    return this.post(AUTH.login, body);
  }

  register(body: { email: string; password: string }): Promise<APIResponse> {
    return this.post(AUTH.register, body);
  }

  registerWithoutPassword(email: string): Promise<APIResponse> {
    return this.post(AUTH.register, { email });
  }
}
