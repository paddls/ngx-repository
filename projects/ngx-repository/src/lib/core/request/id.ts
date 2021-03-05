import { ID_METADATA_KEY } from '../decorator/id.decorator';

export class Id {

  public readonly value: any;

  public constructor(private readonly body: any,
                     private readonly query: any) {
    this.value = this.getId();
  }

  private getId(): any {
    return this.getIdFromObject(this.query) || this.getIdFromObject(this.body) || null;
  }

  private getIdFromObject(object: any): any {
    if (object != null) {
      const idKey: string = Reflect.getMetadata(ID_METADATA_KEY, object);
      const id: string = object[idKey];

      return id || null;
    }

    return null;
  }
}
