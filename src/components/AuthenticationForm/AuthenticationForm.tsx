import React, { useState, useEffect } from 'react';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import { toastTime, Toast } from 'components/Toast/Toast';

import { StudentPromise, TeacherPromise } from 'types/User/User';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/user/userSlice';

import { createUser, logUser } from 'utils/db/db.utils';

import { inputData } from './inputData';
import { inputRules, correctState } from './inputRules';

import style from './AuthenticationForm.module.css';

type Props = {
  screen: 'signIn' | 'signUp';
};

function toTitleCase(sentence: string) {
  if (sentence) {
    const words = sentence.toLowerCase().split(' ');
    return words.map((word) => 
      word.replace(word[0], word[0].toUpperCase())
    ).join(' ');
  }
  return "";
}

export default function AuthenticationForm({ screen }: Props) {
  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [backendError, setBackendError] = useState<{ [key: string]: string }>({
    title: "",
    message: "",
  });
  const hasBackendError = backendError.title !== "" && backendError.message !== "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Checks every inputError and if one has an error message, you can't signin/signup
  const isMainButtonDisable = !Object.values(inputErrors).every(
    (value: string) => value === correctState
  );

  // Update values of inputs and errors, according to the screen
  useEffect(() => {
    setInputErrors({});
    inputData[screen].forEach(({ id }) => {
      setInputErrors((inputE) => ({ ...inputE, [id]: '' }));
    });
    setInputValues({});
    inputData[screen].forEach(({ id }) => {
      setInputValues((value) => ({ ...value, [id]: '' }));
    });
  }, [screen]);

  // Keep record of values and restart errors as a value changes
  const onChangeHandler = (id: string, value: string) => {
    setInputValues((storedValues) => ({ ...storedValues, [id]: value }));
    setInputErrors((previousErrors) => ({ ...previousErrors, [id]: '' }));
    // If password changes, passwordConfirmation validation status will change. Restart it
    if (id === 'password')
      setInputErrors((previousErrors) => ({
        ...previousErrors,
        passwordConfirmation: '',
      }));
  };

  // Update errors according to rules
  const onCheckRules = (id: string, value: string) => {
    const rule = inputRules.find((r) => r.id === id);
    let validationResult = '';
    if (rule) {
      switch (id) {
        case 'passwordConfirmation':
          validationResult = rule.validate(value, inputValues.password);
          break;
        default:
          validationResult = rule.validate(value);
          break;
      }
      setInputErrors((previousErrors) => ({
        ...previousErrors,
        [id]: validationResult,
      }));
    }
  };

  const turnOffToast = () => {
    setTimeout(() => {
      setBackendError({
        title: "",
        message: ""
      });
    }, toastTime)
  }

  const submitForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let user;

      const studentRegex = /^[aA]0/g;
      const userName = inputValues.email.split('@')[0];
      if (screen === 'signIn') {
        const { email, passwordLogin } = inputValues;
        if (studentRegex.test(userName)) {
          user = await logUser<StudentPromise>({
            email: email.toLowerCase(),
            password: passwordLogin,
          })
        } else {
          user = await logUser<TeacherPromise>({
            email: email.toLowerCase(),
            password: passwordLogin,
          })
        }
      } else {
        const { firstName, lastName, email, password } = inputValues;

        if (studentRegex.test(userName)) {
          user = await createUser<StudentPromise>({
            first_name: toTitleCase(firstName),
            last_name: toTitleCase(lastName),
            email: email.toLowerCase(),
            password,
            student_id: userName,
          });
        } else {
          user = await createUser<TeacherPromise>({
            first_name: toTitleCase(firstName),
            last_name: toTitleCase(lastName),
            email: email.toLowerCase(),
            password,
            teacher_id: userName,
          });
        }
      }
      console.log(user.status)
      if (typeof user.data !== 'string') {
        dispatch(updateUser(user.data));
        navigate('/');
      } else {
        console.log(user);
        setBackendError({title: user.status, message: user.data});
        turnOffToast();
      }
    } catch (error) {
      console.log(error);
      setBackendError({title: "Error", message: "Intente más tarde"});
      turnOffToast();
    }
  };

  return (
    <main className={style.form}>
      {hasBackendError && 
        <Toast 
          title={backendError.title} 
          message={backendError.message} 
          type="error"
        />
      }
      <form>
        <h1 className={style['form-title']}>
          {screen === 'signUp'
            ? 'Crea tu cuenta'
            : 'Inicia sesión con tu cuenta'}
        </h1>
        <div className={style.inputs}>
          {inputData[screen].map((field, index: number) => (
            <InputField
              key={`${screen}${field.id}`}
              value={inputValues[field.id]}
              label={field.label}
              type={field.type}
              id={field.id}
              error={inputErrors[field.id]}
              required
              handleChange={onChangeHandler}
              handleBlur={onCheckRules}
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