import {Column} from './column.decorator';

export const ID_METADATA_KEY: string = 'id';

export interface IdContext {

  field?: string;

  excludeToJson?: boolean;

  excludeFromJson?: boolean;
}

export function Id(idContext?: IdContext|string): any {
  return (target: any, propertyKey: string) => {
    Column(idContext)(target, propertyKey);
    Reflect.defineMetadata(ID_METADATA_KEY, propertyKey, target);
  };
}
