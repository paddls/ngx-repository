import {Resource, ResourceContext, PathConfiguration} from '@witty-services/repository-core';

export const RESOURCE_TAG_HTTP: string = 'HTTP';

export function HttpResource(params: PathConfiguration): any {
  return (target: any): void => {
    const httpParams: ResourceContext = {
      ...params,
      tag: RESOURCE_TAG_HTTP
    };
    Resource(httpParams)(target);
  };
}
