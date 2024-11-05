import { FIRESTORE_LIMIT_TO_LAST_METADATA_KEY, FirestoreLimitToLast } from './firestore-limit-to-last.decorator';

describe('FirestoreLimitToLastDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirestoreLimitToLast()(obj, 'foo');
    expect(Reflect.getMetadata(FIRESTORE_LIMIT_TO_LAST_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
