import { HttpHeader, HttpRepository, HttpResource } from '../public-api';
import { Column, Id, Page, SubQuery } from '@witty-services/ngx-repository';
import { Converter } from '@witty-services/ts-serializer';
import { testHttpRepository } from './util/test-http-repository.spec';

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
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ categoryName: category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ categoryName: category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ categoryName: category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name }), new BookQuery({ categoryName: category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ categoryName: category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ categoryName: category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ categoryName: category })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({ child: new SubBookQuery({ categoryName: category }) })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({ child: new SubBookQuery({ categoryName: category }) })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({ child: new SubBookQuery({ categoryName: category }) })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({
          name
        }), new BookQuery({ child: new SubBookQuery({ categoryName: category }) })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({ child: new SubBookQuery({ categoryName: category }) })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({ child: new SubBookQuery({ categoryName: category }) })).toPromise(),
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
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({ child: new SubBookQuery({ categoryName: category }) })).toPromise(),
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

  // TODO to be implemented @TNI ?
  it('should submit request header from resource');
  it('should mapped resource with response header');
});
