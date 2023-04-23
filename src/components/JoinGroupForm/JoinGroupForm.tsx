import React, { useState, useRef } from 'react';

import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './JoinGroupForm.module.css';

type ClassInfo = {
  class_id: string;
  class_name: string;
  teacher: string;
  days: string;
  time: string;
};

const dummyInfo = <T,>(): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        class_id: 'ITC023',
        class_name: 'Tecnologias II',
        teacher: 'Claudia Perez',
        days: 'LU-JU',
        time: '09:00-11:00',
      } as T);
    }, 1000);
  });

export default function JoinGroupForm() {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [classCode, setClassCode] = useState('');
  const [inputError, setInputError] = useState('');
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const classCodeRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const checkClasscode = () => {
    const splittedString = classCode.split(' ');
    if (splittedString.length > 1) {
      setInputError('Sin espacios');
      setIsSubmitDisabled(true);
      return;
    }

    if (!splittedString[0]) {
      setInputError('Campo Vacío');
      setIsSubmitDisabled(true);
      return;
    }

    setInputError('Hecho');
    setIsSubmitDisabled(false);
  };

  const handleChange = (id: string, value: string) => {
    setInputError('');
    setClassCode(value);
    setIsSubmitDisabled(true);
  };

  const resetValues = () => {
    setInputError('');
    setClassCode('');
    setIsSubmitDisabled(true);
    setClassInfo(null);
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data = await dummyInfo<ClassInfo>();

    setClassInfo(data);
  };

  return (
    <Modal
      current={classInfo ? 'form' : 'confirmClass'}
      open={isFormSubmitted}
      title="Unirse a un grupo"
      onClose={resetValues}
      lastFocusableElement={isSubmitDisabled ? classCodeRef : submitRef}
    >
      {!classInfo ? (
        <form autoComplete="off" className={styles['form-container']}>
          <h3>Ingresa el código de la clase</h3>
          <div className={styles['input-container']}>
            <InputField
              className={styles['classCode-input']}
              id="classCodeField"
              ref={classCodeRef}
              label=""
              type="text"
              required
              error={inputError}
              value=""
              placeholder="MiClase01"
              handleBlur={checkClasscode}
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
              text="Unirse"
              type="submit"
              isDisable={isSubmitDisabled}
              ref={submitRef}
              onClickHandler={handleClick}
            />
          </div>
        </form>
      ) : (
        <>
          <div className={styles['class-info-container']}>
            <h2 className={styles['class-info-title']}>Tu grupo:</h2>
            <h3 className={styles['class-name']}>{classInfo.class_name}</h3>
            <span className={styles['class-label']}>Profesor/a</span>
            <p className={styles['class-info']}>{classInfo.teacher}</p>
            <span className={styles['class-label']}>Días </span>
            <p className={styles['class-info']}>{classInfo.days}</p>
            <span className={styles['class-label']}>Horario</span>
            <p className={styles['class-info']}>{classInfo.time}</p>
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
              onClickHandler={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setIsFormSubmitted(true);
                setTimeout(() => {
                  setIsFormSubmitted(false);
                }, 1000);
              }}
            />
          </div>
        </>
      )}
    </Modal>
  );
}
