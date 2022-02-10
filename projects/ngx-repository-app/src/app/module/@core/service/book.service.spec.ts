import { TestBed } from '@angular/core/testing';
import { MockRepository, NgxRepositoryTestingModule } from '@paddls/ngx-repository';
import { HttpRepository } from '@paddls/ngx-http-repository';
import { Observable } from 'rxjs';
import { BookService } from './book.service';
import { Book } from '../model/book.model';
import { BookQuery } from '../query/book.query';
import { TestScheduler } from 'rxjs/testing';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';

describe('BookService', () => {
  let bookService: BookService;
  let bookRepository: MockRepository;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxRepositoryTestingModule.forTest()
      ],
      providers: [
        BookService
      ]
    });

    testScheduler = new TestScheduler(((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    }));
    bookRepository = NgxRepositoryTestingModule.getRepository(Book, HttpRepository);
    bookService = TestBed.get(BookService);
  });

  describe('#findAll', () => {
    it('should call findById from repository', (done: DoneFn) => {
      const query: BookQuery = new BookQuery();

      bookService.findById('1', query).subscribe((book: Book) => {
        expect(bookRepository.findById).toHaveBeenCalledWith('1', query);

        expect(book).toEqual(new Book({ id: '1' }));

        done();
      });

      bookRepository.emit('findById', new Book({
        id: '1'
      }));
    });

    it('should call findById from repository using marble', () => {
      testScheduler.run(({ expectObservable, cold }: RunHelpers) => {
        const query: BookQuery = new BookQuery();

        spyOn(bookRepository, 'findById').and.returnValue(cold('a', { a: new Book({ id: '1' }) }));

        const source$: Observable<Book> = bookService.findById('1', query);

        expectObservable(source$).toBe('a', { a: new Book({ id: '1' }) });
      });
    });
  });
});
