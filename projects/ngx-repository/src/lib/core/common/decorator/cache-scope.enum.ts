export enum CacheScope {
  FIELD = 'FIELD',
  INSTANCE = 'INSTANCE',
  REQUEST = 'REQUEST'
}

export const ALL_CACHE_SCOPES: CacheScope[] = [CacheScope.FIELD, CacheScope.INSTANCE, CacheScope.REQUEST];
