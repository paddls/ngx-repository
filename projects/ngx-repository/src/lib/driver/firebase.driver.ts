import {Driver} from '@witty-services/repository-core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

export interface FirebaseOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: any;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

@Injectable()
export class FirebaseDriver implements Driver<any, FirebaseOptions> {

  public constructor(private http: HttpClient) {
  }

  public find(path: string, options?: FirebaseOptions): any {
    return this.http.get(path, options);
  }

  public findOne(path: string, options?: FirebaseOptions): any {
    return this.http.get(path, options);
  }

  public create(path: string, object: any, options?: FirebaseOptions): any {
    return this.http.post(path, object, options);
  }

  public update(path: string, object: any, options?: FirebaseOptions): any {
    return this.http.put(path, object, options);
  }

  public delete(path: string, options?: FirebaseOptions): any {
    return this.http.delete(path, options);
  }
}
