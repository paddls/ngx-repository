import {NgxRepositoryModule} from './ngx-repository.module';
import {TestBed} from '@angular/core/testing';
import {
  AbstractStrategyRepositoryInstantiation,
  Denormalizer,
  Normalizer,
  NormalizerConfiguration
} from '@witty-services/repository-core';
import {InjectorStrategyRepositoryInstantiation} from './strategy/injector.strategy-repository-instantiation';

describe('NgxRepositoryModule', () => {

  describe('Providers', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NgxRepositoryModule
        ]
      });
    });

    it('should provide NormalizerConfiguration', () => {
      expect(TestBed.get(NormalizerConfiguration)).toBeTruthy();
    });

    it('should provide AbstractStrategyRepositoryInstantiation', () => {
      expect(TestBed.get(AbstractStrategyRepositoryInstantiation)).toBeTruthy();
      expect(TestBed.get(AbstractStrategyRepositoryInstantiation) instanceof InjectorStrategyRepositoryInstantiation).toBeTruthy();
    });

    it('should provide Normalizer', () => {
      expect(TestBed.get(Normalizer)).toBeTruthy();
    });

    it('should provide Denormalizer', () => {
      expect(TestBed.get(Denormalizer)).toBeTruthy();
    });
  });

  describe('Default configuration', () => {

    describe('Without forRoot call', () => {

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            NgxRepositoryModule
          ]
        });
      });

      it('should be falsy configuration', () => {
        const configuration: NormalizerConfiguration = TestBed.get(NormalizerConfiguration);

        expect(configuration).toBeTruthy();
        expect(configuration.normalizeNull).toBeFalsy();
        expect(configuration.denormalizeNull).toBeFalsy();
        expect(configuration.normalizeUndefined).toBeFalsy();
        expect(configuration.denormalizeUndefined).toBeFalsy();
      });
    });

    describe('With forRoot call', () => {

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            NgxRepositoryModule.forRoot()
          ]
        });
      });

      it('should be falsy configuration', () => {
        const configuration: NormalizerConfiguration = TestBed.get(NormalizerConfiguration);

        expect(configuration).toBeTruthy();
        expect(configuration.normalizeNull).toBeFalsy();
        expect(configuration.denormalizeNull).toBeFalsy();
        expect(configuration.normalizeUndefined).toBeFalsy();
        expect(configuration.denormalizeUndefined).toBeFalsy();
      });
    });
  });

  describe('Custom configuration', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NgxRepositoryModule.forRoot({
            normalizerConfiguration: {
              denormalizeNull: true,
              normalizeUndefined: true
            }
          })
        ]
      });
    });

    it('should be partially falsy configuration', () => {
      const configuration: NormalizerConfiguration = TestBed.get(NormalizerConfiguration);

      expect(configuration).toBeTruthy();
      expect(configuration.normalizeNull).toBeFalsy();
      expect(configuration.denormalizeNull).toBeTruthy();
      expect(configuration.normalizeUndefined).toBeTruthy();
      expect(configuration.denormalizeUndefined).toBeFalsy();
    });
  });
});

