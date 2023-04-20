import React, { useState, useRef, useEffect, useReducer } from 'react';

import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import { createGroupInputData, days } from './createGroupData';
import { inputRules } from './inputRules';

import styles from './CreateGroupFom.module.css';

const query = [
  { id: 1, name: 'Mathematics' },
  { id: 2, name: 'Physics' },
  { id: 3, name: 'Chemistry' },
  { id: 4, name: 'Biology' },
  { id: 5, name: 'Computer Science' },
  { id: 6, name: 'English' },
  { id: 7, name: 'History' },
  { id: 8, name: 'Geography' },
  { id: 9, name: 'Art' },
  { id: 10, name: 'Music' },
  { id: 11, name: 'Physical Education' },
  { id: 12, name: 'Social Studies' },
  { id: 13, name: 'Environmental Science' },
  { id: 14, name: 'Foreign Language' },
  { id: 15, name: 'Health Education' },
  { id: 16, name: 'Economics' },
  { id: 17, name: 'Psychology' },
  { id: 18, name: 'Sociology' },
  { id: 19, name: 'Political Science' },
  { id: 20, name: 'Philosophy' },
];

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
  (acc: { [key: string]: string | { id: number; name: string } }, { id }) => {
    if (id === 'subject') {
      acc[id] = { id: NaN, name: '' };
    } else if (id === 'days') {
      days.forEach((day) => {
        acc[day] = 'off';
      });
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
  const [classes, setClasses] = useState<typeof query>([]);
  // eslint-disable-next-line
  const [filteredClasses, setFilteredClasses] = useState<typeof query>([]);

  const [isListOpen, setIsListOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  let timeOutId: NodeJS.Timeout;

  // eslint-disable-next-line
  const [inputValues, dispatch] = useReducer(
    inputValuesReducer,
    INPUT_VALUES_INITIAL
  );

  const [inputErrors, dispatchError] = useReducer(
    inputErrorsReducer,
    INPUT_ERRORES_INITIAL
  );

  const lastInputFocusableEl = useRef<HTMLInputElement>(null);
  const submitFocusableEl = useRef<HTMLButtonElement>(null);
  const autoComplete = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setClasses(query);
    setFilteredClasses(query);
  }, []);

  const checkFormValidation = () => {
    const errors = Object.values(inputErrors);

    for (let i = 0; i < errors.length; i += 1) {
      if (errors[i] !== 'Hecho') {
        setIsSubmitDisabled(true);
        return;
      }
    }

    if (
      inputValues.L === 'off' &&
      inputValues.M === 'off' &&
      inputValues.X === 'off' &&
      inputValues.J === 'off' &&
      inputValues.V === 'off'
    ) {
      setIsSubmitDisabled(true);
      return;
    }

    setIsSubmitDisabled(false);
  };

  useEffect(() => {
    checkFormValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputErrors,
    inputValues.L,
    inputValues.M,
    inputValues.X,
    inputValues.J,
    inputValues.V,
  ]);

  // filters autocomplete results based on user inputz
  const filterClass = (value: string) => {
    const newClass = classes.filter(
      ({ id, name }) =>
        `${id} - ${name}`.includes(value.trim()) ||
        name.includes(value.trim()) ||
        `${id}`.includes(value.trim())
    );

    setFilteredClasses(newClass);
  };

  // Updates input values every time a field changes
  const onChangeHandler = (id: string, value: string) => {
    setIsSubmitDisabled(true);
    if (inputErrors[id])
      dispatchError({ type: 'UPDATE_ERRORS', payload: { [id]: '' } });

    if (id === 'subject') {
      filterClass(value);
    }
    if (days.includes(id)) {
      const newState = inputValues[id] === 'off' ? 'on' : 'off';
      dispatch({ type: 'UPDATE_VALUES', payload: { [id]: newState } });
    } else {
      dispatch({ type: 'UPDATE_VALUES', payload: { [id]: value } });
    }
  };

  const onCheckRules = (
    id: string,
    value: string | { id: number; name: string }
  ) => {
    const rule = inputRules.find((r) => r.id === id);
    let validationResult = '';
    if (rule) {
      if (id === 'endTime')
        validationResult = rule.validate(value, inputValues.startTime);
      else validationResult = rule.validate(value);
    }

    dispatchError({
      type: 'UPDATE_ERRORS',
      payload: { [id]: validationResult },
    });

    if (
      id === 'startTime' &&
      validationResult === 'Hecho' &&
      inputErrors.endTime
    )
      onCheckRules('endTime', inputValues.endTime);
  };

  // Updates class on item click
  const selectClass = (id: number, name: string) => {
    if (autoComplete.current) autoComplete.current.value = `${id} - ${name}`;

    dispatch({
      type: 'UPDATE_VALUES',
      payload: { subject: { id, name } },
    });

    if (inputErrors.subject) {
      dispatchError({
        type: 'UPDATE_ERRORS',
        payload: { subject: '' },
      });
    }

    setIsListOpen(false);
  };

  const onBlurHandler = () => {
    timeOutId = setTimeout(() => {
      setIsListOpen(false);
      onCheckRules('subject', inputValues.subject);
    });
  };

  const onFocusHandler = () => {
    clearTimeout(timeOutId);
  };

  // Closes autocomplete list on tab press
  const skipAutocomplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') setIsListOpen(false);
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
              placeholder={inputData.placeholder}
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
              handleBlur={() => { }}
            />
            {isListOpen && (
              <ul className={styles['autocomplete-list']}>
                {filteredClasses.map(({ id, name }) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                  <li key={id} onClick={() => selectClass(id, name)}>
                    {`${id} - ${name}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'days':
        return (
          <div key={inputData.id} className={styles.singleInput}>
            <legend>{inputData.label}</legend>
            <div className={styles['day-buttons']}>
              {days.map((day) => (
                <Button
                  className={inputValues[day] === 'on' ? styles.selected : ''}
                  key={day}
                  location="createGroup"
                  text={day}
                  onClickHandler={() => onChangeHandler(day, 'off')}
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
            className={`${styles.button} ${inputData.id === 'startTime' || inputData.id === 'endTime'
              ? styles.halfInput
              : styles.singleInput
              }`}
            value={inputValues[inputData.id] as string}
            placeholder={inputData.placeholder}
            label={inputData.label}
            type={inputData.type}
            id={inputData.id}
            ref={index === createGroupInputData.length - 1 ? lastInputFocusableEl : null}
            error={inputErrors[inputData.id]}
            required
            handleChange={onChangeHandler}
            handleBlur={onCheckRules}
          />
        );
    }
  });

  return (
    <Modal lastFocusableElement={isSubmitDisabled ? lastInputFocusableEl : submitFocusableEl}>
      <form className={styles['form-container']} autoComplete="off">
        <h3>Crear Grupo</h3>
        <div className={styles['form-inputs']}>{inputFields}</div>
        <Button
          location=""
          text="Crear grupo"
          type="submit"
          isDisable={isSubmitDisabled}
          ref={submitFocusableEl}
          onClickHandler={() => { }}
        />
      </form>
    </Modal>
  );
}
