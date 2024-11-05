import { FIRESTORE_LIMIT_METADATA_KEY, FirestoreLimit } from './firestore-limit.decorator';

describe('FirestoreLimitDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirestoreLimit()(obj, 'foo');
    expect(Reflect.getMetadata(FIRESTORE_LIMIT_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
