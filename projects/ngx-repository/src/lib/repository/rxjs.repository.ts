import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AbstractRepository} from './abstract.repository';
import {Page} from '../page-builder/page';

export abstract class RxjsRepository<T, K, RC, RQ, RS> extends AbstractRepository<T, K, RC, RQ, RS> {

  public findBy(query?: any): Observable<Page<T>> {
    return super.findBy(query).pipe(
      map((data: Page<T>) => this.denormalizeAll(data, query))
    );
  }

  public findOne(id: K, query: any = {}): Observable<T> {
    return super.findOne(id, query).pipe(
      map((data: any) => this.denormalizeOne(data, query))
    );
  }

  public create(object: T, query?: any): Observable<any> {
    return super.create(object, query);
  }

  public update(object: T, query: any = {}): Observable<any> {
    return super.update(object, query);
  }

  public delete(object: T, query: any = {}): Observable<any> {
    return super.delete(object, query);
  }
}
