export interface NormalizerConfiguration {

  denormalizeNull?: boolean;

  denormalizeUndefined?: boolean;

  normalizeNull?: boolean;

  normalizeUndefined?: boolean;
}

export const DEFAULT_NORMALIZER_CONFIGURATION: NormalizerConfiguration = {
  denormalizeNull: false,
  denormalizeUndefined: false,
  normalizeNull: false,
  normalizeUndefined: false
};
