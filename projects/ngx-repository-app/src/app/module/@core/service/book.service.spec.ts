import {TestBed} from '@angular/core/testing';
import {NgxRepositoryModule, NgxRepositoryService, Page} from '@witty-services/ngx-repository';
import {HttpRepository, NgxHttpRepositoryModule} from '@witty-services/ngx-http-repository';
import {of, Subject} from 'rxjs';
import {BookService} from './book.service';
import {Book} from '../model/book.model';
import {BookQuery} from '../query/book.query';

describe('BookService', () => {
  let bookService: BookService;
  let books$: Subject<Page<Book>>;
  let bookRepository: HttpRepository<string, Book>;

  beforeEach(() => {
    books$ = new Subject<Page<Book>>();
    bookRepository = {
      findById: () => void 0,
      findAll: () => books$
    } as any;

    TestBed.configureTestingModule({
      imports: [
        NgxRepositoryModule.forRoot(),
        NgxHttpRepositoryModule.forRoot()
      ],
      providers: [
        BookService,
        {
          provide: NgxRepositoryService,
          useValue: {
            getRepository: () => bookRepository
          }
        }
      ]
    });

    bookService = TestBed.get(BookService);
  });

  // TODO @RMA move unit test inside ngx-repository project
  describe('#findAll', () => {
    it('should call findAll from read repository', (done: DoneFn) => {
      spyOn(bookRepository, 'findById').and.returnValue(of(new Book({
        id: '1'
      })));

      const query: BookQuery = new BookQuery();

      bookService.findById('1', query).subscribe((book: Book) => {
        expect(bookRepository.findById).toHaveBeenCalledWith('1', query);

        expect(book).toEqual(new Book({id: '1'}));

        done();
      });
    });
  });
});
