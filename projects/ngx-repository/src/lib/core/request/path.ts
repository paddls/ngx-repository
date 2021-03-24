import { PATH_PARAM_METADATA_KEY } from '../decorator/path-param.decorator';
import { PATH_COLUMN_METADATA_KEY } from '../decorator/path-column.decorator';
import { PathParamContextConfiguration } from '../configuration/context/path-param-context.configuration';
import { PathColumnContextConfiguration } from '../configuration/context/path-column-context.configuration';
import { Id } from './id';
import { getDeepQueryMetadataValues } from '../decorator/sub-query.decorator';

export class Path {

  public readonly value: string;
  public readonly pathParams: any;
  public readonly id: Id;

  public constructor(private readonly body: any,
                     private readonly query: any,
                     private readonly template: string) {
    this.pathParams = this.getPathParams();
    this.id = new Id(body, query);
    this.value = this.getPath();
  }

  private getPathParams(): any {
    const params: any = {};

    if (this.query != null) {
      const queryPathParams: PathParamContextConfiguration[] = getDeepQueryMetadataValues(PATH_PARAM_METADATA_KEY, this.query);
      queryPathParams.forEach((pathParam: PathParamContextConfiguration) => {
        if (this.query[pathParam.propertyKey] == null) {
          return;
        }

        params[`:${ pathParam.name }`] = this.query[pathParam.propertyKey];
      });
    }

    if (this.body) {
      const bodyPathParams: PathColumnContextConfiguration[] = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, this.body) || [];
      bodyPathParams.forEach((pc: PathParamContextConfiguration) => {
        if (this.body[pc.propertyKey] == null) {
          return;
        }

        params[`:${ pc.name }`] = this.body[pc.propertyKey];
      });
    }

    return params;
  }

  private getPath(): string {
    const pathParams: any = this.getPathParams();
    let path: string = this.template;

    Object.keys(pathParams).forEach((key: string) => path = path.replace(key, pathParams[key]));

    if (this.id.value != null) {
      path += `/${ this.id.value }`;
    }

    return path;
  }
}
