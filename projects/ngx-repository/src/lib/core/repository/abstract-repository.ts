import { Observable } from 'rxjs';
import { RepositoryDriver } from '../driver/repository.driver';
import { ConfigurationProvider } from '../configuration/configuration.provider';
import { RequestManager } from '../manager/request.manager';
import { ResourceConfiguration } from '../configuration/resource.configuration';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { Type } from '@angular/core';
import { REPOSITORY_METADATA_KEY } from '../decorator/repository.decorator';
import { RepositoryContextConfiguration } from '../configuration/context/repository-context.configuration';
import merge from 'lodash.merge';

export abstract class AbstractRepository<T> {

  public readonly configurationProvider: ConfigurationProvider;

  public readonly resourceType: Type<T>;

  protected constructor(protected readonly requestManager: RequestManager,
                        protected readonly driver: RepositoryDriver,
                        moduleConfiguration: ResourceConfiguration) {
    const repositoryConfiguration: RepositoryContextConfiguration<any> = Reflect.getMetadata(REPOSITORY_METADATA_KEY, Object.getPrototypeOf(this).constructor);
    if (!repositoryConfiguration) {
      throw new Error('There is no Resource type configuration for this repository.');
    }

    const configuration: ResourceConfiguration = merge({
      responseType: repositoryConfiguration.resourceType
    }, repositoryConfiguration.defaultConfiguration, moduleConfiguration);

    this.resourceType = repositoryConfiguration.resourceType();
    this.configurationProvider = new ConfigurationProvider(this.getResourceConfiguration(this.resourceType, configuration));
  }

  protected abstract getResourceConfiguration(resourceType: Type<any>, configuration: ResourceConfiguration): ResourceConfiguration;

  protected execute(body: any, query: any, configurationPaths: string[]): Observable<any> {
    return this.requestManager.execute({
      body,
      query,
      configuration: new ConfigurationContextProvider(this.configurationProvider, configurationPaths),
      driver: this.driver
    });
  }
}


