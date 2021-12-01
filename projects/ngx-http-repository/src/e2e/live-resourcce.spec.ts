import { TestBed } from '@angular/core/testing';
import { Column, Id, InjectRepository, NgxRepositoryModule, Page } from '@witty-services/ngx-repository';
import { HttpLiveResource, HttpRepository, HttpResource, NgxHttpRepositoryModule } from '../public-api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { take, toArray } from 'rxjs/operators';

describe('LiveResource', () => {

  let repository: HttpRepository<Book, number>;
  let httpClient: HttpClient;

  @HttpLiveResource()
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

  @Injectable()
  class BookService {

    @InjectRepository({ resourceType: () => Book, repository: () => HttpRepository })
    public readonly repository: HttpRepository<Book, number>;

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxRepositoryModule.forRoot(),
        NgxHttpRepositoryModule.forRoot()
      ],
      providers: [
        BookService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    repository = TestBed.get(BookService).repository;
  });

  describe('#findAll', () => {

    const expectedResponse: Page<Book>[] = [
      Page.build([
        new Book({ id: 1, name: 'Book 1' })
      ]),
      Page.build([
        new Book({ id: 1, name: 'Book 1' }),
        new Book({ id: 2, name: 'Book 2' })
      ])
    ];

    beforeEach(() => {
      spyOn(httpClient, 'request').and.returnValues(
        of({
          body: [{ id: 1, name: 'Book 1' }]
        }),
        of({}),
        of({
          body: [{ id: 1, name: 'Book 1' }, { id: 2, name: 'Book 2' }]
        })
      );
    });

    it('should refresh findAll on create', (done: DoneFn) => {
      repository.findAll().pipe(
        take(2),
        toArray()
      ).subscribe((books: Page<Book>[]) => {
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.create(new Book()).subscribe();
    });

    it('should refresh findAll on update', (done: DoneFn) => {
      repository.findAll().pipe(
        take(2),
        toArray()
      ).subscribe((books: Page<Book>[]) => {
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.update(new Book()).subscribe();
    });

    it('should refresh findAll on patch', (done: DoneFn) => {
      repository.findAll().pipe(
        take(2),
        toArray()
      ).subscribe((books: Page<Book>[]) => {
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.patch(new Book()).subscribe();
    });

    it('should refresh findAll on delete', (done: DoneFn) => {
      repository.findAll().pipe(
        take(2),
        toArray()
      ).subscribe((books: Page<Book>[]) => {
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.delete(new Book()).subscribe();
    });
  });

  describe('#findOne', () => {
    const expectedResponse: Book[] = [
      new Book({ id: 1, name: 'Book 1' }),
      new Book({ id: 1, name: 'Book 3' })
    ];

    beforeEach(() => {
      spyOn(httpClient, 'request').and.returnValues(
        of({
          body: [{ id: 1, name: 'Book 1' }]
        }),
        of({}),
        of({
          body: [{ id: 1, name: 'Book 3' }, { id: 2, name: 'Book 2' }]
        })
      );
    });

    it('should refresh findOne on update', (done: DoneFn) => {
      repository.findOne().pipe(
        take(2),
        toArray()
      ).subscribe((books: Book[]) => {
        expect(httpClient.request).toHaveBeenCalledTimes(3);
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.update(new Book({ id: 1 })).subscribe();
    });

    it('should refresh findOne on patch', (done: DoneFn) => {
      repository.findOne().pipe(
        take(2),
        toArray()
      ).subscribe((books: Book[]) => {
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.patch(new Book({ id: 1 })).subscribe();
    });

    it('should refresh findOne on delete', (done: DoneFn) => {
      repository.findOne().pipe(
        take(2),
        toArray()
      ).subscribe((books: Book[]) => {
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.delete(new Book({ id: 1 })).subscribe();
    });
  });

  describe('#findById', () => {
    const expectedResponse: Book[] = [
      new Book({ id: 1, name: 'Book 1' }),
      new Book({ id: 1, name: 'Book 3' })
    ];

    beforeEach(() => {
      spyOn(httpClient, 'request').and.returnValues(
        of({
          body: { id: 1, name: 'Book 1' }
        }),
        of({}),
        of({
          body: { id: 1, name: 'Book 3' }
        })
      );
    });

    it('should refresh findById on update', (done: DoneFn) => {
      repository.findById(1).pipe(
        take(2),
        toArray()
      ).subscribe((books: Book[]) => {
        expect(httpClient.request).toHaveBeenCalledTimes(3);
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.update(new Book({ id: 1 })).subscribe();
    });

    it('should refresh findById on patch', (done: DoneFn) => {
      repository.findById(1).pipe(
        take(2),
        toArray()
      ).subscribe((books: Book[]) => {
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.patch(new Book({ id: 1 })).subscribe();
    });

    it('should refresh findById on delete', (done: DoneFn) => {
      repository.findById(1).pipe(
        take(2),
        toArray()
      ).subscribe((books: Book[]) => {
        expect(books).toEqual(expectedResponse);
        done();
      });

      repository.delete(new Book({ id: 1 })).subscribe();
    });
  });
});
