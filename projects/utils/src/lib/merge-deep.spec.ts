import { mergeDeep } from '@paddls/utils';

describe('mergeDeep', () => {
  it('should merge simple objects', () => {
    const obj = {a: 1, b: 2};
    const other = {c:3, d:4};
    const result = mergeDeep(obj, other);
    expect(result).toEqual({a: 1, b: 2, c:3, d:4});
  });

  it('should merge nested objects', () => {
    const obj = {a: 1, b: {a: 1, b: 2}};
    const other = {b: {c: 3, d: 4}, c: 3};
    const result = mergeDeep(obj, other);
    expect(result).toEqual({a: 1, b: {a: 1, b: 2, c: 3, d: 4}, c:3});
  });

  it('should work with undefined values', () => {
    const obj = {a: 1, b: 2};
    const other = {b:undefined, c:3};
    const result = mergeDeep(obj, other);
    expect(result).toEqual({a: 1, b: undefined, c:3});
  });

  it('should override key with same name', () => {
    const obj = {a: 1, b: 2};
    const other = {b:4, c:3};
    const result = mergeDeep(obj, other);
    expect(result).toEqual({a: 1, b: 4, c:3});
  });

});
