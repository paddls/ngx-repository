import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export interface HttpRequestTestContext {
  request: (context?: any) => Promise<any>;
  httpClient: HttpClient;
  expectedMethod: any;
  expectedPath: any;
  expectedQueryParams?: any;
  expectedRequestHeaders?: any;
  expectedRequestBody?: any;
  mockedResponseBody?: any;
  mockedResponseHeader?: { [name: string]: string };
  expectedResponse: any;
  verify: (params: any) => Promise<void>;
}

export async function expectHttpRequest(httpTestContext: HttpRequestTestContext): Promise<void> {
  const context: HttpRequestTestContext = {
    request: httpTestContext.request,
    httpClient: httpTestContext.httpClient,
    expectedMethod: httpTestContext.expectedMethod,
    expectedPath: httpTestContext.expectedPath,
    expectedResponse: httpTestContext.expectedResponse,
    expectedQueryParams: httpTestContext.expectedQueryParams || new HttpParams(),
    expectedRequestHeaders: httpTestContext.expectedRequestHeaders || {},
    expectedRequestBody: httpTestContext.expectedRequestBody || null,
    mockedResponseBody: httpTestContext.mockedResponseBody || null,
    mockedResponseHeader: httpTestContext.mockedResponseHeader || null,
    verify: httpTestContext.verify || null
  };

  const httpClient: HttpClient = context.httpClient;

  const mockedResponseBody: any = context.mockedResponseBody;
  let invokedParams: any;

  spyOn(httpClient, 'request').and.callFake((...params: any) => {
    invokedParams = params;

    return of(new HttpResponse({
      body: mockedResponseBody,
      headers: new HttpHeaders(context.mockedResponseHeader)
    })) as any;
  });

  const response: any = await context.request();

  expect(response).withContext('response not match').toEqual(context.expectedResponse);
  if (context.verify) {
    await context.verify(invokedParams);
  }

  const expectedMethod: any = context.expectedMethod;
  const expectedPath: any = context.expectedPath;
  const expectedQueryParams: any = context.expectedQueryParams;
  const expectedHeaders: any = context.expectedRequestHeaders;
  const expectedRequestBody: any = context.expectedRequestBody;

  expect(httpClient.request).toHaveBeenCalledWith(expectedMethod, expectedPath, {
    params: expectedQueryParams,
    headers: expectedHeaders,
    observe: 'response',
    body: expectedRequestBody,
    responseType: 'json'
  });
}
