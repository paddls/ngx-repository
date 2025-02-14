import 'reflect-metadata';
import { Id, ID_METADATA_KEY } from './id.decorator';
import { COLUMNS_METADATA_KEY } from './column.decorator';
import { ColumnContextConfiguration } from '../configuration/context/column-context.configuration';
import { IdContext } from '../configuration/context/id-context.configuration';

describe('IdDecorator', () => {
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

  it('should place all IdContext parameter in the good place', () => {
    const idContext: IdContext = {
      field: 'myPropertyName'
    };

    Id(idContext)(obj, 'myProperty');

    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([firstResult]);
    expect(Reflect.getMetadata(ID_METADATA_KEY, obj)).toEqual('myProperty');
  });

  it('should place a new IdContext parameter in the good place with just a string', () => {
    Id('myBeautifulProperty')(obj, 'mySecondProperty');

    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([secondResult]);
    expect(Reflect.getMetadata(ID_METADATA_KEY, obj)).toEqual('mySecondProperty');
  });

  it('should place a new IdContext parameter in the good place with anything', () => {
    Id()(obj, 'myThirdProperty');

    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([thirdResult]);
    expect(Reflect.getMetadata(ID_METADATA_KEY, obj)).toEqual('myThirdProperty');
  });
});
