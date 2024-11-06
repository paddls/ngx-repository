import { flatten } from './flatten';

describe('flatten', () => {
  it('should flatten single deep array', () => {
    const array = [1, [2, 3]];
    const result = flatten(array);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should same array on single level array', () => {
    const array = [1, 2, 3];
    const result = flatten(array);
    expect(result).toEqual(array);
  });

  it('should flatten one level on multiple depp level array', () => {
    const array = [1, [2, [3]]];
    const result = flatten(array);
    expect(result).toEqual([1, 2, [3]]);
  });

});
