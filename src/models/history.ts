import { Location } from 'history';

export interface LocationStateFrom {
  from?: {
    hash?: string,
    pathname?: string,
    state?: string,
    search?: string,
  };
}

export interface LocationState extends Location {
  state: LocationStateFrom
}
