import { Injectable, Type } from '@angular/core';
import { InjectRepository, provideNgxRepository } from '@paddls/ngx-repository';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpRepository } from '../../lib/repository/http.repository';
import { NgxHttpRepositoryModuleConfiguration } from '../../public-api';
import { expectHttpRequest, HttpRequestTestContext } from './expect-http-request.spec';
import { provideNgxHttpRepository } from '../../lib/ngx-http-repository.module';
import { forOwn } from '../../lib/utils/for-own';

export interface HttpTestContext extends HttpRequestTestContext {
  entity: Type<any>;
  repository?: Type<any>;
  providers?: any[];
  httpConfiguration?: NgxHttpRepositoryModuleConfiguration;
  request: (repository: HttpRepository<any, any>) => Promise<any>;
  expectedMethod: any;
  expectedPath: any;
  expectedQueryParams?: any;
  expectedRequestHeaders?: any;
  expectedRequestBody?: any;
  mockedResponseBody?: any;
  expectedResponse: any;
}

export function testHttpRepository(tests: {
  [key: string]: Partial<HttpTestContext>
}, rootContext: Partial<HttpTestContext> = {}): void {
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
  const providers: any[] = [];
  let service: Type<any>;

  if (!httpTestContext.repository) {
    @Injectable()
    class BookService {

      @InjectRepository({resourceType: () => httpTestContext.entity, repository: () => HttpRepository})
      public repository: HttpRepository<any, number>;

    }

    service = BookService;
    providers.push(BookService);
  } else {
    providers.push(httpTestContext.repository);
  }

  TestBed.configureTestingModule({
    providers: [
      provideNgxRepository(),
      provideNgxHttpRepository(httpTestContext.httpConfiguration || {debug: false}),
      ...(httpTestContext.providers || []),
      ...providers
    ]
  });

  const repository: HttpRepository<any, any> = httpTestContext.repository ? TestBed.inject(httpTestContext.repository) : TestBed.inject(service).repository;
  const httpClient: HttpClient = TestBed.inject(HttpClient);

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
    expectedResponse: httpTestContext.expectedResponse,
    verify: httpTestContext.verify
  };

  await expectHttpRequest({
    ...context,
    request: () => context.request(repository)
  });
}
