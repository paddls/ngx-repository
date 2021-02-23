import { HTTP_RESOURCE_METADATA_KEY, HttpResource, HttpResourceContext } from './http-resource.decorator';

describe('HttpResourceDecorator', () => {

  it('should place http context in metadata', () => {
    const obj: any = {};
    const context: HttpResourceContext = {
      path: 'toto'
    };

    HttpResource(context)(obj);
    expect(Reflect.getMetadata(HTTP_RESOURCE_METADATA_KEY, obj)).toBe(context);
  });
});
