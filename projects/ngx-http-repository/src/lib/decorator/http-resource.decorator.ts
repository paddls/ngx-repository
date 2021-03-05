import {
  createHttpRepositoryConfiguration,
  HttpRepositoryContextConfiguration
} from '../configuration/context/http-repository-context.configuration';

/**
 * @ignore
 */
export const HTTP_RESOURCE_METADATA_KEY: string = 'httpResource';

export function HttpResource(params: HttpRepositoryContextConfiguration): any {
  return (target: any): void => {
    Reflect.defineMetadata(HTTP_RESOURCE_METADATA_KEY, createHttpRepositoryConfiguration(params), target);
  };
}
