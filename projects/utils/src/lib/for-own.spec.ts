import { forOwn } from './for-own';

describe('forOwn', () => {
  it('should iterate over own properties of an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result: [string, any][] = [];

    forOwn(obj, (value, key) => {
      result.push([key, value]);
    });

    expect(result).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  it('should pass the correct arguments to the iteratee', () => {
    const obj = { a: 1 };
    const iteratee = jasmine.createSpy('iteratee');

    forOwn(obj, iteratee);

    expect(iteratee).toHaveBeenCalledWith(1, 'a', obj);
  });
});
