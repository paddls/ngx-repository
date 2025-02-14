import { FirestoreResource } from '../lib/decorator/firestore-resource.decorator';
import { Column, Id, Page } from '@paddls/ngx-repository';
import { expectQuery, testFirestoreRepository } from './util/test-firestore-repository.spec';
import { FirestoreRepository } from '../lib/repository/firestore.repository';
import { FirestoreCriteria } from '../lib/decorator/firestore-criteria.decorator';
import { FirestoreOrderBy } from '../lib/decorator/firestore-order-by.decorator';
import { FirestoreStartAt } from '../lib/decorator/firestore-start-at.decorator';
import { FirestoreStartAfter } from '../lib/decorator/firestore-start-after.decorator';
import { FirestoreEndAt } from '../lib/decorator/firestore-end-at.decorator';
import { FirestoreEndBefore } from '../lib/decorator/firestore-end-before.decorator';
import { FirestoreLimit } from '../lib/decorator/firestore-limit.decorator';
import { FirestoreLimitToLast } from '../lib/decorator/firestore-limit-to-last.decorator';

describe('FirestoreCriteria', () => {

  @FirestoreResource({
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

  describe('should add where query', () => {
    class BookQuery {

      @FirestoreCriteria({ field: 'name', operator: '==' })
      public nameEquals: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ nameEquals: 'Book 2' })).toPromise(),
        expectedPath: '/books',
        expectedQuery: expectQuery('where', { fieldPath: 'name', opStr: '==', value: 'Book 2' }),
        expectedResponse: Page.build([
          new Book({ id: '1', name: 'Book 1' }),
          new Book({ id: '2', name: 'Book 2' })
        ]),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findOne: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ nameEquals: 'Book 1' })).toPromise(),
        expectedQuery: expectQuery('where', { fieldPath: 'name', opStr: '==', value: 'Book 1' }),
        expectedPath: '/books',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      }
    });
  });

  describe('should add order by query', () => {
    class BookQuery {

      @FirestoreOrderBy()
      public orderBy: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ orderBy: 'name' })).toPromise(),
        expectedPath: '/books',
        expectedQuery: expectQuery('orderBy', { fieldPath: 'name', directionStr: undefined }),
        expectedResponse: Page.build([
          new Book({ id: '1', name: 'Book 1' }),
          new Book({ id: '2', name: 'Book 2' })
        ]),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findOne: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ orderBy: 'name' })).toPromise(),
        expectedQuery: expectQuery('orderBy', { fieldPath: 'name', directionStr: undefined }),
        expectedPath: '/books',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      }
    });
  });

  describe('should add start at query', () => {
    class BookQuery {

      @FirestoreStartAt()
      public startAt: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ startAt: 'name' })).toPromise(),
        expectedPath: '/books',
        expectedQuery: expectQuery('startAt', { fieldValues: ['name'] }),
        expectedResponse: Page.build([
          new Book({ id: '1', name: 'Book 1' }),
          new Book({ id: '2', name: 'Book 2' })
        ]),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findOne: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ startAt: 'name' })).toPromise(),
        expectedQuery: expectQuery('startAt', { fieldValues: ['name'] }),
        expectedPath: '/books',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      }
    });
  });

  describe('should add start after query', () => {
    class BookQuery {

      @FirestoreStartAfter()
      public startAfter: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ startAfter: 'name' })).toPromise(),
        expectedPath: '/books',
        expectedQuery: expectQuery('startAfter', { fieldValues: ['name'] }),
        expectedResponse: Page.build([
          new Book({ id: '1', name: 'Book 1' }),
          new Book({ id: '2', name: 'Book 2' })
        ]),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findOne: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ startAfter: 'name' })).toPromise(),
        expectedQuery: expectQuery('startAfter', { fieldValues: ['name'] }),
        expectedPath: '/books',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      }
    });
  });

  describe('should add end at query', () => {
    class BookQuery {

      @FirestoreEndAt()
      public endAt: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ endAt: 'name' })).toPromise(),
        expectedPath: '/books',
        expectedQuery: expectQuery('endAt', { fieldValues: ['name'] }),
        expectedResponse: Page.build([
          new Book({ id: '1', name: 'Book 1' }),
          new Book({ id: '2', name: 'Book 2' })
        ]),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findOne: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ endAt: 'name' })).toPromise(),
        expectedQuery: expectQuery('endAt', { fieldValues: ['name'] }),
        expectedPath: '/books',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      }
    });
  });

  describe('should add end before query', () => {
    class BookQuery {

      @FirestoreEndBefore()
      public endBefore: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ endBefore: 'name' })).toPromise(),
        expectedPath: '/books',
        expectedQuery: expectQuery('endBefore', { fieldValues: ['name'] }),
        expectedResponse: Page.build([
          new Book({ id: '1', name: 'Book 1' }),
          new Book({ id: '2', name: 'Book 2' })
        ]),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findOne: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ endBefore: 'name' })).toPromise(),
        expectedQuery: expectQuery('endBefore', { fieldValues: ['name'] }),
        expectedPath: '/books',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      }
    });
  });

  describe('should add limit query', () => {
    class BookQuery {

      @FirestoreLimit()
      public limit: number;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ limit: 1 })).toPromise(),
        expectedPath: '/books',
        expectedQuery: expectQuery('limit', { limit: 1 }),
        expectedResponse: Page.build([
          new Book({ id: '1', name: 'Book 1' }),
          new Book({ id: '2', name: 'Book 2' })
        ]),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findOne: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ limit: 1 })).toPromise(),
        expectedQuery: expectQuery('limit', { limit: 1 }),
        expectedPath: '/books',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      }
    });
  });

  describe('should add limit to last query', () => {
    class BookQuery {

      @FirestoreLimitToLast()
      public limitToLast: number;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ limitToLast: 1 })).toPromise(),
        expectedPath: '/books',
        expectedQuery: expectQuery('limitToLast', { limit: 1 }),
        expectedResponse: Page.build([
          new Book({ id: '1', name: 'Book 1' }),
          new Book({ id: '2', name: 'Book 2' })
        ]),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findOne: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ limitToLast: 1 })).toPromise(),
        expectedQuery: expectQuery('limitToLast', { limit: 1 }),
        expectedPath: '/books',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      }
    });
  });
});
