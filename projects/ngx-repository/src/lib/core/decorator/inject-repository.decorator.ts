import {NgxRepositoryModule} from '../../ngx-repository.module';
import {AbstractRepository} from '../repository/abstractRepository';
import {InjectRepositoryContext, InjectRepositoryContextConfiguration} from '../configuration/context/inject-repository-context.configuration';

/**
 * @ignore
 */
export const INJECT_REPOSITORY_METADATA_KEY: string = 'injectRepositories';

/**
 * @ignore
 */
export const INJECT_REPOSITORY_INSTANCE_METADATA_KEY: string = 'injectRepositorieInstance';

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
      get(): AbstractRepository<T> {
        if (Reflect.hasOwnMetadata(`${ INJECT_REPOSITORY_INSTANCE_METADATA_KEY }:${ propertyKey }`, this)) {
          return Reflect.getOwnMetadata(`${ INJECT_REPOSITORY_INSTANCE_METADATA_KEY }:${ propertyKey }`, this);
        }

        const repository: AbstractRepository<T> = NgxRepositoryModule.getNgxRepositoryService().getRepository(
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

