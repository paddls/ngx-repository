import { HttpRepository, HttpResource } from '../public-api';
import { Injectable } from '@angular/core';
import { Column, Id, Page, ResponseProcessor } from '@paddls/ngx-repository';
import { testHttpRepository } from './util/test-http-repository.spec';

describe('Page', () => {

  describe('should return page containing all elements', () => {
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
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([
          new Book({ id: 1, name: 'Book 1' }),
          new Book({ id: 2, name: 'Book 2' })
        ]),
        mockedResponseBody: [
          { id: 1, name: 'Book 1' },
          { id: 2, name: 'Book 2' }
        ]
      }
    });
  });

  describe('should override default page response processor with array body', () => {
    @Injectable()
    class MyPageResponseProcessor implements ResponseProcessor {
      public transform(body: any): any {
        return Page.build(body, 1, 2, 3);
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
        expectedResponse: Page.build([
          new Book({ id: 1, name: 'Book 1' }),
          new Book({ id: 2, name: 'Book 2' })
        ], 1, 2, 3),
        mockedResponseBody: [
          { id: 1, name: 'Book 1' },
          { id: 2, name: 'Book 2' }
        ]
      }
    }, {
      providers: [MyPageResponseProcessor]
    });
  });

  describe('should override default page response processor with object body', () => {
    @Injectable()
    class MyPageResponseProcessor implements ResponseProcessor {
      public transform(body: any): any {
        return Page.build(body.data, 1, 2, 3);
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
        expectedResponse: Page.build([
          new Book({ id: 1, name: 'Book 1' }),
          new Book({ id: 2, name: 'Book 2' })
        ], 1, 2, 3),
        mockedResponseBody: {
          data: [
            { id: 1, name: 'Book 1' },
            { id: 2, name: 'Book 2' }
          ]
        }
      }
    }, {
      providers: [MyPageResponseProcessor]
    });
  });

  describe('should override root module response processor', () => {
    @Injectable()
    class MyPageResponseProcessor implements ResponseProcessor {
      public transform(body: any): any {
        return Page.build(body, 1, 2, 3);
      }
    }

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
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([
          new Book({ id: 1, name: 'Book 1' }),
          new Book({ id: 2, name: 'Book 2' })
        ], 1, 2, 3),
        mockedResponseBody: [
          { id: 1, name: 'Book 1' },
          { id: 2, name: 'Book 2' }
        ]
      }
    }, {
      providers: [MyPageResponseProcessor],
      httpConfiguration: {
        configuration: {
          findAll: {
            pageResponseProcessor: MyPageResponseProcessor
          }
        }
      }
    });
  });

  it('should override module pageResponseProcessor');
});
