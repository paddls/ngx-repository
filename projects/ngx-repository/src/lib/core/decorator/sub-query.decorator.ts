import { first, flattenDeep, isString } from 'lodash';

/**
 * @ignore
 */
export const SUB_QUERY_METADATA_KEY: string = 'SUB_QUERY';

export function SubQuery(): any {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(SUB_QUERY_METADATA_KEY, propertyKey, target);
  };
}

export function getDeepQueryMetadataValues(metadataKey: string, query: any): any[] {
  if (query) {
    let subQueries: any = Reflect.getMetadata(SUB_QUERY_METADATA_KEY, query) || [];

    if (isString(subQueries)) {
      subQueries = [subQueries];
    }

    const childMetadata: any[] = subQueries.map((subQuery: string) => getDeepQueryMetadataValues(metadataKey, query[subQuery]));
    const metadata: any[] = Reflect.getMetadata(metadataKey, query) || [];

    return flattenDeep([...childMetadata, metadata]);
  }

  return [];
}

export function getDeepQueryMetadataValue(metadataKey: string, query: any): any {
  return first(getDeepQueryMetadataValues(metadataKey, query));
}
