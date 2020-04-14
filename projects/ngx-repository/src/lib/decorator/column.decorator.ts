import {Converter} from '../converter/converter';

export const COLUMNS_METADATA_KEY: string = 'columns';

export interface ColumnContext<T, R> {

  field?: string;

  type?: new(...args: any[]) => T;

  readOnly?: boolean;

  writeOnly?: boolean;

  customConverter?: new(...args: any[]) => Converter<T, R>;
}

export interface PropertyColumnContext<T, R> extends ColumnContext<T, R> {
  propertyKey: string;
}

export function Column<T, R>(columnContext?: ColumnContext<T, R>|string|(new(...args: any[]) => T)): any {
  return (target: any, propertyKey: string) => {
    const columnMetadata: PropertyColumnContext<T, R> = makeColumnMetadata(target, propertyKey, columnContext);

    let metas: PropertyColumnContext<T, R>[] = [];
    if (Reflect.hasMetadata(COLUMNS_METADATA_KEY, target)) {
      metas = Reflect.getMetadata(COLUMNS_METADATA_KEY, target);
    }
    Reflect.defineMetadata(COLUMNS_METADATA_KEY, metas.concat(columnMetadata), target);
  };
}

function makeColumnMetadata<T, R>(target: any,
                                  propertyKey: string,
                                  columnContext?: ColumnContext<T, R>|string|(new(...args: any[]) => T)): PropertyColumnContext<T, R> {
  let columnMetadata: PropertyColumnContext<T, R> = {
    propertyKey,
    field: propertyKey
  };

  if (typeof columnContext === 'object') {
    if (columnContext.type && columnContext.customConverter) {
      throw new Error('You cannot specify both the converter and type attributes at the same time.');
    }

    columnMetadata = {...columnMetadata, ...columnContext};
    if (!!columnContext.field && columnContext.field !== '') {
      columnMetadata.field = columnContext.field;
    }
  } else if (typeof columnContext === 'string') {
    columnMetadata.field = columnContext;
  } else if (typeof columnContext === 'function') {
    columnMetadata.type = columnContext;
  }

  return columnMetadata;
}
