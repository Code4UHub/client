import React, { useState, useRef, useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';

import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import { Class } from 'types/Class/Class';
import { getClass, joinClass } from 'utils/db/db.utils';

import { updateToast, TOAST_GENERAL_ERRORS } from 'store/toast/toastSlice';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';

import { useDebounceRules } from 'hooks/useDebounceRules';

import { formatTime } from 'utils/format/formatTime';
import { formatDays } from 'utils/format/formatDays';

import { correctState } from 'utils/inputRules/generalRules';

import styles from './JoinGroupForm.module.css';

type Props = {
  onComplete: Function;
};

export default function JoinGroupForm({ onComplete }: Props) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [classCode, setClassCode] = useState('');
  const STATE_NAME = 'classCode';
  const [classInfo, setClassInfo] = useState<Class | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { inputErrors, onRestartIdValue, restartAllInputErrors } =
    useDebounceRules({ classCode }, 'joinGroup');

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.currentUser);

  const classCodeRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  // Created so that when switching between find class and confirmation screen, the rules don't apply
  useEffect(() => {
    restartAllInputErrors([STATE_NAME]);
    // eslint-disable-next-line
  }, [classInfo]);

  useEffect(() => {
    if (isFormSubmitted) setIsFormSubmitted(false);
  }, [isFormSubmitted]);

  useEffect(() => {
    if (inputErrors[STATE_NAME] === correctState) {
      setIsSubmitDisabled(false);
      return;
    }
    setIsSubmitDisabled(true);
  }, [inputErrors]);

  const handleChange = (_id: string, value: string) => {
    setClassCode(value);
    onRestartIdValue(STATE_NAME);
    setIsSubmitDisabled(true);
  };

  const resetValues = () => {
    setClassCode('');
    onRestartIdValue(STATE_NAME);
    setIsSubmitDisabled(true);
    setClassInfo(null);
  };

  const handleGetClass = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setLoading());

    try {
      const data = await getClass(user?.authToken as string, classCode);

      if (data.status === 'success') {
        setClassInfo(data.data as Class);
      } else {
        dispatch(
          updateToast({
            title: data.status,
            type: 'error',
            message: data.data as string,
          })
        );
      }
    } catch (error) {
      dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
    }
    dispatch(removeLoading());
  };

  const handleJoinClass = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    dispatch(setLoading());

    try {
      const data = await joinClass(
        user?.authToken as string,
        classCode,
        user?.id as string
      );

      if (data.status === 'success') {
        dispatch(
          updateToast({
            title: 'Success',
            type: 'success',
            message: 'Se ha solicitado el acceso',
          })
        );
        setIsFormSubmitted(true);
        onComplete();
      } else {
        dispatch(
          updateToast({
            title: data.status,
            type: 'error',
            message: data.data as string,
          })
        );
      }
    } catch (error) {
      dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
    }
    dispatch(removeLoading());
  };

  const renderModalContent = () => {
    if (!classInfo) {
      return (
        <form
          autoComplete="off"
          className={styles['form-container']}
        >
          <h3>Ingresa el código de la clase</h3>
          <div className={styles['input-container']}>
            <InputField
              className={styles['classCode-input']}
              id="classCodeField"
              ref={classCodeRef}
              label=""
              type="text"
              required
              error={inputErrors.classCode}
              value=""
              handleBlur={() => []}
              handleChange={handleChange}
            />
          </div>
          <div className={styles['form-buttons']}>
            <Button
              className={styles.button}
              location=""
              text="Borrar"
              type="reset"
              onClickHandler={resetValues}
            />
            <Button
              className={styles.button}
              location="joinGroup"
              text="Buscar"
              type="submit"
              isDisable={isSubmitDisabled}
              ref={submitRef}
              onClickHandler={handleGetClass}
            />
          </div>
        </form>
      );
    }

    return (
      <>
        <div className={styles['class-info-container']}>
          <h2 className={styles['class-info-title']}>Tu grupo:</h2>
          <h3 className={styles['class-name']}>{classInfo.subject_name}</h3>
          <span className={styles['class-label']}>Profesor/a</span>
          <p className={styles['class-info']}>{classInfo.teacher_name}</p>
          <span className={styles['class-label']}>Días </span>
          <p className={styles['class-info']}>{formatDays(classInfo.days)}</p>
          <span className={styles['class-label']}>Horario</span>
          <p className={styles['class-info']}>{`${formatTime(
            classInfo.start_time
          )} - ${formatTime(classInfo.end_time)}`}</p>
        </div>
        <p className={styles['class-confirm-message']}>
          ¿Deseas ingresar a esta clase?
        </p>
        <div className={styles['class-buttons']}>
          <Button
            className=""
            location=""
            text="No"
            type="button"
            onClickHandler={resetValues}
          />
          <Button
            className=""
            location="joinGroup"
            text="Si"
            type="submit"
            onClickHandler={handleJoinClass}
          />
        </div>
      </>
    );
  };

  return (
    <Modal
      current={classInfo ? 'form' : 'confirmClass'}
      open={isFormSubmitted}
      title="Unirse a un grupo"
      onClose={resetValues}
      lastFocusableElement={isSubmitDisabled ? classCodeRef : submitRef}
    >
      {renderModalContent()}
    </Modal>
  );
}
