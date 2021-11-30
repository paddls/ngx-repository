import { HTTP_RESOURCE_METADATA_KEY, HttpResource } from './http-resource.decorator';

describe('HttpResourceDecorator', () => {

  it('should place http context in metadata', () => {
    const obj: any = {};
    const context: any = {
      path: 'toto'
    };

    HttpResource(context)(obj);
    expect(Reflect.getMetadata(HTTP_RESOURCE_METADATA_KEY, obj)).toEqual(context);
  });
});
