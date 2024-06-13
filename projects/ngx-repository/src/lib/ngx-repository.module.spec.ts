import {NgxRepositoryModule} from "@paddls/ngx-repository";
import {TestBed} from "@angular/core/testing";
import {NgxRepositoryService} from "./ngx-repository.service";
import {provideNgxRepositoryModule} from "./ngx-repository.module";
import {NORMALIZER_CONFIGURATION_TOKEN} from "@paddls/ngx-serializer";


describe('NgxRepositoryModule.forRoot', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxRepositoryModule.forRoot()]
    });
  });
  testNgxRepository()
});

describe('provideNgxRepositoryModule', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNgxRepositoryModule()
      ]
    });
  });
  testNgxRepository()
});

function testNgxRepository() {

  it('should provide NORMALIZER_CONFIGURATION_TOKEN', () => {
    const test = TestBed.inject(NORMALIZER_CONFIGURATION_TOKEN);
    expect(() => test).toBeTruthy();
  });

  it('should not provide NgxRepositoryService', () => {
    expect(() => TestBed.inject(NgxRepositoryService)).toThrowError(/No provider for/);
  });
}
