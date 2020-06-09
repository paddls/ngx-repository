import {Observable} from 'rxjs';
import {Page} from './page';
import {AbstractRepository} from '../repository/abstract.repository';

export interface PageBuilder<RS, R extends AbstractRepository<any, any, any, any> = AbstractRepository<any, any, any, any>> {

  buildPage(response: Observable<RS>, repository: R): Observable<Page<any>>;
}
