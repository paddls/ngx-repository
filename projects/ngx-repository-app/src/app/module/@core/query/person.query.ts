import {HttpQueryParam} from '@witty-services/ngx-repository';

export class PersonQuery {

  @HttpQueryParam({name: 'firstName', format: '^:value'})
  public firstNameStartWith?: string;

  public constructor(data: Partial<PersonQuery> = {}) {
    Object.assign(this, data);
  }
}
