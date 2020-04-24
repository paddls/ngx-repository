import {FIREBASE_END_AT_METADATA_KEY, FirebaseEndAt} from './firebase-end-at.decorator';

describe('FirebaseEndAtDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirebaseEndAt()(obj, 'foo');
    expect(Reflect.getMetadata(FIREBASE_END_AT_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
