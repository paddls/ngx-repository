import { EventListener, Listener } from '@paddls/ngx-repository';
import { Injectable } from '@angular/core';
import { BeforeExecuteFirestoreRequestEvent } from '../event/before-execute-firestore-request.event';
import { AfterExecuteFirestoreRequestEvent } from '../event/after-execute-firestore-request.event';
import { FirestoreRepositoryRequest } from '../../request/firestore-repository.request';

type ExecuteFirestoreRequestEvent = BeforeExecuteFirestoreRequestEvent | AfterExecuteFirestoreRequestEvent;

// @dynamic
@Injectable()
@EventListener([(e: ExecuteFirestoreRequestEvent) => e instanceof BeforeExecuteFirestoreRequestEvent, (e: ExecuteFirestoreRequestEvent) => e instanceof AfterExecuteFirestoreRequestEvent])
export class LogExecuteFirestoreRequestEventListener implements Listener<ExecuteFirestoreRequestEvent> {

  public on(event: ExecuteFirestoreRequestEvent): void {
    if (event instanceof BeforeExecuteFirestoreRequestEvent) {
      console.log(this.makeLog(event.request, 'FIRESTORE REQUEST'), 'color:red', 'color:black');
    } else if (event instanceof AfterExecuteFirestoreRequestEvent) {
      console.log(this.makeLog(event.request, 'FIRESTORE RESPONSE'), 'color:green', 'color:black');
    }
  }

  private makeLog(request: FirestoreRepositoryRequest, type: 'FIRESTORE REQUEST'|'FIRESTORE RESPONSE'): string {
    return `%c[${type}]%c [${request.operation}] ${request.path.value}`;
  }
}
