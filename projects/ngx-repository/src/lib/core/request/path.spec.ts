import { Path } from './path';
import { Id } from './id';
import { PATH_PARAM_METADATA_KEY } from '../decorator/path-param.decorator';
import { PATH_COLUMN_METADATA_KEY } from '../decorator/path-column.decorator';
import { ID_METADATA_KEY } from '../decorator/id.decorator';

describe('Path', () => {
  let path: Path = null;

  beforeEach(() => {
    path = null;
  });

  describe('#pathParams', () => {

    it('should set empty object in pathParams if query and body are null', () => {
      path = new Path(null, null, '', null);
      expect(path.pathParams).toEqual({});
    });

    it('should set empty object in pathParams if query and body have no path param metadata', () => {
      path = new Path({}, {}, '', null);
      expect(path.pathParams).toEqual({});
    });

    it('should set value in pathParams with path param metadata key of query and body object', () => {
      const query: any = {
        myFirstQueryPathParam: 'toto',
        mySecondQueryPathParam: 'tata',
        myThirdQueryPathParam: 'tete'
      };
      Reflect.defineMetadata(
        PATH_PARAM_METADATA_KEY,
        [
          {propertyKey: 'myFirstQueryPathParam', name: 'firstQueryPathParam'},
          {propertyKey: 'mySecondQueryPathParam', name: 'secondQueryPathParam'},
          {propertyKey: 'myThirdPathParam', name: 'myThirdPathParam'}
        ],
        query
      );

      const body: any = {
        myFirstBodyPathParam: 'titi',
        mySecondBodyPathParam: 'tutu',
        myThirdBodyPathParam: 'tyty',
        myFourthBodyPathParam: null
      };
      Reflect.defineMetadata(
        PATH_COLUMN_METADATA_KEY,
        [
          {propertyKey: 'myFirstBodyPathParam', name: 'firstBodyPathParam'},
          {propertyKey: 'mySecondBodyPathParam', name: 'secondBodyPathParam'},
          {propertyKey: 'myThirdBodyPathParam', name: 'thirdPathParam'},
          {propertyKey: 'myFourthBodyPathParam', name: 'fourthBodyPathParam'}
        ],
        body
      );

      path = new Path(body, query, '', null);
      expect(path.pathParams).toEqual({
        ':firstQueryPathParam': 'toto',
        ':secondQueryPathParam': 'tata',
        ':firstBodyPathParam': 'titi',
        ':secondBodyPathParam': 'tutu',
        ':thirdPathParam': 'tyty'
      });
    });
  });

  describe('#id', () => {

    it('should have an id attribute', () => {
      const query: any = {};
      const body: any = {};

      path = new Path(body, query, '', null);

      expect(path.id).toEqual(new Id(query, body));
    });
  });

  describe('#value', () => {
    const template: string = '/path/:myFirstArg/to/:mySecondArg/and/:myThirdArg';

    it('should no found value and set the template variable', () => {
      path = new Path(null, null, template, null);
      expect(path.value).toEqual(template);
    });

    it('should replace all names by value', () => {
      const query: any = {
        myFirstQueryPathParam: 'toto',
        mySecondQueryPathParam: 'tata',
      };
      Reflect.defineMetadata(
        PATH_PARAM_METADATA_KEY,
        [
          {propertyKey: 'myFirstQueryPathParam', name: 'myFirstArg'},
          {propertyKey: 'mySecondQueryPathParam', name: 'secondQueryPathParam'},
        ],
        query
      );

      const body: any = {
        myFirstBodyPathParam: 'titi',
      };
      Reflect.defineMetadata(
        PATH_COLUMN_METADATA_KEY,
        [
          { propertyKey: 'myFirstBodyPathParam', name: 'mySecondArg' }
        ],
        body
      );
      path = new Path(body, query, template, null);
      expect(path.value).toEqual('/path/toto/to/titi/and/:myThirdArg');
    });

    it('should replace all names by value and add id', () => {
      const query: any = {
        myFirstQueryPathParam: 'toto',
        mySecondQueryPathParam: 'tata',
        myQueryIdProperty: 'myIdFromQuery'
      };
      Reflect.defineMetadata(ID_METADATA_KEY, 'myQueryIdProperty', query);
      Reflect.defineMetadata(
        PATH_PARAM_METADATA_KEY,
        [
          {propertyKey: 'myFirstQueryPathParam', name: 'myFirstArg'},
          {propertyKey: 'mySecondQueryPathParam', name: 'secondQueryPathParam'},
        ],
        query
      );

      const body: any = {
        myFirstBodyPathParam: 'titi'
      };
      Reflect.defineMetadata(
        PATH_COLUMN_METADATA_KEY,
        [
          { propertyKey: 'myFirstBodyPathParam', name: 'mySecondArg' }
        ],
        body
      );
      path = new Path(body, query, template, null);
      expect(path.value).toEqual('/path/toto/to/titi/and/:myThirdArg/myIdFromQuery');
    });
  });
});
