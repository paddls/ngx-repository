import {Person} from '../model/person.model';
import {Injectable} from '@angular/core';
import {HttpConnection, HttpRepository} from 'ngx-repository';
import {Repository} from '@witty-services/repository-core';
import {Observable} from 'rxjs';

export interface SearchCriteria {
  firstName: string;
}

@Injectable()
@Repository({
  resourceType: Person,
  path: '/persons'
})
export class ReadPersonRepository extends HttpRepository<Person, string> {

  public constructor(httpConnection: HttpConnection) {
    super(httpConnection);
  }

  public findBy(criteria: SearchCriteria): Observable<Person[]> {
    const params: {[key: string]: string} = {};

    if (criteria.firstName) {
      params[`firstName`] = `^${criteria.firstName}`;
    }

    return this.find(null, {params});
  }
}
