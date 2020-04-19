import { QuerySettings } from '../../query-builder/query-settings';
import { FirebaseResourceContext } from './decorator/firebase-resource.decorator';
import { PATH_PARAM_METADATA_KEY, PathParamContextConfiguration } from './decorator/path-param.decorator';
import { get } from 'lodash';

export class FirebaseQuery {

  public constructor(private query: QuerySettings<FirebaseResourceContext, any>) {
  }

  public getPath(): string {
    let path: string = this.query.resourceConfiguration.path;

    if (this.query.settings) {
      const params: PathParamContextConfiguration[] = Reflect.getMetadata(PATH_PARAM_METADATA_KEY, this.query.settings) || [];

      params.forEach((param: PathParamContextConfiguration) => path = path.replace(`:${param.name}`, this.getSetting(param.propertyKey)));
    }

    return path;
  }

  private getSetting(key: string): any {
    const settings: any = this.query.settings || {};

    return get(settings, key, null);
  }
}
