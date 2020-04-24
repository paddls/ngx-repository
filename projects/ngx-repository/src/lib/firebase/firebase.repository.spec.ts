import {FirebaseRepository} from './firebase.repository';
import {FIREBASE_RESOURCE_METADATA_KEY} from './decorator/firebase-resource.decorator';

class MyFirebaseRepository extends FirebaseRepository<any, any> {

  public getResourceContextKey(): string {
    return this.resourceContextKey;
  }
}

describe('FirebaseRepository', () => {

  it('should have the good resource context key', () => {
    const myFirebaseRepository: MyFirebaseRepository = new MyFirebaseRepository(null, null, null, null, null, null, null);
    expect(myFirebaseRepository.getResourceContextKey()).toEqual(FIREBASE_RESOURCE_METADATA_KEY);
  });
});
