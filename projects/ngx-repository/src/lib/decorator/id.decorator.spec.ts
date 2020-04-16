import 'reflect-metadata';
import {COLUMNS_METADATA_KEY, PropertyColumnContext} from './column.decorator';
import {Id, ID_METADATA_KEY, IdContext} from './id.decorator';

describe('IdDecorator', () => {
  let obj: any;

  const firstResult: PropertyColumnContext<any, any> = {propertyKey: 'myProperty', field: 'myPropertyName'};
  const secondResult: PropertyColumnContext<any, any> = {propertyKey: 'mySecondProperty', field: 'myBeautifulProperty'};
  const thirdResult: PropertyColumnContext<any, any> = {propertyKey: 'myThirdProperty', field: 'myThirdProperty'};

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
