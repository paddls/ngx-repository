import { HTTP_RESOURCE_METADATA_KEY, HttpResource } from './http-resource.decorator';
import {
  IdResponseProcessor,
  PageResponseProcessor,
  ResponseBuilder,
  VoidResponseProcessor
} from '@witty-services/ngx-repository';

describe('HttpResourceDecorator', () => {

  it('should place http context in metadata', () => {
    const obj: any = {};
    const context: any = {
      path: 'toto'
    };

    HttpResource(context)(obj);
    expect(Reflect.getMetadata(HTTP_RESOURCE_METADATA_KEY, obj)).toEqual({
      findOne: {
        path: 'toto'
      },
      findById: {
        path: 'toto'
      },
      findAll: {
        path: 'toto',
        responseBuilder: ResponseBuilder.withParams({
          postResponseProcessors: [PageResponseProcessor]
        })
      },
      create: {
        path: 'toto',
        responseBuilder: ResponseBuilder.withParams({
          postResponseProcessors: [IdResponseProcessor]
        })
      },
      update: {
        path: 'toto',
        responseBuilder: ResponseBuilder.withParams({
          postResponseProcessors: [VoidResponseProcessor]
        })
      },
      patch: {
        path: 'toto',
        responseBuilder: ResponseBuilder.withParams({
          postResponseProcessors: [VoidResponseProcessor]
        })
      },
      delete: {
        path: 'toto',
        responseBuilder: ResponseBuilder.withParams({
          postResponseProcessors: [VoidResponseProcessor]
        })
      }
    });
  });
});
