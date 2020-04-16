import {Injector} from '@angular/core';
import {NgxRepositoryModule} from '../ngx-repository.module';
import {INJECT_REPOSITORY_METADATA_KEY, InjectRepository} from './inject-repository.decorator';
import {Mock} from '../../test/mock.model';

describe('InjectRepositoryDecorator', () => {

  it('should place all context in good place and define a new property with the good value', () => {
    const repository: any = {};
    const connection: any = {
      getRepository: () => void 0
    };
    const injector: Injector = {
      get: () => void 0
    };
    const obj: any = {
      test: {},
      test2: {}
    };

    NgxRepositoryModule.injector = injector;
    spyOn(injector, 'get').and.returnValue(connection);
    spyOn(connection, 'getRepository').and.returnValue(repository);

    InjectRepository({type: Mock, connection})(obj, 'test');
    InjectRepository({type: Mock, connection})(obj, 'test2');

    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, obj)).toEqual([
      {
        propertyKey: 'test',
        type: Mock,
        connection
      },
      {
        propertyKey: 'test2',
        type: Mock,
        connection
      }
    ]);

    expect(obj.test).toEqual(repository);
    expect(injector.get).toHaveBeenCalledTimes(1);
    expect(injector.get).toHaveBeenCalledWith(connection);
    expect(connection.getRepository).toHaveBeenCalledTimes(1);
    expect(connection.getRepository).toHaveBeenCalledWith(Mock);
  });
});
