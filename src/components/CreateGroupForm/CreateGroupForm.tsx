import React, { useState, useRef, useEffect } from 'react';
import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';

import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import NoResultsError from 'components/NoResultsError/NoResultsError';

import { useDebounceRules } from 'hooks/useDebounceRules';

import { correctState } from 'utils/inputRules/generalRules';
import { createClass, getSubjects } from 'utils/db/db.utils';

import { Subject } from 'types/Subject/Subject';
import { days } from 'types/Days/Days';
import { ClassRequest } from 'types/Class/Class';

import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { updateToast, TOAST_GENERAL_ERRORS } from 'store/toast/toastSlice';
import { updateSubjects } from 'store/subject/subjectSlice';

import { createGroupInputData } from './createGroupData';
import styles from './CreateGroupFom.module.css';

const INPUT_ERRORS_KEYS = createGroupInputData
  .filter(({ id }) => id !== 'days')
  .map((element) => element.id);

type InputValuesType = {
  [key: string]:
    | string
    | { id: string; name: string }
    | { dayName: string; dayVal: string }[];
};

const INPUT_VALUES_INITIAL = createGroupInputData.reduce(
  (acc: InputValuesType, { id }) => {
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

export default function CreateGroupForm() {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  // To avoid passing value by reference, since we have nested objects
  const [inputValues, setInputValues] = useState<InputValuesType>(
    JSON.parse(JSON.stringify(INPUT_VALUES_INITIAL))
  );
  const { inputErrors, onRestartIdValue, restartAllInputErrors } =
    useDebounceRules(inputValues, 'createGroup');

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.currentUser);
  const subjects = useSelector((state: RootState) => state.subject.subjects);

  let timeOutId: NodeJS.Timeout;

  const lastInputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const autoComplete = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFormSubmitted) setIsFormSubmitted(false);
  }, [isFormSubmitted]);

  useEffect(() => {
    setFilteredSubjects(subjects);
  }, [subjects, setFilteredSubjects]);

  useEffect(() => {
    restartAllInputErrors(INPUT_ERRORS_KEYS);
    // eslint-disable-next-line
  }, []);

  const resetValues = () => {
    setFilteredSubjects(subjects);
    // To avoid passing by reference
    setInputValues(JSON.parse(JSON.stringify(INPUT_VALUES_INITIAL)));
    restartAllInputErrors(INPUT_ERRORS_KEYS);
  };

  const checkFormValidation = () => {
    const isCorrect = Object.values(inputErrors).every(
      (errorMessage) => errorMessage === correctState
    );
    if (!isCorrect) {
      setIsSubmitDisabled(true);
      return;
    }

    const noActiveDays = (
      inputValues.days as { dayName: string; dayVal: string }[]
    ).every(({ dayVal }) => dayVal === 'off');

    if (noActiveDays) {
      setIsSubmitDisabled(true);
      return;
    }

    setIsSubmitDisabled(false);
  };

  useEffect(() => {
    checkFormValidation();
    // eslint-disable-next-line
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
    // Days doesn't have an inputError, so no need to track it down
    if (id !== 'days') {
      onRestartIdValue(id);
    }
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
      setInputValues((current) => ({ ...current, [id]: newDays }));
    } else {
      setInputValues((current) => ({ ...current, [id]: value as string }));
    }
  };

  // Updates subject on item click
  const selectSubject = (id: string, name: string) => {
    const subjectValue = `${id} - ${name}`;

    if (autoComplete.current) autoComplete.current.value = subjectValue;

    setInputValues((current) => ({ ...current, subject: { id, name } }));

    if (inputErrors.subject) {
      onRestartIdValue('subject');
    }
    filterSubjects(subjectValue);
    setIsListOpen(false);
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
      dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
    }
    resetValues();
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
            onBlur={() => []}
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
              (subjects.length > 0 ? (
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
            handleBlur={() => []}
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
