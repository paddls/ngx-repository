import { Injectable, Type } from '@angular/core';
import { InjectRepository, NgxRepositoryModule } from '@witty-services/ngx-repository';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpRepository } from '../../lib/repository/http.repository';
import { NgxHttpRepositoryModule } from '../../public-api';
import { forOwn } from 'lodash';
import { expectHttpRequest, HttpRequestTestContext } from './expect-http-request.spec';

export interface HttpTestContext extends HttpRequestTestContext {
  entity: Type<any>;
  providers?: any[];
  request: (repository: HttpRepository<any, any>) => Promise<any>;
  expectedMethod: any;
  expectedPath: any;
  expectedQueryParams?: any;
  expectedRequestHeaders?: any;
  expectedRequestBody?: any;
  mockedResponseBody?: any;
  expectedResponse: any;
}

export function testHttpRepository(tests: { [key: string]: Partial<HttpTestContext> }, rootContext: Partial<HttpTestContext> = {}): void {
  forOwn(tests, (context: HttpTestContext, name: string) => {
    itShouldTestHttpRepository(name, Object.assign({}, rootContext, context));
  });
}

export function itShouldTestHttpRepository(name: string, context: HttpTestContext): void {
  it(name, async () => {
    await httpTest(context);
  });
}

export async function httpTest(httpTestContext: HttpTestContext): Promise<void> {
  @Injectable()
  class BookService {

    @InjectRepository({ resourceType: () => httpTestContext.entity, repository: () => HttpRepository })
    public repository: HttpRepository<any, number>;

  }

  TestBed.configureTestingModule({
    imports: [
      NgxRepositoryModule.forRoot(),
      NgxHttpRepositoryModule.forRoot()
    ],
    providers: [
      BookService,
      ...(httpTestContext.providers || [])
    ]
  });

  const repository: HttpRepository<any, any> = TestBed.get(BookService).repository;
  const httpClient: HttpClient = TestBed.get(HttpClient);

  const context: HttpTestContext = {
    httpClient,
    entity: httpTestContext.entity,
    request: httpTestContext.request,
    providers: httpTestContext.providers || [],
    expectedMethod: httpTestContext.expectedMethod,
    expectedPath: httpTestContext.expectedPath,
    expectedQueryParams: httpTestContext.expectedQueryParams || new HttpParams(),
    expectedRequestHeaders: httpTestContext.expectedRequestHeaders || {},
    expectedRequestBody: httpTestContext.expectedRequestBody || null,
    mockedResponseBody: httpTestContext.mockedResponseBody || null,
    expectedResponse: httpTestContext.expectedResponse
  };

  await expectHttpRequest({
    ...context,
    request: () => context.request(repository)
  });
}
