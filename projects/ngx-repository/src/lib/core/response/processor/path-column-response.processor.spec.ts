import { Id } from '../../decorator/id.decorator';
import { PathColumnResponseProcessor } from './path-column-response.processor';
import { PathColumn } from '../../decorator/path-column.decorator';
import { RepositoryResponse } from '../repository.response';

describe('PathColumnResponseProcessor', () => {
  const processor: PathColumnResponseProcessor = new PathColumnResponseProcessor();

  class Book {

    @Id()
    public id: string;

    @PathColumn('category')
    public categoryPathColumn: string;

    @PathColumn()
    public category: string;

    public constructor(data: Partial<Book>) {
      Object.assign(this, data);
    }
  }

  it('should place path column names on all decorated fields', () => {
    const response: Book = new Book({ id: '12' });

    const origin: RepositoryResponse = {
      getRequest: () => ({
        getPath: () => ({
          pathParams: {
            [':category']: 'manga'
          }
        })
      })
    } as any;

    const processedResponse: Book = processor.transform(response, origin);

    expect(processedResponse).toBeInstanceOf(Book);
    expect(processedResponse.category).toEqual('manga');
    expect(processedResponse.categoryPathColumn).toEqual('manga');
  });

  it('should not place path column names when not defined', () => {
    const response: Book = new Book({ id: '12' });

    const origin: RepositoryResponse = {
      getRequest: () => ({
        getPath: () => ({
          pathParams: {}
        })
      })
    } as any;

    const processedResponse: Book = processor.transform(response, origin);

    expect(processedResponse).toBeInstanceOf(Book);
    expect(processedResponse.category).toBeUndefined();
    expect(processedResponse.categoryPathColumn).toBeUndefined();
  });

  it('should place path column names on all decorated fields of all array items', () => {
    const response: Book[] = [
      new Book({ id: '12' }),
      new Book({ id: '12' })
    ];

    const origin: RepositoryResponse = {
      getRequest: () => ({
        getPath: () => ({
          pathParams: {
            [':category']: 'manga'
          }
        })
      })
    } as any;

    const processedResponse: Book[] = processor.transform(response, origin);

    expect(processedResponse[0]).toBeInstanceOf(Book);
    expect(processedResponse[0].category).toEqual('manga');
    expect(processedResponse[0].categoryPathColumn).toEqual('manga');
    expect(processedResponse[1]).toBeInstanceOf(Book);
    expect(processedResponse[1].category).toEqual('manga');
    expect(processedResponse[1].categoryPathColumn).toEqual('manga');
  });

  it('should not process response when it is not an object', () => {
    const response: string = 'response';

    const origin: RepositoryResponse = {
      getRequest: () => ({
        getPath: () => ({
          pathParams: {}
        })
      })
    } as any;

    const processedResponse: string = processor.transform(response, origin);

    expect(processedResponse).toEqual(response);
  });
});
