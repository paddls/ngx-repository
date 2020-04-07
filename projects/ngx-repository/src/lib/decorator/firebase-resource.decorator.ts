import {Resource, ResourceContext, PathConfiguration} from '@witty-services/repository-core';

export const RESOURCE_TAG_FIREBASE: string = 'FIREBASE';

export function FirebaseResource(params: PathConfiguration): any {
  return (target: any): void => {
    const httpParams: ResourceContext = {
      ...params,
      tag: RESOURCE_TAG_FIREBASE
    };
    Resource(httpParams)(target);
  };
}
