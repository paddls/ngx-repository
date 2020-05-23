import {Denormalizer} from './denormalizer';
import {PATH_COLUMN_METADATA_KEY, PathColumnContextConfiguration} from '../decorator/path-column.decorator';
import {Query} from '../query-builder/query';
import {Injectable} from '@angular/core';
import {PathRequest} from '../query-builder/path.request';

@Injectable()
export class PathDenormalizer extends Denormalizer {

  public denormalize<T, K>(type: new() => T, data: any, query?: Query<any>, request?: PathRequest<K>): T {
    const result: T = super.denormalize(type, data, query, request);

    if (!result) {
      return null;
    }

    if (request && request.pathParams) {
      this.denormalizePathColumn(result, request);
    }

    return result;
  }

  protected denormalizePathColumn<T, K>(result: T, request: PathRequest<K>): Denormalizer {
    const pathColumns: PathColumnContextConfiguration[] = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, result);

    if (!pathColumns) {
      return this;
    }

    pathColumns.forEach((pc: PathColumnContextConfiguration) => {
      result[pc.propertyKey] = request.pathParams[`:${pc.name}`];
    });

    return this;
  }
}
