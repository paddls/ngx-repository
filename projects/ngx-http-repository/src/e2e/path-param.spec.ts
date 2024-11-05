import { HttpRepository, HttpResource } from '../public-api';
import { Column, Id, Page, PathParam, SubQuery } from '@paddls/ngx-repository';
import { testHttpRepository } from './util/test-http-repository.spec';
import { Converter } from '@paddls/ts-serializer';

describe('PathParam', () => {

  @HttpResource({
    path: '/books/:category'
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

  describe('should add simple path param', () => {
    const name: string = 'Naruto';
    const category: string = 'shonen';

    class BookQuery {

      @PathParam()
      public category: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}],
        expectedResponse: new Book({id: 1, name})
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}, {id: 2, name}],
        expectedResponse: Page.build([
          new Book({id: 1, name}),
          new Book({id: 2, name})
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: null,
        mockedResponseBody: {id: 1, name},
        expectedResponse: new Book({id: 1, name})
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name}), new BookQuery({category})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/shonen',
        expectedRequestBody: {name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({category})).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({category})).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({category})).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });

  describe('should add named path param', () => {
    const name: string = 'Naruto';
    const category: string = 'shonen';

    class BookQuery {

      @PathParam('category')
      public categoryName: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}],
        expectedResponse: new Book({id: 1, name})
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}, {id: 2, name}],
        expectedResponse: Page.build([
          new Book({id: 1, name}),
          new Book({id: 2, name})
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: null,
        mockedResponseBody: {id: 1, name},
        expectedResponse: new Book({id: 1, name})
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name}), new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/shonen',
        expectedRequestBody: {name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted path param', () => {
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

      @PathParam({customConverter: () => UppercaseConverter})
      public category: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/SHONEN',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}],
        expectedResponse: new Book({id: 1, name})
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/SHONEN',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}, {id: 2, name}],
        expectedResponse: Page.build([
          new Book({id: 1, name}),
          new Book({id: 2, name})
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/SHONEN/1',
        expectedRequestBody: null,
        mockedResponseBody: {id: 1, name},
        expectedResponse: new Book({id: 1, name})
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name}), new BookQuery({category})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/SHONEN',
        expectedRequestBody: {name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({category})).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/SHONEN/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({category})).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/SHONEN/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({category})).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/SHONEN/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted http path param with name', () => {
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

      @PathParam({customConverter: () => UppercaseConverter, name: 'category'})
      public categoryName: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testHttpRepository({
      findOne: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/SHONEN',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}],
        expectedResponse: new Book({id: 1, name})
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/SHONEN',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}, {id: 2, name}],
        expectedResponse: Page.build([
          new Book({id: 1, name}),
          new Book({id: 2, name})
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/SHONEN/1',
        expectedRequestBody: null,
        mockedResponseBody: {id: 1, name},
        expectedResponse: new Book({id: 1, name})
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({name}), new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/SHONEN',
        expectedRequestBody: {name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/SHONEN/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/SHONEN/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({categoryName: category})).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/SHONEN/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });

  describe('should add deep path param', () => {
    const name: string = 'Naruto';
    const category: string = 'shonen';

    class SubBookQuery {

      @PathParam()
      public category: string;

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
        request: (repository: HttpRepository<any, any>) => repository.findOne(new BookQuery({
          child: new SubBookQuery({
            category
          })
        })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}],
        expectedResponse: new Book({id: 1, name})
      },
      findAll: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findAll(new BookQuery({
          child: new SubBookQuery({
            category
          })
        })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen',
        expectedRequestBody: null,
        mockedResponseBody: [{id: 1, name}, {id: 2, name}],
        expectedResponse: Page.build([
          new Book({id: 1, name}),
          new Book({id: 2, name})
        ])
      },
      findById: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.findById(1, new BookQuery({
          child: new SubBookQuery({
            category
          })
        })).toPromise(),
        expectedMethod: 'GET',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: null,
        mockedResponseBody: {id: 1, name},
        expectedResponse: new Book({id: 1, name})
      },
      create: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.create(new Book({
          name
        }), new BookQuery({
          child: new SubBookQuery({
            category
          })
        })).toPromise(),
        expectedMethod: 'POST',
        expectedPath: '/books/shonen',
        expectedRequestBody: {name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: 1
      },
      update: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.update(new Book({
          id: 1,
          name
        }), new BookQuery({
          child: new SubBookQuery({
            category
          })
        })).toPromise(),
        expectedMethod: 'PUT',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.patch(new Book({
          id: 1,
          name
        }), new BookQuery({
          child: new SubBookQuery({
            category
          })
        })).toPromise(),
        expectedMethod: 'PATCH',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: HttpRepository<any, any>) => repository.delete(new Book({
          id: 1,
          name
        }), new BookQuery({
          child: new SubBookQuery({
            category
          })
        })).toPromise(),
        expectedMethod: 'DELETE',
        expectedPath: '/books/shonen/1',
        expectedRequestBody: {id: 1, name},
        mockedResponseBody: {id: 1, name},
        expectedResponse: void 0
      }
    });
  });
});
