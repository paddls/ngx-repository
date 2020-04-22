import 'reflect-metadata';
import {Denormalizer} from './denormalizer';
import {DEFAULT_NORMALIZER_CONFIGURATION, NormalizerConfiguration} from './normalizer.configuration';
import {AbstractRepository} from '../repository/abstract.repository';
import {Column} from '../decorator/column.decorator';
import {DateConverter} from '../converter/date.converter';
import {Id} from '../decorator/id.decorator';
import {JoinColumn} from '../decorator/join-column.decorator';
import {Repository} from '../decorator/repository.decorator';
import {SubCollection} from '../decorator/sub-collection.decorator';
import {Connection} from '../connection/connection';
import {cloneDeep} from 'lodash';

class EmptyColumn {
  public name: string = 'myEmptyColumnObject';
}

class MyConnection extends Connection<any, any> {

  public constructor() {
    super(null);
  }

  protected getRepositoryInstance<T, K>(): AbstractRepository<T, K, any, any> {
    return undefined;
  }
}

describe('Denormalizer', () => {
  const configuration: NormalizerConfiguration = cloneDeep(DEFAULT_NORMALIZER_CONFIGURATION);

  let connection: Connection<any, any>;
  let denormalizerEmptyColumn: Denormalizer;
  let denormalizer: Denormalizer;

  beforeEach(() => {
    connection = new MyConnection();
    denormalizerEmptyColumn = new Denormalizer(connection, configuration);
    denormalizer = new Denormalizer(connection, configuration);
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

      @Column({customConverter: DateConverter})
      public createdAt: Date = null;

      @Column({customConverter: DateConverter})
      public otherDates: Date[];

      @Column()
      public otherNestedNames: string[];
    }

    class MyClass {

      @Column(MyNestedClass)
      public nested: MyNestedClass = null;

      @Column(MyNestedClass)
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

  describe('Denormalize JoinColumn', () => {

    class MyNestedClass {

      @Id()
      public id: string;

      @Column()
      public nestedName: string = null;
    }

    @Repository(MyNestedClass)
    class MockRepository extends AbstractRepository<MyNestedClass, any, any, any> {}

    class MyClass {

      @Id()
      public id: string;

      @Column()
      public nestedId: string = null;

      @JoinColumn({attribute: 'nestedId', resourceType: MyNestedClass})
      public nested: MyNestedClass;
    }

    let mockRepository: MockRepository;

    beforeEach(() => {
      mockRepository = new MockRepository(null, null, null, null, null, null);
      spyOn(connection, 'getRepository').and.returnValue(mockRepository);
      spyOn(mockRepository, 'findOne').and.returnValue({
        id: 'myNestedId',
        nestedName: 'myNestedName'
      });
    });

    it('should denormalize join column', () => {
      const myClass: MyClass = denormalizer.denormalize(MyClass, {
        id: 'myClassId',
        nestedId: 'myNestedId'
      }) as MyClass;

      expect(myClass.nested.id = 'myNestedId');
      expect(myClass.nested.nestedName = 'myNestedName');

      expect(connection.getRepository).toHaveBeenCalledTimes(1);
      expect(connection.getRepository).toHaveBeenCalledWith(MyNestedClass);

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith('myNestedId');
    });
  });

  describe('Denormalize SubCollection', () => {
    class MyNestedClass {

      @Id()
      public id: string;

      @Column()
      public nestedName: string = null;
    }

    @Repository(MyNestedClass)
    class MockRepository extends AbstractRepository<MyNestedClass, any, any, any> {}

    class MyClass {

      @Id()
      public id: string;

      @SubCollection({resourceType: MyNestedClass, params: (model: MyClass, params: any) => ({m: model.id, p: params})})
      public nested: MyNestedClass[];
    }

    let mockRepository: MockRepository;

    beforeEach(() => {
      mockRepository = new MockRepository(null, null, null, null, null, null);
      spyOn(connection, 'getRepository').and.returnValue(mockRepository);
      spyOn(mockRepository, 'findBy').and.returnValue([{
        id: 'myNestedId',
        nestedName: 'myNestedName'
      }]);
    });

    it('should denormalize sub collection', () => {
      const params: any = {p: 'myParam'};
      const myClass: MyClass = denormalizer.denormalize(MyClass, {
        id: 'myClassId'
      }, params) as MyClass;

      expect(myClass.nested.length).toEqual(1);
      expect(myClass.nested[0].id).toEqual('myNestedId');
      expect(myClass.nested[0].nestedName).toEqual('myNestedName');

      expect(connection.getRepository).toHaveBeenCalledTimes(1);
      expect(connection.getRepository).toHaveBeenCalledWith(MyNestedClass);

      expect(mockRepository.findBy).toHaveBeenCalledTimes(1);
      expect(mockRepository.findBy).toHaveBeenCalledWith({m: 'myClassId', p: params});
    });
  });
});
