export const REPOSITORY_METADATA_KEY: string = 'repository';
export const RESOURCE_CONFIGURATION_METADATA_KEY: string = 'resourceConfiguration';

export interface RepositoryContextConfiguration {
  type: new(...args: any[]) => any;
}

export function Repository(type: new(...args: any[]) => any): any {
  return (target: any): void => {
    const params: RepositoryContextConfiguration = {
      type
    };
    Reflect.defineMetadata(REPOSITORY_METADATA_KEY, params, target);
  };
}
