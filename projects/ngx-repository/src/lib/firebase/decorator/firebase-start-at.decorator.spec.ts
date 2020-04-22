import {FIREBASE_START_AT_METADATA_KEY, FirebaseStartAt} from './firebase-start-at.decorator';

describe('FirebaseStartAtDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirebaseStartAt()(obj, 'foo');
    expect(Reflect.getMetadata(FIREBASE_START_AT_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
