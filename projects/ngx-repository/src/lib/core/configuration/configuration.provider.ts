import { get } from 'lodash';
import { ResourceConfiguration } from './resource.configuration';

export class ConfigurationProvider {

  public constructor(private readonly params: ResourceConfiguration) {
  }

  public getConfiguration(property: string, paths: string[]): any {
    const configuration: any = this.findConfiguration(property, paths);

    if (configuration != null) {
      return configuration;
    }

    console.error(`Unable to find configuration '${ property }' (${ JSON.stringify(paths) })`, this.params);

    throw new Error(`Unable to find configuration '${ property }' (${ JSON.stringify(paths) })`);
  }

  public findConfiguration(property: string, paths: string[]): any {
    for (const path of paths) {
      const value: any = get(this.params, `${ path }.${ property }`);
      if (value != null) {
        return value;
      }
    }

    if (get(this.params, property) != null) {
      return get(this.params, property);
    }

    return null;
  }
}
