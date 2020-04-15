export const HTTP_PARAM_METADATA_KEY: string = 'httpParams';

export interface HttpParamContext {
  name: string;
}

export interface HttpParamContextConfiguration extends HttpParamContext {
  propertyKey: string;
}

export function HttpParam(params?: HttpParamContext|string): any {
  return (target: any, propertyKey: string) => {
    let httpParamContextConfiguration: HttpParamContextConfiguration = {
      propertyKey,
      name: propertyKey
    };

    if (typeof params === 'object') {
      httpParamContextConfiguration = {
        ...httpParamContextConfiguration,
        ...params
      };
    } else if (typeof params === 'string') {
      httpParamContextConfiguration.name = params;
    }

    let metas: HttpParamContextConfiguration[] = [];
    if (Reflect.hasMetadata(HTTP_PARAM_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(HTTP_PARAM_METADATA_KEY, target);
    }
    Reflect.defineMetadata(HTTP_PARAM_METADATA_KEY, metas.concat(httpParamContextConfiguration), target);
  };
}
