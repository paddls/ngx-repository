import { from, Observable, of } from 'rxjs';
import { CollectionReference, DocumentData, DocumentReference, Firestore } from 'firebase/firestore';
import { PartialWithFieldValue, WithFieldValue } from '@firebase/firestore';

export function collection(firestore: Firestore, path: string): CollectionReference<DocumentData> {
  return {} as CollectionReference;
}

export function doc(firestore: Firestore, path: string): DocumentReference<DocumentData> {
  return {} as DocumentReference;
}

export function addDoc<T>(reference: CollectionReference<T>, data: WithFieldValue<T>): Promise<DocumentReference<T>> {
  return of({}).toPromise() as Promise<DocumentReference<T>>;
}

export function updateDoc(reference: DocumentReference<unknown>, value: unknown, ...moreFieldsAndValues: unknown[]): Promise<void> {
  return of(void 0).toPromise() as Promise<void>;
}

export function setDoc<T>(reference: DocumentReference<T>, data: PartialWithFieldValue<T>): Promise<void> {
  return of(void 0).toPromise() as Promise<void>;
}

export function deleteDoc(reference: DocumentReference<unknown>): Promise<void> {
  return of(void 0).toPromise() as Promise<void>;
}

export class FirestoreMock {

  private static readonly data: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  public static mock(path: string, ...values: any[]): void {
    FirestoreMock.data.set(path, from(values));
  }
}
