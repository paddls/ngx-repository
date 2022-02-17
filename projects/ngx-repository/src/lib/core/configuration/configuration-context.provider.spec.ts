import {ConfigurationContextProvider} from './configuration-context.provider';
import {ConfigurationProvider} from './configuration.provider';

describe('ConfigurationContextProvider', () => {
  let params: any;
  let provider: ConfigurationProvider;
  let paths: string[];
  let providerContext: ConfigurationContextProvider;

  beforeEach(() => {
    params = {};
    provider = new ConfigurationProvider(params);
    paths = [];
    providerContext = new ConfigurationContextProvider(provider, paths);
  });

  describe('#getOperation', () => {

    it('should return the first path', () => {
      paths.push('foo');
      paths.push('bar');
      expect(providerContext.getOperation()).toEqual('foo');
    });
  });

  describe('#getConfiguration', () => {

    it('should call getConfiguration of the ConfigurationProvider object', () => {
      const obj: any = {};
      spyOn(provider, 'getConfiguration').and.returnValue(obj);

      expect(providerContext.getConfiguration('requestBuilder')).toEqual(obj);
      expect(provider.getConfiguration).toHaveBeenCalledTimes(1);
      expect(provider.getConfiguration).toHaveBeenCalledWith('requestBuilder', paths);
    });
  });

  describe('#findConfiguration', () => {

    it('should call findConfiguration of the ConfigurationProvider object', () => {
      const obj: any = {};
      spyOn(provider, 'findConfiguration').and.returnValue(obj);

      expect(providerContext.findConfiguration('requestBuilder')).toEqual(obj);
      expect(provider.findConfiguration).toHaveBeenCalledTimes(1);
      expect(provider.findConfiguration).toHaveBeenCalledWith('requestBuilder', paths);
    });
  });
});
