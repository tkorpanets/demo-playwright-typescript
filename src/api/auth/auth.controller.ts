import type { APIResponse } from '@playwright/test';
import { BaseAPI } from '../base/api.base';
import { AUTH } from './auth.endpoints';

export type AuthRequest = {
  email: string;
  password: string;
};

export class AuthAPI extends BaseAPI {
  login(body: AuthRequest): Promise<APIResponse> {
    return this.post(AUTH.login, body);
  }

  loginWithoutPassword(email: string): Promise<APIResponse> {
    return this.post(AUTH.login, { email });
  }

  register(body: AuthRequest): Promise<APIResponse> {
    return this.post(AUTH.register, body);
  }

  registerWithoutPassword(email: string): Promise<APIResponse> {
    return this.post(AUTH.register, { email });
  }
}
