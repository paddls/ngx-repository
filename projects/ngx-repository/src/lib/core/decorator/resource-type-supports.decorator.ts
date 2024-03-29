import { JsonTypeSupports } from '@paddls/ts-serializer';
import { JSON_TYPE_SUPPORTS_METADATA_KEY } from '@paddls/ts-serializer/dist/decorator/json-type-supports.decorator';

/**
 * @ignore
 */
export const RESOURCE_TYPE_SUPPORTS_METADATA_KEY: string = JSON_TYPE_SUPPORTS_METADATA_KEY;

export function ResourceTypeSupports(resourceTypeSupportsContext?: (data: any) => boolean): any {
  return (target: any) => {
    JsonTypeSupports(resourceTypeSupportsContext)(target);
  };
}
