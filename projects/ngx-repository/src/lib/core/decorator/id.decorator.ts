import { Column } from './column.decorator';
import { IdContext } from '../configuration/context/id-context.configuration';

/**
 * @ignore
 */
export const ID_METADATA_KEY: string = 'id';

export function Id(idContext?: IdContext | string): any {
  return (target: any, propertyKey: string) => {
    Column(idContext)(target, propertyKey);
    Reflect.defineMetadata(ID_METADATA_KEY, propertyKey, target);
  };
}
