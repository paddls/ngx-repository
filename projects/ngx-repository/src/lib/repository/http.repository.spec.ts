import {HttpRepository} from './http.repository';
import {TestBed} from '@angular/core/testing';
import {NgxRepositoryModule} from '../ngx-repository.module';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {InjectableRepository} from '../decorator/injectable-repository.decorator';
import {Column, Id} from '@witty-services/repository-core';

class Test {

  @Id()
  public id: number;

  @Column()
  public name: string;

  public constructor(data: Partial<Test> = {}) {
    Object.assign(this, data);
  }
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

      const req: TestRequest = httpTestingController.expectOne({
        url: '/datas?test=toto',
        method: 'GET'
      });

      req.flush(null);
      httpTestingController.verify();
    });

    it('should call get method of http client for findOne', () => {
      repository.findOne('mon-id', null, {params: {test: 'toto'}}).subscribe();

      const req: TestRequest = httpTestingController.expectOne({
        url: '/datas/mon-id?test=toto',
        method: 'GET'
      });

      req.flush(null);
      httpTestingController.verify();
    });

    it('should call get method of http client for create', () => {
      const data: Test = new Test({
        id: 2,
        name: 'test'
      });
      repository.create(data).subscribe(
        (t: any) => expect(t).toEqual(data)
      );

      const req: TestRequest = httpTestingController.expectOne({
        url: '/datas',
        method: 'POST'
      });

      req.flush(data);
      httpTestingController.verify();
    });

    it('should call get method of http client for update', () => {
      const data: Test = new Test({
        id: 2,
        name: 'test1'
      });
      repository.update(data).subscribe(
        (t: any) => expect(t).toEqual(data)
      );

      const req: TestRequest = httpTestingController.expectOne({
        url: '/datas/2',
        method: 'PUT'
      });

      req.flush(data);
      httpTestingController.verify();
    });

    it('should call get method of http client for delete', () => {
      const data: Test = new Test({
        id: 2,
        name: 'test1'
      });
      repository.delete(data).subscribe();

      const req: TestRequest = httpTestingController.expectOne({
        url: '/datas/2',
        method: 'DELETE'
      });

      req.flush(null);
      httpTestingController.verify();
    });
  });
});
