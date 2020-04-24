import {FIREBASE_CRITERIA_METADATA_KEY, FirebaseCriteria} from './firebase-criteria.decorator';

describe('FirebaseCriteriaDecorator', () => {

  it('should place all contexts in good place', () => {
    const obj: any = {
      foo: 'bar',
      test: 'value'
    };

    FirebaseCriteria({field: 'Foo', operator: '<'})(obj, 'foo');
    FirebaseCriteria({field: 'Test', operator: '>'})(obj, 'test');

    expect(Reflect.getMetadata(FIREBASE_CRITERIA_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'foo',
        operator: '<',
        field: 'Foo'
      },
      {
        propertyKey: 'test',
        operator: '>',
        field: 'Test'
      }
    ]);
  });
});
