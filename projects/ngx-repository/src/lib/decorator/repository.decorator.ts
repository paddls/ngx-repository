import {RESOURCE_METADATA_KEY, ResourceTypeContextConfiguration} from './resource.decorator';

export const REPOSITORY_METADATA_KEY: string = 'repository';

export function Repository(type: new(...args: any[]) => any): any {
  return (target: any): void => {
    const params: ResourceTypeContextConfiguration = {
      type
    };
    Reflect.defineMetadata(RESOURCE_METADATA_KEY, params, target);
  };
}
