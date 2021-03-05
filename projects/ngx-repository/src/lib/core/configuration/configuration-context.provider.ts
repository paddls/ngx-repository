import { first } from 'lodash';
import { ConfigurationProvider } from './configuration.provider';
import { ResourceConfiguration } from './resource.configuration';

export class ConfigurationContextProvider {

  public constructor(private readonly configurationProvider: ConfigurationProvider,
                     private readonly paths: string[]) {
  }

  public getOperation(): string {
    return first(this.paths);
  }

  public getConfiguration<T extends ResourceConfiguration = ResourceConfiguration>(property: keyof T): any {
    return this.configurationProvider.getConfiguration(property as string, this.paths);
  }

  public findConfiguration<T extends ResourceConfiguration = ResourceConfiguration>(property: keyof T): any {
    return this.configurationProvider.findConfiguration(property as string, this.paths);
  }
}
