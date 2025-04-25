import {test as t} from '@playwright/test';
import {BaseApi} from '../clients/baseApi';
import {UserApi} from '../clients/userApi';
import type {paths} from '../types/api';
import createClient from 'openapi-fetch';

const baseGenApi = createClient<paths>({baseUrl: 'https://petstore3.swagger.io/'});

type ApiClients = {
  baseApi: BaseApi;
  userApi: UserApi;
  // baseGenApi: baseGenApi;
};

export const test = t.extend<ApiClients>({
  baseApi: async ({request}, use) => {
    const client = new BaseApi(request);
    await use(client);
  },
  userApi: async ({request}, use) => {
    const client = new UserApi(request);
    await use(client);
  },
});

export {expect} from '@playwright/test';
