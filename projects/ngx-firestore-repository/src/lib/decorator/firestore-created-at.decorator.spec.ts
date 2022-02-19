import { FIRESTORE_CREATED_AT_METADATA_KEY, FirestoreCreatedAt } from './firestore-created-at.decorator';
import {
  FirestoreCreatedAtContextConfiguration
} from '../configuration/context/firestore-created-at-context.configuration';

describe('FirestoreCreatedAtDecorator', () => {

  let obj: any;

  beforeEach(() => {
    obj = {
      myProperty: 'myValue',
      mySecondProperty: 'mySecondValue',
    };
  });

  it('should place context on property when no parameter', () => {
    const firstResult: FirestoreCreatedAtContextConfiguration = {propertyKey: 'myProperty', field: 'myProperty'};

    FirestoreCreatedAt()(obj, 'myProperty');

    expect(Reflect.getMetadata(FIRESTORE_CREATED_AT_METADATA_KEY, obj)).toEqual([firstResult]);
  });

  it('should place context on property when string parameter', () => {
    const firstResult: FirestoreCreatedAtContextConfiguration = {propertyKey: 'myProperty', field: 'field'};

    FirestoreCreatedAt('field')(obj, 'myProperty');

    expect(Reflect.getMetadata(FIRESTORE_CREATED_AT_METADATA_KEY, obj)).toEqual([firstResult]);
  });

  it('should place context on property when object parameter', () => {
    const firstResult: FirestoreCreatedAtContextConfiguration = {propertyKey: 'myProperty', field: 'field'};

    FirestoreCreatedAt({field: 'field'})(obj, 'myProperty');

    expect(Reflect.getMetadata(FIRESTORE_CREATED_AT_METADATA_KEY, obj)).toEqual([firstResult]);
  });
});
