import 'reflect-metadata';
import {
  SUB_COLLECTION_METADATA_KEY,
  SUB_COLLECTION_OBS_METADATA_KEY,
  SubCollection
} from './sub-collection.decorator';
import { Mock } from '../../../testing/mock.model';
import { SubCollectionContext } from '../configuration/context/sub-collection-context.configuration';
import { Observable, of } from 'rxjs';
import { NgxRepositoryService } from '../../ngx-repository.service';
import { FindAllRepository } from '../repository/find-all.repository';

describe('SubCollectionDecorator', () => {

  it('should place all SubCollectionContext parameter in the good place', () => {
    const subCollectionContext: SubCollectionContext<Mock> = {
      resourceType: () => Mock,
      params: () => ({})
    };

    const obj: Mock = new Mock({
      myProperty: 'myValue',
      mySecondProperty: 'myOtherValue'
    });

    SubCollection(subCollectionContext)(obj, 'myProperty');
    expect(Reflect.getMetadata(SUB_COLLECTION_METADATA_KEY, obj, 'myProperty')).toEqual({propertyKey: 'myProperty', ...subCollectionContext});

    SubCollection(subCollectionContext)(obj, 'MySecondProperty');
    expect(Reflect.getMetadata(SUB_COLLECTION_METADATA_KEY, obj, 'MySecondProperty')).toEqual({propertyKey: 'MySecondProperty', ...subCollectionContext});
  });

  describe('#getSubCollectionObservable', () => {
    let subCollectionContext: SubCollectionContext<Mock>;
    let obs$: Observable<Mock[]>;
    let repository: FindAllRepository;
    let service: NgxRepositoryService;
    const results: Mock[] = [
      new Mock()
    ];

    beforeAll(() => {
      obs$ = of(results);
      repository = {
        findAll: jasmine.createSpy('findAll').and.returnValue(obs$)
      } as any;
      service = {
        getRepository: jasmine.createSpy('getRepository').and.returnValue(repository)
      } as any;
      NgxRepositoryService.getInstance = () => service;
    });

    it('should make a sub collection', () => {
      const params: any = {};

      subCollectionContext = {
        resourceType: () => Mock,
        params: () => params
      };

      class MyMock {

        @SubCollection(subCollectionContext)
        public myProperty: any;
      }

      const obj: MyMock = new MyMock();

      expect(obj.myProperty).toBe(obs$);
      expect(Reflect.getMetadata(SUB_COLLECTION_OBS_METADATA_KEY, obj, 'myProperty')).toEqual(obs$);
      expect(obj.myProperty).toBe(obs$);
      expect(service.getRepository).toHaveBeenCalledTimes(1);
      expect(service.getRepository).toHaveBeenCalledWith(Mock, null);
    });
  });
});
