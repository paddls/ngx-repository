import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Library} from '../../module/@core/model/library.model';
import {Person} from '../../module/@core/model/person.model';
import {PersonService} from '../../module/@core/service/person.service';
import {switchMap} from 'rxjs/operators';
import {LibrariesService} from '../../service/libraries.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent {

  private searchedFirstNameChangeSubject: Subject<string> = new Subject<string>();

  public searchedFirstName: string;

  public libraries$: Observable<Library[]>;

  public person$: Observable<Person[]>;

  public constructor(librariesService: LibrariesService, personService: PersonService) {
    this.libraries$ = librariesService.findAll();
    this.person$ = this.searchedFirstNameChangeSubject.pipe(
      switchMap((searchedFirstName: string) => personService.searchByFirstName(searchedFirstName))
    );
  }

  public onSearchedFirstNameChange(): void {
    if (!this.searchedFirstName) {
      return;
    }

    this.searchedFirstNameChangeSubject.next(this.searchedFirstName);
  }
}
