import { HttpOfflineQueueContext } from '../configuration/context/http-offline-queue-context.configuration';

/**
 * @ignore
 */
export const HTTP_OFFLINE_QUEUE_METADATA_KEY: string = 'ngx-http-repository:http-offline-queue';

export function HttpOfflineQueue(params: HttpOfflineQueueContext): (target: unknown) => void {
  return (target: unknown): void => {
    Reflect.defineMetadata(HTTP_OFFLINE_QUEUE_METADATA_KEY, params, target);
  };
}
