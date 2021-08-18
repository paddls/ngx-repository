import { HttpResource } from '../public-api';
import { Column, Id } from '@witty-services/ngx-repository';
import { HttpRequestContext, testHttpRepository } from './util/test-http-repository.spec';

describe('IdResponseProcessor', () => {

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

  describe('should return id of created resource', () => {
    testHttpRepository({
      create: {
        entity: Book,
        request: ({ repository, body }: HttpRequestContext) => repository.create(body).toPromise(),
        expectedMethod: 'POST',
        body: new Book({ name: 'Star Wars' }),
        expectedPath: '/books',
        expectedRequestBody: { name: 'Star Wars' },
        expectedResponse: 1,
        mockedResponseBody: { id: 1 }
      }
    });
  });

  it(`should override default id response processor to return complete object`);
});
