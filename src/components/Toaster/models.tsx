import { IStatusType } from 'src/models/status';

export interface IToaster {
  type?: IStatusType,
  message?: string,
}
