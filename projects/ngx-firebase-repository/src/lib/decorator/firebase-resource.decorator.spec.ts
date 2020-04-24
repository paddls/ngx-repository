import {FIREBASE_RESOURCE_METADATA_KEY, FirebaseResource, FirebaseResourceContext} from './firebase-resource.decorator';

describe('FirebaseResourceDecorator', () => {

  it('should place firebase context in metadata', () => {
    const obj: any = {};
    const context: FirebaseResourceContext = {
      path: 'toto'
    };

    FirebaseResource(context)(obj);
    expect(Reflect.getMetadata(FIREBASE_RESOURCE_METADATA_KEY, obj)).toBe(context);
  });
});
