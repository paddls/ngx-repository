import {FIREBASE_ORDER_BY_METADATA_KEY, FirebaseOrderBy} from './firebase-order-by.decorator';

describe('FirebaseOrderByDecorator', () => {

  it('should place all contexts in good place', () => {
    const obj: any = {
      foo: 'bar',
      test: 'value'
    };

    FirebaseOrderBy()(obj, 'foo');
    FirebaseOrderBy()(obj, 'test');

    expect(Reflect.getMetadata(FIREBASE_ORDER_BY_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'foo'
      },
      {
        propertyKey: 'test'
      }
    ]);
  });
});
