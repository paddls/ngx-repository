import { Id } from './id';
import { ID_METADATA_KEY } from '../decorator/id.decorator';

describe('Id', () => {

  describe('#getId', () => {

    it('should return null if all params are null', () => {
      const id: Id = new Id(null, null);

      expect(id.value).toBeNull();
    });

    it('should return null if all params have not any id property', () => {
      const query: any = {};
      const body: any = {};
      const id: Id = new Id(query, body);
      expect(id.value).toBeNull();
    });

    it('should return the id property of query param', () => {
      const query: any = { myQueryIdProperty: 'myIdFromQuery' };
      Reflect.defineMetadata(ID_METADATA_KEY, 'myQueryIdProperty', query);
      const id: Id = new Id(query, null);

      expect(id.value).toEqual('myIdFromQuery');
    });

    it('should return the id property of body param', () => {
      const body: any = { myBodyIdProperty: 'myIdFromBody' };
      Reflect.defineMetadata(ID_METADATA_KEY, 'myBodyIdProperty', body);
      const id: Id = new Id(null, body);

      expect(id.value).toEqual('myIdFromBody');
    });

    it('should return the id property of body param if both of query and body have id property', () => {
      const query: any = { myQueryIdProperty: 'myIdFromQuery' };
      const body: any = { myBodyIdProperty: 'myIdFromBody' };
      Reflect.defineMetadata(ID_METADATA_KEY, 'myQueryIdProperty', query);
      Reflect.defineMetadata(ID_METADATA_KEY, 'myBodyIdProperty', body);
      const id: Id = new Id(query, body);

      expect(id.value).toEqual('myIdFromBody');
    });
  });
});
