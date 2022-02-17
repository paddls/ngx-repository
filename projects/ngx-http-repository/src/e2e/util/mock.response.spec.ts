import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export interface RequestContext {
  name: string;
  request: (...arg: any[]) => Promise<any>;
  expectedMethod: string;
  expectedPath?: any;
  expectedRequestBody?: any;
  expectedRequestHeaders?: any;
  expectedRequestParams?: any;
  expectedResponse?: any;
  mockedResponse?: any;
}
