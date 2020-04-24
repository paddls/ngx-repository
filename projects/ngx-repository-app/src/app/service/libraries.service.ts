import {LibraryService} from '../module/@core/service/library.service';
import {Library} from '../module/@core/model/library.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {shareReplay, switchMapTo, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Page} from '@witty-services/ngx-repository';
import {Chance} from 'chance';

@Injectable()
export class LibrariesService {

  private librariesSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

  private libraries$: Observable<Page<Library>>;

  private chance: Chance.Chance = new Chance.Chance();

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

  public create(): Observable<string> {
    return this.libraryService.create(new Library({
      id: `${Date.now()}`,
      name: this.chance.company(),
      opened: true
    })).pipe(
      tap(() => this.refresh())
    );
  }
}
