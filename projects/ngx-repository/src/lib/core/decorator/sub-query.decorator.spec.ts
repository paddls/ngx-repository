import { getDeepQueryMetadataValue, getDeepQueryMetadataValues, SubQuery } from './sub-query.decorator';

describe('SubQueryDecorator', () => {

  describe('#getDeepQueryMetadataValues', () => {
    it('should return metadata when no sub query', () => {
      class MyQuery {

        public param: string;

        public constructor(data: Partial<MyQuery> = {}) {
          Object.assign(this, data);
        }
      }

      const query = new MyQuery({ param: 'Oscar' });
      Reflect.defineMetadata('httpQueryParams', { name: 'param' }, query);

      const metadata: any[] = getDeepQueryMetadataValues('httpQueryParams', query);
      expect(metadata[0].name).toEqual('param');
    });

    it('should return metadata with sub query', () => {
      class MySubQuery {

        public subParam: string;

        public constructor(data: Partial<MySubQuery> = {}) {
          Object.assign(this, data);
        }
      }

      class MyQuery {

        public param: string;

        @SubQuery()
        public subQuery: MySubQuery;

        public constructor(data: Partial<MyQuery> = {}) {
          Reflect.defineMetadata('httpQueryParams', 'param', MyQuery);

          Object.assign(this, data);
        }
      }


      const subQuery: MySubQuery = new MySubQuery({ subParam: 'Romain' });

      const query = new MyQuery({
        param: 'Oscar',
        subQuery
      });
      Reflect.defineMetadata('httpQueryParams', { name: 'param' }, query);
      Reflect.defineMetadata('httpQueryParams', { name: 'subParam' }, subQuery);

      const metadata: any[] = getDeepQueryMetadataValues('httpQueryParams', query);

      expect(metadata[0].name).toEqual('subParam');
      expect(metadata[1].name).toEqual('param');
    });
  });

  describe('#getDeepQueryMetadataValue', () => {
    it('should return metadata with sub query', () => {
      class MySubQuery {

        public subParam: string;

        public constructor(data: Partial<MySubQuery> = {}) {
          Object.assign(this, data);
        }
      }

      class MyQuery {

        public param: string;

        @SubQuery()
        public subQuery: MySubQuery;

        public constructor(data: Partial<MyQuery> = {}) {
          Reflect.defineMetadata('httpQueryParams', 'param', MyQuery);

          Object.assign(this, data);
        }
      }


      const subQuery: MySubQuery = new MySubQuery({ subParam: 'Romain' });

      const query = new MyQuery({
        param: 'Oscar',
        subQuery
      });
      Reflect.defineMetadata('httpQueryParams', { name: 'param' }, query);
      Reflect.defineMetadata('httpQueryParams', { name: 'subParam' }, subQuery);

      const metadata: any = getDeepQueryMetadataValue('httpQueryParams', query);

      expect(metadata.name).toEqual('subParam');
    });
  });
});
