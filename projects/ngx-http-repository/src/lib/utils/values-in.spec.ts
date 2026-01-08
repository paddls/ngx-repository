import { valuesIn } from './values-in';

describe('ValuesIn', () => {
  it('should return an array with all object values', () => {
    const obj: any = { a: 1, b: 2, c: 3 };
    const result: any = valuesIn(obj);
    expect(result).toEqual([
      1,
      2,
      3
    ]);
  });
  it('should return an empty array with empty object', () => {
    const obj: any = {};
    const result: any = valuesIn(obj);
    expect(result).toEqual([]);
  });

  it('should return a nested array from nestedObject', () => {
    const obj: any = { a: 1, b: { c: 3, d: 4 } };
    const result: any = valuesIn(obj);
    expect(result).toEqual([
      1,
      { c: 3, d: 4 }
    ]);
  });

});
