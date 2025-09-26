import { BaseAPI } from './api.base';
import { UsersAPI } from '../users/users.controller';
import { AuthAPI } from '../auth/auth.controller';
import { ResourcesAPI } from '../resources/resources.controller';

export class API extends BaseAPI {
  private usersInstance: UsersAPI | undefined;
  private authInstance: AuthAPI | undefined;
  private resourcesInstance: ResourcesAPI | undefined;

  get users(): UsersAPI {
    if (!this.usersInstance) this.usersInstance = new UsersAPI(this.request);
    return this.usersInstance;
  }

  get auth(): AuthAPI {
    if (!this.authInstance) this.authInstance = new AuthAPI(this.request);
    return this.authInstance;
  }

  get resources(): ResourcesAPI {
    if (!this.resourcesInstance) this.resourcesInstance = new ResourcesAPI(this.request);
    return this.resourcesInstance;
  }
}
