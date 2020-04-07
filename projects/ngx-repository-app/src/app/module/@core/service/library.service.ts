import {Injectable} from '@angular/core';
import {Library} from '../model/library.model';
import {Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {RxjsRepository} from '@witty-services/repository-core';
import {FirebaseConnection, HttpConnection} from 'ngx-repository';

@Injectable()
export class LibraryService {

  private readLibraryRepository: RxjsRepository<Library, string>;

  private writeLibraryRepository: RxjsRepository<Library, string>;

  public constructor(readConnection: HttpConnection, writeConnection: FirebaseConnection) {
    this.readLibraryRepository = readConnection.getResourceRepository(Library);
    this.writeLibraryRepository = writeConnection.getResourceRepository(Library);
  }

  public findAll(): Observable<Library[]> {
    return this.readLibraryRepository.find();
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
