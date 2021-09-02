import { HttpQueryParam, HttpRepository, HttpResource } from '../public-api';
import { testHttpRepository } from './util/test-http-repository.spec';
import { Column, DateConverter, Id, Page, SubQuery } from '@witty-services/ngx-repository';
import { buildHttpParams } from './util/build-http.params.spec';

describe('HttpQueryParam', () => {
  @HttpResource({
    path: '/books'
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

  describe('should add simple http query param', () => {
    const name: string = 'The Hobbit';

    class BookQuery {

      @HttpQueryParam()
      public name: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ name })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ name })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ name })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({
          name
        }), new BookQuery({ name })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name },
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ name })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ name })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ name })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

  describe('should add formatted http query params', () => {
    const name: string = 'Lord of the Ring 3';

    class BookQuery {

      @HttpQueryParam({ format: '[:value]' })
      public name: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ name })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', `[${ name }]`),
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ name })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', `[${ name }]`),
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ name })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', `[${ name }]`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({
          name
        }), new BookQuery({ name })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name },
        expectedQueryParams: buildHttpParams('name', `[${ name }]`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ name })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', `[${ name }]`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ name })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', `[${ name }]`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ name })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', `[${ name }]`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted http query param', () => {
    const name: string = 'Lord of the Ring 3';
    const since: Date = new Date('2021-01-01T05:51:00.000+0200');


    class BookQuery {

      @HttpQueryParam({ customConverter: () => DateConverter })
      public since: Date;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ since })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('since', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ since })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('since', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ since })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('since', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name }), new BookQuery({ since })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name },
        expectedQueryParams: buildHttpParams('since', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ since })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('since', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ since })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('since', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ since })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('since', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted http query param with name', () => {
    const name: string = 'Lord of the Ring 3';
    const since: Date = new Date('2021-01-01T05:51:00.000+0200');


    class BookQuery {

      @HttpQueryParam({ customConverter: () => DateConverter, name: 'SINCE' })
      public since: Date;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ since })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('SINCE', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ since })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('SINCE', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ since })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('SINCE', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({
          name
        }), new BookQuery({ since })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name },
        expectedQueryParams: buildHttpParams('SINCE', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ since })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('SINCE', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ since })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('SINCE', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ since })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('SINCE', `2021-01-01T03:51:00.000Z`),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

  describe('should add deep http query param', () => {
    const name: string = 'Lord of the Ring 3';

    class SubBookQuery {

      @HttpQueryParam()
      public name: string;

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

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({
          child: new SubBookQuery({
            name
          })
        })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({
          child: new SubBookQuery({
            name
          })
        })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({
          child: new SubBookQuery({
            name
          })
        })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({
          name
        }), new BookQuery({
          child: new SubBookQuery({
            name
          })
        })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name },
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({
          child: new SubBookQuery({
            name
          })
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({
          child: new SubBookQuery({
            name
          })
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({
          child: new SubBookQuery({
            name
          })
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name },
        expectedQueryParams: buildHttpParams('name', name),
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

});
