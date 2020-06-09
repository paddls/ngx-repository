import {InjectionToken} from '@angular/core';
import {Connection} from './connection/connection';
import {NormalizerConfiguration} from '@witty-services/ts-serializer';

/**
 * @ignore
 */
export const NORMALIZER_CONFIGURATION_TOKEN: InjectionToken<NormalizerConfiguration> = new InjectionToken<NormalizerConfiguration>('NORMALIZER_CONFIGURATION_TOKEN');

/**
 * @ignore
 */
export const CONNECTIONS_TOKEN: InjectionToken<Connection<any, any>> = new InjectionToken<Connection<any, any>>('CONNECTIONS');
