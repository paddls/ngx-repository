import { HttpRepository, HttpResource } from '../public-api';
import { Column, Id, Page } from '@witty-services/ngx-repository';
import { testHttpRepository } from './util/test-http-repository.spec';
import { Converter } from '@witty-services/ts-serializer';

describe('Column', () => {

  describe('should serialize column', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
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

    testHttpRepository({
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({ id: 1, name: 'Book 1' }), new Book({ id: 2, name: 'Book 2' })]),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, name: 'Book 1' }),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, name: 'Book 1' }),
        mockedResponseBody: { id: 1, name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name: 'Book 1' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
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

      @Id()
      public id: number;

      @Column('name')
      public nameValue: string;

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
        expectedResponse: Page.build([new Book({ id: 1, nameValue: 'Book 1' }), new Book({
          id: 2,
          nameValue: 'Book 2'
        })]),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, nameValue: 'Book 1' }),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, nameValue: 'Book 1' }),
        mockedResponseBody: { id: 1, name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ nameValue: 'Book 1' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name: 'Book 1' },
        expectedResponse: new Book({ id: 1, nameValue: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          nameValue: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, nameValue: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          nameValue: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, nameValue: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          nameValue: 'Book 1'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, nameValue: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
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

      @Id()
      public id: number;

      @Column({ normalizeNull: true })
      public name: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name: null })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name: null },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name: null
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: null },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name: null
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: null },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name: null
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: null },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
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

      @Id()
      public id: number;

      @Column({ normalizeUndefined: true })
      public name: string;

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
        expectedRequestBody: { name: undefined },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: undefined },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: undefined },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: undefined },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
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

      @Id()
      public id: number;

      @Column({ denormalizeNull: true })
      public name: string;

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
        expectedResponse: Page.build([new Book({ id: 1, name: null }), new Book({ id: 2, name: null })]),
        mockedResponseBody: [{ id: 1, name: null }, { id: 2, name: null }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, name: null }),
        mockedResponseBody: [{ id: 1, name: null }, { id: 2, name: null }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, name: null }),
        mockedResponseBody: { id: 1, name: null }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name: 'Book 1' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: null }),
        mockedResponseBody: { id: 1, name: null }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: null }),
        mockedResponseBody: { id: 1, name: null }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: null }),
        mockedResponseBody: { id: 1, name: null }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: null }),
        mockedResponseBody: { id: 1, name: null }
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

      @Id()
      public id: number;

      @Column({ denormalizeUndefined: true })
      public name: string;

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
        expectedResponse: Page.build([new Book({ id: 1, name: undefined }), new Book({ id: 2, name: undefined })]),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, name: undefined }),
        mockedResponseBody: [{ id: 1 }, { id: 2 }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, name: undefined }),
        mockedResponseBody: { id: 1 }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name: 'Book 1' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: undefined }),
        mockedResponseBody: { id: 1 }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: undefined }),
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: undefined }),
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1, name: undefined }),
        mockedResponseBody: { id: 1 }
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

      @Column()
      public name: string;

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
        mockedResponseBody: [{ id: 1, name: null }, { id: 2, name: null }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: [{ id: 1, name: null }, { id: 2, name: null }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: null }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name: null })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: null }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name: null
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: null }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name: null
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: null }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name: null
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: null }
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

      @Column()
      public name: string;

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

  describe('should submit only non readonly column', () => {
    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id()
      public id: number;

      @Column({ readOnly: true })
      public name: string;

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
        expectedResponse: Page.build([new Book({ id: 1, name: 'Book 1' }), new Book({ id: 2, name: 'Book 2' })]),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, name: 'Book 1' }),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, name: 'Book 1' }),
        mockedResponseBody: { id: 1, name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name: 'Book 1' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1, name: 'Book response' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
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

      @Id()
      public id: number;

      @Column({ writeOnly: true })
      public name: string;

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
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name: 'Book 1' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name: 'Book 1' },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'Book 1' },
        expectedResponse: new Book({ id: 1 }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      }
    });
  });

  describe('should use custom converter', () => {
    class MyConverter implements Converter<any, any> {
      public fromJson(value: any): any {
        return 'input';
      }

      public toJson(value: any): any {
        return 'output';
      }
    }

    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id()
      public id: number;

      @Column({ customConverter: () => MyConverter })
      public name: string;

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
        expectedResponse: Page.build([new Book({ id: 1, name: 'input' }), new Book({ id: 2, name: 'input' })]),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, name: 'input' }),
        mockedResponseBody: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, name: 'input' }),
        mockedResponseBody: { id: 1, name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ name: 'Book 1' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { name: 'output' },
        expectedResponse: new Book({ id: 1, name: 'input' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'output' },
        expectedResponse: new Book({ id: 1, name: 'input' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'output' },
        expectedResponse: new Book({ id: 1, name: 'input' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name: 'Book 1'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, name: 'output' },
        expectedResponse: new Book({ id: 1, name: 'input' }),
        mockedResponseBody: { id: 1, name: 'Book response' }
      }
    });
  });

  describe('should serialize sub types', () => {
    class Author {

      @Column()
      public name: string;

      public constructor(data: Partial<Author> = {}) {
        Object.assign(this, data);
      }
    }

    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true
      }
    })
    class Book {

      @Id()
      public id: number;

      @Column(() => Author)
      public author: Author;

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
        expectedResponse: Page.build([new Book({ id: 1, author: new Author({ name: 'Charly' }) }), new Book({
          id: 2,
          author: new Author({ name: 'Stark' })
        })]),
        mockedResponseBody: [{ id: 1, author: { name: 'Charly' } }, { id: 2, author: { name: 'Stark' } }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, author: new Author({ name: 'Romain' }) }),
        mockedResponseBody: [{ id: 1, author: { name: 'Romain' } }, { id: 2, author: { name: 'Tony' } }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, author: new Author({ name: 'Leito' }) }),
        mockedResponseBody: { id: 1, author: { name: 'Leito' } }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ author: new Author({ name: 'Razor' }) })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { author: { name: 'Razor' } },
        expectedResponse: new Book({ id: 1, author: new Author({ name: 'Charly' }) }),
        mockedResponseBody: { id: 1, author: { name: 'Charly' } }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          author: new Author({ name: 'Charly' })
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, author: { name: 'Charly' } },
        expectedResponse: new Book({ id: 1, author: new Author({ name: 'Charly' }) }),
        mockedResponseBody: { id: 1, author: { name: 'Charly' } }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          author: new Author({ name: 'Charly' })
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, author: { name: 'Charly' } },
        expectedResponse: new Book({ id: 1, author: new Author({ name: 'Charly' }) }),
        mockedResponseBody: { id: 1, author: { name: 'Charly' } }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          author: new Author({ name: 'Charly' })
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, author: { name: 'Charly' } },
        expectedResponse: new Book({ id: 1, author: new Author({ name: 'Charly' }) }),
        mockedResponseBody: { id: 1, author: { name: 'Charly' } }
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

      @Id()
      public id: number;

      @Column('author.name')
      public authorName: string;

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
        expectedResponse: Page.build([new Book({ id: 1, authorName: 'Charly' }), new Book({
          id: 2,
          authorName: 'Stark'
        })]),
        mockedResponseBody: [{ id: 1, author: { name: 'Charly' } }, { id: 2, author: { name: 'Stark' } }]
      },
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({ id: 1, authorName: 'Romain' }),
        mockedResponseBody: [{ id: 1, author: { name: 'Romain' } }, { id: 2, author: { name: 'Tony' } }]
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({ id: 1, authorName: 'Leito' }),
        mockedResponseBody: { id: 1, author: { name: 'Leito' } }
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({ authorName: 'Razor' })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: { author: { name: 'Razor' } },
        expectedResponse: new Book({ id: 1, authorName: 'Charly' }),
        mockedResponseBody: { id: 1, author: { name: 'Charly' } }
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          authorName: 'Charly'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, author: { name: 'Charly' } },
        expectedResponse: new Book({ id: 1, authorName: 'Charly' }),
        mockedResponseBody: { id: 1, author: { name: 'Charly' } }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          authorName: 'Charly'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, author: { name: 'Charly' } },
        expectedResponse: new Book({ id: 1, authorName: 'Charly' }),
        mockedResponseBody: { id: 1, author: { name: 'Charly' } }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          authorName: 'Charly'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1, author: { name: 'Charly' } },
        expectedResponse: new Book({ id: 1, authorName: 'Charly' }),
        mockedResponseBody: { id: 1, author: { name: 'Charly' } }
      }
    });
  });
});
