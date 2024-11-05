import 'reflect-metadata';
import { JOIN_COLUMN_METADATA_KEY, JOIN_COLUMN_OBS_METADATA_KEY, JoinColumn } from './join-column.decorator';
import { Mock } from '../../../testing/mock.model';
import { JoinColumnContext } from '../configuration/context/join-column-context.configuration';
import { Observable, of } from 'rxjs';
import { NgxRepositoryService } from '../../ngx-repository.service';
import { FindByIdRepository } from '../repository/find-by-id.repository';

describe('JoinColumnDecorator', () => {

  it('should place all JoinColumnContext parameter in the good place', () => {
    const joinColumnContext1: JoinColumnContext<Mock> = {
      resourceType: () => Mock,
      attribute: 'myProperty'
    };
    const joinColumnContext2: JoinColumnContext<Mock> = {
      resourceType: () => Mock,
      attribute: 'mySecondProperty'
    };

    const obj: Mock = new Mock({
      myProperty: 'myValue',
      mySecondProperty: 'myOtherValue'
    });

    JoinColumn(joinColumnContext1)(obj, 'myProperty');
    expect(Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, obj, 'myProperty')).toEqual({propertyKey: 'myProperty', ...joinColumnContext1});

    JoinColumn(joinColumnContext2)(obj, 'MySecondProperty');
    expect(Reflect.getMetadata(JOIN_COLUMN_METADATA_KEY, obj, 'MySecondProperty')).toEqual({propertyKey: 'MySecondProperty', ...joinColumnContext2});
  });

  describe('#getJoinColumnObservable', () => {
    let joinColumnContext: JoinColumnContext<Mock>;
    let obs$: Observable<Mock[]>;
    let repository: FindByIdRepository;
    let service: NgxRepositoryService;
    const results: Mock[] = [
      new Mock()
    ];

    beforeAll(() => {
      obs$ = of(results);
      repository = {
        findById: jasmine.createSpy('findById').and.returnValue(obs$)
      } as any;
      service = {
        getRepository: jasmine.createSpy('getRepository').and.returnValue(repository)
      } as any;
      NgxRepositoryService.getInstance = () => service;
    });

    it('should make a join column', () => {
      joinColumnContext = {
        resourceType: () => Mock,
        attribute: 'myOtherProperty'
      };

      class MyMock {

        public myOtherProperty: string;

        @JoinColumn(joinColumnContext)
        public myProperty: any;
      }

      const obj: MyMock = new MyMock();

      expect(obj.myProperty).toBe(obs$);
      expect(Reflect.getMetadata(JOIN_COLUMN_OBS_METADATA_KEY, obj, 'myProperty')).toEqual(obs$);
      expect(obj.myProperty).toBe(obs$);
      expect(service.getRepository).toHaveBeenCalledTimes(1);
      expect(service.getRepository).toHaveBeenCalledWith(Mock, null);
    });
  });
});
