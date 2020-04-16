import 'reflect-metadata';
import {Column, ColumnContext, COLUMNS_METADATA_KEY, PropertyColumnContext} from './column.decorator';
import {DateConverter} from '../converter/date.converter';

describe('ColumnDecorator', () => {

  let obj: any = null;

  const firstResult: PropertyColumnContext<any, any> = {propertyKey: 'myProperty', field: 'myPropertyName'};
  const secondResult: PropertyColumnContext<any, any> = {propertyKey: 'mySecondProperty', field: 'myBeautifulProperty'};
  const thirdResult: PropertyColumnContext<any, any> = {propertyKey: 'myThirdProperty', field: 'myThirdProperty', type: Date};
  const fourthResult: PropertyColumnContext<any, any> = {propertyKey: 'myFourthProperty', field: 'myFourthProperty'};

  beforeEach(() => {
    obj = {
      myProperty: 'myValue',
      mySecondProperty: 'mySecondValue',
      myThirdProperty: 'myThirdValue',
      myFourthProperty: 'myFourthValue'
    };
  });

  it('should set up with an object', () => {
    const columnContext: ColumnContext<any, any> = {
      field: 'myPropertyName'
    };

    Column(columnContext)(obj, 'myProperty');
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([
      firstResult
    ]);
  });

  it('should set up with a string', () => {
    Column('myBeautifulProperty')(obj, 'mySecondProperty');
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([
      secondResult
    ]);
  });

  it('should set up with a type', () => {
    Column(Date)(obj, 'myThirdProperty');
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([
      thirdResult
    ]);
  });

  it('should set up with nothing', () => {
    Column()(obj, 'myFourthProperty');
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([
      fourthResult
    ]);
  });

  it('should set up two properties', () => {
    Column(Date)(obj, 'myThirdProperty');
    Column()(obj, 'myFourthProperty');
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([
      thirdResult,
      fourthResult
    ]);
  })

  it('should throw an error when type and custom converter are passed together', () => {
    expect(
      () => Column({type: Date, customConverter: DateConverter})(obj, 'myFifthProperty')
    ).toThrowError('You cannot specify both the converter and type attributes at the same time.');

    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toBeUndefined();
  });
});
