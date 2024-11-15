import { flattenDeep } from './flatten-deep';

describe('flattenDeep', () => {
  it('should flatten single level deep array', () => {
    const array: any[] = [1, [2, 3, 4]];
    const result = flattenDeep(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should flatten multiple level deep array', () => {
    const array: any[] = [1, [2, [3, [4]]]];
    const result = flattenDeep(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should return same array on single level array', () => {
    const array: any[] = [1, 2, 3];
    const result = flattenDeep(array);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle empty array correctly', () => {
    const array: any[] = [];
    const result = flattenDeep(array);
    expect(result).toEqual([]);
  });

  it('should handle undefined correctly', () => {
    const array: any[] = [];
    const result = flattenDeep(array);
    expect(result).toEqual([]);
  });
});
