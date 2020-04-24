import {FIREBASE_LIMIT_TO_LAST_METADATA_KEY, FirebaseLimitToLast} from './firebase-limit-to-last.decorator';

describe('FirebaseLimitToLastDecorator', () => {

  it('should place the decorator on good attribute', () => {
    const obj: any = {foo: 'bar'};

    FirebaseLimitToLast()(obj, 'foo');
    expect(Reflect.getMetadata(FIREBASE_LIMIT_TO_LAST_METADATA_KEY, obj)[`propertyKey`]).toEqual('foo');
  });
});
