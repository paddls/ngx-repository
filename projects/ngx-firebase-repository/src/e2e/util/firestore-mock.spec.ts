import firebase from 'firebase';
import { from, Observable, Subject } from 'rxjs';
import { omit } from 'lodash';
import { arrayMap } from '@witty-services/rxjs-common';
import { map } from 'rxjs/operators';
import CollectionReference = firebase.firestore.CollectionReference;
import DocumentData = firebase.firestore.DocumentData;
import DocumentReference = firebase.firestore.DocumentReference;
import createSpy = jasmine.createSpy;

export class FirestoreMock {

  public readonly collectionAdd: any = createSpy('collectionAdd');
  public readonly documentDelete: any = createSpy('documentDelete');
  public readonly documentUpdate: any = createSpy('documentUpdate');
  private readonly data: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  public mock(path: string, ...values: any[]): void {
    this.data.set(path, from(values));
  }

  public collection(path: string): CollectionReference<DocumentData> {
    const firestore: FirestoreMock = this;

    return {
      add: (data: any): Promise<DocumentReference<DocumentData>> => {
        firestore.collectionAdd(path, data);

        return this.getDocumentReference(path).toPromise();
      },
      onSnapshot: (subscriber: any) => {
        this.getData(path).pipe(
          arrayMap((item: any) => ({
            id: item.id,
            data: () => omit(item, ['id'])
          }))
        ).subscribe((docs: any) => {
          subscriber.next({docs});
        }, () => void 0, () => {
          subscriber.complete();
        });
      }
    } as CollectionReference;
  }

  public doc(path: string): DocumentReference<DocumentData> {
    const firestore: FirestoreMock = this;

    return {
      delete(): Promise<void> {
        firestore.documentDelete(path);

        return Promise.resolve();
      },
      update(data: any): Promise<void> {
        firestore.documentUpdate(path, data);

        return Promise.resolve();
      },
      onSnapshot: (subscriber: any) => {
        this.getDocumentReference(path).subscribe((value: any) => {
          subscriber.next(value);
        }, () => void 0, () => {
          subscriber.complete();
        });
      }
    } as DocumentReference;
  }

  private getData(path: string): Observable<any> {
    if (!this.data.has(path)) {
      this.data.set(path, new Subject<any>());
    }

    return this.data.get(path);
  }

  private getDocumentReference(path: string): Observable<any> {
    return this.getData(path).pipe(
      map((item: any) => ({
        id: item.id,
        data: () => omit(item, ['id'])
      }))
    );
  }
}
