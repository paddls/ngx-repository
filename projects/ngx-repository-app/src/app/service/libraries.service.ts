import {LibraryService} from '../module/@core/service/library.service';
import {Library} from '../module/@core/model/library.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay, switchMapTo} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Page} from 'ngx-repository';

@Injectable()
export class LibrariesService {

  private librariesSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

  private libraries$: Observable<Page<Library>>;

  public constructor(private libraryService: LibraryService) {
  }

  public findAll(currentPage: number, itemPerPage: number = 2): Observable<Page<Library>> {
    this.libraries$ = this.librariesSubject.pipe(
      switchMapTo(this.libraryService.findAll(currentPage, itemPerPage)),
      shareReplay({bufferSize: 1, refCount: true})
    );

    return this.libraries$;
  }

  public refresh(): void {
    this.librariesSubject.next();
  }
}
