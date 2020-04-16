import {HTTP_HEADER_METADATA_KEY, HttpHeader} from './http-header.decorator';

describe('HttpHeaderDecorator', () => {

  it('should accept nothing and make parameter by default with attribute name', () => {
    const obj: any = {
      test: 'value'
    };

    HttpHeader()(obj, 'test');
    expect(Reflect.getMetadata(HTTP_HEADER_METADATA_KEY, obj)).toEqual([
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

    HttpHeader('hello')(obj, 'test');
    expect(Reflect.getMetadata(HTTP_HEADER_METADATA_KEY, obj)).toEqual([
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

    HttpHeader({name: 'hello'})(obj, 'test');
    expect(Reflect.getMetadata(HTTP_HEADER_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        name: 'hello'
      }
    ]);
  });

  it('should concat all http headers configuration', () => {
    const obj: any = {
      test: 'value',
      test2: 'value2'
    };

    HttpHeader()(obj, 'test');
    HttpHeader()(obj, 'test2');
    expect(Reflect.getMetadata(HTTP_HEADER_METADATA_KEY, obj)).toEqual([
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
