import {RxjsRepository} from './rxjs.repository';
import {AbstractRepository} from './abstract.repository';
import {of} from 'rxjs';
import {Denormalizer} from '../normalizer/denormalizer';
import {Normalizer} from '../normalizer/normalizer';
import {Repository} from '../decorator/repository.decorator';
import {Id} from '../decorator/id.decorator';
import {Column} from '../decorator/column.decorator';
import {NormalizerConfiguration} from '../normalizer/normalizer.configuration';

class MyNestedClass {

  @Id()
  public id: string;

  @Column()
  public nestedName: string = null;
}

@Repository(MyNestedClass)
class MockRepository extends RxjsRepository<MyNestedClass, any, any, any, any> {}

describe('RxjsRepository', () => {
  let observableRepository: RxjsRepository<MyNestedClass, number, any, any, any>;
  let configuration: NormalizerConfiguration;
  let denormalizer: Denormalizer;
  let normalizer: Normalizer;

  beforeEach(() => {
    configuration = new NormalizerConfiguration();
    denormalizer = new Denormalizer(null, configuration);
    normalizer = new Normalizer(configuration);
    observableRepository = new MockRepository('myResource', null, normalizer, denormalizer, null, null);
  });

  it('should call abstract repository find and return result in observable', (done: DoneFn) => {
    const originalValue: any = {id: 2};
    const nextValue: any = {id: 2, test: 'titi'};

    AbstractRepository.prototype.findBy = () => of([originalValue]);
    spyOn(denormalizer, 'denormalize').and.returnValue(nextValue);

    observableRepository.findBy().subscribe({
      next: (value: any[]) => {
        expect(value).toEqual([nextValue]);
        expect(denormalizer.denormalize).toHaveBeenCalledTimes(1);
        expect(denormalizer.denormalize).toHaveBeenCalledWith(MyNestedClass, originalValue, undefined);
      },
      complete: () => done()
    });
  });

  it('should call abstract repository findOne and return result in observable', (done: DoneFn) => {
    const originalValue: any = {id: 2};
    const nextValue: any = {id: 2, test: 'titi'};

    AbstractRepository.prototype.findOne = () => of(originalValue);
    spyOn(denormalizer, 'denormalize').and.returnValue(nextValue);

    observableRepository.findOne(2).subscribe({
      next: (value: any) => {
        expect(value).toEqual(nextValue);
        expect(denormalizer.denormalize).toHaveBeenCalledTimes(1);
        expect(denormalizer.denormalize).toHaveBeenCalledWith(MyNestedClass, originalValue, {});
      },
      complete: () => done()
    });
  });

  it('should call abstract repository create and return result in observable', (done: DoneFn) => {
    const originalValue: any = {test: 'titi'};
    const nextValue: any = {test: 'titi'};

    AbstractRepository.prototype.create = () => of(nextValue);

    observableRepository.create(originalValue).subscribe({
      next: (value: any) => {
        expect(value).toEqual(nextValue);
      },
      complete: () => done()
    });
  });

  it('should call abstract repository update and return result in observable', (done: DoneFn) => {
    const originalValue: any = {id: 1, test: 'titi'};
    const nextValue: any = {id: 1, test: 'titi'};

    AbstractRepository.prototype.update = () => of(nextValue);

    observableRepository.update(originalValue).subscribe({
      next: (value: any) => {
        expect(value).toEqual(nextValue);
      },
      complete: () => done()
    });
  });

  it('should call abstract repository delete and return result in observable', (done: DoneFn) => {
    const originalValue: any = {id: 2, test: 'titi'};

    AbstractRepository.prototype.delete = () => of(originalValue);

    observableRepository.delete(originalValue).subscribe({
      next: (value: any) => {
        expect(value).toEqual(originalValue);
      },
      complete: () => done()
    });
  });
});
