import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Library} from '../../module/@core/model/library.model';
import {Person} from '../../module/@core/model/person.model';
import {PersonService} from '../../module/@core/service/person.service';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {LibrariesService} from '../../service/libraries.service';
import {Page} from 'ngx-repository';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent {

  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  private searchedFirstNameChangeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public searchedFirstName: string;

  public libraries$: Observable<Page<Library>>;

  public pages$: Observable<number[]>;

  public person$: Observable<Person[]>;

  public constructor(librariesService: LibrariesService, personService: PersonService) {
    this.libraries$ = this.currentPageSubject.pipe(
      switchMap((currentPage: number) => librariesService.findAll(currentPage)),
      shareReplay({bufferSize: 1, refCount:  true})
    );

    this.pages$ = this.libraries$.pipe(
      map((page: Page<Library>) => Array.from(Array(Math.ceil(page.totalItems / page.itemsPerPage)).keys()))
    );

    this.person$ = this.searchedFirstNameChangeSubject.pipe(
      switchMap((searchedFirstName: string) => personService.searchByFirstName(searchedFirstName))
    );
  }

  public onSearchedFirstNameChange(): void {
    this.searchedFirstNameChangeSubject.next(this.searchedFirstName);
  }

  public onClickOnPage(page: number): void {
    this.currentPageSubject.next(page);
  }
}
