import { PropertyKeyConfiguration } from '../common/decorator/property-key-configuration';
import { isString } from '../common/utils/is-string';
import { flattenDeep } from '../common/utils/flatten-deep';

/**
 * @ignore
 */
export const SUB_QUERY_METADATA_KEY: string = 'SUB_QUERY';

export function SubQuery(): any {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(SUB_QUERY_METADATA_KEY, propertyKey, target);
  };
}

export function getDeepQueryMetadataValues<T extends PropertyKeyConfiguration>(metadataKey: string, query: any, parent: string = ''): T[] {
  if (query) {
    let subQueries: any = Reflect.getMetadata(SUB_QUERY_METADATA_KEY, query) || [];

    if (isString(subQueries)) {
      subQueries = [subQueries];
    }

    const childMetadata: T[] = subQueries.map((subQuery: string) => getDeepQueryMetadataValues<T>(metadataKey, query[subQuery], parent ? `${parent}.${subQuery}` : subQuery));

    let metadata: T[] | T = Reflect.getMetadata(metadataKey, query) || [];

    if (!Array.isArray(metadata)) {
      metadata = [metadata];
    }

    const modifiedMetadata: T[] = metadata
      .map((property: PropertyKeyConfiguration) => ({
        ...property,
        propertyKey: parent ? `${parent}.${property.propertyKey}` : property.propertyKey
      })) as T[];

    return flattenDeep([
      childMetadata,
      modifiedMetadata
    ]);
  }

  return [];
}

export function getDeepQueryMetadataValue(metadataKey: string, query: any): any {
  return getDeepQueryMetadataValues(metadataKey, query)?.[0];
}
