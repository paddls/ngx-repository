import 'reflect-metadata';
import { Column, COLUMNS_METADATA_KEY } from './column.decorator';
import { ColumnContext, ColumnContextConfiguration } from '../configuration/context/column-context.configuration';

describe('ColumnDecorator', () => {
  let obj: any;

  const firstResult: ColumnContextConfiguration<any, any> = { propertyKey: 'myProperty', field: 'myPropertyName' };
  const secondResult: ColumnContextConfiguration<any, any> = {
    propertyKey: 'mySecondProperty',
    field: 'myBeautifulProperty'
  };
  const thirdResult: ColumnContextConfiguration<any, any> = {
    propertyKey: 'myThirdProperty',
    field: 'myThirdProperty'
  };

  beforeEach(() => {
    obj = {
      myProperty: 'myValue',
      mySecondProperty: 'mySecondValue',
      myThirdProperty: 'myThirdValue'
    };
  });

  it('should place all ColumnContext parameter in the good place', () => {
    const columnContext: ColumnContext<any, any> = {
      field: 'myPropertyName'
    };

    Column(columnContext)(obj, 'myProperty');

    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([firstResult]);
  });

  it('should place a new ColumnContext parameter in the good place with just a string', () => {
    Column('myBeautifulProperty')(obj, 'mySecondProperty');

    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([secondResult]);
  });

  it('should place a new ColumnContext parameter in the good place with anything', () => {
    Column()(obj, 'myThirdProperty');

    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([thirdResult]);
  });
});
