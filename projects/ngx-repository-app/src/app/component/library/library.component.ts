import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Library } from '../../module/@core/model/library.model';
import { filter, map, switchMap, switchMapTo } from 'rxjs/operators';
import { LibraryService } from '../../module/@core/service/library.service';
import { LibrariesService } from '../../service/libraries.service';
import { Book } from '../../module/@core/model/book.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {

  public library$: Observable<Library>;
  private reload$: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
  private expandedBooks: Map<string, boolean> = new Map<string, boolean>();

  public constructor(activatedRoute: ActivatedRoute,
                     private librariesService: LibrariesService,
                     private libraryService: LibraryService,
                     private router: Router) {
    this.library$ = this.reload$.pipe(
      switchMapTo(activatedRoute.params),
      filter((params: Params) => !!params),
      map((params: Params) => params[`libraryId`]),
      switchMap((libraryId: string) => this.libraryService.findById(libraryId))
    );
  }

  public bookIsExpanded(book: Book): boolean {
    return this.expandedBooks.has(book.id) && !!this.expandedBooks.get(book.id);
  }

  public toggleBook(book: Book): void {
    if (!this.expandedBooks.has(book.id)) {
      this.expandedBooks.set(book.id, true);
    } else {
      this.expandedBooks.set(book.id, !this.expandedBooks.get(book.id));
    }
  }

  public onUpdateLibrary(library: Library): void {
    this.libraryService.update(library).subscribe(
      () => {
        this.librariesService.refresh();
        this.reload$.next();
      }
    );
  }

  public onDeleteLibrary(library: Library): void {
    this.libraryService.delete(library).subscribe(
      () => {
        this.router.navigate(['/']);
        this.librariesService.refresh();
      }
    );
  }
}
