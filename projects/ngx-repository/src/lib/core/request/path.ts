import { PATH_PARAM_METADATA_KEY, PathParamContextConfiguration } from '../decorator/path-param.decorator';
import { isNullOrUndefined } from 'util';
import { PATH_COLUMN_METADATA_KEY, PathColumnContextConfiguration } from '../decorator/path-column.decorator';
import { ID_METADATA_KEY } from '../decorator/id.decorator';

export class Path {

  public readonly value: string;
  public readonly pathParams: any;
  public readonly id: any; // TODO @RMA move to another class

  public constructor(private readonly body: any,
                     private readonly query: any,
                     private readonly template: string) {
    this.pathParams = this.getPathParams();
    this.id = this.getId();
    this.value = this.getPath();
  }

  private getPathParams(): any {
    const params: any = {};

    if (this.query != null) {
      const queryPathParams: PathParamContextConfiguration[] = Reflect.getMetadata(PATH_PARAM_METADATA_KEY, this.query) || [];
      queryPathParams.forEach((pathParam: PathParamContextConfiguration) => {
        if (isNullOrUndefined(this.query[pathParam.propertyKey])) {
          return;
        }

        params[`:${ pathParam.name }`] = this.query[pathParam.propertyKey];
      });
    }

    if (this.body) {
      const bodyPathParams: PathColumnContextConfiguration[] = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, this.body) || [];
      bodyPathParams.forEach((pc: PathParamContextConfiguration) => {
        if (isNullOrUndefined(this.body[pc.propertyKey])) {
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

    if (!isNullOrUndefined(this.id)) {
      path += `/${ this.id }`;
    }

    return path;
  }

  private getId(): any {
    return this.getIdFromObject(this.query) || this.getIdFromObject(this.body) || null;
  }

  private getIdFromObject(object: any): any {
    if (object != null) {
      const idKey: string = Reflect.getMetadata(ID_METADATA_KEY, object);
      const id: string = object[idKey];

      return id || null;
    }

    return null;
  }
}
