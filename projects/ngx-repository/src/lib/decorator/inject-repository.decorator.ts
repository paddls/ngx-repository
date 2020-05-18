import {NgxRepositoryModule} from '../ngx-repository.module';
import {PropertyKeyConfiguration} from '../common/decorator/property-key-configuration';
import {SUB_COLLECTION_OBS_METADATA_KEY} from './sub-collection.decorator';
import {Type} from '@angular/core';
import {AbstractRepository} from '../repository/abstract.repository';

export const INJECT_REPOSITORY_METADATA_KEY: string = 'injectRepositories';
export const INJECT_REPOSITORY_INSTANCE_METADATA_KEY: string = 'injectRepositorieInstance';

export interface InjectRepositoryContext<T> {

  resourceType: () => new(...args: any[]) => any;

  repository?: () => Type<AbstractRepository<T, any, any, any>>;
}

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
      get(): AbstractRepository<T, any, any, any> {
        if (Reflect.hasOwnMetadata(`${INJECT_REPOSITORY_INSTANCE_METADATA_KEY}:${propertyKey}`, this)) {
          return Reflect.getOwnMetadata(`${INJECT_REPOSITORY_INSTANCE_METADATA_KEY}:${propertyKey}`, this);
        }

        const repository: AbstractRepository<T, any, any, any> = NgxRepositoryModule.ngxRepositoryService
          .getRepository(
            injectRepositoryContextConfiguration.resourceType(),
            injectRepositoryContextConfiguration.repository ? injectRepositoryContextConfiguration.repository() : null
          );

        Reflect.defineMetadata(`${SUB_COLLECTION_OBS_METADATA_KEY}:${propertyKey}`, repository, this);

        return repository;
      },
      set: () => void 0,
      enumerable: true,
      configurable: true
    });
  };
}

