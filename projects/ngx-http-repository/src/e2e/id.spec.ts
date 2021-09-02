import { HttpRepository, HttpResource } from '../public-api';
import { Id, Page } from '@witty-services/ngx-repository';
import { testHttpRepository } from './util/test-http-repository.spec';
import { Converter } from '@witty-services/ts-serializer';

describe('Id', () => {

  describe('should serialize id', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id()
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ id: 1 }), new Book({ id: 2 })]),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      }
    });
  });

  describe('should change name of serialized column', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id('id')
      public identifier: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ identifier: 1 }), new Book({ identifier: 2 })]),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ identifier: 1 }),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ identifier: 1 }),
        mockedResponseBody: { id: 1 }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({ identifier: 1 }),
        mockedResponseBody: { id: 1 }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          identifier: 1

        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ identifier: 1 }),
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          identifier: 1

        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ identifier: 1 }),
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          identifier: 1

        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ identifier: 1 }),
        mockedResponseBody: { id: 1 }
      }
    });
  });

  describe('should override normalizeNull', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id({ normalizeNull: true })
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ id: null })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { id: null },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: null
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books',
        expectedRequestBody: { id: null },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: null
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books',
        expectedRequestBody: { id: null },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: null
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books',
        expectedRequestBody: { id: null },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      }
    });
  });

  describe('should override normalizeUndefined', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id({ normalizeUndefined: true })
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { id: undefined },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({})).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books',
        expectedRequestBody: { id: undefined },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({})).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books',
        expectedRequestBody: { id: undefined },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({})).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books',
        expectedRequestBody: { id: undefined },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      }
    });
  });

  describe('should override denormalizeNull', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id({ denormalizeNull: true })
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ id: null }), new Book({ id: null })]),
        mockedResponseBody: [{ id: null }, { id: null }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: null }),
        mockedResponseBody: [{ id: null }, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: null }),
        mockedResponseBody: { id: null }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: null }),
        mockedResponseBody: { id: null }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: null }),
        mockedResponseBody: { id: null }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: null }),
        mockedResponseBody: { id: null }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: null }),
        mockedResponseBody: { id: null }
      }
    });
  });

  describe('should override denormalizeUndefined', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id({ denormalizeUndefined: true })
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ id: undefined }), new Book({ id: undefined })]),
        mockedResponseBody: [{}, {}]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: undefined }),
        mockedResponseBody: [{}, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: undefined }),
        mockedResponseBody: {}
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: undefined }),
        mockedResponseBody: {}
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: undefined }),
        mockedResponseBody: {}
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: undefined }),
        mockedResponseBody: {}
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: undefined }),
        mockedResponseBody: {}
      }
    });
  });

  describe('should not denormalize/normalize undefined by default', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id()
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({}), new Book({})]),
        mockedResponseBody: [{}, {}]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({}),
        mockedResponseBody: [{}, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({}),
        mockedResponseBody: {}
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({}),
        mockedResponseBody: {}
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({})).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({}),
        mockedResponseBody: {}
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({})).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({}),
        mockedResponseBody: {}
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({})).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({}),
        mockedResponseBody: {}
      }
    });
  });

  describe('should not denormalize/normalize null by default', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id()
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({}), new Book({})]),
        mockedResponseBody: [{ id: null }, { id: null }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({}),
        mockedResponseBody: [{ id: null }, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({}),
        mockedResponseBody: { id: null }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ id: null })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({}),
        mockedResponseBody: { id: null }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({ id: null })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({}),
        mockedResponseBody: { id: null }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({ id: null })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({}),
        mockedResponseBody: { id: null }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({ id: null })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({}),
        mockedResponseBody: { id: null }
      }
    });
  });

  describe('should submit only non readonly column', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id({ readOnly: true })
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ id: 1 }), new Book({ id: 2 })]),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/1',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1 }
      }
    });
  });

  describe('should fetch only non write only column', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id({ writeOnly: true })
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({}), new Book({})]),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({}),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({}),
        mockedResponseBody: { id: 1 }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({}),
        mockedResponseBody: { id: 1 }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({}),
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({}),
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({}),
        mockedResponseBody: { id: 1 }
      }
    });
  });

  describe('should use custom converter', () => {
    class MyConverter implements Converter<number, number> {
      public fromJson(value: number): number {
        return value - 1;
      }

      public toJson(value: number): number {
        return value + 1;
      }
    }

    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id({ customConverter: () => MyConverter })
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ id: 1 }), new Book({ id: 2 })]),
        mockedResponseBody: [{ id: 2 }, { id: 3 }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: [{ id: 2 }, { id: 3 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 2 }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/1', // TODO @TNI should be 1 or 2?
        expectedRequestBody: { id: 2 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 2 }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 2 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 2 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 2 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 2 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 2 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 2 }
      }
    });
  });

  describe('should serialize field path', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id('identifier.value')
      public id: number;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ id: 1 }), new Book({ id: 2 })]),
        mockedResponseBody: [{ identifier: { value: 1 } }, { identifier: { value: 2 } }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: [{ identifier: { value: 1 } }, { identifier: { value: 2 } }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { identifier: { value: 1 } }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/1',
        expectedRequestBody: { identifier: { value: 1 } },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { identifier: { value: 1 } }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1

        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { identifier: { value: 1 } },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { identifier: { value: 1 } }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { identifier: { value: 1 } },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { identifier: { value: 1 } }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { identifier: { value: 1 } },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { identifier: { value: 1 } }
      }
    });
  });

  [
    'create',
    'update',
    'patch',
    'delete',
    'findAll',
    'findOne',
    'findById'
  ].forEach((operation: string) => {
    describe(operation, () => {
      // TODO feature need to be developed ? @TNI
      it(`should serialize sub types`);
    });
  });
});
