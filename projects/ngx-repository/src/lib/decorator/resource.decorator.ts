export const RESOURCE_METADATA_KEY: string = 'resource';

export interface ResourceTypeContextConfiguration {
  type: new(...args: any[]) => any;
}

export function Resource(): any {
  return (target: any): void => {
    Reflect.defineMetadata(RESOURCE_METADATA_KEY, {resourceType: target}, target);
  };
}
