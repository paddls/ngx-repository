import { IdQuery } from './id.query';

describe('IdQuery', () => {

  it('should build query', () => {
    const query: IdQuery = new IdQuery('id', 'parent');

    expect(query.id).toEqual('id');
    expect(query.parent).toEqual('parent');
  });
});
