import {Observable} from 'rxjs';
import {get} from 'lodash';
import {hasSoftCache, setSoftCache} from './soft-cache.decorator';
import {hasHardCache, setHardCache} from './hard-cache.decorator';
import {FindByIdRepository} from '../repository/find-by-id.repository';
import {JoinColumnContext, JoinColumnContextConfiguration} from '../configuration/context/join-column-context.configuration';
import {NgxRepositoryService} from '../../ngx-repository.service';

/**
 * @ignore
 */
export const JOIN_COLUMN_METADATA_KEY: string = 'joinColumns';

/**
 * @ignore
 */
export const JOIN_COLUMN_OBS_METADATA_KEY: string = 'joinColumnObs';

export function JoinColumn<T>(joinColumnContext: JoinColumnContext<T>): any {
  return (target: object, propertyKey: string) => {
    const joinColumnContextConfiguration: JoinColumnContextConfiguration = { propertyKey, ...joinColumnContext };
    Reflect.defineMetadata(JOIN_COLUMN_METADATA_KEY, joinColumnContextConfiguration, target, propertyKey);

    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): Observable<any> {
        if (Reflect.hasOwnMetadata(JOIN_COLUMN_OBS_METADATA_KEY, this, propertyKey)) {
          return Reflect.getOwnMetadata(JOIN_COLUMN_OBS_METADATA_KEY, this, propertyKey);
        }

        const obs$: Observable<any> = makeJoinColumnSoftCached<T>(this, propertyKey, joinColumnContext)
          || makeJoinColumnHardCached<T>(this, propertyKey, joinColumnContext)
          || makeJoinColumn<T>(this, joinColumnContext);

        Reflect.defineMetadata(JOIN_COLUMN_OBS_METADATA_KEY, obs$, this, propertyKey);

        return obs$;
      },
      set: () => void 0,
      enumerable: true,
      configurable: true
    });
  };
}

function makeJoinColumnSoftCached<T>(target: any, propertyKey: string, joinColumnContext: JoinColumnContext<T>): Observable<any> {
  if (!hasSoftCache(target, propertyKey)) {
    return null;
  }

  return setSoftCache(makeJoinColumn(target, joinColumnContext), target, propertyKey);
}

function makeJoinColumnHardCached<T>(target: any, propertyKey: string, joinColumnContext: JoinColumnContext<T>): Observable<any> {
  if (!hasHardCache(target, propertyKey)) {
    return null;
  }

  return setHardCache(makeJoinColumn(target, joinColumnContext), target, propertyKey);
}

function makeJoinColumn<T>(target: any, joinColumnContext: JoinColumnContext<T>): Observable<any> {
  const repository: FindByIdRepository = NgxRepositoryService.getInstance()
    .getRepository(joinColumnContext.resourceType(), joinColumnContext.repository ? joinColumnContext.repository() : null) as any;

  return repository.findById(get(target, joinColumnContext.attribute, null));
}
