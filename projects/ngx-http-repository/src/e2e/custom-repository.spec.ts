import { HttpRepository, HttpRepositoryDriver, HttpResource } from '../public-api';
import { Id, Page, Repository, RequestManager, ResourceConfiguration } from '@paddls/ngx-repository';
import { testHttpRepository } from './util/test-http-repository.spec';
import { Inject, Injectable } from '@angular/core';
import { HTTP_REPOSITORY_CONFIGURATION } from '../lib/configuration/http-repository.configuration';

describe('Custom Repository', () => {

  describe('should invoke parent call', () => {
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

    @Injectable()
    @Repository(() => Book)
    class CustomBookRepository extends HttpRepository<Book, number> {

      public constructor(requestManager: RequestManager,
                         driver: HttpRepositoryDriver,
                         @Inject(HTTP_REPOSITORY_CONFIGURATION) configuration: ResourceConfiguration) {
        super(requestManager, driver, configuration);
      }
    }

    testHttpRepository({
      findAll: {
        entity: Book,
        repository: CustomBookRepository,
        request: (repository: HttpRepository<any, any>) => repository.findAll().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({id: 1}), new Book({id: 2})]),
        mockedResponseBody: [{id: 1}, {id: 2}]
      },
      findOne: {
        entity: Book,
        repository: CustomBookRepository,
        request: (repository: HttpRepository<any, any>) => repository.findOne().toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books',
        expectedResponse: new Book({id: 1}),
        mockedResponseBody: [{id: 1}, {id: 2}]
      },
      findById: {
        entity: Book,
        repository: CustomBookRepository,
        request: (repository: HttpRepository<any, any>) => repository.findById(1).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/1',
        expectedResponse: new Book({id: 1}),
        mockedResponseBody: {id: 1}
      },
      create: {
        entity: Book,
        repository: CustomBookRepository,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody: {},
        expectedResponse: new Book({id: 1}),
        mockedResponseBody: {id: 1}
      },
      update: {
        entity: Book,
        repository: CustomBookRepository,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: {id: 1},
        expectedResponse: new Book({id: 1}),
        mockedResponseBody: {id: 1}
      },
      patch: {
        entity: Book,
        repository: CustomBookRepository,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: {id: 1},
        expectedResponse: new Book({id: 1}),
        mockedResponseBody: {id: 1}
      },
      delete: {
        entity: Book,
        repository: CustomBookRepository,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: {id: 1},
        expectedResponse: new Book({id: 1}),
        mockedResponseBody: {id: 1}
      }
    });
  });

});
