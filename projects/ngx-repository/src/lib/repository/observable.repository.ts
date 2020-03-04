import { AbstractRepository, Denormalizer, Normalizer } from '@witty-services/repository-core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export abstract class ObservableRepository<T, K = null, P = null, O = null> extends AbstractRepository<T, K, P, O> {

  protected constructor(denormalizer: Denormalizer<T>, normalizer: Normalizer<T>) {
    super(denormalizer, normalizer);
  }

  protected abstract onFindAll(path: string, params?: P, options?: O): Observable<T[]>;
  protected abstract onFindOne(path: string, id: K, params?: P, options?: O): Observable<T>;
  protected abstract onDelete(path: string, object: T, params?: P, options?: O): Observable<any>;
  protected abstract onCreate(path: string, object: T, params?: P, options?: O): Observable<any>;
  protected abstract onUpdate(path: string, object: T, params?: P, options?: O): Observable<any>;

  public findAll(params?: P, options?: O): Observable<T[]> {
    return super.findAll(params, options).pipe(
      map((datas: any[]) => this.denormalizeAll(datas, params))
    );
  }

  public findOne(id: K, params?: P, options?: O): Observable<T> {
    return super.findOne(id, params, options).pipe(
      map((data: any) => this.denormalizeOne(data, params))
    );
  }

  public create(object: T, params?: P, options?: O): Observable<any> {
    return super.create(object, params, options);
  }

  public update(object: T, params?: P, options?: O): Observable<any> {
    return super.update(object, params, options);
  }

  public delete(object: T, params?: P, options?: O): Observable<any> {
    return super.delete(object, params, options);
  }
}
