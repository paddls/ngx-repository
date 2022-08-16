import { DenormalizeResponseProcessor } from './denormalize-response.processor';
import { TestBed } from '@angular/core/testing';
import {
  ConfigurationContextProvider,
  ConfigurationProvider,
  PublisherService,
  RepositoryNormalizer,
  RepositoryResponse,
  RequestManagerContext
} from '../../../../public-api';
import createSpy = jasmine.createSpy;

describe('DenormalizeResponseProcessor', () => {

  let processor: DenormalizeResponseProcessor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DenormalizeResponseProcessor,
        {
          provide: RepositoryNormalizer,
          useValue: {
            denormalize: () => {
            }
          }
        }
      ]
    });

    processor = TestBed.inject(DenormalizeResponseProcessor);
  });

  it('should return origin body', () => {
    PublisherService.getInstance = createSpy().and.returnValue({
      publish: (event: any) => {
        if (!event) {

          return;
        }

        return;
      }
    } as PublisherService);

    class Book {
    }

    const response: any = {name: 'Oscar'};
    const origin: RepositoryResponse = {
      getBody: () => ({name: 'Oscar'}),
      getRequest: () => ({path: '/books'})
    };
    const context: RequestManagerContext = {
      configuration: new ConfigurationContextProvider(new ConfigurationProvider({
          responseType: () => Book,
          normalizerConfiguration: 'configuration' as any
        })
      )
    } as any;

    processor.transform(response, origin, context);
  });
});
