import {FIRESTORE_ORDER_BY_METADATA_KEY, FirestoreOrderBy} from './firestore-order-by.decorator';

describe('FirestoreOrderByDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirestoreOrderBy()(obj, 'foo');
    expect(Reflect.getMetadata(FIRESTORE_ORDER_BY_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
