import { HttpResource } from '../public-api';
import { Id } from '@witty-services/ngx-repository';
import { HttpRequestContext, testHttpRepository } from './util/test-http-repository.spec';

describe('VoidResponseProcessor', () => {

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

  describe('should return void by default', () => {
    testHttpRepository({
      update: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.update(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0,
        mockedResponseBody: { id: 1 }
      },
      patch: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.patch(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0,
        mockedResponseBody: { id: 1 }
      },
      delete: {
        entity: Book,
        request: ({ repository }: HttpRequestContext) => repository.delete(new Book({ id: 1 })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody: { id: 1 },
        expectedResponse: void 0,
        mockedResponseBody: { id: 1 }
      }
    });
  });

  it(`should override default id response processor to return complete object`);
});
