import React, { useEffect, useState, useMemo, useRef } from 'react';

import SectionHeader from 'components/SectionHeader/SectionHeader';
import { Button } from 'components/Button/Button';
import { InputField } from 'components/InputField/InputField';
import AutocompleteField from 'components/AutocompleteField/AutocompleteField';
import CodeConfiguration from 'components/QuestionConfiguration/CodeConfiguration';
import MCQConfiguration from 'components/QuestionConfiguration/MCQConfiguraction';

import { useSelector, useDispatch } from 'react-redux';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { updateToast } from 'store/toast/toastSlice';
import { RootState } from 'store/store';

import { QuestionOption, TestCase } from 'types/CreateQuestion/CreateQuestion';
import { SubjectModule } from 'types/SubjectModule/SubjectModule';
import { Subject } from 'types/Subject/Subject';

import { getSubjectModules, createQuestion } from 'utils/db/db.utils';
import { correctState } from 'utils/inputRules/generalRules';

import { useLoaderData } from 'react-router-dom';

import { useDebounceRules } from 'hooks/useDebounceRules';

import {
  QuestionHeaderType,
  INITIAL_INPUT_VALUES,
  avoidReferenceObjects,
  emptyQuestionOption,
  emptyTestCase,
  InputType,
} from './auxFunctions';

import { createQuestionInputData } from './createQuestionData';
import style from './createQuestion.module.css';

export default function CreateQuestion() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const subjects = useLoaderData() as Subject[];
  const [modules, setModules] = useState<SubjectModule[]>([]);

  const [inputValues, setInputValues] = useState<InputType>(
    avoidReferenceObjects(INITIAL_INPUT_VALUES)
  );
  const [configuration, setConfiguration] = useState<
    (QuestionOption | TestCase)[]
  >([{ ...emptyQuestionOption }, { ...emptyQuestionOption }]);
  const [MCQanswer, setMCQAnswer] = useState(-1);
  const [autoCompleteKey, setAutocompleteKey] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);

  const generalDebounce = useDebounceRules(inputValues, 'createQuestion');
  // eslint-disable-next-line
  const mcqDebounce = useDebounceRules({ ...configuration }, 'mcqConfig');
  // eslint-disable-next-line
  const codeDebounce = useDebounceRules({ ...configuration }, 'codeConfig');

  useEffect(() => {
    // To restart input Errors
    const headers = createQuestionInputData
      .filter((item) => item.id !== 'questionType')
      .map(({ id }) => id);
    generalDebounce.restartAllInputErrors(headers);
  }, []);

  const checkCanCreate = useMemo((): boolean => {
    const isGeneralCorrect = Object.values(generalDebounce.inputErrors).every(
      (error) => error === correctState
    );
    const isConfigCorrect =
      inputValues.questionType === 'mcq'
        ? Object.values(mcqDebounce.inputErrors).every(
            (error) => error === correctState
          ) &&
          MCQanswer > -1 &&
          MCQanswer < configuration.length &&
          configuration.length > 1
        : Object.values(codeDebounce.inputErrors).every(
            (error) => error === correctState
          ) && configuration.length > 0;

    return isGeneralCorrect && isConfigCorrect;
  }, [
    generalDebounce.inputErrors,
    mcqDebounce.inputErrors,
    MCQanswer,
    codeDebounce.inputErrors,
  ]);
  const canCreateQuestion = checkCanCreate;

  const getAutocompleteList = (id: string) => {
    if (id === 'subject') {
      return subjects.map(({ subject_id, subject_name }) => ({
        id: subject_id,
        value: `${subject_id} - ${subject_name}`,
      }));
    }
    if (id === 'module') {
      return modules.map(({ module_id, title }) => ({
        id: `${module_id}`,
        value: title,
      }));
    }

    return [
      { id: '1', value: 'Fácil' },
      { id: '2', value: 'Medio' },
      { id: '3', value: 'Difícil' },
    ];
  };

  // Update values on general form
  const onChangeInputHandler = (id: string, value: string) => {
    setInputValues((current) => ({ ...current, [id]: value }));
    generalDebounce.onRestartIdValue(id);
  };

  // Special for autocomplete on general form
  const onChangeAutoCompleteHandler = (
    key: string,
    val: { id: string; value: string }
  ) => {
    generalDebounce.onRestartIdValue(key);
    if (key === 'subject') {
      // Restart module selection as it can't remain the same between subjects
      setInputValues((current: InputType) => ({
        ...current,
        [key]: val,
        module: { id: '', value: '' },
      }));
      generalDebounce.onRestartIdValue('module');
    }
    setInputValues((current: InputType) => ({ ...current, [key]: val }));
    // In case the option is the same as one of the list, set value as correct
    const list = getAutocompleteList(key);
    const isCorrect = list.reduce((result, current) => {
      if (current.id === val.id && current.value === val.value) {
        return true;
      }
      return result;
    }, false);
    if (isCorrect) generalDebounce.onPassError(key);
    else generalDebounce.onSetError(key, 'Elija una opción');
  };

  // Get modules associated with the chosen subject
  useEffect(() => {
    const fetchModules = async () => {
      dispatch(setLoading());
      const { data } = await getSubjectModules(
        user?.authToken as string,
        (inputValues.subject as { id: string; value: string }).id
      );
      dispatch(removeLoading());
      setModules(data as SubjectModule[]);
    };
    if ((inputValues.subject as { id: string; value: string }).id) {
      fetchModules();
    }
  }, [inputValues.subject, user?.authToken, dispatch]);

  // Change current question type and restart options to have only one empty option
  const onChangeQuestionType = (caller: 'code' | 'mcq') => {
    if (inputValues.questionType === 'mcq' && caller !== 'mcq') {
      setConfiguration([{ ...emptyTestCase }]);
      setInputValues((current: InputType) => ({
        ...current,
        questionType: 'code',
      }));
      setMCQAnswer(-1);
    }
    if (inputValues.questionType === 'code' && caller !== 'code') {
      setConfiguration([
        { ...emptyQuestionOption },
        { ...emptyQuestionOption },
      ]);
      setInputValues((current: InputType) => ({
        ...current,
        questionType: 'mcq',
      }));
      setMCQAnswer(-1);
    }
  };

  // Do a modification according to type and index
  const changeOptions = (
    action: 'add' | 'delete' | 'setAsCorrect',
    index: number
  ) => {
    if (action === 'add') {
      if (inputValues.questionType === 'mcq') {
        setConfiguration((current) => [
          ...(current as QuestionOption[]),
          emptyQuestionOption,
        ]);
      }
      if (inputValues.questionType === 'code') {
        setConfiguration((current) => [
          ...(current as TestCase[]),
          emptyTestCase,
        ]);
      }
    }
    if (action === 'delete') {
      const updatedConfiguration = [...configuration];
      updatedConfiguration.splice(index, 1);
      if (inputValues.questionType === 'mcq' && configuration.length > 2) {
        setConfiguration(updatedConfiguration as QuestionOption[]);
        if (index === MCQanswer) setMCQAnswer(-1);
      }
      if (inputValues.questionType === 'code' && configuration.length > 1) {
        setConfiguration(updatedConfiguration as TestCase[]);
      }
    }
    if (action === 'setAsCorrect') {
      setMCQAnswer(index);
    }
  };

  // To modify the actual values of the options
  const editOptions = (
    index: number,
    type: QuestionHeaderType,
    value: string
  ) => {
    const newConfiguration = configuration.map((item) => ({ ...item }));
    if (type === 'input' || type === 'output') {
      (newConfiguration as TestCase[])[index][type] = value;
    }
    if (type === 'option' || type === 'explanation') {
      (newConfiguration as QuestionOption[])[index][type] = value;
    }
    setConfiguration(newConfiguration);
  };

  const onCreate = async () => {
    dispatch(setLoading());
    const response = await createQuestion(
      user?.authToken as string,
      inputValues,
      configuration,
      MCQanswer,
      user?.first_name as string,
      user?.last_name as string
    );
    dispatch(
      updateToast({
        type: response.status,
        title: response.status,
        message:
          response.status === 'success'
            ? 'Pregunta creada'
            : 'Intente nuevamente',
      })
    );
    dispatch(removeLoading());
    setInputValues(avoidReferenceObjects(INITIAL_INPUT_VALUES));
    setConfiguration([{ ...emptyQuestionOption }, { ...emptyQuestionOption }]);
    setMCQAnswer(-1);
    const headers = createQuestionInputData
      .filter((item) => item.id !== 'questionType')
      .map(({ id }) => id);
    generalDebounce.restartAllInputErrors(headers);
    mcqDebounce.restartAllInputErrors(['0', '1']);
    codeDebounce.restartAllInputErrors(['0']);
    if (formRef.current) {
      formRef.current.reset();
    }
    setAutocompleteKey((current) => current + 1);
  };

  return (
    <div className={style.container}>
      <SectionHeader title="Crear pregunta" />
      <form
        className={style.form}
        autoComplete="off"
        ref={formRef}
      >
        <div className={style['general-configuration']}>
          {createQuestionInputData.map(({ label, type, id, width }) => {
            if (type === 'autocomplete')
              return (
                <AutocompleteField
                  key={`${id} ${autoCompleteKey}`}
                  id={id}
                  label={label}
                  list={getAutocompleteList(id)}
                  error={generalDebounce.inputErrors[id]}
                  handleChange={(args: { id: string; value: string }) =>
                    onChangeAutoCompleteHandler(id, args)
                  }
                  handleBlur={() => []}
                  className={style[width]}
                />
              );
            if (type === 'text')
              return (
                <InputField
                  key={id}
                  id={id}
                  type={type}
                  label={label}
                  className={style[width]}
                  error={generalDebounce.inputErrors[id]}
                  handleChange={onChangeInputHandler}
                  handleBlur={() => []}
                  // eslint-disable-next-line
                  required={true}
                  value=""
                />
              );
            return (
              <div
                className={`${style.controllers} ${style[width]}`}
                key={id}
              >
                <span className={style.type}>Tipo de pregunta</span>
                <div className={style['question-changers']}>
                  <Button
                    location={
                      inputValues.questionType === 'mcq'
                        ? 'onChangeQuestionActive'
                        : 'onChangeQuestion'
                    }
                    text="Opción múltiple"
                    onClickHandler={() => onChangeQuestionType('mcq')}
                  />
                  <Button
                    location={
                      inputValues.questionType === 'code'
                        ? 'onChangeQuestionActive'
                        : 'onChangeQuestion'
                    }
                    text="Código"
                    onClickHandler={() => onChangeQuestionType('code')}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {inputValues.questionType === 'mcq' ? (
          <MCQConfiguration
            answer={MCQanswer}
            options={configuration as QuestionOption[]}
            changeOptions={changeOptions}
            debouncer={mcqDebounce}
            editOptions={(
              index: number,
              type: QuestionHeaderType,
              value: string
            ) => editOptions(index, type, value)}
          />
        ) : (
          <CodeConfiguration
            options={configuration as TestCase[]}
            changeOptions={changeOptions}
            debouncer={codeDebounce}
            editOptions={(
              index: number,
              type: QuestionHeaderType,
              value: string
            ) => editOptions(index, type, value)}
          />
        )}
        <div className={style['main-button']}>
          <Button
            location="createQuestion"
            text="Crear Pregunta"
            isDisable={!canCreateQuestion}
            onClickHandler={onCreate}
          />
        </div>
      </form>
    </div>
  );
}
