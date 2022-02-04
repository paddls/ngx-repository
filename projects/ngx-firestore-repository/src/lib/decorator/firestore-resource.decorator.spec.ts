import { FIRESTORE_RESOURCE_METADATA_KEY, FirestoreResource } from './firestore-resource.decorator';
import { FirestoreRepositoryParamConfiguration } from '../configuration/firestore-repository-param.configuration';

describe('FirestoreResourceDecorator', () => {

  it('should place firestore context in metadata', () => {
    const obj: any = {};
    const context: FirestoreRepositoryParamConfiguration = {
      path: 'toto'
    };

    FirestoreResource(context)(obj);
    expect(Reflect.getMetadata(FIRESTORE_RESOURCE_METADATA_KEY, obj)).toBe(context);
  });
});
