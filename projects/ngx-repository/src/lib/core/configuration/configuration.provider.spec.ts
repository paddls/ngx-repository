import { ConfigurationProvider } from './configuration.provider';

describe('ConfigurationProvider', () => {
  let params: any;
  let provider: ConfigurationProvider;

  beforeEach(() => {
    params = {};
    provider = new ConfigurationProvider(params);
  });

  describe('#getConfiguration', () => {

    it('should throw an error if searched configuration is not find', () => {
      spyOn(provider, 'findConfiguration').and.returnValue(null);

      const paths: string[] = [
        'foo',
        'bar'
      ];
      expect(() => provider.getConfiguration('myProperty', [
        'foo',
        'bar'
      ])).toThrowError(`Unable to find configuration 'myProperty' (${JSON.stringify(paths)})`);
    });

    it('should return the configuration', () => {
      const configuration: any = {};
      spyOn(provider, 'findConfiguration').and.returnValue(configuration);

      expect(provider.getConfiguration('myProperty', [
        'foo',
        'bar'
      ])).toBe(configuration);
      expect(provider.findConfiguration).toHaveBeenCalledTimes(1);
      expect(provider.findConfiguration).toHaveBeenCalledWith('myProperty', [
        'foo',
        'bar'
      ]);
    });
  });

  describe('#findConfiguration', () => {

    it('should return null path or property not exist in params', () => {
      expect(provider.findConfiguration('myProperty', [
        'foo',
        'bar'
      ])).toBeNull();
    });

    it('should return the property value if property exist in  root params', () => {
      params[`myProperty`] = 'toto';
      expect(provider.findConfiguration('myProperty', [
        'foo',
        'bar'
      ])).toEqual('toto');
    });

    it('should return the property value if property exist with provided path in params', () => {
      params[`bar`] = {
        myProperty: 'toto'
      };
      expect(provider.findConfiguration('myProperty', [
        'foo',
        'bar'
      ])).toEqual('toto');
    });
  });
});
