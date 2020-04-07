import {AbstractConnection, NormalizerConfiguration, RxjsRepository} from '@witty-services/repository-core';
import {FirebaseDriver, FirebaseOptions} from '../driver/firebase.driver';
import {Injectable} from '@angular/core';
import {RESOURCE_TAG_FIREBASE} from '../decorator/firebase-resource.decorator';

@Injectable()
export class FirebaseConnection extends AbstractConnection<any, FirebaseOptions> {

  public constructor(driver: FirebaseDriver,
                     normalizerConfiguration: NormalizerConfiguration) {
    super(driver, normalizerConfiguration);
  }

  protected getResourceRepositoryInstance<T, K, P>(): RxjsRepository<T, K, P, FirebaseOptions> {
    return new RxjsRepository<T, K, P, FirebaseOptions>();
  }

  public getResourceRepository<T, K, P>(resourceType: new(...args: any) => T): RxjsRepository<T, K, P, FirebaseOptions> {
    return super.getResourceRepository(resourceType, RESOURCE_TAG_FIREBASE);
  }
}
