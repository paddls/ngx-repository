import { FIRESTORE_END_BEFORE_METADATA_KEY, FirestoreEndBefore } from './firestore-end-before.decorator';

describe('FirestoreEndBeforeDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirestoreEndBefore()(obj, 'foo');
    expect(Reflect.getMetadata(FIRESTORE_END_BEFORE_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
