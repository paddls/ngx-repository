import {NormalizerConfiguration} from './normalizer.configuration';

describe('NormalizerConfiguration', () => {

  it('should has default values', () => {
    const configuration: NormalizerConfiguration = new NormalizerConfiguration();

    expect(configuration.denormalizeNull).toBeFalsy();
    expect(configuration.denormalizeUndefined).toBeFalsy();
    expect(configuration.normalizeNull).toBeFalsy();
    expect(configuration.normalizeUndefined).toBeFalsy();
  });
});
