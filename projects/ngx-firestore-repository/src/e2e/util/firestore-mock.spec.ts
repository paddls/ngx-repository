import { from, Observable } from 'rxjs';

export class FirestoreMock {

  public static data: Map<string, Observable<any>>;

  public static mock(path: string, ...values: any[]): void {
    FirestoreMock.data.set(path, from(values));
  }

  public static get(path: string): Observable<any> {
    return FirestoreMock.data.get(path);
  }

  public static reset(): void {
    FirestoreMock.data = new Map<string, Observable<any>>();
  }
}
