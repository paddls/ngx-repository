import {AbstractConnection, NormalizerConfiguration, RxjsRepository} from '@witty-services/repository-core';
import {HttpDriver, HttpOptions} from '../driver/http.driver';
import {Injectable} from '@angular/core';
import {RESOURCE_TAG_HTTP} from '../decorator/http-resource.decorator';

@Injectable()
export class HttpConnection extends AbstractConnection<any, HttpOptions> {

  public constructor(driver: HttpDriver,
                     normalizerConfiguration: NormalizerConfiguration) {
    super(driver, normalizerConfiguration);
  }

  protected getResourceRepositoryInstance<T, K, P>(): RxjsRepository<T, K, P, HttpOptions> {
    return new RxjsRepository<T, K, P, HttpOptions>();
  }

  public getResourceRepository<T, K, P>(resourceType: (new(...args: any) => T )): RxjsRepository<T, K, P, HttpOptions> {
    return super.getResourceRepository(resourceType, RESOURCE_TAG_HTTP);
  }
}
