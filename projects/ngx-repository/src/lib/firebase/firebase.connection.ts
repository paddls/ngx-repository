import { Injectable, InjectionToken, Injector, StaticProvider } from '@angular/core';
import { Observable } from 'rxjs';
import { Normalizer } from '../normalizer/normalizer';
import { Denormalizer } from '../normalizer/denormalizer';
import { PageBuilder } from '../page-builder/page-builder';
import { FIREBASE_RESOURCE_METADATA_KEY, FirebaseResourceContext } from './decorator/firebase-resource.decorator';
import { Connection } from '../connection/connection';
import { FirebaseRepository } from './firebase.repository';
import { FirebaseDriver } from './firebase.driver';
import { FirebaseQueryBuilder } from './firebase.query-builder';
import { FIREBASE_DENORMALIZER_TOKEN, FIREBASE_PAGE_BUILDER_TOKEN } from '../ngx-firebase-repository.module.di';

// TODO @RMA generalize this class (copy paste from httpConnection)
@Injectable()
export class FirebaseConnection extends Connection<FirebaseResourceContext, Observable<any>> {

  protected injector: Injector;

  protected providers: StaticProvider[];

  public constructor(protected parentInjector: Injector) {
    super(FIREBASE_RESOURCE_METADATA_KEY);

    this.providers = [];

    this.injector = Injector.create({
      providers: this.providers,
      parent: this.parentInjector
    });
  }

  protected getRepositoryInstance<T, K>(resourceType: new(...args: any) => T): FirebaseRepository<T, K> {
    const token: InjectionToken<FirebaseRepository<T, K>> = this.makeToken(resourceType);
    let repository: FirebaseRepository<T, K>;

    try {
      repository = this.injector.get(token);
    } catch (err) {
      this.providers.push({
        provide: token,
        useFactory: (driver: FirebaseDriver,
                     normalizer: Normalizer,
                     denormalizer: Denormalizer,
                     queryBuilder: FirebaseQueryBuilder,
                     pageBuilder: PageBuilder<Observable<any>>): FirebaseRepository<T, K> => {
          return new FirebaseRepository<T, K>(
            driver,
            normalizer,
            denormalizer,
            queryBuilder,
            pageBuilder
          );
        },
        deps: [FirebaseDriver, Normalizer, FIREBASE_DENORMALIZER_TOKEN, FirebaseQueryBuilder, FIREBASE_PAGE_BUILDER_TOKEN]
      });

      this.injector = Injector.create({
        providers: this.providers,
        parent: this.parentInjector
      });

      repository = this.injector.get(token);
    }

    return repository;
  }

  protected makeToken<T, K>(resourceType: new(...args: any) => T): InjectionToken<FirebaseRepository<T, K>> {
    return new InjectionToken<FirebaseRepository<T, K>>(`${resourceType.name}_FirebaseRepository$`);
  }
}
