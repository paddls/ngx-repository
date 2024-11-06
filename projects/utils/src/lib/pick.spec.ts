import { pick } from './pick';

describe('pick', () => {
  it('should pick a single property', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['b']);
    expect(result).toEqual({ b: 2 });
  });

  it('should pick multiple properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['a', 'b']);
    expect(result).toEqual({a:1, b:2 });
  });

  it('should return empty object if no properties are picked', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, []);
    expect(result).toEqual({});
  });

  it('should handle non-existing properties correctly', () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, ['c']);
    expect(result).toEqual({});
  });

});
