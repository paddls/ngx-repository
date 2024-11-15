import { get } from './get';

describe('get', () => {
  it('should return undefined if path is empty', () => {
    const obj = {a: 1};
    expect(get(obj, '')).toBeUndefined();
  });

  it('should return the value at the specified path', () => {
    const obj = {a: {b: {c: 42}}};
    expect(get(obj, 'a.b.c')).toBe(42);
  });

  it('should return the default value if the path does not exist', () => {
    const obj = {a: {b: {c: 42}}};
    expect(get(obj, 'a.b.d', 'default')).toBe('default');
  });

  it('should return undefined if the path does not exist and no default value is provided', () => {
    const obj = {a: {b: {c: 42}}};
    expect(get(obj, 'a.b.d')).toBeUndefined();
  });

  it('should handle array paths correctly', () => {
    const obj = {a: [{b: 42}]};
    expect(get(obj, 'a[0].b')).toBe(42);
  });

  it('should handle complex paths with arrays and objects', () => {
    const obj = {a: [{b: {c: 42}}]};
    expect(get(obj, 'a[0].b.c')).toBe(42);
  });

  it('should handle undefined object correctly', () => {
    const obj = undefined;
    expect(get(obj, 'a.b.c')).toBeUndefined();
  });

});
