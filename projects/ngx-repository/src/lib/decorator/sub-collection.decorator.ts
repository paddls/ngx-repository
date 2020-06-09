import {PropertyKeyConfiguration} from '../common/decorator/property-key-configuration';
import {Observable} from 'rxjs';
import {AbstractRepository} from '../repository/abstract.repository';
import {NgxRepositoryModule} from '../ngx-repository.module';
import {Type} from '@angular/core';
import {ORIGINAL_QUERY_METADATA_KEY} from '../normalizer/path.denormalizer';

/**
 * @ignore
 */
export const SUB_COLLECTION_METADATA_KEY: string = 'subCollections';

/**
 * @ignore
 */
export const SUB_COLLECTION_OBS_METADATA_KEY: string = 'subCollectionObs';

export interface SubCollectionContext<T> {

  resourceType: () => new(...args: any[]) => T;

  params?: (model: any, query?: any) => any;

  repository?: () => Type<AbstractRepository<T, any, any, any>>;
}

/**
 * @ignore
 */
export interface SubCollectionContextConfiguration<T = any> extends SubCollectionContext<T>, PropertyKeyConfiguration {
}

export function SubCollection<T>(subCollectionContext: SubCollectionContext<T>): any {
  return (target: object, propertyKey: string) => {
    let metas: SubCollectionContextConfiguration<T>[] = [];
    if (Reflect.hasMetadata(SUB_COLLECTION_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(SUB_COLLECTION_METADATA_KEY, target);
    }
    Reflect.defineMetadata(SUB_COLLECTION_METADATA_KEY, metas.concat({propertyKey, ...subCollectionContext}), target);

    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): Observable<any> {
        if (Reflect.hasOwnMetadata(`${SUB_COLLECTION_OBS_METADATA_KEY}:${propertyKey}`, this)) {
          return Reflect.getOwnMetadata(`${SUB_COLLECTION_OBS_METADATA_KEY}:${propertyKey}`, this);
        }

        const obs$: Observable<any> = NgxRepositoryModule.getNgxRepositoryService()
          .getRepository(subCollectionContext.resourceType(), subCollectionContext.repository ? subCollectionContext.repository() : null)
          .findAll(
            subCollectionContext.params ? subCollectionContext.params(this, Reflect.getOwnMetadata(ORIGINAL_QUERY_METADATA_KEY, this)) : null
          );

        Reflect.defineMetadata(`${SUB_COLLECTION_OBS_METADATA_KEY}:${propertyKey}`, obs$, this);

        return obs$;
      },
      set: () => void 0,
      enumerable: true,
      configurable: true
    });
  };
}
