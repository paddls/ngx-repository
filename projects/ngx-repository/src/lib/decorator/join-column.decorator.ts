import {PropertyKeyConfiguration} from '../common/decorator/property-key-configuration';

export const JOIN_COLUMN_METADATA_KEY: string = 'joinColumn';

export interface JoinColumnContext {

  attribute: string;

  resourceType: new(...args: any[]) => any;
}

export interface JoinColumnContextConfiguration extends JoinColumnContext, PropertyKeyConfiguration {
}

export function JoinColumn(joinColumnContext: JoinColumnContext): any {
  return (target: object, propertyKey: string) => {
    let metas: JoinColumnContextConfiguration[] = [];
    if (Reflect.hasMetadata(JOIN_COLUMN_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, target);
    }
    Reflect.defineMetadata(JOIN_COLUMN_METADATA_KEY, metas.concat({propertyKey, ...joinColumnContext}), target);
  };
}
