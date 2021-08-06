import { HttpRepository, HttpResource } from '../public-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Type } from '@angular/core';
import { Column, Id, PathParam, SubQuery } from '@witty-services/ngx-repository';
import { mockResponse } from './util/mock.response.spec';
import { DateConverter } from '@witty-services/ts-serializer';
import { initializeRepository, RepositoryContext } from './util/repository-intializer.spec';

describe('PathParam', () => {

  let bookType: Type<any>;
  let repository: HttpRepository<any, any>;
  let httpClient: HttpClient;

  beforeEach(() => {
    @HttpResource({
      path: '/books/:category'
    })
    class Book {

      @Id()
      public id: number;

      @Column()
      public name: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    const context: RepositoryContext<Book> = initializeRepository(Book);
    repository = context.repository;
    httpClient = context.httpClient;
    bookType = Book;
  });

  [
    ['findOne', (query: any) => repository.findOne(query).toPromise(), {
      method: 'GET',
      pathSuffix: '',
      body: null
    }],
    ['findAll', (query: any) => repository.findAll(query).toPromise(), {
      method: 'GET',
      pathSuffix: '',
      body: null
    }],
    ['findById', (query: any) => repository.findById(1, query).toPromise(), {
      method: 'GET',
      pathSuffix: '/1',
      body: null
    }],
    ['create', (query: any) => repository.create(new bookType(), query).toPromise(), {
      method: 'POST',
      pathSuffix: '',
      body: {}
    }],
    ['update', (query: any) => repository.update(new bookType({ id: 1 }), query).toPromise(), {
      method: 'PUT',
      pathSuffix: '/1',
      body: { id: 1 }
    }],
    ['patch', (query: any) => repository.patch(new bookType({ id: 1 }), query).toPromise(), {
      method: 'PATCH',
      pathSuffix: '/1',
      body: { id: 1 }
    }],
    ['delete', (query: any) => repository.delete(new bookType({ id: 1 }), query).toPromise(), {
      method: 'DELETE',
      pathSuffix: '/1',
      body: { id: 1 }
    }]
  ].forEach(([requestName, invokeRequest, {
    method,
    body,
    pathSuffix
  }]: [string, (query: any) => Promise<any>, any]) => {
    describe(requestName, () => {
      it(`should add simple path param`, async () => {
        class BookQuery {

          @PathParam()
          public category: string;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const category: string = 'shonen';
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          category
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, '/books/shonen' + pathSuffix, {
          params: new HttpParams(),
          headers: {},
          observe: 'response',
          body,
          responseType: 'json'
        });
      });

      it(`should add named path param`, async () => {
        class BookQuery {

          @PathParam('category')
          public categoryName: string;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const categoryName: string = 'shonen';
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          categoryName
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, '/books/shonen' + pathSuffix, {
          params: new HttpParams(),
          headers: {},
          observe: 'response',
          body,
          responseType: 'json'
        });
      });

      it(`should add custom converted path param`, async () => {
        class BookQuery {

          @PathParam({ customConverter: () => DateConverter })
          public category: Date;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const category: Date = new Date('2021-01-01T05:51:00.000+0200');
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          category
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, '/books/2021-01-01T03:51:00.000Z' + pathSuffix, {
          params: new HttpParams(),
          headers: {},
          observe: 'response',
          body,
          responseType: 'json'
        });
      });

      it(`should add custom converted http header with name`, async () => {
        class BookQuery {

          @PathParam({ customConverter: () => DateConverter, name: 'category' })
          public since: Date;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const since: Date = new Date('2021-01-01T05:51:00.000+0200');
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          since
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, '/books/2021-01-01T03:51:00.000Z' + pathSuffix, {
          params: new HttpParams(),
          headers: {},
          observe: 'response',
          body,
          responseType: 'json'
        });
      });

      it(`should add deep http header`, async () => {
        class SubBookQuery {

          @PathParam()
          public category: string;

          public constructor(data: Partial<SubBookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        class BookQuery {

          @SubQuery()
          public child: SubBookQuery;

          public constructor(data: Partial<BookQuery> = {}) {
            Object.assign(this, data);
          }
        }

        const category: string = 'shonen';
        mockResponse(httpClient);

        const response: any = await invokeRequest(new BookQuery({
          child: new SubBookQuery({
            category
          })
        }));

        expect(response).toBeNull();
        expect(httpClient.request).toHaveBeenCalledWith(method, '/books/shonen' + pathSuffix, {
          params: new HttpParams(),
          headers: {},
          observe: 'response',
          body,
          responseType: 'json'
        });
      });
    });
  });
});
