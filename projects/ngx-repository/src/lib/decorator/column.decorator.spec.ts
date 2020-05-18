import 'reflect-metadata';
import {Column, ColumnContext, COLUMNS_METADATA_KEY, ColumnContextConfiguration} from './column.decorator';
import {DateConverter} from '../converter/date.converter';

describe('ColumnDecorator', () => {

  let obj: any = null;

  const firstResult: ColumnContextConfiguration<any, any> = {propertyKey: 'myProperty', field: 'myPropertyName'};
  const secondResult: ColumnContextConfiguration<any, any> = {propertyKey: 'mySecondProperty', field: 'myBeautifulProperty'};
  const fourthResult: ColumnContextConfiguration<any, any> = {propertyKey: 'myFourthProperty', field: 'myFourthProperty'};

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
    Column(() => Date)(obj, 'myThirdProperty');
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj).length).toEqual(1);
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)[0].type instanceof Function).toBe(true);
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)[0].type()).toBe(Date);
  });

  it('should set up with nothing', () => {
    Column()(obj, 'myFourthProperty');
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toEqual([
      fourthResult
    ]);
  });

  it('should set up two properties', () => {
    Column(() => Date)(obj, 'myThirdProperty');
    Column()(obj, 'myFourthProperty');
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj).length).toEqual(2);
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)[0].type instanceof Function).toBe(true);
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)[0].type()).toBe(Date);
    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)[1]).toEqual(fourthResult);
  });

  it('should throw an error when type and custom converter are passed together', () => {
    expect(
      () => Column({type: () => Date, customConverter: () => DateConverter})(obj, 'myFifthProperty')
    ).toThrowError('You cannot specify both the converter and type attributes at the same time.');

    expect(Reflect.getMetadata(COLUMNS_METADATA_KEY, obj)).toBeUndefined();
  });
});
