import {PropertyKeyConfiguration} from '../common/decorator/property-key-configuration';
import {AbstractRepository} from '../repository/abstract.repository';
import {Type} from '@angular/core';
import {NgxRepositoryModule} from '../ngx-repository.module';
import {Observable} from 'rxjs';
import {get} from 'lodash';

/**
 * @ignore
 */
export const JOIN_COLUMN_METADATA_KEY: string = 'joinColumns';

/**
 * @ignore
 */
export const JOIN_COLUMN_OBS_METADATA_KEY: string = 'joinColumnObs';

export interface JoinColumnContext<T> {

  attribute: string;

  resourceType: () => new(...args: any[]) => T;

  repository?: () => Type<AbstractRepository<T, any, any, any>>;
}

/**
 * @ignore
 */
export interface JoinColumnContextConfiguration<T = any> extends JoinColumnContext<T>, PropertyKeyConfiguration {
}

export function JoinColumn<T>(joinColumnContext: JoinColumnContext<T>): any {
  return (target: object, propertyKey: string) => {
    let metas: JoinColumnContextConfiguration<T>[] = [];
    if (Reflect.hasMetadata(JOIN_COLUMN_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, target);
    }
    Reflect.defineMetadata(JOIN_COLUMN_METADATA_KEY, metas.concat({propertyKey, ...joinColumnContext}), target);

    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): Observable<any> {
        if (Reflect.hasOwnMetadata(`${JOIN_COLUMN_OBS_METADATA_KEY}:${propertyKey}`, this)) {
          return Reflect.getOwnMetadata(`${JOIN_COLUMN_OBS_METADATA_KEY}:${propertyKey}`, this);
        }

        const obs$: Observable<any> = NgxRepositoryModule.getNgxRepositoryService()
          .getRepository(joinColumnContext.resourceType(), joinColumnContext.repository ? joinColumnContext.repository() : null)
          .findById(get(this, joinColumnContext.attribute, null));

        Reflect.defineMetadata(`${JOIN_COLUMN_OBS_METADATA_KEY}:${propertyKey}`, obs$, this);

        return obs$;
      },
      set: () => void 0,
      enumerable: true,
      configurable: true
    });
  };
}
