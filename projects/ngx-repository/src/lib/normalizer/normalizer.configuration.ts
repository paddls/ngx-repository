import {Injectable} from '@angular/core';

@Injectable()
export class NormalizerConfiguration {

  public denormalizeNull?: boolean = false;

  public denormalizeUndefined?: boolean = false;

  public normalizeNull?: boolean = false;

  public normalizeUndefined?: boolean = false;
}
