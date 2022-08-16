import { getDeepQueryMetadataValue, getDeepQueryMetadataValues, SubQuery } from './sub-query.decorator';
import { HttpQueryParam } from '@paddls/ngx-http-repository';

describe('SubQueryDecorator', () => {

  describe('#getDeepQueryMetadataValues', () => {
    it('should return metadata when no sub query', () => {
      class MyQuery {

        @HttpQueryParam()
        public param: string;

        public constructor(data: Partial<MyQuery> = {}) {
          Object.assign(this, data);
        }
      }


      const metadata: any[] = getDeepQueryMetadataValues('httpQueryParams', new MyQuery({param: 'Oscar'}));

      expect(metadata[0].propertyKey).toEqual('param');
      expect(metadata[0].name).toEqual('param');
    });

    it('should return metadata with sub query', () => {
      class MySubQuery {

        @HttpQueryParam()
        public subParam: string;

        public constructor(data: Partial<MySubQuery> = {}) {
          Object.assign(this, data);
        }
      }

      class MyQuery {

        @HttpQueryParam()
        public param: string;

        @SubQuery()
        public subQuery: MySubQuery;

        public constructor(data: Partial<MyQuery> = {}) {
          Object.assign(this, data);
        }
      }


      const metadata: any[] = getDeepQueryMetadataValues('httpQueryParams', new MyQuery({
        param: 'Oscar',
        subQuery: new MySubQuery({subParam: 'Romain'})
      }));

      expect(metadata[0].propertyKey).toEqual('subQuery.subParam');
      expect(metadata[0].name).toEqual('subParam');
      expect(metadata[1].propertyKey).toEqual('param');
      expect(metadata[1].name).toEqual('param');
    });
  });

  describe('#getDeepQueryMetadataValue', () => {
    it('should return metadata with sub query', () => {
      class MySubQuery {

        @HttpQueryParam()
        public subParam: string;

        public constructor(data: Partial<MySubQuery> = {}) {
          Object.assign(this, data);
        }
      }

      class MyQuery {

        @HttpQueryParam()
        public param: string;

        @SubQuery()
        public subQuery: MySubQuery;

        public constructor(data: Partial<MyQuery> = {}) {
          Object.assign(this, data);
        }
      }


      const metadata: any = getDeepQueryMetadataValue('httpQueryParams', new MyQuery({
        param: 'Oscar',
        subQuery: new MySubQuery({subParam: 'Romain'})
      }));

      expect(metadata.propertyKey).toEqual('subQuery.subParam');
      expect(metadata.name).toEqual('subParam');
    });
  });
});
