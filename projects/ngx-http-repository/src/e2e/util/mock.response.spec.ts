import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export interface RequestContext {
  name: string;
  request: (...arg: any[]) => Promise<any>;
  expectedMethod: string;
  expectedPath?: any;
  expectedRequestBody?: any;
  expectedRequestHeaders?: any;
  expectedRequestParams?: any;
  expectedResponse?: any;
  mockedResponse?: any;
}

export function mockResponse(httpClient: HttpClient, body: any = null): void {
  spyOn(httpClient, 'request').and.returnValue(of(new HttpResponse({
    body
  })));
}

export function mockResponse2(httpClient: HttpClient, context: RequestContext): void {
  spyOn(httpClient, 'request').and.returnValue(of(new HttpResponse({
    body: context.mockedResponse || null
  })));
}


export function assertRequest(httpClient: HttpClient, context: RequestContext): void {
  expect(httpClient.request).toHaveBeenCalledWith(context.expectedMethod, context.expectedPath, {
    params: context.expectedRequestParams || new HttpParams(),
    headers: context.expectedRequestHeaders || {},
    observe: 'response',
    body: context.expectedRequestBody || null,
    responseType: 'json'
  });
}
