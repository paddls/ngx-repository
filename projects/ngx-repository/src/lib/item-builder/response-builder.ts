import {Observable} from 'rxjs';
import {AbstractRepository} from '../repository/abstract.repository';

export interface ResponseBuilder<RS, R extends AbstractRepository<any, any, any, any> = AbstractRepository<any, any, any, any>> {

  build(response$: Observable<RS>, repository: R): Observable<any>;
}
