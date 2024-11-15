import { isUndefined } from './is-undefined';

describe('isUndefined', () => {
  it('should return true if value type is Undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('should return false if value type is not Undefined', () => {
    expect(isUndefined(12)).toBe(false);
  });

});
