import React from 'react';
import './Toaster.css';
import { IStatusType } from '../../models/status';

export interface IToaster {
  type?: IStatusType,
  message?: string,
}

const Toaster = ({ type, message }: IToaster) => {
  return (
    <div className={`App-toaster App-toaster--${type}`}>
      <p>{message}</p>
    </div>
  )
}

export default Toaster;
