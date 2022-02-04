import { Injectable } from '@angular/core';
import { RepositoryResponse } from '../repository.response';
import { PATH_COLUMN_METADATA_KEY } from '../../decorator/path-column.decorator';
import { first, isArray, isObject, isUndefined } from 'lodash';
import { Path } from '../../request/path';
import { ResponseProcessor } from './response.processor';
import { PathColumnContextConfiguration } from '../../configuration/context/path-column-context.configuration';
import { PathRequest } from '../../request/path.request';

@Injectable()
export class PathColumnResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse): any {
    if (isObject(response)) {
      const pathColumns: PathColumnContextConfiguration[] = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, first(response as any) || response);
      const pathRequest: PathRequest = origin.getRequest() as PathRequest;
      const path: Path = pathRequest.getPath ? pathRequest.getPath() : null;

      if (pathColumns && isArray(response)) {
        response.forEach((item: any) => this.mapPathColumn(pathColumns, item, path));
      } else if (pathColumns) {
        this.mapPathColumn(pathColumns, response, path);
      }

      return response;
    }

    return response;
  }

  protected mapPathColumn(pathColumns: PathColumnContextConfiguration[], item: any, path: Path): void {
    pathColumns
      .filter((pc: PathColumnContextConfiguration) => !isUndefined(path.pathParams[`:${ pc.name }`]))
      .forEach((pc: PathColumnContextConfiguration) => {
        item[pc.propertyKey] = path.pathParams[`:${ pc.name }`];
      });
  }
}
