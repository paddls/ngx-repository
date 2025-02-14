import { FIRESTORE_UPDATED_AT_METADATA_KEY, FirestoreUpdatedAt } from './firestore-updated-at.decorator';
import {
  FirestoreUpdatedAtContextConfiguration
} from '../configuration/context/firestore-updated-at-context.configuration';

describe('FirestoreUpdatedAtDecorator', () => {

  let obj: any;

  beforeEach(() => {
    obj = {
      myProperty: 'myValue',
      mySecondProperty: 'mySecondValue',
    };
  });

  it('should place context on property when no parameter', () => {
    const firstResult: FirestoreUpdatedAtContextConfiguration = { propertyKey: 'myProperty', field: 'myProperty' };

    FirestoreUpdatedAt()(obj, 'myProperty');

    expect(Reflect.getMetadata(FIRESTORE_UPDATED_AT_METADATA_KEY, obj)).toEqual([firstResult]);
  });

  it('should place context on property when string parameter', () => {
    const firstResult: FirestoreUpdatedAtContextConfiguration = { propertyKey: 'myProperty', field: 'field' };

    FirestoreUpdatedAt('field')(obj, 'myProperty');

    expect(Reflect.getMetadata(FIRESTORE_UPDATED_AT_METADATA_KEY, obj)).toEqual([firstResult]);
  });

  it('should place context on property when object parameter', () => {
    const firstResult: FirestoreUpdatedAtContextConfiguration = { propertyKey: 'myProperty', field: 'field' };

    FirestoreUpdatedAt({ field: 'field' })(obj, 'myProperty');

    expect(Reflect.getMetadata(FIRESTORE_UPDATED_AT_METADATA_KEY, obj)).toEqual([firstResult]);
  });
});
