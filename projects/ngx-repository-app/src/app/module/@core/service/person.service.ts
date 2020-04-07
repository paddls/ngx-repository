import {ReadPersonRepository} from '../repository/person.repository';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Person} from '../model/person.model';

@Injectable()
export class PersonService {

  public constructor(private readPersonRepository: ReadPersonRepository) {
  }

  public searchByFirstName(searchedFirstName: string): Observable<Person[]> {
    return this.readPersonRepository.findBy({firstName: searchedFirstName});
  }
}
