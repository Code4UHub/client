import React, { useState, useRef, useEffect, useReducer } from 'react';
import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';

import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import NoResultsError from 'components/NoResultsError/NoResultsError';

import { correctState } from 'utils/inputRules/generalRules';
import { inputRules } from 'utils/inputRules/groupRules';

import { Subject } from 'types/Subject/Subject';
import { days } from 'types/Days/Days';
import { ClassRequest } from 'types/Class/Class';
import { createClass, getSubjects } from 'utils/db/db.utils';

import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { updateToast, TOAST_GENERAL_ERRORS } from 'store/toast/toastSlice';
import { updateSubjects } from 'store/subject/subjectSlice';

import { createGroupInputData } from './createGroupData';
import styles from './CreateGroupFom.module.css';

const INPUT_ERRORES_INITIAL = createGroupInputData.reduce(
  (acc: { [key: string]: string }, { id }) => {
    if (id !== 'days') {
      acc[id] = '';
    }
    return acc;
  },
  {}
);

const inputErrorsReducer = (
  state: typeof INPUT_ERRORES_INITIAL,
  action: { type: string; payload: {} }
): typeof INPUT_ERRORES_INITIAL => {
  const { type, payload } = action;
  switch (type) {
    case 'UPDATE_ERRORS':
      return { ...state, ...payload };

    default:
      throw Error('Type not defined');
  }
};

const INPUT_VALUES_INITIAL = createGroupInputData.reduce(
  (
    acc: {
      [key: string]:
        | string
        | { id: string; name: string }
        | { dayName: string; dayVal: string }[];
    },
    { id }
  ) => {
    if (id === 'subject') {
      acc[id] = { id: '', name: '' };
    } else if (id === 'days') {
      acc.days = days.map((day) => ({
        dayName: day,
        dayVal: 'off',
      }));
    } else {
      acc[id] = '';
    }
    return acc;
  },
  {}
);

const inputValuesReducer = (
  state: typeof INPUT_VALUES_INITIAL,
  action: { type: string; payload: {} }
): typeof INPUT_VALUES_INITIAL => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_VALUES':
      return { ...state, ...payload };

    default:
      throw Error('Type not defined');
  }
};

export default function CreateGroupForm() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.currentUser);
  const subjects = useSelector((state: RootState) => state.subject.subjects);

  let timeOutId: NodeJS.Timeout;

  const [inputValues, dispatchInputValues] = useReducer(
    inputValuesReducer,
    JSON.parse(JSON.stringify(INPUT_VALUES_INITIAL))
  );

  const [inputErrors, dispatchError] = useReducer(
    inputErrorsReducer,
    INPUT_ERRORES_INITIAL
  );

  const lastInputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const autoComplete = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFormSubmitted) setIsFormSubmitted(false);
  }, [isFormSubmitted]);

  useEffect(() => {
    setFilteredSubjects(subjects);
  }, [subjects, setFilteredSubjects]);

  const resetValues = () => {
    setFilteredSubjects(subjects);
    dispatchInputValues({
      type: 'UPDATE_VALUES',
      payload: JSON.parse(JSON.stringify(INPUT_VALUES_INITIAL)),
    });
    dispatchError({ type: 'UPDATE_ERRORS', payload: INPUT_ERRORES_INITIAL });
  };

  const checkFormValidation = () => {
    const errors = Object.values(inputErrors);

    for (let i = 0; i < errors.length; i += 1) {
      if (errors[i] !== correctState) {
        setIsSubmitDisabled(true);
        return;
      }
    }

    const checkActiveDays = (
      inputValues.days as { dayName: string; dayVal: string }[]
    ).every(({ dayVal }) => dayVal === 'off');

    if (checkActiveDays) {
      setIsSubmitDisabled(true);
      return;
    }

    setIsSubmitDisabled(false);
  };

  useEffect(() => {
    checkFormValidation();
  }, [inputErrors, inputValues]);

  // filters autocomplete results based on user input
  const filterSubjects = (value: string) => {
    const newSubjects = subjects.filter(
      ({ subject_id, subject_name }) =>
        `${subject_id} - ${subject_name}`.includes(value.trim()) ||
        subject_name.includes(value.trim()) ||
        `${subject_id}`.includes(value.trim())
    );

    setFilteredSubjects(newSubjects);
  };

  // Updates input values every time a field changes
  const onChangeHandler = (id: string, value: string | number) => {
    setIsSubmitDisabled(true);
    if (inputErrors[id])
      dispatchError({ type: 'UPDATE_ERRORS', payload: { [id]: '' } });

    if (id === 'subject') {
      filterSubjects(value as string);
    }

    if (id === 'days') {
      const newDays = inputValues.days;

      const selectedDayVal = (newDays as { dayName: string; dayVal: string }[])[
        value as number
      ].dayVal;

      (newDays as { dayName: string; dayVal: string }[])[
        value as number
      ].dayVal = selectedDayVal === 'on' ? 'off' : 'on';

      dispatchInputValues({
        type: 'UPDATE_VALUES',
        payload: { [id]: newDays },
      });
    } else {
      dispatchInputValues({ type: 'UPDATE_VALUES', payload: { [id]: value } });
    }
  };

  const onCheckRules = (
    id: string,
    value: string | { id: string; name: string }
  ) => {
    const rule = inputRules.find((r) => r.id === id);
    let validationResult = '';
    if (rule) {
      if (id === 'end_time')
        validationResult = rule.validate(value, inputValues.start_time);
      else validationResult = rule.validate(value);
    }

    dispatchError({
      type: 'UPDATE_ERRORS',
      payload: { [id]: validationResult },
    });

    if (
      id === 'start_time' &&
      validationResult === correctState &&
      inputErrors.end_time
    )
      onCheckRules('end_time', inputValues.end_time as string);
  };

  // Updates subject on item click
  const selectSubject = (id: string, name: string) => {
    const subjectValue = `${id} - ${name}`;

    if (autoComplete.current) autoComplete.current.value = subjectValue;

    dispatchInputValues({
      type: 'UPDATE_VALUES',
      payload: { subject: { id, name } },
    });

    if (inputErrors.subject) {
      dispatchError({
        type: 'UPDATE_ERRORS',
        payload: { subject: '' },
      });
    }

    filterSubjects(subjectValue);
    setIsListOpen(false);
  };

  const onBlurHandler = () => {
    timeOutId = setTimeout(() => {
      setIsListOpen(false);
      onCheckRules(
        'subject',
        inputValues.subject as { id: string; name: string }
      );
    });
  };

  const onFocusHandler = () => {
    clearTimeout(timeOutId);
  };

  // Closes autocomplete list on tab press
  const skipAutocomplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') setIsListOpen(false);
  };

  const createClassHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      const data = await createClass(
        inputValues as ClassRequest,
        user?.id as string,
        user?.authToken as string
      );

      if (data.status === 'success') {
        dispatch(
          updateToast({
            title: 'Success',
            message: 'La clase ha sido creada exitosamente',
            type: 'success',
          })
        );
        setIsFormSubmitted(true);
      } else {
        dispatch(
          updateToast({
            title: data.status,
            message: data.data,
            type: 'error',
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
    }

    dispatch(removeLoading());
  };

  const handleRetrySubjects = async () => {
    const data = await getSubjects(user?.authToken as string);

    if (data.status === 'success') {
      dispatch(updateSubjects(data.data as Subject[]));
      autoComplete.current?.focus();
    }
  };

  // Renders inputfield based on inputData
  const inputFields = createGroupInputData.map((inputData, index) => {
    switch (inputData.id) {
      case 'subject':
        return (
          <div
            key={inputData.id}
            className={`${styles.autocomplete}`}
            tabIndex={-1}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
          >
            <InputField
              ref={autoComplete}
              className={`${styles.button}`}
              value=""
              label={inputData.label}
              type={inputData.type}
              id={inputData.id}
              error={inputErrors[inputData.id]}
              required
              handleFocus={() => setIsListOpen(true)}
              handleChange={onChangeHandler}
              handleKeyDown={skipAutocomplete}
              handleBlur={() => {}}
            />
            {isListOpen &&
              (subjects.length > 1 ? (
                <ul className={styles['autocomplete-list']}>
                  {filteredSubjects.map(({ subject_id, subject_name }) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <li
                      key={subject_id}
                      onClick={() => selectSubject(subject_id, subject_name)}
                    >
                      {`${subject_id} - ${subject_name}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <NoResultsError retryHandler={handleRetrySubjects} />
              ))}
          </div>
        );
      case 'days':
        return (
          <div
            key={inputData.id}
            className={styles.singleInput}
          >
            <legend>{inputData.label}</legend>
            <div className={styles['day-buttons']}>
              {days.map((day, dayIndex) => (
                <Button
                  key={day}
                  location={
                    (inputValues.days as { dayName: string; dayVal: string }[])[
                      dayIndex
                    ].dayVal === 'on'
                      ? 'createGroup-active'
                      : 'createGroup-noactive'
                  }
                  text={day}
                  onClickHandler={() => onChangeHandler('days', dayIndex)}
                  isDisable={false}
                />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <InputField
            key={inputData.id}
            className={`${styles.button} ${
              inputData.id === 'start_time' || inputData.id === 'end_time'
                ? styles.halfInput
                : styles.singleInput
            }`}
            value={inputValues[inputData.id] as string}
            label={inputData.label}
            type={inputData.type}
            id={inputData.id}
            error={inputErrors[inputData.id]}
            required
            handleChange={onChangeHandler}
            handleBlur={onCheckRules}
            ref={
              index === createGroupInputData.length - 1 ? lastInputRef : null
            }
          />
        );
    }
  });

  return (
    <Modal
      title="Crear Grupo"
      open={isFormSubmitted}
      onClose={resetValues}
      lastFocusableElement={isSubmitDisabled ? lastInputRef : submitRef}
    >
      <form
        className={styles['form-container']}
        autoComplete="off"
      >
        <h3>Crear Grupo</h3>
        <div className={styles['form-inputs']}>{inputFields}</div>
        <Button
          location="createGroup-submit"
          text="Crear grupo"
          type="submit"
          isDisable={isSubmitDisabled}
          onClickHandler={createClassHandler}
          ref={submitRef}
        />
      </form>
    </Modal>
  );
}
