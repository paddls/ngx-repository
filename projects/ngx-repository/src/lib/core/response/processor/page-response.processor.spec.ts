import { Id } from '../../decorator/id.decorator';
import { PageResponseProcessor } from './page-response.processor';
import { ResponseBuilder } from '../response.builder';
import { BodyResponseProcessor } from './body.response-processor';
import { Page } from '../../model/page';

describe('PageResponseProcessor', () => {
  const processor: PageResponseProcessor = new PageResponseProcessor();

  class Book {

    @Id()
    public id: string;

    public constructor(data: Partial<Book>) {
      Object.assign(this, data);
    }
  }

  describe('#withParams', () => {
    it('should call response builder with params method', () => {
      spyOn(ResponseBuilder, 'withParams').and.stub();

      PageResponseProcessor.withParams(PageResponseProcessor);

      expect(ResponseBuilder.withParams).toHaveBeenCalledWith({
        bodyResponseProcessors: [
          BodyResponseProcessor,
          PageResponseProcessor
        ]
      });
    });
  });

  describe('#transform()', () => {
    it('should build page if response is array', () => {
      const response: Book[] = [
        new Book({ id: '12' }),
        new Book({ id: '12' })
      ];

      const processedResponse: any = processor.transform(response);

      expect(processedResponse).toBeInstanceOf(Page);
    });

    it('should not process response if response is not array', () => {
      const response: Book = new Book({ id: '12' });

      const processedResponse: any = processor.transform(response);

      expect(processedResponse).toEqual(response);
    });
  });
});
