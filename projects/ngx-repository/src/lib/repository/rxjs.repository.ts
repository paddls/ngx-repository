import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AbstractRepository} from './abstract.repository';
import {Page} from '../page-builder/page';

export abstract class RxjsRepository<T, K, Q, RC, RQ, RS> extends AbstractRepository<T, K, Q, RC, RQ, RS> {

  public findBy(query?: Q): Observable<Page<T>> {
    return super.findBy(query).pipe(
      map((datas: Page<T>) => this.denormalizeAll(datas, query))
    );
  }

  public findOne(id: K, query?: Q): Observable<T> {
    return super.findOne(id, query).pipe(
      map((data: any) => this.denormalizeOne(data, query))
    );
  }

  public create(object: T, query?: Q): Observable<any> {
    return super.create(object, query);
  }

  public update(object: T, query?: Q): Observable<any> {
    return super.update(object, query);
  }

  public delete(object: T, query?: Q): Observable<any> {
    return super.delete(object, query);
  }
}
