import 'reflect-metadata';
import {Normalizer} from './normalizer';
import {DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration} from './normalizer.configuration';
import {Column} from '../decorator/column.decorator';
import {DateConverter} from '../converter/date.converter';
import {cloneDeep} from 'lodash';

class EmptyColumn {
  public name: string = 'myEmptyColumnObject';
}

class ClassWithColumn {}

describe('Normalizer', () => {
  let configuration: NormalizerConfiguration;
  let normalizerEmptyColumn: Normalizer;
  let normalizer: Normalizer;

  beforeEach(() => {
    configuration = cloneDeep(DEFAULT_NORMALIZER_CONFIGURATION);
    normalizerEmptyColumn = new Normalizer(configuration);
    normalizer = new Normalizer(configuration);
  });

  it('should normalize an object with no column', () => {
    expect(normalizerEmptyColumn.normalize(new EmptyColumn())).toEqual({});
  });

  it('should not normalize column with readOnly parameter', () => {
    class MyClass extends ClassWithColumn {

      @Column({field: 'name', readOnly: true})
      public name: string = 'test';
    }

    const obj: MyClass = new MyClass();

    expect(normalizer.normalize(obj)).toEqual({});
  });

  it('should not normalize column with a value to undefined with falsy configuration', () => {
    class MyClass extends ClassWithColumn {

      @Column()
      public name: string = undefined;
    }

    const obj: MyClass = new MyClass();

    expect(normalizer.normalize(obj)).toEqual({});
  });

  it('should not normalize column with a value to null with falsy configuration and with normalize undefined truthy', () => {
    class MyClass extends ClassWithColumn {

      @Column()
      public name: string = null;
    }

    const obj: MyClass = new MyClass();
    configuration.normalizeUndefined = true;

    expect(normalizer.normalize(obj)).toEqual({});
  });

  describe('Normalize value with all normalize configuration truthy', () => {

    class MyNestedClass extends ClassWithColumn {

      @Column({field: 'complexNested.nestedName'})
      public nestedName: string = null;

      @Column({customConverter: () => DateConverter})
      public createdAt: Date = null;

      @Column({customConverter: () => DateConverter})
      public otherDates: Date[];

      @Column()
      public otherNestedNames: string[];
    }

    class MyClass extends ClassWithColumn {

      @Column(() => MyNestedClass)
      public nested: MyNestedClass = null;

      @Column(() => MyNestedClass)
      public nesteds: MyNestedClass[] = null;
    }

    beforeEach(() => {
      configuration.normalizeUndefined = true;
      configuration.normalizeNull = true;
    });

    it('should normalize to null a column with a type and a null value', () => {
      const obj: MyClass = new MyClass();
      expect(normalizer.normalize(obj)).toEqual({
        nested: null,
        nesteds: null
      });
    });

    it('should normalize to empty array a column with a type and a empty array value', () => {
      const obj: MyClass = new MyClass();
      obj.nesteds = [];
      expect(normalizer.normalize(obj)).toEqual({
        nested: null,
        nesteds: []
      });
    });

    it('should normalize a column with a type and normalize all others columns', () => {
      const obj: MyClass = new MyClass();
      obj.nested = new MyNestedClass();
      obj.nested.nestedName = 'toto';
      obj.nested.otherNestedNames = ['titi'];
      obj.nesteds = [new MyNestedClass()];
      obj.nesteds[0].nestedName = 'tata';

      const d: Date = new Date();
      obj.nested.createdAt = d;
      obj.nesteds[0].createdAt = d;

      const d1: Date = new Date();
      const d2: Date = new Date();
      obj.nesteds[0].otherDates = [d1, d2];

      expect(normalizer.normalize(obj)).toEqual({
        nested: {
          complexNested: {
            nestedName: 'toto'
          },
          createdAt: d.toISOString(),
          otherDates: undefined,
          otherNestedNames: ['titi']
        },
        nesteds: [
          {
            complexNested: {
              nestedName: 'tata'
            },
            createdAt: d.toISOString(),
            otherDates: [
              d1.toISOString(),
              d2.toISOString()
            ],
            otherNestedNames: undefined
          }
        ]
      });
    });
  });
});
