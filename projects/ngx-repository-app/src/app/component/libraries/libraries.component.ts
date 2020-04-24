import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Library} from '../../module/@core/model/library.model';
import {Person} from '../../module/@core/model/person.model';
import {PersonService} from '../../module/@core/service/person.service';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {LibrariesService} from '../../service/libraries.service';
import {Page} from '@witty-services/ngx-repository';
import {Client} from '../../module/@core/model/client.model';
import {ClientService} from '../../module/@core/service/client.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent {

  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  private searchedPersonFirstNameChangeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  private searchedClientLastNameChangeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public searchedPersonFirstName: string;

  public searchedClientLastName: string;

  public libraries$: Observable<Page<Library>>;

  public pages$: Observable<number[]>;

  public person$: Observable<Person[]>;

  public client$: Observable<Client[]>;

  public constructor(private librariesService: LibrariesService,
                     private personService: PersonService,
                     private readonly clientService: ClientService) {
    this.libraries$ = this.currentPageSubject.pipe(
      switchMap((currentPage: number) => librariesService.findAll(currentPage)),
      shareReplay({bufferSize: 1, refCount:  true})
    );

    this.pages$ = this.libraries$.pipe(
      map((page: Page<Library>) => Array.from(Array(Math.ceil(page.totalItems / page.itemsPerPage)).keys()))
    );

    this.person$ = this.searchedPersonFirstNameChangeSubject.pipe(
      switchMap((searchedFirstName: string) => personService.searchByFirstName(searchedFirstName))
    );

    this.client$ = this.searchedClientLastNameChangeSubject.pipe(
      switchMap((searchedLastName: string) => clientService.searchByLastName(searchedLastName))
    );
  }

  public onSearchedPersonFirstNameChange(): void {
    this.searchedPersonFirstNameChangeSubject.next(this.searchedPersonFirstName);
  }

  public onSearchedClientLastNameChange(): void {
    this.searchedClientLastNameChangeSubject.next(this.searchedClientLastName);
  }

  public onClickOnPage(page: number): void {
    this.currentPageSubject.next(page);
  }

  public createLibrary(): void {
    this.librariesService.create().subscribe(console.log);
  }

  public createPerson(): void {
    this.personService.create().subscribe((id: string) => {
      console.log(id);
      this.searchedPersonFirstNameChangeSubject.next(this.searchedPersonFirstName);
    });
  }

  public createClient(): void {
    this.clientService.create().subscribe(console.log);
  }

  public deleteClient(client: Client): void {
    this.clientService.delete(client).subscribe();
  }

  public updateClient(client: Client): void {
    this.clientService.update(client).subscribe();
  }
}
