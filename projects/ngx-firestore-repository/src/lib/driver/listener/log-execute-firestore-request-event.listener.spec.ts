import { LogExecuteFirestoreRequestEventListener } from './log-execute-firestore-request-event.listener';
import { BeforeExecuteFirestoreRequestEvent } from '../event/before-execute-firestore-request.event';
import { AfterExecuteFirestoreRequestEvent } from '../event/after-execute-firestore-request.event';

describe('LogExecuteFirestoreRequestEventListener', () => {

  const listener: LogExecuteFirestoreRequestEventListener = new LogExecuteFirestoreRequestEventListener();

  describe('#on()', () => {

    it('should log request on request event', () => {
      spyOn(console, 'log').and.stub();

      listener.on(new BeforeExecuteFirestoreRequestEvent({
        request: {
          operation: 'read',
          path: {value: '/path'} as any
        } as any
      }));

      expect(console.log).toHaveBeenCalledWith('%c[FIRESTORE REQUEST]%c [read] /path', 'color:red', 'color:black');
    });

    it('should log response on response event', () => {
      spyOn(console, 'log').and.stub();

      listener.on(new AfterExecuteFirestoreRequestEvent({
        request: {
          operation: 'read',
          path: {value: '/path'} as any
        } as any
      }));

      expect(console.log).toHaveBeenCalledWith('%c[FIRESTORE RESPONSE]%c [read] /path', 'color:green', 'color:black');
    });
  });
});
