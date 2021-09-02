import { HttpRepository, HttpResource } from '../public-api';
import { Column, Id } from '@witty-services/ngx-repository';
import { testHttpRepository } from './util/test-http-repository.spec';

describe('VoidResponseProcessor', () => {

  describe('should return void by default', () => {
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

    testHttpRepository({
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0,
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0,
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0,
        mockedResponseBody: { id: 1 }
      }
    });
  });

  describe('should override default void response processor to return complete object', () => {
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
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1, name: 'Gladiator' }),
        mockedResponseBody: { id: 1, name: 'Gladiator' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1, name: 'Gladiator' }),
        mockedResponseBody: { id: 1, name: 'Gladiator' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Book({ id: 1, name: 'Gladiator' }),
        mockedResponseBody: { id: 1, name: 'Gladiator' }
      }
    });
  });

  describe('should override default void response processor and resource type to return complete object', () => {
    class Manga {

      @Id()
      public identifier: string;

      @Column()
      public author: string;

      public constructor(data: Partial<Manga> = {}) {
        Object.assign(this, data);
      }
    }

    @HttpResource({
      path: '/books',
      write: {
        fullResponse: true,
        responseType: () => Manga
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
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Manga({ identifier: 'abc', author: 'Charly' }),
        mockedResponseBody: { identifier: 'abc', author: 'Charly' }
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Manga({ identifier: 'abc', author: 'Charly' }),
        mockedResponseBody: { identifier: 'abc', author: 'Charly' }
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: new Manga({ identifier: 'abc', author: 'Charly' }),
        mockedResponseBody: { identifier: 'abc', author: 'Charly' }
      }
    });
  });
});
