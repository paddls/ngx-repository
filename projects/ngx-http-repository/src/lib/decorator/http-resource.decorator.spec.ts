import { HTTP_RESOURCE_METADATA_KEY, HttpResource } from './http-resource.decorator';
import { HttpFindAllResponseBuilder } from '../response/http-find-all-response.builder';
import { HttpCreateResponseBuilder } from '../response/http-create-response.builder';
import { HttpWriteResponseBuilder } from '../response/http-write-response.builder';

describe('HttpResourceDecorator', () => {

  it('should place http context in metadata', () => {
    const obj: any = {};
    const context: any = {
      path: 'toto'
    };

    HttpResource(context)(obj);
    expect(Reflect.getMetadata(HTTP_RESOURCE_METADATA_KEY, obj)).toEqual({
      findAll: {
        response: HttpFindAllResponseBuilder.withParams()
      },
      create: {
        response: HttpCreateResponseBuilder.withParams()
      },
      write: {
        response: HttpWriteResponseBuilder.withParams()
      },
      path: 'toto'
    });
  });
});
