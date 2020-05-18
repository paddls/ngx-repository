import 'reflect-metadata';
import {JOIN_COLUMN_METADATA_KEY, JoinColumn, JoinColumnContext} from './join-column.decorator';
import {Mock} from '../../test/mock.model';

describe('JoinColumnDecorator', () => {

  it('should place all JoinColumnContext parameter in the good place', () => {
    const joinColumnContext1: JoinColumnContext<Mock> = {
      resourceType: () => Mock,
      attribute: 'myProperty'
    };
    const joinColumnContext2: JoinColumnContext<Mock> = {
      resourceType: () => Mock,
      attribute: 'mySecondProperty'
    };

    const obj: Mock = new Mock({
      myProperty: 'myValue',
      mySecondProperty: 'myOtherValue'
    });

    JoinColumn(joinColumnContext1)(obj, 'myProperty');
    expect(Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, obj)).toEqual([{propertyKey: 'myProperty', ...joinColumnContext1}]);

    JoinColumn(joinColumnContext2)(obj, 'MySecondProperty');
    expect(Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, obj)).toEqual([
      {propertyKey: 'myProperty', ...joinColumnContext1},
      {propertyKey: 'MySecondProperty', ...joinColumnContext2}
    ]);
  });
});
