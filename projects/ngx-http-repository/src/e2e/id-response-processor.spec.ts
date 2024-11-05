import { HttpRepository, HttpResource } from '../public-api';
import { Column, Id } from '@paddls/ngx-repository';
import { testHttpRepository } from './util/test-http-repository.spec';

describe('IdResponseProcessor', () => {

  describe('should return id of created resource', () => {
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

    testHttpRepository({
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name: 'Star Wars'})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {name: 'Star Wars'},
        expectedResponse: 1,
        mockedResponseBody: {id: 1}
      }
    });
  });

  describe('should override default id response processor to return complete object', () => {
    @HttpResource({
      path: '/books',
      create: {
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
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name: 'Star Wars'})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {name: 'Star Wars'},
        expectedResponse: new Book({id: 1, name: 'Star Wars 1'}),
        mockedResponseBody: {id: 1, name: 'Star Wars 1'}
      }
    });
  });

  describe('should override default id response processor to return complete object with write config', () => {
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
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name: 'Star Wars'})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {name: 'Star Wars'},
        expectedResponse: new Book({id: 1, name: 'Star Wars 1'}),
        mockedResponseBody: {id: 1, name: 'Star Wars 1'}
      }
    });
  });

  describe('should override default id response processor and resource type to return complete object', () => {
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
      create: {
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
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name: 'Star Wars'})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {name: 'Star Wars'},
        expectedResponse: new Manga({identifier: 'abc', author: 'Romain'}),
        mockedResponseBody: {identifier: 'abc', author: 'Romain'}
      }
    });
  });

  describe('should override resource type to return another id', () => {
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
      create: {
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
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name: 'Star Wars'})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {name: 'Star Wars'},
        expectedResponse: 'abc',
        mockedResponseBody: {identifier: 'abc', author: 'Romain'}
      }
    });
  });
});
