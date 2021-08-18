import { HttpHeader, HttpResource } from '../public-api';
import { Column, Id, Page, SubQuery } from '@witty-services/ngx-repository';
import { Converter } from '@witty-services/ts-serializer';
import { HttpRequestContext, testHttpRepository } from './util/test-http-repository.spec';

describe('HttpHeader', () => {

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

  describe('should add simple http header', () => {
    const name: string = 'Naruto';
    const category: string = 'shonen';

    class BookQuery {

      @HttpHeader()
      public category: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findOne(query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category
        },
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findAll(query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category
        },
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findById(1, query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category
        },
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.create(body, query).toPromise(),
        query: new BookQuery({ category }),
        body: new Book({ name }),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestHeaders: {
          category
        },
        expectedRequestBody: { name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.update(body, query).toPromise(),
        query: new BookQuery({ category }),
        body: new Book({ id: 1, name }),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.patch(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ category }),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.delete(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ category }),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

  describe('should add formatted http header', () => {
    const name: string = 'Naruto';
    const category: string = 'shonen';

    class BookQuery {

      @HttpHeader({ format: '[:value]' })
      public category: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findOne(query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: `[${ category }]`
        },
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findAll(query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: `[${ category }]`
        },
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findById(1, query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: `[${ category }]`
        },
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.create(body, query).toPromise(),
        query: new BookQuery({ category }),
        body: new Book({ name }),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestHeaders: {
          category: `[${ category }]`
        },
        expectedRequestBody: { name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.update(body, query).toPromise(),
        query: new BookQuery({ category }),
        body: new Book({ id: 1, name }),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: `[${ category }]`
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.patch(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ category }),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: `[${ category }]`
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.delete(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ category }),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: `[${ category }]`
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted http header', () => {
    const name: string = 'Naruto';
    const category: string = 'shonen';

    class UppercaseConverter implements Converter<string, string> {
      public fromJson(value: string): string {
        return value ? value.toLowerCase() : value;
      }

      public toJson(value: string): string {
        return value ? value.toUpperCase() : value;
      }
    }

    class BookQuery {

      @HttpHeader({ customConverter: () => UppercaseConverter })
      public category: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findOne(query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findAll(query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findById(1, query).toPromise(),
        query: new BookQuery({ category }),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.create(body, query).toPromise(),
        query: new BookQuery({ category }),
        body: new Book({ name }),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.update(body, query).toPromise(),
        query: new BookQuery({ category }),
        body: new Book({ id: 1, name }),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.patch(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ category }),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.delete(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ category }),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted http header with name', () => {
    const name: string = 'Naruto';
    const category: string = 'shonen';

    class UppercaseConverter implements Converter<string, string> {
      public fromJson(value: string): string {
        return value ? value.toLowerCase() : value;
      }

      public toJson(value: string): string {
        return value ? value.toUpperCase() : value;
      }
    }

    class BookQuery {

      @HttpHeader({ customConverter: () => UppercaseConverter, name: 'category' })
      public categoryName: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findOne(query).toPromise(),
        query: new BookQuery({ categoryName: category }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findAll(query).toPromise(),
        query: new BookQuery({ categoryName: category }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findById(1, query).toPromise(),
        query: new BookQuery({ categoryName: category }),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.create(body, query).toPromise(),
        query: new BookQuery({ categoryName: category }),
        body: new Book({ name }),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.update(body, query).toPromise(),
        query: new BookQuery({ categoryName: category }),
        body: new Book({ id: 1, name }),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.patch(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ categoryName: category }),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.delete(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ categoryName: category }),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });

  describe('should add deep http header', () => {
    const name: string = 'Naruto';
    const category: string = 'shonen';

    class UppercaseConverter implements Converter<string, string> {
      public fromJson(value: string): string {
        return value ? value.toLowerCase() : value;
      }

      public toJson(value: string): string {
        return value ? value.toUpperCase() : value;
      }
    }

    class SubBookQuery {

      @HttpHeader({ customConverter: () => UppercaseConverter, name: 'category' })
      public categoryName: string;

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
        request: ({ repository, query }: HttpRequestContext) => repository.findOne(query).toPromise(),
        query: new BookQuery({ child: new SubBookQuery({ categoryName: category }) }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: [{ id: 1, name }],
        expectedResponse: new Book({ id: 1, name })
      },
      findAll: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findAll(query).toPromise(),
        query: new BookQuery({ child: new SubBookQuery({ categoryName: category }) }),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: [{ id: 1, name }, { id: 2, name }],
        expectedResponse: Page.build([
          new Book({ id: 1, name }),
          new Book({ id: 2, name })
        ])
      },
      findById: {
        entity: Book,
        request: ({ repository, query }: HttpRequestContext) => repository.findById(1, query).toPromise(),
        query: new BookQuery({ child: new SubBookQuery({ categoryName: category }) }),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedRequestBody: null,
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        mockedResponseBody: { id: 1, name },
        expectedResponse: new Book({ id: 1, name })
      },
      create: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.create(body, query).toPromise(),
        query: new BookQuery({ child: new SubBookQuery({ categoryName: category }) }),
        body: new Book({ name }),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.update(body, query).toPromise(),
        query: new BookQuery({ child: new SubBookQuery({ categoryName: category }) }),
        body: new Book({ id: 1, name }),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.patch(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ child: new SubBookQuery({ categoryName: category }) }),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: ({ repository, body, query }: HttpRequestContext) => repository.delete(body, query).toPromise(),
        body: new Book({ id: 1, name }),
        query: new BookQuery({ child: new SubBookQuery({ categoryName: category }) }),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestHeaders: {
          category: 'SHONEN'
        },
        expectedRequestBody: { id: 1, name },
        mockedResponseBody: { id: 1, name },
        expectedResponse: void 0
      }
    });
  });
});
