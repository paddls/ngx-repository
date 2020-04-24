import {Person} from '../model/person.model';
import {Observable} from 'rxjs';
import {PersonQuery} from '../query/person.query';
import {Injectable} from '@angular/core';
import {Repository} from '@witty-services/ngx-repository';
import {HttpRepository} from '@witty-services/ngx-http-repository';

@Injectable()
@Repository(Person)
export class PersonRepository extends HttpRepository<Person, string> {

  public searchByFirstName(searchedFirstName: string): Observable<Person[]> {
    return this.findAll(new PersonQuery({
      firstNameStartWith: searchedFirstName
    }));
  }
}
