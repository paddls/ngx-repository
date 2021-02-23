import {
  Repository,
  REPOSITORY_METADATA_KEY,
  RepositoryConfiguration,
  RESOURCE_CONFIGURATION_METADATA_KEY
} from '../decorator/repository.decorator';
import { Type } from '@angular/core';
import { Repository2 } from './repository2';
import { ConfigurationProvider } from '../configuration/configuration.provider';
import { ResourceConfiguration } from '../configuration/resource.configuration';

/**
 * @ignore
 */
export abstract class RepositoryBuilder {

  protected constructor(protected resourceContextKey: string) {
  }

  public abstract supports(repositoryType: Type<Repository2>): boolean;

  public getRepository(resourceType: Type<any>): Repository2 {
    if (!Reflect.hasMetadata(this.resourceContextKey, resourceType)) {
      throw new Error(`${ resourceType.name } is not a valid resource.`);
    }

    const repository: Repository2 = this.getRepositoryInstance(resourceType);

    const resourceContextConfiguration: ConfigurationProvider = Reflect.getMetadata(this.resourceContextKey, resourceType);
    Reflect.defineMetadata(RESOURCE_CONFIGURATION_METADATA_KEY, resourceContextConfiguration, repository);

    const resourceTypeContextConfiguration: RepositoryConfiguration = {
      resourceType: () => resourceType
    };
    Reflect.defineMetadata(REPOSITORY_METADATA_KEY, resourceTypeContextConfiguration, repository);

    return repository;
  }

  protected abstract getRepositoryInstance(resourceType: Type<any>): Repository2;

  protected createRepositoryClass(repositoryType: Type<any>, resourceType: Type<any>): Type<any> {
    const defaultConfiguration: ResourceConfiguration = {
      responseType: () => resourceType
    };

    @Repository(() => resourceType, defaultConfiguration)
    class RepositoryImpl extends repositoryType {

    }

    return RepositoryImpl;
  }
}
