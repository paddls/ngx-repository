import { valuesIn } from '@paddls/utils';

describe('ValuesIn', () => {
  it('should return an array with all object values', () => {
    const obj = {a : 1, b: 2, c: 3};
    const result = valuesIn(obj);
    expect(result).toEqual([1, 2, 3]);
  });
  it('should return an empty array with empty object', () => {
    const obj = {};
    const result = valuesIn(obj);
    expect(result).toEqual([]);
  });

  it('should return a nested array from nestedObject', () => {
    const obj = {a : 1, b: {c: 3, d: 4}};
    const result = valuesIn(obj);
    expect(result).toEqual([1, {c:3, d:4}]);
  });

});
