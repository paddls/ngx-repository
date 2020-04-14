import {Person} from '../model/person.model';
import {Observable} from 'rxjs';
import {PersonQuery} from '../query/person.query';
import {Injectable} from '@angular/core';
import {HttpRepository, Repository} from 'ngx-repository';

@Injectable()
@Repository(Person)
export class PersonRepository extends HttpRepository<Person, string> {

  public searchByFirstName(searchedFirstName: string): Observable<Person[]> {
    return this.findBy(new PersonQuery({
      firstNameStartWith: searchedFirstName
    }));
  }
}
