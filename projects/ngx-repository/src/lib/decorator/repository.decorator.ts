export const REPOSITORY_METADATA_KEY: string = 'repository';
export const RESOURCE_CONFIGURATION_METADATA_KEY: string = 'resourceConfiguration';

export interface RepositoryContextConfiguration {
  resourceType: () => new(...args: any[]) => any;
}

export function Repository(resourceType: () => new(...args: any[]) => any): any {
  return (target: any): void => {
    const params: RepositoryContextConfiguration = {
      resourceType
    };
    Reflect.defineMetadata(REPOSITORY_METADATA_KEY, params, target);
  };
}
