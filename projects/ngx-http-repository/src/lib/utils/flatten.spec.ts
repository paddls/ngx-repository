import { flatten } from './flatten';

describe('flatten', () => {
  it('should flatten single deep array', () => {
    const array: (number | number[])[] = [
      1,
      [
        2,
        3
      ]
    ];
    const result: any = flatten(array);
    expect(result).toEqual([
      1,
      2,
      3
    ]);
  });

  it('should same array on single level array', () => {
    const array: number[] = [
      1,
      2,
      3
    ];
    const result: any = flatten(array);
    expect(result).toEqual(array);
  });

  it('should flatten one level on multiple depp level array', () => {
    const array: (number | (number|number[])[])[] = [
      1,
      [
        2,
        [3]
      ]
    ];
    const result: any = flatten(array);
    expect(result).toEqual([
      1,
      2,
      [3]
    ]);
  });

});
