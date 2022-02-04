import {FIRESTORE_END_AT_METADATA_KEY, FirestoreEndAt} from './firestore-end-at.decorator';

describe('FirestoreEndAtDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirestoreEndAt()(obj, 'foo');
    expect(Reflect.getMetadata(FIRESTORE_END_AT_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
