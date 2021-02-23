import { NgxRepositoryModule } from '../../ngx-repository.module';
import { PropertyKeyConfiguration } from '../common/decorator/property-key-configuration';
import { Type } from '@angular/core';
import { Repository2 } from '../repository/repository2';

/**
 * @ignore
 */
export const INJECT_REPOSITORY_METADATA_KEY: string = 'injectRepositories';

/**
 * @ignore
 */
export const INJECT_REPOSITORY_INSTANCE_METADATA_KEY: string = 'injectRepositorieInstance';

export interface InjectRepositoryContext<T> {

  resourceType: () => Type<T>;

  repository?: () => Type<Repository2>;
}

/**
 * @ignore
 */
export interface InjectRepositoryContextConfiguration<T = any> extends InjectRepositoryContext<T>, PropertyKeyConfiguration {
}

export function InjectRepository<T>(params: InjectRepositoryContext<T>): any {
  return (target: any, propertyKey: string) => {
    const injectRepositoryContextConfiguration: InjectRepositoryContextConfiguration = {
      propertyKey,
      ...params
    };

    let metas: InjectRepositoryContextConfiguration[] = [];
    if (Reflect.hasMetadata(INJECT_REPOSITORY_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, target);
    }
    Reflect.defineMetadata(INJECT_REPOSITORY_METADATA_KEY, metas.concat(injectRepositoryContextConfiguration), target);

    Object.defineProperty(target.constructor.prototype, propertyKey, {
      get(): Repository2 {
        if (Reflect.hasOwnMetadata(`${ INJECT_REPOSITORY_INSTANCE_METADATA_KEY }:${ propertyKey }`, this)) {
          return Reflect.getOwnMetadata(`${ INJECT_REPOSITORY_INSTANCE_METADATA_KEY }:${ propertyKey }`, this);
        }

        const repository: Repository2 = NgxRepositoryModule.getNgxRepositoryService().getRepository(
          injectRepositoryContextConfiguration.resourceType(),
          injectRepositoryContextConfiguration.repository ? injectRepositoryContextConfiguration.repository() : null
        );

        Reflect.defineMetadata(`${ INJECT_REPOSITORY_INSTANCE_METADATA_KEY }:${ propertyKey }`, repository, this);

        return repository;
      },
      set: () => void 0,
      enumerable: true,
      configurable: true
    });
  };
}

