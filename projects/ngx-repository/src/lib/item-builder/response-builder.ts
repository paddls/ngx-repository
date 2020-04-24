import {Observable} from 'rxjs';
import {AbstractRepository} from '../repository/abstract.repository';

export interface ResponseBuilder<RS> {

  build(response$: Observable<RS>, repository: AbstractRepository<any, any, any, any>): Observable<any>;
}
