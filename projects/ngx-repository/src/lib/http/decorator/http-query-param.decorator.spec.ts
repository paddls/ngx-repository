import {HTTP_QUERY_PARAM_METADATA_KEY, HttpQueryParam} from './http-query-param.decorator';

describe('HttpParamDecorator', () => {

  it('should accept nothing and make parameter by default with attribute name', () => {
    const obj: any = {
      test: 'value'
    };

    HttpQueryParam()(obj, 'test');
    expect(Reflect.getMetadata(HTTP_QUERY_PARAM_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'test',
        format: ':value'
      }
    ]);
  });

  it('should accept a string and make parameter with this new name', () => {
    const obj: any = {
      test: 'value'
    };

    HttpQueryParam('hello')(obj, 'test');
    expect(Reflect.getMetadata(HTTP_QUERY_PARAM_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'hello',
        format: ':value'
      }
    ]);
  });

  it('should accept an object and make parameter with this object', () => {
    const obj: any = {
      test: 'foo'
    };

    HttpQueryParam({name: 'hello', format: 'hello :value/:value'})(obj, 'test');
    expect(Reflect.getMetadata(HTTP_QUERY_PARAM_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'hello',
        format: 'hello :value/:value'
      }
    ]);
  });

  it('should concat all http query params configuration', () => {
    const obj: any = {
      test: 'value',
      test2: 'value2'
    };

    HttpQueryParam()(obj, 'test');
    HttpQueryParam()(obj, 'test2');
    expect(Reflect.getMetadata(HTTP_QUERY_PARAM_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'test',
        format: ':value'
      },
      {
        propertyKey: 'test2',
        name: 'test2',
        format: ':value'
      }
    ]);
  });
});
