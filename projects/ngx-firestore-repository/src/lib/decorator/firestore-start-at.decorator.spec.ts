import { FIRESTORE_START_AT_METADATA_KEY, FirestoreStartAt } from './firestore-start-at.decorator';

describe('FirestoreStartAtDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = { foo: 'bar' };

    FirestoreStartAt()(obj, 'foo');
    expect(Reflect.getMetadata(FIRESTORE_START_AT_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
