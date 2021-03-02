import { Observable } from 'rxjs';
import { merge } from 'lodash';
import { RepositoryDriver } from '../driver/repository.driver';
import { ConfigurationProvider } from '../configuration/configuration.provider';
import { RequestManager } from '../manager/request.manager';
import { REPOSITORY_METADATA_KEY } from '../decorator/repository.decorator';
import { ResourceConfiguration } from '../configuration/resource.configuration';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import {RepositoryContextConfiguration} from '../configuration/context/repository-context.configuration';

export abstract class AbstractRepository<T> {

  protected readonly repositoryConfiguration: RepositoryContextConfiguration<T>;

  protected readonly resourceConfigurationProvider: ConfigurationProvider;

  protected constructor(protected readonly requestManager: RequestManager,
                        protected readonly driver: RepositoryDriver) {
    this.repositoryConfiguration = this.getRepositoryContextConfiguration();
    this.resourceConfigurationProvider = new ConfigurationProvider(this.getResourceContextConfiguration());
  }

  protected abstract getResourceContextKey(): string;

  protected getRepositoryContextConfiguration(): RepositoryContextConfiguration<T> {
    return Reflect.getMetadata(REPOSITORY_METADATA_KEY, this.constructor);
  }

  protected getResourceContextConfiguration(): ResourceConfiguration {
    if (!this.repositoryConfiguration) {
      throw new Error('There is no Resource type configuration for this repository.');
    }

    const defaultConfiguration: ResourceConfiguration = this.repositoryConfiguration.defaultConfiguration;
    const resourceContextConfiguration: ResourceConfiguration = Reflect.getMetadata(this.getResourceContextKey(), this.repositoryConfiguration.resourceType());
    const fallbackConfiguration: ResourceConfiguration = {
      responseType: this.repositoryConfiguration.resourceType
    };

    return merge(fallbackConfiguration, defaultConfiguration, resourceContextConfiguration);
  }

  protected execute(body: any, query: any, configurationPaths: string[]): Observable<any> {
    return this.requestManager.execute({
      body,
      query,
      configuration: new ConfigurationContextProvider(this.resourceConfigurationProvider, configurationPaths),
      driver: this.driver
    });
  }
}


