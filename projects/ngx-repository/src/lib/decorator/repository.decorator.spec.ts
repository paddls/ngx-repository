import {Mock} from '../../test/mock.model';
import {Repository, REPOSITORY_METADATA_KEY, RepositoryContextConfiguration} from './repository.decorator';

describe('RepositoryDecorator', () => {

  it('should place all repository context parameter in the good place', () => {
    const obj: any = {};
    const repositoryContextConfiguration: RepositoryContextConfiguration = {
      type: Mock
    };

    Repository(Mock)(obj);
    expect(Reflect.getMetadata(REPOSITORY_METADATA_KEY, obj)).toEqual(repositoryContextConfiguration);
  });
});
