import { PATH_PARAM_METADATA_KEY } from '../decorator/path-param.decorator';
import { PATH_COLUMN_METADATA_KEY } from '../decorator/path-column.decorator';
import { PathParamContextConfiguration } from '../configuration/context/path-param-context.configuration';
import { Id } from './id';
import { getDeepQueryMetadataValues } from '../decorator/sub-query.decorator';
import { ISerializer } from '@paddls/ts-serializer';
import { get } from '../../util';

export class Path {

  public readonly value: string;
  public readonly pathParams: any;
  public readonly id: Id;

  public constructor(private readonly body: any,
                     private readonly query: any,
                     private readonly template: string,
                     private readonly serializer: ISerializer) {
    this.pathParams = this.getPathParams();
    this.id = new Id(body, query);
    this.value = this.getPath();
  }

  private getPathParams(): any {
    const params: any = {};

    if (this.body) {
      const bodyPathParams: PathParamContextConfiguration[] = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, this.body) || [];

      Object.assign(params, this.getParams(this.body, bodyPathParams));
    }

    if (this.query != null) {
      const queryPathParams: PathParamContextConfiguration[] = getDeepQueryMetadataValues(PATH_PARAM_METADATA_KEY, this.query);

      Object.assign(params, this.getParams(this.query, queryPathParams));
    }

    return params;
  }

  private getParams(data: any, pathParams: PathParamContextConfiguration[]): any {
    const params: any = {};

    pathParams.forEach((pathParam: PathParamContextConfiguration) => {
      const property: any = get(data, pathParam.propertyKey);

      if (property == null) {
        return;
      }

      if (pathParam.customConverter) {
        params[`:${ pathParam.name }`] = new (pathParam.customConverter())().toJson(property, this.serializer);
      } else {
        params[`:${ pathParam.name }`] = property;
      }
    });

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
