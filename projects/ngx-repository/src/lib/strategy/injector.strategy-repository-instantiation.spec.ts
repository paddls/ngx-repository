import {TestBed} from '@angular/core/testing';
import {InjectorStrategyRepositoryInstantiation} from './injector.strategy-repository-instantiation';
import {AbstractRepository} from '@witty-services/repository-core';

class TestService extends AbstractRepository<any, any, any, any> {
  public constructor() {
    super(null, null);
  }

  protected onCreate(path: string, object: any, params?: any): any {}
  protected onDelete(path: string, object: any, params?: any): any {}
  protected onFindAll(path: string, params?: any): any {}
  protected onFindOne(path: string, id: any, params?: any): any {}
  protected onUpdate(path: string, object: any, params?: any): any {}
}

describe('InjectorStrategyRepositoryInstantiation', () => {
  let strategy: InjectorStrategyRepositoryInstantiation;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InjectorStrategyRepositoryInstantiation,
        TestService
      ]
    });
  });

  beforeEach(() => {
    strategy = TestBed.get(InjectorStrategyRepositoryInstantiation);
  });

  it('should return a strategy via injector', () => {
    expect(strategy.get(TestService)).not.toBeNull();
  });
});
