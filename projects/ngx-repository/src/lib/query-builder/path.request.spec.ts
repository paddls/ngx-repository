import {PathRequest} from './path.request';
import {PathContextUtil} from '../../public-api';

describe('PathRequest', () => {
  let pathRequest: PathRequest<string>;

  beforeEach(() => {
    pathRequest = new PathRequest<string>({
      pathParams: {':value': 'test'},
      paths: {path: '/my/:value/path'}
    });
  });

  it('should return readPath', () => {
    spyOn(PathContextUtil, 'getReadPath').and.returnValue('/my/:value/path');

    expect(pathRequest.readPath).toEqual('/my/test/path');
    expect(PathContextUtil.getReadPath).toHaveBeenCalledTimes(1);
    expect(PathContextUtil.getReadPath).toHaveBeenCalledWith(pathRequest.paths);
  });

  it('should return readPath with id', () => {
    spyOn(PathContextUtil, 'getReadPath').and.returnValue('/my/:value/path');

    pathRequest.id = 'my-id';

    expect(pathRequest.readPath).toEqual('/my/test/path/my-id');
    expect(PathContextUtil.getReadPath).toHaveBeenCalledTimes(1);
    expect(PathContextUtil.getReadPath).toHaveBeenCalledWith(pathRequest.paths);
  });

  it('should return createPath', () => {
    spyOn(PathContextUtil, 'getCreatePath').and.returnValue('/my/:value/path');

    expect(pathRequest.createPath).toEqual('/my/test/path');
    expect(PathContextUtil.getCreatePath).toHaveBeenCalledTimes(1);
    expect(PathContextUtil.getCreatePath).toHaveBeenCalledWith(pathRequest.paths);
  });

  it('should return updatePath with id', () => {
    spyOn(PathContextUtil, 'getUpdatePath').and.returnValue('/my/:value/path');

    pathRequest.id = 'my-id';

    expect(pathRequest.updatePath).toEqual('/my/test/path/my-id');
    expect(PathContextUtil.getUpdatePath).toHaveBeenCalledTimes(1);
    expect(PathContextUtil.getUpdatePath).toHaveBeenCalledWith(pathRequest.paths);
  });

  it('should return deletePath with id', () => {
    spyOn(PathContextUtil, 'getDeletePath').and.returnValue('/my/:value/path');

    pathRequest.id = 'my-id';

    expect(pathRequest.deletePath).toEqual('/my/test/path/my-id');
    expect(PathContextUtil.getDeletePath).toHaveBeenCalledTimes(1);
    expect(PathContextUtil.getDeletePath).toHaveBeenCalledWith(pathRequest.paths);
  });
});
