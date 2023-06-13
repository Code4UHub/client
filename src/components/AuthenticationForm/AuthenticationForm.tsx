import React, { useState, useEffect } from 'react';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/user/userSlice';
import { updateToast, TOAST_GENERAL_ERRORS } from 'store/toast/toastSlice';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { UserPromise } from 'types/User/User';

import {
  createStudent,
  createTeacher,
  logStudent,
  logTeacher,
} from 'utils/db/db.utils';

import { useDebounceRules } from 'hooks/useDebounceRules';

import { correctState } from 'utils/inputRules/generalRules';
import { authData } from './authData';

import style from './AuthenticationForm.module.css';

const CryptoJS = require('crypto-js');

type Props = {
  screen: 'signIn' | 'signUp';
};

function toTitleCase(sentence: string) {
  if (sentence) {
    const words = sentence.toLowerCase().split(' ');
    return words
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(' ');
  }
  return '';
}

export default function AuthenticationForm({ screen }: Props) {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const { inputErrors, onRestartIdValue, restartAllInputErrors } =
    useDebounceRules(inputValues, 'auth');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Checks every inputError and if one has an error message, you can't signin/signup
  const isMainButtonDisable = !Object.values(inputErrors).every(
    (value: string) => value === correctState
  );

  // Update values of inputs and errors, according to the screen
  useEffect(() => {
    setInputValues({});
    const screenIds: string[] = authData[screen].map(({ id }) => id);
    screenIds.forEach((id) => {
      setInputValues((value) => ({ ...value, [id]: '' }));
    });
    restartAllInputErrors(screenIds);
    // eslint-disable-next-line
  }, [screen]);

  // Keep record of values and restart errors as a value changes
  const onChangeHandler = (id: string, value: string) => {
    setInputValues((storedValues) => ({ ...storedValues, [id]: value }));
    onRestartIdValue(id);
  };

  const submitForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    dispatch(setLoading());
    e.preventDefault();
    try {
      let user: UserPromise | undefined;

      const studentRegex = /^[aA]0/g;
      const userName = inputValues.email.split('@')[0];
      const password = CryptoJS.MD5(
        inputValues.passwordLogin || inputValues.password
      ).toString();

      if (screen === 'signIn') {
        const { email } = inputValues;

        if (studentRegex.test(userName)) {
          user = await logStudent(email.toLowerCase(), password);
        } else {
          user = await logTeacher(email.toLowerCase(), password);
        }
      } else {
        const { firstName, lastName, email } = inputValues;

        const userData = {
          first_name: toTitleCase(firstName),
          last_name: toTitleCase(lastName),
          email: email.toLowerCase(),
          password,
        };

        if (studentRegex.test(userName)) {
          user = await createStudent({ student_id: userName, ...userData });
        } else {
          user = await createTeacher({ teacher_id: userName, ...userData });
        }
      }

      if (user && user.status === 'success' && typeof user.data !== 'string') {
        dispatch(updateUser({ authToken: user.auth_token, ...user.data }));
        dispatch(
          updateToast({
            title: 'Success',
            message: `Bienvenido ${user.data.first_name}`,
            type: 'success',
          })
        );
        navigate('/');
      } else {
        dispatch(
          updateToast({
            title: user.status,
            message: user.data as string,
            type: 'error',
          })
        );
      }
    } catch (error) {
      dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
    }
    dispatch(removeLoading());
  };

  return (
    <main className={style.form}>
      <form>
        <h1 className={style['form-title']}>
          {screen === 'signUp'
            ? 'Crea tu cuenta'
            : 'Inicia sesión con tu cuenta'}
        </h1>
        <div className={style.inputs}>
          {authData[screen].map((field, index: number) => (
            <InputField
              key={`${screen}${field.id}`}
              value={inputValues[field.id]}
              label={field.label}
              type={field.type}
              id={field.id}
              error={inputErrors[field.id]}
              required
              handleChange={onChangeHandler}
              handleBlur={() => []}
              className={
                screen === 'signUp' && index < 2
                  ? style.halfInput
                  : style.singleInput
              }
            />
          ))}
        </div>
        <Button
          type="submit"
          location="authentication"
          isDisable={isMainButtonDisable}
          text={screen === 'signUp' ? 'Crear cuenta' : 'Iniciar sesión'}
          onClickHandler={submitForm}
        />
      </form>
    </main>
  );
}
