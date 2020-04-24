import {PATH_PARAM_METADATA_KEY, PathParam} from './path-param.decorator';

describe('PathParamDecorator', () => {

  it('should accept nothing and make parameter by default with attribute name', () => {
    const obj: any = {
      test: 'value'
    };

    PathParam()(obj, 'test');
    expect(Reflect.getMetadata(PATH_PARAM_METADATA_KEY, obj)).toEqual([
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

    PathParam('hello')(obj, 'test');
    expect(Reflect.getMetadata(PATH_PARAM_METADATA_KEY, obj)).toEqual([
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

    PathParam({name: 'hello'})(obj, 'test');
    expect(Reflect.getMetadata(PATH_PARAM_METADATA_KEY, obj)).toEqual([
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

    PathParam()(obj, 'test');
    PathParam()(obj, 'test2');
    expect(Reflect.getMetadata(PATH_PARAM_METADATA_KEY, obj)).toEqual([
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
