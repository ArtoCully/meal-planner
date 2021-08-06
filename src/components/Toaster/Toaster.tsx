import React from 'react';
import './Toaster.css';
import { IToaster } from './models';

const Toaster = ({ type, message }: IToaster) => {
  return (
    <div className={`App-toaster App-toaster--${type}`}>
      <p>{message}</p>
    </div>
  )
}

export default Toaster;
