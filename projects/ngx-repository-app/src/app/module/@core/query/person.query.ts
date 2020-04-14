import {HttpQueryParam, Query} from 'ngx-repository';

export class PersonQuery extends Query<string> {

  @HttpQueryParam({name: 'firstName', format: '^:value'})
  public firstNameStartWith?: string;

  public constructor(data: Partial<PersonQuery> = {}) {
    super();

    Object.assign(this, data);
  }
}
