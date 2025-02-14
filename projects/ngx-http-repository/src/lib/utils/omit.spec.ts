import { omit } from './omit';

describe('omit', () => {
  it('should omit a single property', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['b']);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('should omit multiple properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, [
      'a',
      'b'
    ]);
    expect(result).toEqual({ c: 3 });
  });

  it('should return an empty object if all properties are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, [
      'a',
      'b',
      'c'
    ]);
    expect(result).toEqual({});
  });

  it('should return the original object if no properties are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle non-existing properties correctly', () => {
    const obj = { a: 1, b: 2 };
    const result = omit(obj, ['c']);
    expect(result).toEqual({ a: 1, b: 2 });
  });

});
