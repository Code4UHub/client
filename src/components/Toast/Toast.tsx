import React, { useState, useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateToast } from 'store/toast/toastSlice';

import style from './Toast.module.css';

const TOAST_DURATION = 3000;

export function Toast() {
  const [isOpen, setIsOpen] = useState(false);
  const { title, message, type } = useSelector(
    (state: RootState) => state.toast
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (title !== '') {
      setIsOpen(true);

      setTimeout(() => {
        setIsOpen(false);
        dispatch(
          updateToast({
            title: '',
            type: '',
            message: '',
          })
        );
      }, TOAST_DURATION);
    }
  }, [title, message, type, dispatch]);

  return (
    <div
      className={`${style.toast} ${style.top} ${style[type]} ${
        isOpen && style.open
      }`}
    >
      <div className={`${style['toast-title']}`}>{title}</div>
      <div className={`${style['toast-message']}`}>{message}</div>
    </div>
  );
}
