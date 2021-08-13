import { FIREBASE_RESOURCE_METADATA_KEY, FirebaseResource } from './firebase-resource.decorator';
import { FirebaseRepositoryParamConfiguration } from '../configuration/firebase-repository-param.configuration';

describe('FirebaseResourceDecorator', () => {

  it('should place firebase context in metadata', () => {
    const obj: any = {};
    const context: FirebaseRepositoryParamConfiguration = {
      path: 'toto'
    };

    FirebaseResource(context)(obj);
    expect(Reflect.getMetadata(FIREBASE_RESOURCE_METADATA_KEY, obj)).toBe(context);
  });
});
