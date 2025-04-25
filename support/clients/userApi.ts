import {BaseApi} from './baseApi';
import {APIRequestContext} from '@playwright/test';
import {UserRequestDTO} from '../dto/api.dto';

export class UserApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createUser(data: UserRequestDTO['PostUser']) {
    return await this.request.post('/api/v3/user', {data});
  }
}
