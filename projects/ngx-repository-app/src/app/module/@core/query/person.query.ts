import {HttpQueryParam} from '@paddls/ngx-http-repository';

export class PersonQuery {

  @HttpQueryParam({name: 'firstName', format: '^:value'})
  public firstNameStartWith?: string;

  @HttpQueryParam('id')
  public idEqualsTo: string;

  public constructor(data: Partial<PersonQuery> = {}) {
    Object.assign(this, data);
  }
}
