import {get, isFunction, isObject, isString, isUndefined, omit, omitBy, pick, set, valuesIn} from './util';

describe('Util', () => {

  describe('#get', () => {

    const simpleObject = { a: { b: 2 } };
    const complexObject = { a: [{ bar: { c: 3 } }] };
    const falsyObject = { a: null, b: undefined, c: 0 };

    it('a.b', () => {
      expect(get(simpleObject, 'a.b')).toEqual(2);
    });

    it('a[0].bar.c', () => {
      expect(get(complexObject, 'a[0].bar.c')).toEqual(3);
    });

    it('[\'a\', \'0\', \'bar\', \'c\']', () => {
      expect(get(complexObject, ['a', '0', 'bar', 'c'])).toEqual(3);
    });

    it('a.bar.c with default', () => {
      expect(get(simpleObject, 'a.bar.c', 'default')).toEqual('default');
    });

    it('a.bar.c with default', () => {
      expect(get(complexObject, 'a.bar.c', 'default')).toEqual('default');
    });

    it('null', () => {
      expect(get(complexObject, null)).toEqual(undefined);
    });

    it('a with default', () => {
      expect(get(falsyObject, 'a', 'default')).toEqual(null);
    });

    it('b with default', () => {
      expect(get(falsyObject, 'b', 'default')).toEqual('default');
    });

    it('c with default', () => {
      expect(get(falsyObject, 'c', 'default')).toEqual(0);
    });
  });

  describe('#set', () => {
    let object: any;

    beforeEach(() => {
      object = { a: [{ bar: { c: 3 } }] };
    });

    it('\'a[0].bar.c\' 4', () => {
      set(object, 'a[0].bar.c', 4);
      expect(object.a[0].bar.c).toEqual(4);
    });

    it('[\'x\', \'0\', \'y\', \'z\']', () => {
      set(object, ['x', '0', 'y', 'z'], 5);
      expect(object.x[0].y.z).toEqual(5);
    });
  });

  describe('#isFunction', () => {

    it('should return true if is function', () => {
      expect(isFunction(function () {})).toBeTrue();
    });

    it('should return true if is anonymous function', () => {
      expect(isFunction(() => {})).toBeTrue();
    });

    it('should return true if is class', () => {
      expect(isFunction(class NotAFunction {})).toBeTrue();
    });

    it('should return true if is regex', () => {
      expect(isFunction(/abc/)).toBeFalse();
    });
  });

  describe('#isObject', () => {

    it('should return true with an object', () => {
      expect(isObject({})).toBeTrue();
    });

    it('should return true with an array', () => {
      expect(isObject([])).toBeTrue();
    });

    it('should return true with an anonymous function', () => {
      expect(isObject(() => {})).toBeTrue();
    });

    it('should return false with null', () => {
      expect(isObject(null)).toBeFalse();
    });
  });

  describe('#isString', () => {

    it('should return true if arg is a string', () => {
      expect(isString('abc')).toBeTrue();
    });

    it('should return false if arg is not a string', () => {
      expect(isString(123)).toBeFalse();
    });
  });

  describe('#isUndefined', () => {

    it('should return true if value is undefined', () => {
      expect(isUndefined(undefined)).toBeTrue();
    });

    it('should return false if value is not undefined', () => {
      expect(isUndefined({})).toBeFalse();
    });
  });

  describe('#omit', () => {

    it('should make another object without specified properties', () => {
      expect(omit({a: 1, b: 2, c: 3}, ['b'])).toEqual({a: 1, c: 3});
    });
  });

  describe('#omitBy', () => {

    it('should make another object without properties which not satisfied predicate', () => {
      expect(omitBy({a: 1, b: 2, c: 3}, (value: any, key: string) => key === 'b' || value === 3)).toEqual({a: 1});
    });
  });

  describe('#pick', () => {

    it('should make another object with just specified properties', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({a: 1, c: 3});
    });
  });

  describe('#valuesIn', () => {

    it('should return all properties of object', () => {
      function Foo() {
        this.a = 1;
        this.b = 2;
      }

      Foo.prototype.c = 3;

      expect(valuesIn(new Foo)).toEqual([1, 2, 3]);
    });
  });
});
