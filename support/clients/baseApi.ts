import {APIRequestContext} from '@playwright/test';

export class BaseApi {
	request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}
}