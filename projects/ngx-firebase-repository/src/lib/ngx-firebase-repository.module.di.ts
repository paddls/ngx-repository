import { InjectionToken } from '@angular/core';
import { firestore } from 'firebase';
import Firestore = firestore.Firestore;

/** @ignore */
export const FIRESTORE_APP: InjectionToken<Firestore> = new InjectionToken<Firestore>('FIRESTORE_APP');

