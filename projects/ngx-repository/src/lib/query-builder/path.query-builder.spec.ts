import {PathQueryBuilder} from './path.query-builder';
import {PathContext} from '../common/path/path-context';
import {PathRequest} from './path.request';
import {PathQuerySettings} from './path.query-settings';
import {PATH_PARAM_METADATA_KEY} from '../decorator/path-param.decorator';

class MyPathQueryBuilder extends PathQueryBuilder<PathContext> {
}

describe('PathQueryBuilder', () => {
  let myPathQueryBuilder: MyPathQueryBuilder;

  beforeEach(() => {
    myPathQueryBuilder = new MyPathQueryBuilder();
  });

  it('should return an empty PathRequest when there is no query', () => {
    const pathRequest: PathRequest<string> = new PathRequest<string>({
      pathParams: {}
    });
    expect(myPathQueryBuilder.buildRequestFromQuery(null)).toEqual(pathRequest);
  });

  it('should return a PathRequest with just paths when there is no setting in query', () => {
    const paths: PathContext = {
      path: '/test'
    };
    const pathRequest: PathRequest<string> = new PathRequest<string>({
      pathParams: {},
      paths
    });
    const pathQuerySettings: PathQuerySettings<PathContext, any> = {
      resourceConfiguration: paths
    };

    expect(myPathQueryBuilder.buildRequestFromQuery(pathQuerySettings)).toEqual(pathRequest);
  });

  it('should return a PathRequest with path params and id', () => {
    const paths: PathContext = {
      path: '/test'
    };
    const pathRequest: PathRequest<string> = new PathRequest<string>({
      pathParams: {
        ':test': 'bar'
      },
      paths,
      id: 'my-id'
    });
    const pathQuerySettings: PathQuerySettings<PathContext, any> = {
      resourceConfiguration: paths,
      settings: {
        id: 'my-id',
        foo: 'bar'
      } as any
    };
    Reflect.defineMetadata(
      PATH_PARAM_METADATA_KEY,
      [
        {
          propertyKey: 'foo',
          name: 'test'
        }
      ],
      pathQuerySettings.settings
    );

    expect(myPathQueryBuilder.buildRequestFromQuery(pathQuerySettings)).toEqual(pathRequest);
  });

  it('should return a PathRequest with settings which not contain path params and no id', () => {
    const paths: PathContext = {
      path: '/test'
    };
    const pathRequest: PathRequest<string> = new PathRequest<string>({
      pathParams: {},
      paths,
    });
    const pathQuerySettings: PathQuerySettings<PathContext, any> = {
      resourceConfiguration: paths,
      settings: {}
    };
    Reflect.defineMetadata(
      PATH_PARAM_METADATA_KEY,
      [
        {
          propertyKey: 'foo',
          name: 'test'
        }
      ],
      pathQuerySettings.settings
    );

    expect(myPathQueryBuilder.buildRequestFromQuery(pathQuerySettings)).toEqual(pathRequest);
  });

  it('should return a PathRequest with settings with just an id and no reflect metadata', () => {
    const paths: PathContext = {
      path: '/test'
    };
    const pathRequest: PathRequest<string> = new PathRequest<string>({
      pathParams: {},
      id: 'test',
      paths,
    });
    const pathQuerySettings: PathQuerySettings<PathContext, any> = {
      resourceConfiguration: paths,
      settings: {
        id: 'test'
      }
    };

    expect(myPathQueryBuilder.buildRequestFromQuery(pathQuerySettings)).toEqual(pathRequest);
  });
});
