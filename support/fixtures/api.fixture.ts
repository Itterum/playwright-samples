import {test as t} from '@playwright/test';
import {BaseApi} from '../clients/baseApi';

type ApiClients = {
	baseApi: BaseApi;
};

export const test = t.extend<ApiClients>({
	baseApi: async ({request}, use) => {
		const client = new BaseApi(request);
		await use(client);
	},
});

export {expect} from '@playwright/test';
