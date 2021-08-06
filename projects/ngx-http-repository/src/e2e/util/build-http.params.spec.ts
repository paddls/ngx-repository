import { HttpParams } from '@angular/common/http';

export function buildHttpParams(...params: string[]): HttpParams {
  let httpParams: HttpParams = new HttpParams();
  for (let i: number = 0; i < params.length; i = i + 2) {
    httpParams = httpParams.append(params[i], params[i + 1]);
  }

  return httpParams;
}
