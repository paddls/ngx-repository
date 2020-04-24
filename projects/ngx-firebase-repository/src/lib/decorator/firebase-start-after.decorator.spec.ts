import {FIREBASE_START_AFTER_METADATA_KEY, FirebaseStartAfter} from './firebase-start-after.decorator';

describe('FirebaseStartAfterDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirebaseStartAfter()(obj, 'foo');
    expect(Reflect.getMetadata(FIREBASE_START_AFTER_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
