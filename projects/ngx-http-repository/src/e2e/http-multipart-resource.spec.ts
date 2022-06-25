import { HttpRepository, HttpResource } from '../public-api';
import { Column, Id } from '@paddls/ngx-repository';
import { testHttpRepository } from './util/test-http-repository.spec';
import { HttpMultipartColumn } from '../lib/decorator/http-multipart-resource';

fdescribe('HttpMultipartResource', () => {

  @HttpResource({
    path: '/books',
    write: {
      multipart: 'data',
    }
  })
  class Book {

    @Id()
    public id: number;

    @Column()
    public name: string;

    @HttpMultipartColumn()
    public file: string;

    @HttpMultipartColumn('theFile')
    public fileWithAlias: string;

    public constructor(data: Partial<Book> = {}) {
      Object.assign(this, data);
    }
  }

  describe('should send http request over multipart', () => {
    const name: string = 'Naruto';
    const expectedRequestBody: FormData = new FormData();
    expectedRequestBody.set('data', {id: 1, name} as any);

    testHttpRepository({
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });

  describe('should send http request over multipart with column', () => {
    const name: string = 'Naruto';
    const expectedRequestBody: FormData = new FormData();
    expectedRequestBody.set('data', {id: 1, name} as any);
    expectedRequestBody.set('file', 'hello.txt');

    testHttpRepository({
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name, file: 'hello.txt'})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name,
          file: 'hello.txt'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name,
          file: 'hello.txt'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name,
          file: 'hello.txt'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });

  describe('should send http request over multipart with column and alias', () => {
    const name: string = 'Naruto';
    const expectedRequestBody: FormData = new FormData();
    expectedRequestBody.set('data', {id: 1, name} as any);
    expectedRequestBody.set('theFile', 'world.txt');

    testHttpRepository({
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name, fileWithAlias: 'world.txt'})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name,
          fileWithAlias: 'world.txt'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name,
          fileWithAlias: 'world.txt'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name,
          fileWithAlias: 'world.txt'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });

  describe('should send http request over multipart with multiple columns', () => {
    const name: string = 'Naruto';
    const expectedRequestBody: FormData = new FormData();
    expectedRequestBody.set('data', {id: 1, name} as any);
    expectedRequestBody.set('file', 'hello.txt');
    expectedRequestBody.set('theFile', 'world.txt');

    testHttpRepository({
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({
          name,
          fileWithAlias: 'world.txt',
          file: 'hello.txt'
        })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name,
          fileWithAlias: 'world.txt',
          file: 'hello.txt'
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name,
          fileWithAlias: 'world.txt',
          file: 'hello.txt'
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name,
          fileWithAlias: 'world.txt',
          file: 'hello.txt'
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/1',
        expectedRequestBody,
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });
});
