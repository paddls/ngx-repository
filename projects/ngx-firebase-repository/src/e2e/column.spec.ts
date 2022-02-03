import { Column, Id, Page } from '@witty-services/ngx-repository';
import { FirebaseRepository, FirebaseResource } from '../public-api';
import { expectCollectionAdd, expectDocumentDelete, expectDocumentUpdate, testFirestoreRepository } from './util/test-firestore-repository.spec';

describe('Column', () => {

  describe('should serialize column', () => {
    @FirebaseResource({
      path: '/books'
    })
    class Book {

      @Id()
      public id: string;

      @Column()
      public name: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findAll().toPromise(),
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({id: '1', name: 'Book 1'}), new Book({id: '2', name: 'Book 2'})]),
        mockedResponse: [{id: '1', name: 'Book 1'}, {id: '2', name: 'Book 2'}]
      },
      findOne: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findOne().toPromise(),
        expectedPath: '/books',
        expectedResponse: new Book({id: '1', name: 'Book 1'}),
        mockedResponse: [{id: '1', name: 'Book 1'}, {id: '2', name: 'Book 2'}]
      },
      findById: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findById(1).toPromise(),
        expectedPath: '/books/1',
        expectedResponse: new Book({id: '1', name: 'Book 1'}),
        mockedResponse: {id: '1', name: 'Book 1'}
      },
      create: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.create(new Book({name: 'Book 1'})).toPromise(),
        expectedPath: '/books',
        expectedRequest: expectCollectionAdd({name: 'Book 1'}),
        expectedResponse: '1',
        mockedResponse: {id: '1'}
      },
      update: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.update(new Book({
          id: '1',
          name: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: 'Book 1'}),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.patch(new Book({
          id: '2',
          name: 'Book 2'
        })).toPromise(),
        expectedPath: '/books/2',
        expectedRequest: expectDocumentUpdate({id: '2', name: 'Book 2'}),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.delete(new Book({
          id: '1',
          name: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should change name of serialized column', () => {
    @FirebaseResource({
      path: '/books'
    })
    class Book {

      @Id()
      public id: string;

      @Column('name')
      public nameValue: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findAll().toPromise(),
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({id: '1', nameValue: 'Book 1'}), new Book({
          id: '2',
          nameValue: 'Book 2'
        })]),
        mockedResponse: [{id: '1', name: 'Book 1'}, {id: '2', name: 'Book 2'}]
      },
      findOne: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findOne().toPromise(),
        expectedPath: '/books',
        expectedResponse: new Book({id: '1', nameValue: 'Book 1'}),
        mockedResponse: [{id: '1', name: 'Book 1'}, {id: '2', name: 'Book 2'}]
      },
      findById: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findById(1).toPromise(),
        expectedPath: '/books/1',
        expectedResponse: new Book({id: '1', nameValue: 'Book 1'}),
        mockedResponse: {id: '1', name: 'Book 1'}
      },
      create: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.create(new Book({nameValue: 'Book 1'})).toPromise(),
        expectedPath: '/books',
        expectedRequest: expectCollectionAdd({name: 'Book 1'}),
        expectedResponse: '1',
        mockedResponse: {id: '1'}
      },
      update: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.update(new Book({
          id: '1',
          nameValue: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: 'Book 1'}),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.patch(new Book({
          id: '1',
          nameValue: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: 'Book 1'}),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.delete(new Book({
          id: '1',
          nameValue: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should override normalizeNull', () => {
    @FirebaseResource({
      path: '/books'
    })
    class Book {

      @Id()
      public id: string;

      @Column({normalizeNull: true})
      public name: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findAll().toPromise(),
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({id: '1', name: 'Book 1'}), new Book({id: '2', name: 'Book 2'})]),
        mockedResponse: [{id: '1', name: 'Book 1'}, {id: '2', name: 'Book 2'}]
      },
      findOne: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findOne().toPromise(),
        expectedPath: '/books',
        expectedResponse: new Book({id: '1', name: 'Book 1'}),
        mockedResponse: [{id: '1', name: 'Book 1'}, {id: '2', name: 'Book 2'}]
      },
      findById: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findById(1).toPromise(),
        expectedPath: '/books/1',
        expectedResponse: new Book({id: '1', name: 'Book 1'}),
        mockedResponse: {id: '1', name: 'Book 1'}
      },
      create: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.create(new Book({name: null})).toPromise(),
        expectedPath: '/books',
        expectedRequest: expectCollectionAdd({name: null}),
        expectedResponse: '1',
        mockedResponse: {id: '1'}
      },
      update: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.update(new Book({
          id: '1',
          name: null
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: null}),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.patch(new Book({
          id: '1',
          name: null
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: null}),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.delete(new Book({
          id: '1',
          name: null
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should override normalizeUndefined', () => {
    @FirebaseResource({
      path: '/books'
    })
    class Book {

      @Id()
      public id: string;

      @Column({normalizeUndefined: true})
      public name: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findAll().toPromise(),
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({id: '1', name: 'Book 1'}), new Book({id: '2', name: 'Book 2'})]),
        mockedResponse: [{id: '1', name: 'Book 1'}, {id: '2', name: 'Book 2'}]
      },
      findOne: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findOne().toPromise(),
        expectedPath: '/books',
        expectedResponse: new Book({id: '1', name: 'Book 1'}),
        mockedResponse: [{id: '1', name: 'Book 1'}, {id: '2', name: 'Book 2'}]
      },
      findById: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findById(1).toPromise(),
        expectedPath: '/books/1',
        expectedResponse: new Book({id: '1', name: 'Book 1'}),
        mockedResponse: {id: '1', name: 'Book 1'}
      },
      create: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.create(new Book({})).toPromise(),
        expectedPath: '/books',
        expectedRequest: expectCollectionAdd({name: undefined}),
        expectedResponse: '1',
        mockedResponse: {id: '1'}
      },
      update: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.update(new Book({
          id: '1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: undefined}),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.patch(new Book({
          id: '1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: undefined}),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.delete(new Book({
          id: '1',
          name: null
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should override denormalizeNull', () => {
    @FirebaseResource({
      path: '/books'
    })
    class Book {

      @Id()
      public id: string;

      @Column({denormalizeNull: true})
      public name: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findAll().toPromise(),
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({id: '1', name: null}), new Book({id: '2', name: null})]),
        mockedResponse: [{id: '1', name: null}, {id: '2', name: null}]
      },
      findOne: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findOne().toPromise(),
        expectedPath: '/books',
        expectedResponse: new Book({id: '1', name: null}),
        mockedResponse: [{id: '1', name: null}, {id: '2', name: null}]
      },
      findById: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findById(1).toPromise(),
        expectedPath: '/books/1',
        expectedResponse: new Book({id: '1', name: null}),
        mockedResponse: {id: '1', name: null}
      },
      create: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.create(new Book({name: 'Book 1'})).toPromise(),
        expectedPath: '/books',
        expectedRequest: expectCollectionAdd({name: 'Book 1'}),
        expectedResponse: '1',
        mockedResponse: {id: '1'}
      },
      update: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.update(new Book({
          id: '1',
          name: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: 'Book 1'}),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.patch(new Book({
          id: '1',
          name: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: 'Book 1'}),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.delete(new Book({
          id: '1',
          name: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should override denormalizeUndefined', () => {
    @FirebaseResource({
      path: '/books'
    })
    class Book {

      @Id()
      public id: string;

      @Column({denormalizeUndefined: true})
      public name: string;

      public constructor(data: Partial<Book> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findAll().toPromise(),
        expectedPath: '/books',
        expectedResponse: Page.build([new Book({id: '1', name: undefined}), new Book({id: '2', name: undefined})]),
        mockedResponse: [{id: '1', name: undefined}, {id: '2', name: undefined}]
      },
      findOne: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findOne().toPromise(),
        expectedPath: '/books',
        expectedResponse: new Book({id: '1', name: undefined}),
        mockedResponse: [{id: '1', name: undefined}, {id: '2', name: undefined}]
      },
      findById: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.findById(1).toPromise(),
        expectedPath: '/books/1',
        expectedResponse: new Book({id: '1', name: undefined}),
        mockedResponse: {id: '1', name: undefined}
      },
      create: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.create(new Book({name: 'Book 1'})).toPromise(),
        expectedPath: '/books',
        expectedRequest: expectCollectionAdd({name: 'Book 1'}),
        expectedResponse: '1',
        mockedResponse: {id: '1'}
      },
      update: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.update(new Book({
          id: '1',
          name: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: 'Book 1'}),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.patch(new Book({
          id: '1',
          name: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentUpdate({id: '1', name: 'Book 1'}),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirebaseRepository<any>) => repository.delete(new Book({
          id: '1',
          name: 'Book 1'
        })).toPromise(),
        expectedPath: '/books/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  it('should not denormalize/normalize null by default');
  it('should not denormalize/normalize undefined by default');
  it('should submit only non readonly column');
  it('should fetch only non write only column');
  it('should use custom converter');
  it('should serialize sub types');
  it('should serialize field path');
});
