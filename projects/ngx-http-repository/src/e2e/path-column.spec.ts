import { HttpResource } from '../public-api';
import { Id, Page, PathColumn, PathParam } from '@witty-services/ngx-repository';
import { DateConverter } from '@witty-services/ts-serializer';
import { HttpRequestContext, testHttpRepository } from './util/test-http-repository.spec';

describe('PathColumn', () => {

  describe('should add column from body to path', () => {
    @HttpResource({
      path: '/libraries/:libraryId/books'
    })
    class Book {

      @Id()
      public id: number;

      @PathColumn()
      public libraryId: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      create: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.create(body).toPromise(),
        body: new Book({ libraryId: 3 }),
        expectedMethod: 'POST',
        expectedPath: '/libraries/3/books',
        expectedRequestBody: {},
        mockedResponseBody: { id: 1 },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.update(body).toPromise(),
        body: new Book({ id: 1, libraryId: 3 }),
        expectedMethod: 'PUT',
        expectedPath: '/libraries/3/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.patch(body).toPromise(),
        body: new Book({ id: 1, libraryId: 3 }),
        expectedMethod: 'PATCH',
        expectedPath: '/libraries/3/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.delete(body).toPromise(),
        body: new Book({ id: 1, libraryId: 3 }),
        expectedMethod: 'DELETE',
        expectedPath: '/libraries/3/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      }
    });
  });

  describe('should add named path column', () => {
    @HttpResource({
      path: '/libraries/:libraryId/books'
    })
    class Book {

      @Id()
      public id: number;

      @PathColumn('libraryId')
      public LIBRARY_ID: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      create: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.create(body).toPromise(),
        body: new Book({ LIBRARY_ID: 3 }),
        expectedMethod: 'POST',
        expectedPath: '/libraries/3/books',
        expectedRequestBody: {},
        mockedResponseBody: { id: 1 },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.update(body).toPromise(),
        body: new Book({ id: 1, LIBRARY_ID: 3 }),
        expectedMethod: 'PUT',
        expectedPath: '/libraries/3/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.patch(body).toPromise(),
        body: new Book({ id: 1, LIBRARY_ID: 3 }),
        expectedMethod: 'PATCH',
        expectedPath: '/libraries/3/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.delete(body).toPromise(),
        body: new Book({ id: 1, LIBRARY_ID: 3 }),
        expectedMethod: 'DELETE',
        expectedPath: '/libraries/3/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted path column', () => {
    @HttpResource({
      path: '/libraries/:libraryId/books'
    })
    class Book {

      @Id()
      public id: number;

      @PathColumn({ customConverter: () => DateConverter })
      public libraryId: Date;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    const date: Date = new Date('2021-01-01T05:51:00.000+0200');

    testHttpRepository({
      create: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.create(body).toPromise(),
        body: new Book({ libraryId: date }),
        expectedMethod: 'POST',
        expectedPath: '/libraries/2021-01-01T03:51:00.000Z/books',
        expectedRequestBody: {},
        mockedResponseBody: { id: 1 },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.update(body).toPromise(),
        body: new Book({ id: 1, libraryId: date }),
        expectedMethod: 'PUT',
        expectedPath: '/libraries/2021-01-01T03:51:00.000Z/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.patch(body).toPromise(),
        body: new Book({ id: 1, libraryId: date }),
        expectedMethod: 'PATCH',
        expectedPath: '/libraries/2021-01-01T03:51:00.000Z/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.delete(body).toPromise(),
        body: new Book({ id: 1, libraryId: date }),
        expectedMethod: 'DELETE',
        expectedPath: '/libraries/2021-01-01T03:51:00.000Z/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted path column with name', () => {
    @HttpResource({
      path: '/libraries/:libraryId/books'
    })
    class Book {

      @Id()
      public id: number;

      @PathColumn({ customConverter: () => DateConverter, name: 'libraryId' })
      public LIBRARY_ID: Date;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    const date: Date = new Date('2021-01-01T05:51:00.000+0200');

    testHttpRepository({
      create: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.create(body).toPromise(),
        body: new Book({ LIBRARY_ID: date }),
        expectedMethod: 'POST',
        expectedPath: '/libraries/2021-01-01T03:51:00.000Z/books',
        expectedRequestBody: {},
        mockedResponseBody: { id: 1 },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.update(body).toPromise(),
        body: new Book({ id: 1, LIBRARY_ID: date }),
        expectedMethod: 'PUT',
        expectedPath: '/libraries/2021-01-01T03:51:00.000Z/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.patch(body).toPromise(),
        body: new Book({ id: 1, LIBRARY_ID: date }),
        expectedMethod: 'PATCH',
        expectedPath: '/libraries/2021-01-01T03:51:00.000Z/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.delete(body).toPromise(),
        body: new Book({ id: 1, LIBRARY_ID: date }),
        expectedMethod: 'DELETE',
        expectedPath: '/libraries/2021-01-01T03:51:00.000Z/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0
      }
    });
  });

  describe('should add value to column from path', () => {
    @HttpResource({
      path: '/libraries/:libraryId/books'
    })
    class Book {

      @Id()
      public id: number;

      @PathColumn()
      public libraryId: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    class BookQuery {

      @PathParam()
      public libraryId: number;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findOne(query).toPromise(),
        query: new BookQuery({ libraryId: 3 }),
        expectedMethod: 'GET',
        expectedPath: '/libraries/3/books',
        expectedResponse: new Book({
          id: 1,
          libraryId: 3
        }),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findAll: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findAll(query).toPromise(),
        query: new BookQuery({ libraryId: 3 }),
        expectedMethod: 'GET',
        expectedPath: '/libraries/3/books',
        expectedResponse: Page.build([
          new Book({
            id: 1,
            libraryId: 3
          }), new Book({
            id: 2,
            libraryId: 3
          })
        ]),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findById(1, query).toPromise(),
        query: new BookQuery({ libraryId: 3 }),
        expectedMethod: 'GET',
        expectedPath: '/libraries/3/books/1',
        expectedResponse: new Book({
          id: 1,
          libraryId: 3
        }),
        mockedResponseBody: { id: 1 }
      }
    });
  });
});
