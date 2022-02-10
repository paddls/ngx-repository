import { CollectionReference, DocumentData, DocumentReference, Firestore } from 'firebase/firestore';
import { SnapshotListenOptions, Unsubscribe } from '@firebase/firestore';
import { Observer, of } from 'rxjs';
import { FirestoreMock } from 'projects/ngx-firestore-repository/src/e2e/util/firestore-mock.spec';
import { wif } from '@paddls/rxjs-common';
import { map } from 'rxjs/operators';

export function collection(firestore: Firestore, path: string): CollectionReference<DocumentData> {
  return {
    type: 'collection',
    path
  } as any;
}

export function doc(firestore: Firestore, path: string): DocumentReference<DocumentData> {
  return {
    type: 'document',
    path
  } as any;
}

export const addDoc: any = jasmine.createSpy().and.callFake((c: { path: string }) => {
  return FirestoreMock.get(c.path).pipe(
    map((data: any) => data)
  ).toPromise();
});

export const updateDoc: any = jasmine.createSpy().and.returnValue(of(void 0).toPromise());

export const setDoc: any = jasmine.createSpy().and.returnValue(of(void 0).toPromise());

export const deleteDoc: any = jasmine.createSpy().and.returnValue(of(void 0).toPromise());

export function onSnapshot(reference: any,
                              options: SnapshotListenOptions,
                              observer: Observer<any>): Unsubscribe {
  return FirestoreMock.get(reference.path)
    .pipe(
      wif(
        () => reference.type === 'collection',
        (datas: any[]) => ({
          docs: datas.map((data: any) => ({data: () => data}))
        }),
        (data: any[]) => ({
          data: () => data
        })
      ),
    )
    .subscribe(observer)
    .unsubscribe;
}
