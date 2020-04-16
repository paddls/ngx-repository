import {HTTP_PARAM_METADATA_KEY, HttpParam} from './http-param.decorator';

describe('HttpParamDecorator', () => {

  it('should accept nothing and make parameter by default with attribute name', () => {
    const obj: any = {
      test: 'value'
    };

    HttpParam()(obj, 'test');
    expect(Reflect.getMetadata(HTTP_PARAM_METADATA_KEY, obj)).toEqual([
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

    HttpParam('hello')(obj, 'test');
    expect(Reflect.getMetadata(HTTP_PARAM_METADATA_KEY, obj)).toEqual([
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

    HttpParam({name: 'hello'})(obj, 'test');
    expect(Reflect.getMetadata(HTTP_PARAM_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'hello'
      }
    ]);
  });

  it('should concat all http params configuration', () => {
    const obj: any = {
      test: 'value',
      test2: 'value2'
    };

    HttpParam()(obj, 'test');
    HttpParam()(obj, 'test2');
    expect(Reflect.getMetadata(HTTP_PARAM_METADATA_KEY, obj)).toEqual([
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
