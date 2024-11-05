import { isObject } from '@paddls/utils';

describe('isObject', () => {
  it('should return true if value type is object', () => {
    expect(isObject({})).toBe(true);
  });

  it('should return false if value type is not object', () => {
    expect(isObject(12)).toBe(false);
  });

});
