import {PathContext} from '@witty-services/ngx-repository';

/**
 * @ignore
 */
export const FIREBASE_RESOURCE_METADATA_KEY: string = 'firebaseResource';

/**
 * @ignore
 */
export interface FirebaseResourceContext  extends PathContext {
  firebaseConfiguration?: string; // TODO @RMA multiple firebase project configuration
}

export function FirebaseResource(params: FirebaseResourceContext): any {
  return (target: any): void => {
    Reflect.defineMetadata(FIREBASE_RESOURCE_METADATA_KEY, params, target);
  };
}
