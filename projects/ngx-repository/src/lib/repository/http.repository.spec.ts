import {HttpRepository} from './http.repository';
import {TestBed} from '@angular/core/testing';
import {NgxRepositoryModule} from '../ngx-repository.module';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {InjectableRepository} from '../decorator/injectable-repository.decorator';

class Test {

  public id: number;

  public name: string;
}

@InjectableRepository({
  path: '/datas',
  type: Test
})
class MyRepository extends HttpRepository<any, any, any> {}

describe('HttpRepository', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxRepositoryModule.forRoot()
      ],
      providers: [
        MyRepository
      ]
    });
  });

  it('should be extendable by any service', () => {
    expect(TestBed.get(MyRepository)).toBeTruthy();
  });

  describe('Test http method calls', () => {
    let repository: MyRepository;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      repository = TestBed.get(MyRepository);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should call get method of http client for findAll', () => {
      repository.findAll(null, {params: {test: 'toto'}}).subscribe();

      const req: TestRequest = httpTestingController.expectOne('/datas?test=toto');
      expect(req.request.method).toEqual('GET');

      req.flush([]);
      httpTestingController.verify();
    });

    it('should call get method of http client for findOne', () => {
      const data: Test = {
        id: 2,
        name: 'test'
      };
      repository.create(data).subscribe();

      const req: TestRequest = httpTestingController.expectOne('/datas');
      expect(req.request.method).toEqual('POST');

      req.flush({});
      httpTestingController.verify();
    });
  });
});
