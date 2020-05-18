import {AbstractRepository} from '../repository/abstract.repository';
import {
  REPOSITORY_METADATA_KEY,
  RepositoryContextConfiguration,
  RESOURCE_CONFIGURATION_METADATA_KEY
} from '../decorator/repository.decorator';
import {Type} from '@angular/core';

export abstract class Connection<RC, RS> {

  protected constructor(protected resourceContextKey: string) {
  }

  protected abstract getRepositoryInstance<T, K>(resourceType: new(...args: any) => T): AbstractRepository<T, K, RC, RS>;

  public abstract supports<T, K>(repositoryType: Type<AbstractRepository<T, K, RC, RS>>): boolean;

  public getRepository<T, K>(resourceType: new(...args: any) => T): AbstractRepository<T, K, RC, RS> {
    console.log('New instance of a repository for ', resourceType.name);
    if (!Reflect.hasMetadata(this.resourceContextKey, resourceType)) {
      throw new Error(`${resourceType.name} is not a valid resource.`);
    }

    const repository: AbstractRepository<T, K, RC, RS> = this.getRepositoryInstance(resourceType);

    const resourceContextConfiguration: RC = Reflect.getMetadata(this.resourceContextKey, resourceType);
    Reflect.defineMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, resourceContextConfiguration, repository);

    const resourceTypeContextConfiguration: RepositoryContextConfiguration = {
      resourceType: () => resourceType
    };
    Reflect.defineMetadata(REPOSITORY_METADATA_KEY, resourceTypeContextConfiguration, repository);

    return repository;
  }
}
