import {LibraryService} from '../module/@core/service/library.service';
import {Library} from '../module/@core/model/library.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay, switchMapTo} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class LibrariesService {

  private librariesSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

  private readonly libraries$: Observable<Library[]>;

  public constructor(libraryService: LibraryService) {
    this.libraries$ = this.librariesSubject.pipe(
      switchMapTo(libraryService.findAll()),
      shareReplay({bufferSize: 1, refCount: true})
    );
  }

  public findAll(): Observable<Library[]> {
    return this.libraries$;
  }

  public refresh(): void {
    this.librariesSubject.next();
  }
}
