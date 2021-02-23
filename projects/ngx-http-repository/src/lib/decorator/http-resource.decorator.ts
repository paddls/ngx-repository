import { HttpRepositoryConfiguration } from '../configuration/http-repository.configuration';

/**
 * @ignore
 */
export const HTTP_RESOURCE_METADATA_KEY: string = 'httpResource';

export function HttpResource(params: HttpRepositoryConfiguration): any {
  return (target: any): void => {
    Reflect.defineMetadata(HTTP_RESOURCE_METADATA_KEY, params, target);
  };
}
