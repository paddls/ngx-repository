export const SUB_COLLECTION_METADATA_KEY: string = 'subCollection';

export interface SubCollectionContext {

  resourceType: new(...args: any[]) => any;

  params?: (model: any, query?: any) => any  ;
}

export interface PropertySubCollectionContext extends SubCollectionContext {
  propertyKey: string;
}

export function SubCollection(subCollectionContext: SubCollectionContext): any {
  return (target: object, propertyKey: string) => {
    let metas: PropertySubCollectionContext[] = [];
    if (Reflect.hasMetadata(SUB_COLLECTION_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(SUB_COLLECTION_METADATA_KEY, target);
    }
    Reflect.defineMetadata(SUB_COLLECTION_METADATA_KEY, metas.concat({propertyKey, ...subCollectionContext}), target);
  };
}
