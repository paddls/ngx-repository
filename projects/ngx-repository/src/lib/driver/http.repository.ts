import {AbstractRepository, Denormalizer, Normalizer} from '@witty-services/repository-core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export abstract class HttpRepository<T, K, P> extends AbstractRepository<T, K, P> {

  protected constructor(private http: HttpClient, denormalizer: Denormalizer<T>, normalizer: Normalizer<T>) {
    super(denormalizer, normalizer);
  }

  public findAll(params?: P): Observable<T[]> {
    return this.http.get(this.getPath(params)).pipe(
      map((datas: any[]) => this.denormalizeAll(datas, params))
    );
  }

  public findOne(id: K): Observable<T> {
    return this.http.get(`${this.getPath()}/${id}`).pipe(
      map((data: any) => this.denormalizeOne(data))
    );
  }

  public create(object: T, params?: P): Observable<HttpResponse<any>> {
    return this.http.post(
      `${this.getPath(params)}`,
      this.normalizeOne(object, params),
      {
        observe: 'response'
      }
    );
  }

  public update(object: T, params?: P): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.getPath(params)}/${this.getIdOfObject(object)}`,
      this.normalizeOne(object),
      {
        observe: 'response'
      }
    );
  }

  public delete(object: T, params?: P): Observable<HttpResponse<any>> {
    return this.http.delete(
      `${this.getPath(params)}/${this.getIdOfObject(object)}`,
      {
        observe: 'response'
      }
    );
  }
}
