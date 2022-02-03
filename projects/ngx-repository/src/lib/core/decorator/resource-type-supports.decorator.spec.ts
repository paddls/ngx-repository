import 'reflect-metadata';
import { Id, ID_METADATA_KEY } from './id.decorator';
import { COLUMNS_METADATA_KEY } from './column.decorator';
import {ColumnContextConfiguration} from '../configuration/context/column-context.configuration';
import {IdContext} from '../configuration/context/id-context.configuration';
import { RESOURCE_TYPE_SUPPORTS_METADATA_KEY, ResourceTypeSupports } from './resource-type-supports.decorator';

describe('ResourceTypeSupportsDecorator', () => {
  function resourceTypeSupportsFunction(data: any): boolean {
    return !!data;
  }

  @ResourceTypeSupports(resourceTypeSupportsFunction)
  class MyClass {}

  it('should place all ResourceTypeSupportsContext parameter in the good place', () => {
    expect(Reflect.getMetadata(RESOURCE_TYPE_SUPPORTS_METADATA_KEY, MyClass)).toEqual(resourceTypeSupportsFunction);
  });
});
