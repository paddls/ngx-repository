export interface HttpOfflineQueueContext {

  /**
   * @description
   * The time to live of the queued request in milliseconds.
   * @default 3600000
   */
  timeToLive?: number;

  /**
   * @description
   * The maximum number of requests that can be queued.
   * @default 100
   */
  maxQueueSize?: number;

  /**
   * @description
   * The maximum number of times a queued request can be retried.
   * @default 0
   */
  maxRetryCount?: number;

}
