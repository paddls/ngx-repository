import {FIREBASE_LIMIT_METADATA_KEY, FirebaseLimit} from './firebase-limit.decorator';

describe('FirebaseLimitDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirebaseLimit()(obj, 'foo');
    expect(Reflect.getMetadata(FIREBASE_LIMIT_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
