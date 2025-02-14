import { IdResponseProcessor } from './id-response.processor';
import { RequestManagerContext } from '../../manager/request-manager.context';
import { ConfigurationContextProvider } from '../../configuration/configuration-context.provider';
import { ConfigurationProvider } from '../../configuration/configuration.provider';
import { Id } from '../../../../public-api';

describe('IdResponseProcessor', () => {
  const processor: IdResponseProcessor = new IdResponseProcessor();

  class Book {

    @Id()
    public id: string;

    public constructor(data: Partial<Book>) {
      Object.assign(this, data);
    }
  }

  class NoId {
  }

  it('should return response id field', () => {
    const context: RequestManagerContext = {
      configuration: new ConfigurationContextProvider(new ConfigurationProvider({
          responseType: () => Book,
        })
      )
    } as any;

    expect(processor.transform(new Book({ id: '12' }), null, context)).toEqual('12');
  });

  it('should return null when no id field', () => {
    const context: RequestManagerContext = {
      configuration: new ConfigurationContextProvider(new ConfigurationProvider({
          responseType: () => NoId,
        })
      )
    } as any;

    expect(processor.transform(new Book({ id: '12' }), null, context)).toBeNull();
  });

  it('should return null when no response', () => {
    const context: RequestManagerContext = {
      configuration: new ConfigurationContextProvider(new ConfigurationProvider({
          responseType: () => Book,
        })
      )
    } as any;

    expect(processor.transform(null, null, context)).toBeNull();
  });
});
