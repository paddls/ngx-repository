import { TestBed } from '@angular/core/testing';
import { Column, Id, NgxRepositoryService, Page, PageResponseProcessor, PathColumn, PathParam, provideNgxRepository } from '@paddls/ngx-repository';
import { provideNgxHttpRepository } from '../lib/ngx-http-repository.module';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expectHttpRequest, HttpRequestTestContext } from './util/expect-http-request.spec';
import { buildHttpParams } from './util/build-http.params.spec';
import { forOwn } from '../lib/utils/for-own';
import { httpGet } from '../lib/function/http-get';
import { httpPost } from '../lib/function/http-post';
import { httpPut } from '../lib/function/http-put';
import { httpPatch } from '../lib/function/http-patch';
import { httpDelete } from '../lib/function/http-delete';
import { HttpQueryParam } from '../lib/decorator/http-query-param.decorator';
import { HttpHeader } from '../lib/decorator/http-header.decorator';
import { HttpBodyFn, HttpQueryFn } from '../lib/configuration/context/http-request-params-context.configuration';
import { httpOption } from '../lib/function/http-option';

describe('HttpRequestDecorator', () => {

  class ApiResponse {

    @Id()
    public id: number;

    @Column()
    public column: string;

    @PathColumn()
    public version: string;

    public constructor(data: Partial<ApiResponse> = {}) {
      Object.assign(this, data);
    }
  }

  class ApiRequest {

    @Id()
    public identifier: number;

    @Column()
    public name: string;

    public constructor(data: Partial<ApiRequest> = {}) {
      Object.assign(this, data);
    }
  }

  class ApiQuery {

    @PathParam()
    public version: string;

    @HttpQueryParam()
    public name: string;

    @HttpHeader()
    public size: number;

    public constructor(data: Partial<ApiQuery> = {}) {
      Object.assign(this, data);
    }
  }

  @Injectable()
  class Api {

    public get: HttpQueryFn<ApiResponse> = httpGet<ApiResponse>('/api', () => ApiResponse);

    public getWithBody: HttpBodyFn<ApiResponse> = httpGet({
      path: '/api',
      withBody: true
    }, () => ApiResponse);

    public getWithResponseProcessor: HttpQueryFn<Page<ApiResponse>> = httpGet({
      path: '/api',
      postResponseProcessors: PageResponseProcessor
    }, () => ApiResponse);

    public getWithPathParam: HttpQueryFn<ApiResponse> = httpGet('/api/:version', () => ApiResponse);

    public post: HttpBodyFn<ApiResponse, ApiRequest> = httpPost('/api', () => ApiResponse);

    public postWithResponseProcessor: HttpBodyFn<Page<ApiResponse>> = httpPost({
      path: '/api',
      postResponseProcessors: [PageResponseProcessor]
    }, () => ApiResponse);

    public postWithoutBody: HttpQueryFn<Page<ApiResponse>> = httpPost({
      path: '/api',
      withBody: false
    }, () => ApiResponse);

    public postWithPathParam: HttpBodyFn<ApiResponse> = httpPost('/api/:version', () => ApiResponse);

    public put: HttpBodyFn<ApiResponse, ApiRequest> = httpPut('/api', () => ApiResponse);

    public putWithPathParam: HttpBodyFn<ApiResponse, ApiRequest> = httpPut('/api/:version', () => ApiResponse);

    public putWithoutBody: HttpQueryFn<ApiResponse, ApiRequest> = httpPut({
      path: '/api',
      withBody: false
    }, () => ApiResponse);

    public putWithResponseProcessor: HttpBodyFn<ApiResponse, ApiRequest> = httpPut({
      path: '/api',
      postResponseProcessors: [PageResponseProcessor]
    }, () => ApiResponse);

    public patch: HttpBodyFn<ApiResponse, ApiRequest> = httpPatch('/api', () => ApiResponse);

    public patchWithPathParam: HttpBodyFn<ApiResponse, ApiRequest> = httpPatch('/api/:version', () => ApiResponse);

    public patchWithoutBody: HttpQueryFn<ApiResponse, ApiRequest> = httpPatch({
      path: '/api',
      withBody: false
    }, () => ApiResponse);

    public patchWithResponseProcessor: HttpBodyFn<ApiResponse, ApiRequest> = httpPatch({
      path: '/api',
      postResponseProcessors: [PageResponseProcessor]
    }, () => ApiResponse);

    public delete: HttpBodyFn<ApiResponse, ApiRequest> = httpDelete('/api', () => ApiResponse);

    public deleteWithPathParam: HttpBodyFn<ApiResponse, ApiRequest> = httpDelete('/api/:version', () => ApiResponse);

    public deleteWithoutBody: HttpQueryFn<ApiResponse, ApiRequest> = httpDelete({
      path: '/api',
      withBody: false
    }, () => ApiResponse);

    public deleteWithResponseProcessor: HttpBodyFn<ApiResponse, ApiRequest> = httpDelete({
      path: '/api',
      postResponseProcessors: [PageResponseProcessor]
    }, () => ApiResponse);

    public option: HttpQueryFn<ApiResponse> = httpOption('/api', () => ApiResponse);

    public optionWithPathParam: HttpQueryFn<ApiResponse> = httpOption('/api/:version', () => ApiResponse);

    public optionWithBody: HttpBodyFn<ApiResponse> = httpOption({
      path: '/api',
      withBody: true
    }, () => ApiResponse);

    public optionWithResponseProcessor: HttpQueryFn<ApiResponse> = httpOption({
      path: '/api',
      postResponseProcessors: [PageResponseProcessor]
    }, () => ApiResponse);

  }

  let httpClient: HttpClient;
  let api: Api;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNgxRepository(),
        provideNgxHttpRepository(),
        Api
      ]
    });

    TestBed.inject(NgxRepositoryService);

    httpClient = TestBed.inject(HttpClient);
    api = TestBed.inject(Api);
  });

  describe('should send custom request', () => {
    const tests: { [key: string]: Partial<HttpRequestTestContext> } = {
      HttpGet: {
        request: () => api.get().toPromise(),
        expectedMethod: 'GET'
      },
      HttpPost: {
        request: () => api.post(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'POST',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPut: {
        request: () => api.put(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'PUT',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPatch: {
        request: () => api.patch(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'PATCH',
        expectedRequestBody: { name: 'theName' }
      },
      HttpDelete: {
        request: () => api.delete(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'DELETE',
        expectedRequestBody: { name: 'theName' }
      },
      HttpOption: {
        request: () => api.option().toPromise(),
        expectedMethod: 'OPTION'
      }
    };

    forOwn(tests, (test: HttpRequestTestContext, key: string) => {
      it(key, async () => {
        const defaultConfiguration: Partial<HttpRequestTestContext> = {
          httpClient,
          expectedPath: '/api',
          mockedResponseBody: { column: 'theValue' },
          expectedResponse: new ApiResponse({ column: 'theValue' })
        };

        await expectHttpRequest({
          ...defaultConfiguration,
          ...test
        });
      });
    });
  });

  describe('should send custom request with body', () => {
    const tests: { [key: string]: Partial<HttpRequestTestContext> } = {
      HttpGet: {
        request: () => api.getWithBody(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'GET'
      },
      HttpOption: {
        request: () => api.optionWithBody(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'OPTION'
      }
    };

    forOwn(tests, (test: HttpRequestTestContext, key: string) => {
      it(key, async () => {
        const defaultConfiguration: Partial<HttpRequestTestContext> = {
          httpClient,
          expectedPath: '/api',
          expectedRequestBody: { name: 'theName' },
          mockedResponseBody: { column: 'theValue' },
          expectedResponse: new ApiResponse({ column: 'theValue' })
        };

        await expectHttpRequest({
          ...defaultConfiguration,
          ...test
        });
      });
    });
  });

  describe('should send custom request without body', () => {
    const tests: { [key: string]: Partial<HttpRequestTestContext> } = {
      HttpPost: {
        request: () => api.postWithoutBody().toPromise(),
        expectedMethod: 'POST'
      },
      HttpPut: {
        request: () => api.putWithoutBody().toPromise(),
        expectedMethod: 'PUT'
      },
      HttpPatch: {
        request: () => api.patchWithoutBody().toPromise(),
        expectedMethod: 'PATCH'
      },
      HttpDelete: {
        request: () => api.deleteWithoutBody().toPromise(),
        expectedMethod: 'DELETE'
      }
    };

    forOwn(tests, (test: HttpRequestTestContext, key: string) => {
      it(key, async () => {
        const defaultConfiguration: Partial<HttpRequestTestContext> = {
          httpClient,
          expectedPath: '/api',
          mockedResponseBody: { column: 'theValue' },
          expectedResponse: new ApiResponse({ column: 'theValue' })
        };

        await expectHttpRequest({
          ...defaultConfiguration,
          ...test
        });
      });
    });
  });

  describe('should receive array body', () => {
    const tests: { [key: string]: Partial<HttpRequestTestContext> } = {
      HttpGet: {
        request: () => api.get().toPromise(),
        expectedMethod: 'GET'
      },
      HttpPost: {
        request: () => api.post(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'POST',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPut: {
        request: () => api.put(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'PUT',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPatch: {
        request: () => api.patch(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'PATCH',
        expectedRequestBody: { name: 'theName' }
      },
      HttpDelete: {
        request: () => api.delete(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'DELETE',
        expectedRequestBody: { name: 'theName' }
      },
      HttpOption: {
        request: () => api.option().toPromise(),
        expectedMethod: 'OPTION'
      }
    };

    forOwn(tests, (test: HttpRequestTestContext, key: string) => {
      it(key, async () => {
        const defaultConfiguration: Partial<HttpRequestTestContext> = {
          httpClient,
          expectedPath: '/api',
          mockedResponseBody: [{ column: 'theValue' }],
          expectedResponse: [new ApiResponse({ column: 'theValue' })]
        };

        await expectHttpRequest({
          ...defaultConfiguration,
          ...test
        });
      });
    });
  });

  describe('should define response processor', () => {
    const tests: { [key: string]: Partial<HttpRequestTestContext> } = {
      HttpGet: {
        request: () => api.getWithResponseProcessor().toPromise(),
        expectedMethod: 'GET'
      },
      HttpPost: {
        request: () => api.postWithResponseProcessor(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'POST',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPut: {
        request: () => api.putWithResponseProcessor(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'PUT',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPatch: {
        request: () => api.patchWithResponseProcessor(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'PATCH',
        expectedRequestBody: { name: 'theName' }
      },
      HttpDelete: {
        request: () => api.deleteWithResponseProcessor(new ApiRequest({ name: 'theName' })).toPromise(),
        expectedMethod: 'DELETE',
        expectedRequestBody: { name: 'theName' }
      },
      HttpOption: {
        request: () => api.optionWithResponseProcessor().toPromise(),
        expectedMethod: 'OPTION'
      }
    };

    forOwn(tests, (test: HttpRequestTestContext, key: string) => {
      it(key, async () => {
        const defaultConfiguration: Partial<HttpRequestTestContext> = {
          httpClient,
          expectedPath: '/api',
          mockedResponseBody: [{ column: 'theValue' }],
          expectedResponse: Page.build([new ApiResponse({ column: 'theValue' })])
        };

        await expectHttpRequest({
          ...defaultConfiguration,
          ...test
        });
      });
    });
  });

  describe('should send custom request with path param & column', () => {
    const tests: { [key: string]: Partial<HttpRequestTestContext> } = {
      HttpGet: {
        request: () => api.getWithPathParam(new ApiQuery({ version: 'v1' })).toPromise(),
        expectedMethod: 'GET'
      },
      HttpPost: {
        request: () => api.postWithPathParam(new ApiRequest({ name: 'theName' }), new ApiQuery({ version: 'v1' })).toPromise(),
        expectedMethod: 'POST',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPut: {
        request: () => api.putWithPathParam(new ApiRequest({ name: 'theName' }), new ApiQuery({ version: 'v1' })).toPromise(),
        expectedMethod: 'PUT',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPatch: {
        request: () => api.patchWithPathParam(new ApiRequest({ name: 'theName' }), new ApiQuery({ version: 'v1' })).toPromise(),
        expectedMethod: 'PATCH',
        expectedRequestBody: { name: 'theName' }
      },
      HttpDelete: {
        request: () => api.deleteWithPathParam(new ApiRequest({ name: 'theName' }), new ApiQuery({ version: 'v1' })).toPromise(),
        expectedMethod: 'DELETE',
        expectedRequestBody: { name: 'theName' }
      },
      HttpOption: {
        request: () => api.optionWithPathParam(new ApiQuery({ version: 'v1' })).toPromise(),
        expectedMethod: 'OPTION'
      }
    };

    forOwn(tests, (test: HttpRequestTestContext, key: string) => {
      it(key, async () => {
        const defaultConfiguration: Partial<HttpRequestTestContext> = {
          httpClient,
          expectedPath: '/api/v1',
          mockedResponseBody: { column: 'theValue' },
          expectedResponse: new ApiResponse({ column: 'theValue', version: 'v1' })
        };

        await expectHttpRequest({
          ...defaultConfiguration,
          ...test
        });
      });
    });
  });

  describe('should send custom request with query param', () => {
    const tests: { [key: string]: Partial<HttpRequestTestContext> } = {
      HttpGet: {
        request: () => api.get(new ApiQuery({ name: 'theRequestedName' })).toPromise(),
        expectedMethod: 'GET'
      },
      HttpPost: {
        request: () => api.post(new ApiRequest({ name: 'theName' }), new ApiQuery({ name: 'theRequestedName' })).toPromise(),
        expectedMethod: 'POST',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPut: {
        request: () => api.put(new ApiRequest({ name: 'theName' }), new ApiQuery({ name: 'theRequestedName' })).toPromise(),
        expectedMethod: 'PUT',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPatch: {
        request: () => api.patch(new ApiRequest({ name: 'theName' }), new ApiQuery({ name: 'theRequestedName' })).toPromise(),
        expectedMethod: 'PATCH',
        expectedRequestBody: { name: 'theName' }
      },
      HttpDelete: {
        request: () => api.delete(new ApiRequest({ name: 'theName' }), new ApiQuery({ name: 'theRequestedName' })).toPromise(),
        expectedMethod: 'DELETE',
        expectedRequestBody: { name: 'theName' }
      },
      HttpOption: {
        request: () => api.option(new ApiQuery({ name: 'theRequestedName' })).toPromise(),
        expectedMethod: 'OPTION'
      }
    };

    forOwn(tests, (test: HttpRequestTestContext, key: string) => {
      it(key, async () => {
        const defaultConfiguration: Partial<HttpRequestTestContext> = {
          httpClient,
          expectedPath: '/api',
          mockedResponseBody: { column: 'theValue' },
          expectedQueryParams: buildHttpParams('name', 'theRequestedName'),
          expectedResponse: new ApiResponse({ column: 'theValue' })
        };

        await expectHttpRequest({
          ...defaultConfiguration,
          ...test
        });
      });
    });
  });

  describe('should send custom request with headers', () => {
    const tests: { [key: string]: Partial<HttpRequestTestContext> } = {
      HttpGet: {
        request: () => api.get(new ApiQuery({ size: 3 })).toPromise(),
        expectedMethod: 'GET'
      },
      HttpPost: {
        request: () => api.post(new ApiRequest({ name: 'theName' }), new ApiQuery({ size: 3 })).toPromise(),
        expectedMethod: 'POST',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPut: {
        request: () => api.put(new ApiRequest({ name: 'theName' }), new ApiQuery({ size: 3 })).toPromise(),
        expectedMethod: 'PUT',
        expectedRequestBody: { name: 'theName' }
      },
      HttpPatch: {
        request: () => api.patch(new ApiRequest({ name: 'theName' }), new ApiQuery({ size: 3 })).toPromise(),
        expectedMethod: 'PATCH',
        expectedRequestBody: { name: 'theName' }
      },
      HttpDelete: {
        request: () => api.delete(new ApiRequest({ name: 'theName' }), new ApiQuery({ size: 3 })).toPromise(),
        expectedMethod: 'DELETE',
        expectedRequestBody: { name: 'theName' }
      },
      HttpOption: {
        request: () => api.option(new ApiQuery({ size: 3 })).toPromise(),
        expectedMethod: 'OPTION'
      }
    };

    forOwn(tests, (test: HttpRequestTestContext, key: string) => {
      it(key, async () => {
        const defaultConfiguration: Partial<HttpRequestTestContext> = {
          httpClient,
          expectedPath: '/api',
          mockedResponseBody: { column: 'theValue' },
          expectedRequestHeaders: { size: '3' },
          expectedResponse: new ApiResponse({ column: 'theValue' })
        };

        await expectHttpRequest({
          ...defaultConfiguration,
          ...test
        });
      });
    });
  });
});
