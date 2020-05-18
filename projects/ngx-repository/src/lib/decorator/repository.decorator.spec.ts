import {Mock} from '../../test/mock.model';
import {Repository, REPOSITORY_METADATA_KEY} from './repository.decorator';

describe('RepositoryDecorator', () => {

  it('should place all repository context parameter in the good place', () => {
    const obj: any = {};

    Repository(() => Mock)(obj);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, obj).resourceType instanceof Function).toBe(true);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, obj).resourceType()).toEqual(Mock);
  });
});
