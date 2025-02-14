import { INJECT_REPOSITORY_METADATA_KEY, InjectRepository } from './inject-repository.decorator';
import { Mock } from '../../../testing/mock.model';
import { NgxRepositoryService } from '../../ngx-repository.service';

const ngxRepositoryService: any = {
  getRepository: () => void 0
};

class MyService {
  @InjectRepository({ resourceType: () => Mock })
  public test: any;

  @InjectRepository({ resourceType: () => Mock })
  public test2: any;
}

describe('InjectRepositoryDecorator', () => {

  it('should place all context in good place and define a new property with the good value without repository type', () => {
    const repository: any = {};

    NgxRepositoryService.getInstance = () => void 0;

    spyOn(NgxRepositoryService, 'getInstance').and.returnValue(ngxRepositoryService);
    spyOn(ngxRepositoryService, 'getRepository').and.returnValue(repository);

    const obj: MyService = new MyService();

    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, MyService.prototype).length).toEqual(2);

    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, MyService.prototype)[0].propertyKey).toEqual('test');
    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, MyService.prototype)[0].resourceType instanceof Function).toBe(true);
    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, MyService.prototype)[0].resourceType()).toEqual(Mock);

    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, MyService.prototype)[1].propertyKey).toEqual('test2');
    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, MyService.prototype)[1].resourceType instanceof Function).toBe(true);
    expect(Reflect.getMetadata(INJECT_REPOSITORY_METADATA_KEY, MyService.prototype)[1].resourceType()).toEqual(Mock);

    expect(obj.test).toEqual(repository);
    expect(ngxRepositoryService.getRepository).toHaveBeenCalledTimes(1);
    expect(ngxRepositoryService.getRepository).toHaveBeenCalledWith(Mock, null);
  });
});
