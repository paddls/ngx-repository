import { set } from './set';

describe('set', () => {
  it('should set a value at a given path with dot notation', () => {
    const obj = { a: { b: undefined } };
    set(obj, 'a.b.c', 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });

  it('should set a value at a given path with array notation', () => {
    const obj = { a: { b: undefined } };
    set(obj, ['a', 'b', 'c'], 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });

  it('should create nested objects if they do not exist', () => {
    const obj = {};
    set(obj, 'x.y.z', 'test');
    expect(obj).toEqual({ x: { y: { z: 'test' } } });
  });

  it('should overwrite existing values at the given path', () => {
    const obj = { a: { b: { c: 10 } } };
    set(obj, 'a.b.c', 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });

  it('should handle empty path array correctly', () => {
    const obj = { a: 1 };
    set(obj, [], 42);
    expect(obj).toEqual({ a: 1 });
  });

  it('should handle empty path string correctly', () => {
    const obj = { a: 1 };
    set(obj, '', 42);
    expect(obj).toEqual({ a: 1 });
  });
});
