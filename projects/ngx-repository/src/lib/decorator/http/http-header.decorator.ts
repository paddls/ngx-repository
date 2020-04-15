export const HTTP_HEADER_METADATA_KEY: string = 'httpHeaders';

export interface HttpHeaderContext {
  name: string;
}

export interface HttpHeaderContextConfiguration extends HttpHeaderContext {
  propertyKey: string;
}

export function HttpHeader(params?: HttpHeaderContext|string): any {
  return (target: any, propertyKey: string) => {
    let httpHeaderContextConfiguration: HttpHeaderContextConfiguration = {
      propertyKey,
      name: propertyKey
    };

    if (typeof params === 'object') {
      httpHeaderContextConfiguration = {
        ...httpHeaderContextConfiguration,
        ...params
      };
    } else if (typeof params === 'string') {
      httpHeaderContextConfiguration.name = params;
    }

    let metas: HttpHeaderContextConfiguration[] = [];
    if (Reflect.hasMetadata(HTTP_HEADER_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(HTTP_HEADER_METADATA_KEY, target);
    }
    Reflect.defineMetadata(HTTP_HEADER_METADATA_KEY, metas.concat(httpHeaderContextConfiguration), target);
  };
}
