export const FIREBASE_RESOURCE_METADATA_KEY: string = 'firebaseResource';

export interface FirebaseResourceContext {
  firebaseConfiguration?: string; // TODO @RMA multiple firebase project configuration
  path: string;
}

export function FirebaseResource(params: FirebaseResourceContext): any {
  return (target: any): void => {
    Reflect.defineMetadata(FIREBASE_RESOURCE_METADATA_KEY, params, target);
  };
}
