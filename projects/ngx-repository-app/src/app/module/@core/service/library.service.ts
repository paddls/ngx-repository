import {Injectable} from '@angular/core';
import {Library} from '../model/library.model';
import {Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {LibraryQuery} from '../query/library.query';
import {HttpConnection, HttpRepository, InjectRepository, Page} from '@witty-services/ngx-repository';

@Injectable()
export class LibraryService {

  @InjectRepository({type: Library, connection: HttpConnection})
  private readLibraryRepository: HttpRepository<Library, string>;

  @InjectRepository({type: Library, connection: HttpConnection})
  private writeLibraryRepository: HttpRepository<Library, string>;

  public findAll(currentPage: number, itemPerPage: number): Observable<Page<Library>> {
    return this.readLibraryRepository.findBy(new LibraryQuery({
      opened: true,
      page: currentPage,
      itemPerPage
    }));
  }

  public findById(id: string): Observable<Library> {
    return this.readLibraryRepository.findOne(id);
  }

  public update(library: Library): Observable<Library> {
    return this.writeLibraryRepository.update(library).pipe(
      mapTo(library)
    );
  }

  public delete(library: Library): Observable<void> {
    return this.writeLibraryRepository.delete(library).pipe(
      mapTo(void 0)
    );
  }
}
