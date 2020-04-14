export const JOIN_COLUMN_METADATA_KEY: string = 'joinColumn';

export interface JoinColumnContext {

  field: string;

  resourceType: new(...args: any[]) => any;
}

export interface PropertyJoinColumnContext extends JoinColumnContext {
  propertyKey: string;
}

export function JoinColumn(joinColumnContext: JoinColumnContext): any {
  return (target: object, propertyKey: string) => {
    let metas: PropertyJoinColumnContext[] = [];
    if (Reflect.hasMetadata(JOIN_COLUMN_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, target);
    }
    Reflect.defineMetadata(JOIN_COLUMN_METADATA_KEY, metas.concat({propertyKey, ...joinColumnContext}), target);
  };
}
