import React, { useState } from 'react';
import { Button } from 'components/Button/Button';

import { useDispatch } from 'react-redux';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';

import { ReactComponent as IconError } from './error.svg';
import styles from './NoResultsError.module.css';

type Props = {
  retryHandler: () => Promise<any>;
};

export default function NoResultsError({ retryHandler }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRetry = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    dispatch(setLoading());

    await retryHandler();

    dispatch(removeLoading());
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <IconError className={styles.icon} />
      <span className={styles.title}>Oops</span>
      <p className={styles.description}>Algo salió mal.</p>
      <Button
        location="modal"
        text="Intentar de nuevo"
        onClickHandler={handleRetry}
      />
    </div>
  );
}
