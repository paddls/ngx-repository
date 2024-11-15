import { omitBy } from './omit-by';

describe('omitBy', () => {
  it('should omit properties based on the check function', () => {
    const obj = {a: 1, b: '2', c: 3, d: '4'};
    const result = omitBy(obj, (value: any) => typeof value === 'string');
    expect(result).toEqual({a: 1, c: 3});
  });

  it('should not omit any properties if check function always returns false', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = omitBy(obj, (value: any) => typeof value === 'boolean');
    expect(result).toEqual({a: 1, b: 2, c: 3});
  });

  it('should omit all properties if check function always returns true', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = omitBy(obj, (value: any) => typeof value === 'number');
    expect(result).toEqual({});
  });

  it('should handle empty objects correctly', () => {
    const obj = {};
    const result = omitBy(obj, (value: any) => true);
    expect(result).toEqual({});
  });

});
