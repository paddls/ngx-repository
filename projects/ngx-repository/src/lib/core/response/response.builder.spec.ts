import { ResponseBuilderParam } from './response-builder.param';
import { ResponseProcessor } from './processor/response.processor';
import { RepositoryResponse } from './repository.response';
import { RequestManagerContext } from '../manager/request-manager.context';
import { ResponseBuilder } from './response.builder';
import { Injectable, Type } from '@angular/core';
import { ConfigurationContextProvider } from '../configuration/configuration-context.provider';
import { ConfigurationProvider } from '../configuration/configuration.provider';
import { TestBed } from '@angular/core/testing';

@Injectable()
class MyPreResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse, context: RequestManagerContext): any {
    if (!origin || !context) {
      return;
    }

    return {...response, pre: 'called'};
  }
}

@Injectable()
class MyPostResponseProcessor implements ResponseProcessor {

  public transform(response: any, origin: RepositoryResponse, context: RequestManagerContext): any {
    if (!origin || !context) {
      return;
    }

    return {...response, post: 'called'};
  }
}

describe('ResponseBuilder', () => {

  let responseBuilder: ResponseBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResponseBuilder,
        MyPreResponseProcessor,
        MyPostResponseProcessor
      ]
    });

    responseBuilder = TestBed.inject(ResponseBuilder);
  });


  describe('#withParams()', () => {
    it('should build response builder with params', () => {
      const params: ResponseBuilderParam = {
        preResponseProcessors: [MyPreResponseProcessor],
        postResponseProcessors: [MyPostResponseProcessor]
      };

      const builderWithParams: {
        builder: Type<ResponseBuilder>,
        params: any
      } = ResponseBuilder.withParams(params) as any;

      expect(builderWithParams.builder).toEqual(ResponseBuilder);
      expect(builderWithParams.params.responseProcessors[0]).toEqual(MyPreResponseProcessor);
      expect(builderWithParams.params.responseProcessors[5]).toEqual(MyPostResponseProcessor);
    });
  });

  describe('#build()', () => {
    it('should apply all processors to response', (done: DoneFn) => {
      const repositoryResponse: RepositoryResponse = {
        getBody: () => ({field: 'value'}),
        getRequest: () => ({})
      };

      const requestManagerContext: RequestManagerContext = {
        body: {field: 'value'},
        query: null,
        driver: null,
        configuration: new ConfigurationContextProvider(new ConfigurationProvider({
          responseBuilder: {
            builder: ResponseBuilder,
            params: {
              responseProcessors: [
                MyPreResponseProcessor,
                MyPostResponseProcessor
              ]
            }
          }
        }))
      };

      responseBuilder.build(repositoryResponse, requestManagerContext).subscribe((response: any) => {
        expect(response).toEqual({pre: 'called', post: 'called'});

        done();
      });
    });
  });
});
