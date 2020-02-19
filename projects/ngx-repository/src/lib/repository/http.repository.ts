import {Denormalizer, Normalizer} from '@witty-services/repository-core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ObservableRepository} from './observable.repository';

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: any;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

export abstract class HttpRepository<T, K = null, P = null> extends ObservableRepository<T, K, P, HttpOptions> {

  public constructor(private http: HttpClient, denormalizer: Denormalizer<T>, normalizer: Normalizer<T>) {
    super(denormalizer, normalizer);
  }

  protected onFindAll(path: string, params?: P, options?: HttpOptions): Observable<any> {
    return this.http.get(path, options);
  }

  protected onFindOne(path, id: K, params?: P, options?: HttpOptions): Observable<any> {
    return this.http.get(path, options);
  }

  protected onCreate(path: string, object: T, options?: HttpOptions): Observable<any> {
    return this.http.post(path, this.normalizeOne(object), options);
  }

  protected onUpdate(path: string, object: T, options?: HttpOptions): Observable<any> {
    return this.http.put(path, this.normalizeOne(object), options);
  }

  protected onDelete(path: string, options?: HttpOptions): Observable<any> {
    return this.http.delete(path, options);
  }
}
