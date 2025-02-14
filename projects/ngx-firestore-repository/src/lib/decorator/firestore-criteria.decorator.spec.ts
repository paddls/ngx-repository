import { FIRESTORE_CRITERIA_METADATA_KEY, FirestoreCriteria } from './firestore-criteria.decorator';

describe('FirestoreCriteriaDecorator', () => {

  it('should place all contexts in good place', () => {
    const obj: any = {
      foo: 'bar',
      test: 'value'
    };

    FirestoreCriteria({ field: 'Foo', operator: '<' })(obj, 'foo');
    FirestoreCriteria({ field: 'Test', operator: '>' })(obj, 'test');

    expect(Reflect.getMetadata(FIRESTORE_CRITERIA_METADATA_KEY, obj)).toEqual([
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
