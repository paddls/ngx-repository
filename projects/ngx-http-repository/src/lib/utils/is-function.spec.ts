import { isFunction } from './is-function';

describe('isFunction', () => {
  it('should return true if value type is function', () => {
    const func = () => {
    };
    expect(isFunction(func)).toBe(true);
  });

  it('should return false if value type is not function', () => {
    expect(isFunction(12)).toBe(false);
  });

});
