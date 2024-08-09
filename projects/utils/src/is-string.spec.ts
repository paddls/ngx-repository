import isString from './is-string';

describe('isString', () => {

  it('should return true if value type is String', () => {
    expect(isString('12')).toBe(true);
  });

  it('should return false if value type is not String', () => {
    expect(isString(12)).toBe(false);
  });

});
