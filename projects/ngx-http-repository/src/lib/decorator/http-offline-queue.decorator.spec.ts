import { HttpOfflineQueueContext } from '../configuration/context/http-offline-queue-context.configuration';
import { HTTP_OFFLINE_QUEUE_METADATA_KEY, HttpOfflineQueue } from './http-offline-queue.decorator';

describe('HttpOfflineQueueDecorator', () => {

  it('should place http offline queue context in metadata', () => {
    const obj: unknown = {};
    const context: HttpOfflineQueueContext = {
      timeToLive: 6000
    };

    HttpOfflineQueue(context)(obj);
    expect(Reflect.getMetadata(HTTP_OFFLINE_QUEUE_METADATA_KEY, obj)).toEqual(context);
  });
});
