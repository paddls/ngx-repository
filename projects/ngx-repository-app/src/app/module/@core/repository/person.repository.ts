import { Person } from '../model/person.model';
import { Observable } from 'rxjs';
import { PersonQuery } from '../query/person.query';
import { inject, Injectable } from '@angular/core';
import { Repository, RequestManager } from '@paddls/ngx-repository';
import { HttpQueryFn, HttpRepository, HttpRepositoryDriver } from '@paddls/ngx-http-repository';

@Injectable()
@Repository(() => Person)
export class PersonRepository extends HttpRepository<Person, string> {

  public constructor() {
    super(inject(RequestManager), inject(HttpRepositoryDriver));
  }

  public searchByFirstName(searchedFirstName: string): Observable<Person[]> {
    return this.findAll(new PersonQuery({
      firstNameStartWith: searchedFirstName
    }));
  }
}
