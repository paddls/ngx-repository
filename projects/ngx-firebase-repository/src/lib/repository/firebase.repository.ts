import { FIREBASE_RESOURCE_METADATA_KEY } from '../decorator/firebase-resource.decorator';
import {
  FindAllRepository,
  IdQuery,
  Page,
  Repository,
  Repository2,
  RequestManager
} from '@witty-services/ngx-repository';
import { HttpRepositoryDriver } from '../../../../ngx-http-repository/src/lib/driver/http-repository.driver';
import { Observable } from 'rxjs';
import { FirebaseRequestBuilder } from '../request/firebase-request.builder';
import { FirebaseResponseBuilder } from '../response/firebase-response.builder';
import { first } from 'lodash';
import { map } from 'rxjs/operators';
import { FindOneRepository } from '../../../../ngx-repository/src/lib/core/repository/find-one.repository';
import { FindByIdRepository } from '../../../../ngx-repository/src/lib/core/repository/find-by-id.repository';
import { CreateRepository } from '../../../../ngx-repository/src/lib/core/repository/create.repository';
import { UpdateRepository } from '../../../../ngx-repository/src/lib/core/repository/update.repository';
import { DeleteRepository } from '../../../../ngx-repository/src/lib/core/repository/delete.repository';

/**
 * @ignore
 */
@Repository(null, {
  request: () => FirebaseRequestBuilder,
  response: FirebaseResponseBuilder.withParams()
})
export class FirebaseRepository<T, K> extends Repository2 implements FindAllRepository, FindOneRepository, FindByIdRepository, CreateRepository, UpdateRepository, DeleteRepository {

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
    return FIREBASE_RESOURCE_METADATA_KEY;
  }
}
