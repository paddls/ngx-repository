import {HttpRepository} from './http.repository';
import {HTTP_RESOURCE_METADATA_KEY} from './decorator/http-resource.decorator';

class MyHttpRepository extends HttpRepository<any, any> {

  public getResourceContextKey(): string {
    return this.resourceContextKey;
  }
}

describe('HttpRepository', () => {

  it('should have the good resource context key', () => {
    const myHttpRepository: MyHttpRepository = new MyHttpRepository(null, null, null, null, null, null, null);
    expect(myHttpRepository.getResourceContextKey()).toEqual(HTTP_RESOURCE_METADATA_KEY);
  });
});
