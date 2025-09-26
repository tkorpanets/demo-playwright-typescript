import type { APIResponse } from '@playwright/test';
import { BaseAPI } from '../base/api.base';
import { RESOURCES } from './resources.endpoints';

export class ResourcesAPI extends BaseAPI {
  list(): Promise<APIResponse> {
    return this.get(RESOURCES.list);
  }

  getOne(id: number): Promise<APIResponse> {
    return this.get(RESOURCES.one(id));
  }

  delayedUsers(delaySec = 3): Promise<APIResponse> {
    return this.get(RESOURCES.delayed(delaySec));
  }
}
