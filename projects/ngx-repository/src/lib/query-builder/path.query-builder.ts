import {QueryBuilder} from './query-builder';
import {PathQuerySettings} from './path.query-settings';
import {PATH_PARAM_METADATA_KEY, PathParamContextConfiguration} from '../decorator/path-param.decorator';
import {PathRequest} from './path.request';
import {PathContext} from '../common/path/path-context';
import {isNullOrUndefined} from 'util';
import {PATH_COLUMN_METADATA_KEY, PathColumnContextConfiguration} from '../decorator/path-column.decorator';

/**
 * @ignore
 */
export abstract class PathQueryBuilder<RC extends PathContext> implements QueryBuilder<RC> {

  public buildRequestFromQuery<T, K>(query: PathQuerySettings<RC, K>, object?: T): PathRequest<K> {
    const pathRequest: PathRequest<K> = new PathRequest<K>({
      pathParams : {}
    });

    if (!query) {
      return pathRequest;
    }

    pathRequest.paths = query.resourceConfiguration;

    if (object) {
      const pathColumns: PathColumnContextConfiguration[] = Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, object) || [];
      pathColumns.forEach((pc: PathParamContextConfiguration) => {
        if (isNullOrUndefined(object[pc.propertyKey])) {
          return;
        }

        pathRequest.pathParams[`:${pc.name}`] = object[pc.propertyKey];
      });
    }

    if (!query.settings) {
      return pathRequest;
    }

    const pathParams: PathParamContextConfiguration[] = Reflect.getMetadata(PATH_PARAM_METADATA_KEY, query.settings) || [];
    pathParams.forEach((pathParam: PathParamContextConfiguration) => {
      if (isNullOrUndefined(query.settings[pathParam.propertyKey])) {
        return;
      }

      pathRequest.pathParams[`:${pathParam.name}`] = query.settings[pathParam.propertyKey];
    });

    if (query.settings.id) {
      pathRequest.id = query.settings.id;
    }

    return pathRequest;
  }
}
