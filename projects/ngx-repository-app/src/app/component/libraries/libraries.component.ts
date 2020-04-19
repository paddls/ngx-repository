import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Library} from '../../module/@core/model/library.model';
import {Person} from '../../module/@core/model/person.model';
import {PersonService} from '../../module/@core/service/person.service';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import {LibrariesService} from '../../service/libraries.service';
import {Page} from '@witty-services/ngx-repository';
import { Client } from '../../module/@core/model/client.model';
import { ClientService } from '../../module/@core/service/client.service';

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
  public client$: Observable<Client[]>;

  public constructor(librariesService: LibrariesService,
                     personService: PersonService,
                     clientService: ClientService) {
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

    this.client$ = clientService.findAll(0, 10).pipe(
      tap(console.log)
    );
  }

  public onSearchedFirstNameChange(): void {
    this.searchedFirstNameChangeSubject.next(this.searchedFirstName);
  }

  public onClickOnPage(page: number): void {
    this.currentPageSubject.next(page);
  }
}
