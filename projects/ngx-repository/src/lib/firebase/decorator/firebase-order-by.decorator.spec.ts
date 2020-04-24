import {FIREBASE_ORDER_BY_METADATA_KEY, FirebaseOrderBy} from './firebase-order-by.decorator';

describe('FirebaseOrderByDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirebaseOrderBy()(obj, 'foo');
    expect(Reflect.getMetadata(FIREBASE_ORDER_BY_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
