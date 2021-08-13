import {Observable} from 'rxjs';
import {hasSoftCache, setSoftCache} from './soft-cache.decorator';
import {hasHardCache, setHardCache} from './hard-cache.decorator';
import {FindAllRepository} from '../repository/find-all.repository';
import {ORIGINAL_QUERY_METADATA_KEY} from '../response/processor/original-query-response.processor';
import {SubCollectionContext, SubCollectionContextConfiguration} from '../configuration/context/sub-collection-context.configuration';
import { NgxRepositoryService } from '../../ngx-repository.service';

/**
 * @ignore
 */
export const SUB_COLLECTION_METADATA_KEY: string = 'subCollections';

/**
 * @ignore
 */
export const SUB_COLLECTION_OBS_METADATA_KEY: string = 'subCollectionObs';

export function SubCollection<T>(subCollectionContext: SubCollectionContext<T>): any {
  return (target: object, propertyKey: string) => {
    const subCollectionContextConfiguration: SubCollectionContextConfiguration = { propertyKey, ...subCollectionContext };
    Reflect.defineMetadata(SUB_COLLECTION_METADATA_KEY, subCollectionContextConfiguration, target, propertyKey);

    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): Observable<any> {
        if (Reflect.hasOwnMetadata(SUB_COLLECTION_OBS_METADATA_KEY, this, propertyKey)) {
          return Reflect.getOwnMetadata(SUB_COLLECTION_OBS_METADATA_KEY, this, propertyKey);
        }

        const obs$: Observable<any> = makeSubCollectionSoftCached<T>(this, propertyKey, subCollectionContext)
          || makeSubCollectionHardCached<T>(this, propertyKey, subCollectionContext)
          || makeSubCollection<T>(this, subCollectionContext);

        Reflect.defineMetadata(SUB_COLLECTION_OBS_METADATA_KEY, obs$, this, propertyKey);

        return obs$;
      },
      set: () => void 0,
      enumerable: true,
      configurable: true
    });
  };
}

function makeSubCollectionSoftCached<T>(target: any, propertyKey: string, subCollectionContext: SubCollectionContext<T>): Observable<any> {
  if (!hasSoftCache(target, propertyKey)) {
    return null;
  }

  return setSoftCache(makeSubCollection(target, subCollectionContext), target, propertyKey);
}

function makeSubCollectionHardCached<T>(target: any, propertyKey: string, subCollectionContext: SubCollectionContext<T>): Observable<any> {
  if (!hasHardCache(target, propertyKey)) {
    return null;
  }

  return setHardCache(makeSubCollection(target, subCollectionContext), target, propertyKey);
}

function makeSubCollection<T>(target: any, subCollectionContext: SubCollectionContext<T>): Observable<any> {
  const repository: FindAllRepository = NgxRepositoryService.getInstance()
    .getRepository(subCollectionContext.resourceType(), subCollectionContext.repository ? subCollectionContext.repository() : null) as any;

  return repository.findAll(subCollectionContext.params ? subCollectionContext.params(target, Reflect.getOwnMetadata(ORIGINAL_QUERY_METADATA_KEY, target)) : null);
}
