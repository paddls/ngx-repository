import 'reflect-metadata';
import {Denormalizer} from './denormalizer';
import {DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration} from './normalizer.configuration';
import {Column} from '../decorator/column.decorator';
import {DateConverter} from '../converter/date.converter';
import {cloneDeep} from 'lodash';

class EmptyColumn {
  public name: string = 'myEmptyColumnObject';
}

describe('Denormalizer', () => {
  const configuration: NormalizerConfiguration = cloneDeep(DEFAULT_NORMALIZER_CONFIGURATION);

  let denormalizerEmptyColumn: Denormalizer;
  let denormalizer: Denormalizer;

  beforeEach(() => {
    denormalizerEmptyColumn = new Denormalizer(configuration);
    denormalizer = new Denormalizer(configuration);
  });

  it('should not denormalize an null object', () => {
    expect(denormalizerEmptyColumn.denormalize(EmptyColumn, null)).toBeNull();
  });

  it('should denormalize a class with no column, no join column and no sub collection', () => {
    expect(denormalizerEmptyColumn.denormalize(EmptyColumn, {name: 'anotherValue'})).toEqual(new EmptyColumn());
  });

  it('should not normalize column with writeOnly parameter', () => {
    class MyClass {

      @Column({field: 'name', writeOnly: true})
      public name: string = 'test';
    }

    const obj: MyClass = denormalizer.denormalize(MyClass, {name: 'test2'}) as MyClass;
    expect(obj.name).toEqual('test');
  });

  it('should not denormalize column with a value to undefined with falsy configuration', () => {
    class MyClass {

      @Column()
      public name: string;
    }

    configuration.denormalizeUndefined = false;
    expect(denormalizer.denormalize(MyClass, {name: undefined})).toEqual(new MyClass());
  });

  it('should not denormalize column with a value to null with falsy configuration and with denormalize undefined truthy', () => {
    class MyClass {

      @Column()
      public name: string;
    }

    configuration.denormalizeUndefined = true;
    configuration.denormalizeNull = false;

    expect(denormalizer.denormalize(MyClass, {name: null})).toEqual(new MyClass());
  });

  describe('Denormalize value with all denormalize configuration truthy', () => {

    class MyNestedClass {

      @Column({field: 'complexNested.nestedName'})
      public nestedName: string = null;

      @Column({customConverter: () => DateConverter})
      public createdAt: Date = null;

      @Column({customConverter: () => DateConverter})
      public otherDates: Date[];

      @Column()
      public otherNestedNames: string[];
    }

    class MyClass {

      @Column(() => MyNestedClass)
      public nested: MyNestedClass = null;

      @Column(() => MyNestedClass)
      public nesteds: MyNestedClass[] = null;
    }

    beforeEach(() => {
      configuration.denormalizeUndefined = true;
      configuration.denormalizeNull = true;
    });

    it('should normalize to undefined a column with a type and a undefined value', () => {
      const obj: MyClass = new MyClass();
      obj.nested = undefined;
      obj.nesteds = undefined;
      expect(denormalizer.denormalize(MyClass, {nested: undefined, nesteds: undefined})).toEqual(obj);
    });

    it('should normalize to null a column with a type and a nullable value', () => {
      const obj: MyClass = new MyClass();
      obj.nested = null;
      obj.nesteds = null;
      expect(denormalizer.denormalize(MyClass, {nested: null, nesteds: null})).toEqual(obj);
    });

    it('should normalize to empty array a column with a type and a empty array value', () => {
      const obj: MyClass = new MyClass();
      obj.nesteds = [];
      expect(denormalizer.denormalize(MyClass, {nested: null, nesteds: []})).toEqual(obj);
    });

    it('should denormalize a column with a type and denormalize all others columns', () => {
      const obj: MyClass = new MyClass();
      obj.nested = new MyNestedClass();
      obj.nested.nestedName = 'toto';
      obj.nested.otherDates = undefined;
      obj.nested.otherNestedNames = ['titi'];

      obj.nesteds = [new MyNestedClass()];
      obj.nesteds[0].nestedName = 'tata';

      const d: Date = new Date();
      obj.nested.createdAt = d;
      obj.nesteds[0].createdAt = d;
      const d1: Date = new Date();
      const d2: Date = new Date();
      obj.nesteds[0].otherDates = [d1, d2];
      obj.nesteds[0].otherNestedNames = undefined;

      expect(denormalizer.denormalize(
        MyClass,
        {
          nested: {
            complexNested: {
              nestedName: 'toto'
            },
            createdAt: d.toISOString(),
            otherNestedNames: ['titi']
          },
          nesteds: [
            {
              complexNested: {
                nestedName: 'tata'
              },
              createdAt: d.toISOString(),
              otherDates: [d1.toISOString(), d2.toISOString()],
            }
          ]
        }
      )).toEqual(obj);
    });
  });
});
