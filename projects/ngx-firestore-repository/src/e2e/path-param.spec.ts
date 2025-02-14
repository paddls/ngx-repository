import { FirestoreResource } from '../lib/decorator/firestore-resource.decorator';
import { Column, Id, Page, PathParam, SubQuery } from '@paddls/ngx-repository';
import {
  expectCollectionAdd,
  expectDocumentDelete,
  expectDocumentUpdate,
  testFirestoreRepository
} from './util/test-firestore-repository.spec';
import { FirestoreRepository } from '../lib/repository/firestore.repository';
import { Converter } from '@paddls/ts-serializer';

describe('PathParam', () => {

  @FirestoreResource({
    path: '/books/:category'
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

  describe('should add simple path param', () => {
    class BookQuery {

      @PathParam()
      public category: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen',
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
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findById: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findById(1, new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: { id: '1', name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.create(new Book({ name: 'Book 1' }), new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen',
        expectedRequest: expectCollectionAdd({ name: 'Book 1' }),
        expectedResponse: '1',
        mockedResponse: { id: '1' }
      },
      update: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.update(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedRequest: expectDocumentUpdate({ id: '1', name: 'Book 1' }),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.patch(
          new Book({ id: '2', name: 'Book 2' }),
          new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen/2',
        expectedRequest: expectDocumentUpdate({ id: '2', name: 'Book 2' }),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.delete(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should add named path param', () => {
    class BookQuery {

      @PathParam('category')
      public categoryName: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen',
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
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findById: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findById(1, new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: { id: '1', name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.create(new Book({ name: 'Book 1' }), new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen',
        expectedRequest: expectCollectionAdd({ name: 'Book 1' }),
        expectedResponse: '1',
        mockedResponse: { id: '1' }
      },
      update: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.update(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedRequest: expectDocumentUpdate({ id: '1', name: 'Book 1' }),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.patch(
          new Book({ id: '2', name: 'Book 2' }),
          new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen/2',
        expectedRequest: expectDocumentUpdate({ id: '2', name: 'Book 2' }),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.delete(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted path param', () => {
    class UppercaseConverter implements Converter<string, string> {
      public fromJson(value: string): string {
        return value ? value.toLowerCase() : value;
      }

      public toJson(value: string): string {
        return value ? value.toUpperCase() : value;
      }
    }

    class BookQuery {

      @PathParam({ customConverter: () => UppercaseConverter })
      public category: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN',
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
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findById: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findById(1, new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN/1',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: { id: '1', name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.create(new Book({ name: 'Book 1' }), new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN',
        expectedRequest: expectCollectionAdd({ name: 'Book 1' }),
        expectedResponse: '1',
        mockedResponse: { id: '1' }
      },
      update: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.update(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN/1',
        expectedRequest: expectDocumentUpdate({ id: '1', name: 'Book 1' }),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.patch(
          new Book({ id: '2', name: 'Book 2' }),
          new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN/2',
        expectedRequest: expectDocumentUpdate({ id: '2', name: 'Book 2' }),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.delete(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ category: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should add custom converted named path param', () => {
    class UppercaseConverter implements Converter<string, string> {
      public fromJson(value: string): string {
        return value ? value.toLowerCase() : value;
      }

      public toJson(value: string): string {
        return value ? value.toUpperCase() : value;
      }
    }

    class BookQuery {

      @PathParam({ customConverter: () => UppercaseConverter, name: 'category' })
      public categoryName: string;

      public constructor(data: Partial<BookQuery> = {}) {
        Object.assign(this, data);
      }
    }

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN',
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
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findById: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findById(1, new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN/1',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: { id: '1', name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.create(new Book({ name: 'Book 1' }), new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN',
        expectedRequest: expectCollectionAdd({ name: 'Book 1' }),
        expectedResponse: '1',
        mockedResponse: { id: '1' }
      },
      update: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.update(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN/1',
        expectedRequest: expectDocumentUpdate({ id: '1', name: 'Book 1' }),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.patch(
          new Book({ id: '2', name: 'Book 2' }),
          new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN/2',
        expectedRequest: expectDocumentUpdate({ id: '2', name: 'Book 2' }),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.delete(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ categoryName: 'shonen' })).toPromise(),
        expectedPath: '/books/SHONEN/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });

  describe('should add deep path param', () => {
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

    testFirestoreRepository({
      findAll: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findAll(new BookQuery({ child: new SubBookQuery({ category: 'shonen' }) })).toPromise(),
        expectedPath: '/books/shonen',
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
        request: (repository: FirestoreRepository<any>) => repository.findOne(new BookQuery({ child: new SubBookQuery({ category: 'shonen' }) })).toPromise(),
        expectedPath: '/books/shonen',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: [
          { id: '1', name: 'Book 1' },
          { id: '2', name: 'Book 2' }
        ]
      },
      findById: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.findById(1, new BookQuery({ child: new SubBookQuery({ category: 'shonen' }) })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedResponse: new Book({ id: '1', name: 'Book 1' }),
        mockedResponse: { id: '1', name: 'Book 1' }
      },
      create: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.create(new Book({ name: 'Book 1' }), new BookQuery({ child: new SubBookQuery({ category: 'shonen' }) })).toPromise(),
        expectedPath: '/books/shonen',
        expectedRequest: expectCollectionAdd({ name: 'Book 1' }),
        expectedResponse: '1',
        mockedResponse: { id: '1' }
      },
      update: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.update(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ child: new SubBookQuery({ category: 'shonen' }) })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedRequest: expectDocumentUpdate({ id: '1', name: 'Book 1' }),
        expectedResponse: void 0
      },
      patch: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.patch(
          new Book({ id: '2', name: 'Book 2' }),
          new BookQuery({ child: new SubBookQuery({ category: 'shonen' }) })).toPromise(),
        expectedPath: '/books/shonen/2',
        expectedRequest: expectDocumentUpdate({ id: '2', name: 'Book 2' }),
        expectedResponse: void 0
      },
      delete: {
        entity: Book,
        request: (repository: FirestoreRepository<any>) => repository.delete(
          new Book({ id: '1', name: 'Book 1' }),
          new BookQuery({ child: new SubBookQuery({ category: 'shonen' }) })).toPromise(),
        expectedPath: '/books/shonen/1',
        expectedRequest: expectDocumentDelete(),
        expectedResponse: void 0
      }
    });
  });
});
