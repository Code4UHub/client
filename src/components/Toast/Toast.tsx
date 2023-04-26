import React, { useState, useEffect } from 'react';
import style from './Toast.module.css';

const openTime = 5000;
const closingTime = 1000;
export const toastTime = openTime + closingTime;

type Props = {
  title: string;
  message: string;
  type: string;
};

export enum ToastStatus {
  open = 'open',
  closing = 'closing',
}

export function Toast({ title, message, type }: Props) {
  const [status, setStatus] = useState(ToastStatus.open);

  useEffect(() => {
    if (status === ToastStatus.open) {
      setTimeout(() => {
        setStatus(ToastStatus.closing);
      }, openTime);
    }
  }, [status]);

  return (
    <div
      className={`${style.toast} ${style.top} ${style[type]} ${style[status]}`}
    >
      <div className={`${style['toast-title']}`}>{title}</div>
      <div className={`${style['toast-message']}`}>{message}</div>
    </div>
  );
}
