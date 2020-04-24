import {PropertyKeyConfiguration} from '../common/decorator/property-key-configuration';

export const SUB_COLLECTION_METADATA_KEY: string = 'subCollection';

export interface SubCollectionContext {

  resourceType: new(...args: any[]) => any;

  params?: (model: any, query?: any) => any  ;
}

export interface SubCollectionContextConfiguration extends SubCollectionContext, PropertyKeyConfiguration {
}

export function SubCollection(subCollectionContext: SubCollectionContext): any {
  return (target: object, propertyKey: string) => {
    let metas: SubCollectionContextConfiguration[] = [];
    if (Reflect.hasMetadata(SUB_COLLECTION_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(SUB_COLLECTION_METADATA_KEY, target);
    }
    Reflect.defineMetadata(SUB_COLLECTION_METADATA_KEY, metas.concat({propertyKey, ...subCollectionContext}), target);
  };
}
