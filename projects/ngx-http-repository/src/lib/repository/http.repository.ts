import {HttpRepositoryDriver} from '../driver/http-repository.driver';
import {Observable} from 'rxjs';
import {first} from 'lodash';
import {
  CreateRepository,
  DeleteRepository,
  FindAllRepository,
  FindByIdRepository,
  FindOneRepository,
  IdQuery,
  Page,
  Repository,
  Repository2,
  RequestManager,
  UpdateRepository
} from '@witty-services/ngx-repository';
import {HTTP_RESOURCE_METADATA_KEY} from '../decorator/http-resource.decorator';
import {HttpResponseBuilder} from '../response/http-response.builder';
import {map} from 'rxjs/operators';
import {HttpRequestBuilder} from '../request/http-request.builder';

@Repository(null, {
  request: () => HttpRequestBuilder,
  response: HttpResponseBuilder.withParams()
})
export class HttpRepository<T, K> extends Repository2 implements FindAllRepository, FindOneRepository, FindByIdRepository, CreateRepository, UpdateRepository, DeleteRepository {

  public constructor(requestManager: RequestManager,
                     driver: HttpRepositoryDriver) {
    super(requestManager, driver);
  }

  public findAll<R = Page<T>>(query?: any): Observable<R> {
    return this.execute(null, query, ['findAll', 'read']);
  }

  public findOne<R = T>(query?: any): Observable<R> {
    return this.execute(null, query, ['findOne', 'read']).pipe(
      map((result: any) => first(result) || null)
    );
  }

  public findById<R = T, ID = K>(id: ID): Observable<R> {
    return this.execute(null, new IdQuery(id), ['findById', 'read']);
  }

  public create<O = T, R = K>(object: O, query?: any): Observable<R> {
    return this.execute(object, query, ['create', 'write']);
  }

  public delete<O = T, R = void>(object: O, query?: any): Observable<R> {
    return this.execute(object, query, ['delete', 'write']);
  }

  public update<O = T, R = void>(object: O, query?: any): Observable<R> {
    return this.execute(object, query, ['update', 'write']);
  }

  protected getResourceContextKey(): string {
    return HTTP_RESOURCE_METADATA_KEY;
  }

}
