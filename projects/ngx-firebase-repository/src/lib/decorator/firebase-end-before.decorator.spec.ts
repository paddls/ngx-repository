import {FIREBASE_END_BEFORE_METADATA_KEY, FirebaseEndBefore} from './firebase-end-before.decorator';

describe('FirebaseEndBeforeDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirebaseEndBefore()(obj, 'foo');
    expect(Reflect.getMetadata(FIREBASE_END_BEFORE_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
