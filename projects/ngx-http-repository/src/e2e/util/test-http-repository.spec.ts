import { Injectable, Type } from '@angular/core';
import { InjectRepository, NgxRepositoryModule } from '@witty-services/ngx-repository';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpRepository } from '../../lib/repository/http.repository';
import { NgxHttpRepositoryModule } from '../../public-api';

export interface HttpRequestContext {
  repository: HttpRepository<any, any>;
  query: any;
  body: any;
}


export interface HttpTestContext {
  entity: Type<any>;
  request: (context: HttpRequestContext) => Promise<any>;
  body?: any;
  query?: any;
  expectedMethod: any;
  expectedPath: any;
  expectedQueryParams?: any;
  expectedRequestHeaders?: any;
  expectedRequestBody?: any;
  mockedResponseBody?: any;
  expectedResponse?: any;
}

export function itShouldTestHttpRepository(name: string, context: HttpTestContext): void {
  it(name, async () => {
    await httpTest(context);
  });
}

export async function httpTest(httpTestContext: HttpTestContext): Promise<void> {
  const context: HttpTestContext = {
    entity: httpTestContext.entity,
    request: httpTestContext.request,
    body: httpTestContext.body || null,
    query: httpTestContext.query || null,
    expectedMethod: httpTestContext.expectedMethod,
    expectedPath: httpTestContext.expectedPath,
    expectedQueryParams: httpTestContext.expectedQueryParams || new HttpParams(),
    expectedRequestHeaders: httpTestContext.expectedRequestHeaders || {},
    expectedRequestBody: httpTestContext.expectedRequestBody || null,
    mockedResponseBody: httpTestContext.mockedResponseBody || null,
    expectedResponse: httpTestContext.expectedResponse || null
  };

  @Injectable()
  class BookService {

    @InjectRepository({ resourceType: () => context.entity, repository: () => HttpRepository })
    public repository: HttpRepository<any, number>;

  }

  TestBed.configureTestingModule({
    imports: [
      NgxRepositoryModule.forRoot(),
      NgxHttpRepositoryModule.forRoot()
    ],
    providers: [
      BookService
    ]
  });

  const repository: HttpRepository<any, any> = TestBed.get(BookService).repository;
  const httpClient: HttpClient = TestBed.get(HttpClient);

  const query: any = context.query;
  const body: any = context.body;

  const mockedResponseBody: any = context.mockedResponseBody;

  spyOn(httpClient, 'request').and.returnValue(of(new HttpResponse({
    body: mockedResponseBody
  })));

  const response: any = await context.request({ repository, query, body });

  const expectedResponse: any = context.expectedResponse;

  expect(response).toEqual(expectedResponse);

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
