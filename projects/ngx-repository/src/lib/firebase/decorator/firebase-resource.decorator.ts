import {PathContext} from '../../common/path/path-context';

export const FIREBASE_RESOURCE_METADATA_KEY: string = 'firebaseResource';

export interface FirebaseResourceContext  extends PathContext {
  firebaseConfiguration?: string; // TODO @RMA multiple firebase project configuration
}

export function FirebaseResource(params: FirebaseResourceContext): any {
  return (target: any): void => {
    Reflect.defineMetadata(FIREBASE_RESOURCE_METADATA_KEY, params, target);
  };
}
