import {AbstractRepository} from '../repository/abstract.repository';
import {RESOURCE_METADATA_KEY, ResourceTypeContextConfiguration} from '../decorator/resource.decorator';
import {Query} from '../query-builder/query';
import {REPOSITORY_METADATA_KEY} from '../decorator/repository.decorator';

export abstract class Connection<RC, RQ, RS> {

  protected constructor(protected resourceContextKey: string) {
  }

  protected abstract getRepositoryInstance<T, K, Q extends Query<K> = null>(resourceType: new(...args: any) => T): AbstractRepository<T, K, RC, RQ, RS>;

  public getRepository<T, K, Q extends Query<K> = null>(resourceType: new(...args: any) => T): AbstractRepository<T, K, RC, RQ, RS> {
    if (!Reflect.hasMetadata(this.resourceContextKey, resourceType)) {
      throw new Error(`${resourceType} is not a valid resource.`);
    }

    const repository: AbstractRepository<T, K, RC, RQ, RS> = this.getRepositoryInstance(resourceType);

    const resourceContextConfiguration: RC = Reflect.getMetadata(this.resourceContextKey, resourceType);
    Reflect.defineMetadata(REPOSITORY_METADATA_KEY, resourceContextConfiguration, repository);

    const resourceTypeContextConfiguration: ResourceTypeContextConfiguration = {
      type: resourceType
    };
    Reflect.defineMetadata(RESOURCE_METADATA_KEY, resourceTypeContextConfiguration, repository);

    return repository;
  }
}
