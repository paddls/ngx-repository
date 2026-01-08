import { mergeDeep } from './merge-deep';

describe('mergeDeep', () => {
  it('should merge simple objects', () => {
    const obj: any = { a: 1, b: 2 };
    const other: any = { c: 3, d: 4 };
    const result: any = mergeDeep(obj, other);
    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });

  it('should merge nested objects', () => {
    const obj: any = { a: 1, b: { a: 1, b: 2 } };
    const other: any = { b: { c: 3, d: 4 }, c: 3 };
    const result: any = mergeDeep(obj, other);
    expect(result).toEqual({ a: 1, b: { a: 1, b: 2, c: 3, d: 4 }, c: 3 });
  });

  it('should work with undefined values', () => {
    const obj: any = { a: 1, b: 2 };
    const other: any = { b: undefined, c: 3 };
    const result: any = mergeDeep(obj, other);
    expect(result).toEqual({ a: 1, b: undefined, c: 3 });
  });

  it('should override key with same name', () => {
    const obj: any = { a: 1, b: 2 };
    const other: any = { b: 4, c: 3 };
    const result: any = mergeDeep(obj, other);
    expect(result).toEqual({ a: 1, b: 4, c: 3 });
  });

});
