import {Observable} from 'rxjs';
import {Page} from './page';
import {AbstractRepository} from '../repository/abstract.repository';

export interface PageBuilder<RS> {

  buildPage(response: Observable<RS>, repository: AbstractRepository<any, any, any, any>): Observable<Page<any>>;
}
