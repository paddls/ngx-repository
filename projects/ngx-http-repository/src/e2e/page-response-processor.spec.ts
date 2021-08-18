import { HttpRepository, HttpResource } from '../public-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Id, Page, RepositoryResponse, RequestManagerContext, ResponseProcessor } from '@witty-services/ngx-repository';
import { mockResponse } from './util/mock.response.spec';
import { initializeRepository, RepositoryContext } from './util/repository-intializer.spec';

describe('Page', () => {

  let bookType: Type<any>;
  let repository: HttpRepository<any, any>;
  let httpClient: HttpClient;

  it(`should return page containing all elements`, async () => {
    // TODO @RMA use utils
    @HttpResource({
      path: '/books'
    })
    class Book {

      @Id()
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    const context: RepositoryContext<Book> = initializeRepository(Book);
    repository = context.repository;
    httpClient = context.httpClient;
    bookType = Book;

    mockResponse(httpClient, [
      { id: 1 },
      { id: 2 }
    ]);

    const response: Page = await repository.findAll().toPromise();

    expect(response.currentPage).toBe(0);
    expect(response.itemsPerPage).toBe(2);
    expect(response.totalItems).toBe(2);
    expect(response).toEqual(Page.build([new bookType({ id: 1 }), new bookType({ id: 2 })]));
    expect(httpClient.request).toHaveBeenCalledWith('GET', '/books', {
      params: new HttpParams(),
      headers: {},
      observe: 'response',
      body: null,
      responseType: 'json'
    });
  });

  it(`should override default page response processor`, async () => {
    class MyPage {
      public constructor(public readonly values: any[]) {
      }
    }

    @Injectable()
    class MyPageResponseProcessor implements ResponseProcessor {
      public transform(body: any, origin: RepositoryResponse, ctx: RequestManagerContext): any {
        return new MyPage(body);
      }
    }

    @HttpResource({
      path: '/books',
      findAll: {
        pageResponseProcessor: MyPageResponseProcessor
      }
    })
    class Book {

      @Id()
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    const context: RepositoryContext<Book> = initializeRepository(Book, [MyPageResponseProcessor]);
    repository = context.repository;
    httpClient = context.httpClient;
    bookType = Book;

    mockResponse(httpClient, [
      { id: 1 },
      { id: 2 }
    ]);

    const response: MyPage = await repository.findAll<MyPage>().toPromise();

    expect(response).toEqual(new MyPage([
      new bookType({ id: 1 }),
      new bookType({ id: 2 })
    ]));
    expect(httpClient.request).toHaveBeenCalledWith('GET', '/books', {
      params: new HttpParams(),
      headers: {},
      observe: 'response',
      body: null,
      responseType: 'json'
    });
  });
});
