/**
 * @ignore
 */
export const HTTP_MULTIPART_COLUMN_METADATA_KEY: string = 'ngx-http-repository:http-multipart-column';

export interface HttpMultipartColumnContext {
  /**
   * multipart name for the object
   */
  name: string;

  /**
   * field name
   */
  propertyKey: string;
}

/**
 * use to send part of body over multipart
 * @param name multipart name for the object
 */
export function HttpMultipartColumn(name?: string): any {
  return (target: any, propertyKey: string) => {
    const metas: HttpMultipartColumnContext[] = Reflect.getMetadata(HTTP_MULTIPART_COLUMN_METADATA_KEY, target) || [];
    const meta: HttpMultipartColumnContext = {
      propertyKey,
      name: name || propertyKey
    };

    Reflect.defineMetadata(HTTP_MULTIPART_COLUMN_METADATA_KEY, metas.concat(meta), target);
  };
}
