import {Injector} from '@angular/core';
import {NgxRepositoryModule} from '../ngx-repository.module';
import {INJECT_REPOSITORY_METADATA_KEY, InjectRepository} from './inject-repository.decorator';
import {Mock} from '../../test/mock.model';

const connection: any = {
  getRepository: () => void 0
};

class MyService {
  @InjectRepository({type: Mock, connection})
  public test: any;

  @InjectRepository({type: Mock, connection})
  public test2: any;
}

describe('InjectRepositoryDecorator', () => {

  it('should place all context in good place and define a new property with the good value', () => {
    const repository: any = {};
    const injector: Injector = {
      get: () => void 0
    };

    NgxRepositoryModule.injector = injector;
    spyOn(injector, 'get').and.returnValue(connection);
    spyOn(connection, 'getRepository').and.returnValue(repository);

    const obj: MyService = new MyService();

    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, MyService.prototype)).toEqual([
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
