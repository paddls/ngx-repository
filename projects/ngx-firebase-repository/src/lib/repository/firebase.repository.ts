import { FIREBASE_RESOURCE_METADATA_KEY } from '../decorator/firebase-resource.decorator';
import {
  CreateRepository,
  DeleteRepository,
  FindAllRepository,
  FindByIdRepository,
  FindOneRepository,
  IdQuery,
  Page,
  Repository,
  AbstractRepository,
  RequestManager,
  UpdateRepository
} from '@witty-services/ngx-repository';
import { Observable } from 'rxjs';
import { FirebaseRequestBuilder } from '../request/firebase-request.builder';
import { FirebaseResponseBuilder } from '../response/firebase-response.builder';
import { first } from 'lodash';
import { map } from 'rxjs/operators';
import { FirebaseRepositoryDriver } from '../driver/firebase-repository.driver';

/**
 * @ignore
 */
@Repository(null, {
  request: FirebaseRequestBuilder,
  response: FirebaseResponseBuilder.withParams()
})
export class FirebaseRepository<T, K = string> extends AbstractRepository<T> implements FindAllRepository, FindOneRepository, FindByIdRepository, CreateRepository, UpdateRepository, DeleteRepository {

  public constructor(requestManager: RequestManager,
                     driver: FirebaseRepositoryDriver) {
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
    return FIREBASE_RESOURCE_METADATA_KEY;
  }
}
