import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Person} from '../model/person.model';
import {PersonRepository} from '../repository/person.repository';

@Injectable()
export class PersonService {

  public constructor(private personRepository: PersonRepository) {
  }

  public searchByFirstName(searchedFirstName: string): Observable<Person[]> {
    return this.personRepository.searchByFirstName(searchedFirstName);
  }
}
