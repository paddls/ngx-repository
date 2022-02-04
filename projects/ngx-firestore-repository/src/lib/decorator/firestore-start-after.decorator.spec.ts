import {FIRESTORE_START_AFTER_METADATA_KEY, FirestoreStartAfter} from './firestore-start-after.decorator';

describe('FirestoreStartAfterDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirestoreStartAfter()(obj, 'foo');
    expect(Reflect.getMetadata(FIRESTORE_START_AFTER_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
