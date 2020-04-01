import { Injectable } from '@angular/core';
import {Library} from '../model/library.model';
import {Observable} from 'rxjs';
import {LibraryRepository} from '../repository/library.repository';
import {mapTo} from 'rxjs/operators';

@Injectable()
export class LibraryService {

  public constructor(private libraryRepository: LibraryRepository) { }

  public findAll(): Observable<Library[]> {
    return this.libraryRepository.findAll();
  }

  public findById(id: string): Observable<Library> {
    return this.libraryRepository.findOne(id);
  }

  public update(library: Library): Observable<Library> {
    return this.libraryRepository.update(library).pipe(
      mapTo(library)
    );
  }

  public delete(library: Library): Observable<void> {
    return this.libraryRepository.delete(library).pipe(
      mapTo(void 0)
    );
  }
}
