import { ORIGINAL_QUERY_METADATA_KEY, OriginalQueryResponseProcessor } from './original-query-response.processor';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { Id } from '../../decorator/id.decorator';

describe('OriginalQueryResponseProcessor', () => {
  const processor: OriginalQueryResponseProcessor = new OriginalQueryResponseProcessor();

  class Book {

    @Id()
    public id: string;

    public constructor(data: Partial<Book>) {
      Object.assign(this, data);
    }
  }

  it('should place original query metadata on object', () => {
    const response: Book = new Book({ id: '12' });

    const context: RequestManagerContext = {
      query: 'query'
    } as any;

    const processedResponse: any = processor.transform(response, null, context);

    expect(processedResponse).toEqual(response);
    expect(Reflect.getMetadata(ORIGINAL_QUERY_METADATA_KEY, response)).toEqual('query');
  });

  it('should place original query metadata on array', () => {
    const response: Book[] = [
      new Book({ id: '12' }),
      new Book({ id: '12' })
    ];

    const context: RequestManagerContext = {
      query: 'query'
    } as any;

    const processedResponse: any = processor.transform(response, null, context);

    expect(processedResponse).toEqual(response);
    expect(Reflect.getMetadata(ORIGINAL_QUERY_METADATA_KEY, response[0])).toEqual('query');
    expect(Reflect.getMetadata(ORIGINAL_QUERY_METADATA_KEY, response[1])).toEqual('query');
  });

  it('should not place original query metadata when no query', () => {
    const response: Book = new Book({ id: '12' });

    const context: RequestManagerContext = {
      query: null
    } as any;

    const processedResponse: any = processor.transform(response, null, context);

    expect(processedResponse).toEqual(response);
    expect(Reflect.hasOwnMetadata(ORIGINAL_QUERY_METADATA_KEY, response)).toBeFalse();
  });
});
