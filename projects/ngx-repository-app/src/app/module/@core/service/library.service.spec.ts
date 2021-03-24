import { TestBed } from '@angular/core/testing';
import { MockRepository, NgxRepositoryTestingModule, Page } from '@witty-services/ngx-repository';
import { LibraryService } from './library.service';
import { Library } from '../model/library.model';
import { HttpRepository } from '@witty-services/ngx-http-repository';
import { LibraryQuery } from '../query/library.query';
import { of } from 'rxjs';

describe('LibraryService', () => {
  let libraryService: LibraryService;
  let libraryRepository: MockRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxRepositoryTestingModule.forTest()
      ],
      providers: [
        LibraryService
      ]
    });

    libraryRepository = NgxRepositoryTestingModule.getRepository(Library, HttpRepository);

    libraryService = TestBed.get(LibraryService);
  });

  describe('#findAll', () => {
    it('should call findAll from read repository', (done: DoneFn) => {
      spyOn(libraryRepository, 'findAll').and.returnValue(of(Page.build([])));

      libraryService.findAll(1, 5).subscribe((page: Page) => {
        expect(libraryRepository.findAll).toHaveBeenCalledWith(new LibraryQuery({
          opened: true,
          page: 1,
          itemPerPage: 5
        }));

        expect(page.length).toBe(0);

        done();
      });
    });
  });
});
