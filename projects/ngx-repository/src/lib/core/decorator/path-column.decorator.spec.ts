import { PATH_COLUMN_METADATA_KEY, PathColumn } from './path-column.decorator';

describe('PathColumnDecorator', () => {

  it('should accept nothing and make parameter by default with attribute name', () => {
    const obj: any = {
      test: 'value'
    };

    PathColumn()(obj, 'test');
    expect(Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'test'
      }
    ]);
  });

  it('should accept a string and make parameter with this new name', () => {
    const obj: any = {
      test: 'value'
    };

    PathColumn('hello')(obj, 'test');
    expect(Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'hello'
      }
    ]);
  });

  it('should accept an object and make parameter with this object', () => {
    const obj: any = {
      test: 'value'
    };

    PathColumn({ name: 'hello' })(obj, 'test');
    expect(Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'hello'
      }
    ]);
  });

  it('should concat all path params configuration', () => {
    const obj: any = {
      test: 'value',
      test2: 'value2'
    };

    PathColumn()(obj, 'test');
    PathColumn()(obj, 'test2');
    expect(Reflect.getMetadata(PATH_COLUMN_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'test'
      },
      {
        propertyKey: 'test2',
        name: 'test2'
      }
    ]);
  });
});
