import {RxjsRepository} from '@witty-services/repository-core';
import {HttpOptions} from '../driver/http.driver';
import {HttpConnection} from '../connection/http.connection';

export class HttpRepository<T, K, P = null> extends RxjsRepository<T, K, P, any, HttpOptions> {

  public constructor(protected httpConnection: HttpConnection) {
    super();

    this.httpConnection.initRepository(this, null);
  }
}
