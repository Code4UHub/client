import React, { useState, useEffect } from 'react';

import SectionHeader from 'components/SectionHeader/SectionHeader';
import { Button } from 'components/Button/Button';
import { InputField } from 'components/InputField/InputField';
import AutocompleteField from 'components/AutocompleteField/AutocompleteField';
import CodeConfiguration from 'components/QuestionConfiguration/CodeConfiguration';

import { QuestionOption, TestCase } from 'types/CreateQuestion/CreateQuestion';

// TODO: Implement errors
// import { useDebounceRules } from "hooks/useDebounceRules";

import { createQuestionInputData } from './createQuestionData';
import style from './createQuestion.module.css';

type InputType = {
  [key: string]: string | { id: string; value: string };
};

const INITIAL_INPUT_VALUES = createQuestionInputData.reduce(
  (acc: InputType, element) => {
    const { id } = element;
    if (id === 'subject' || id === 'module' || id === 'difficulty') {
      acc[id] = { id: '', value: '' };
    } else if (id === 'questionType') {
      acc[id] = 'mcq';
    } else {
      acc[id] = '';
    }
    return acc;
  },
  {}
);

const avoidReferenceObjects = (object: any) =>
  JSON.parse(JSON.stringify(object));

const emptyQuestionOption: QuestionOption = {
  option: '',
  explanation: '',
  isCorrect: false,
};
const emptyTestCase: TestCase = {
  input: '',
  output: '',
};

export default function CreateQuestion() {
  const [inputValues, setInputValues] = useState<InputType>(
    avoidReferenceObjects(INITIAL_INPUT_VALUES)
  );
  const [configuration, setConfiguration] = useState<
    (QuestionOption | TestCase)[]
  >([]);

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  useEffect(() => {
    console.log(configuration);
  }, [configuration]);

  const onChangeInputHandler = (id: string, value: string) => {
    setInputValues((current) => ({ ...current, [id]: value }));
  };
  const onChangeAutoCompleteHandler = (
    key: string,
    val: { id: string; value: string }
  ) => {
    setInputValues((current) => ({ ...current, [key]: val }));
  };
  const onChangeQuestionType = () => {
    if (inputValues.questionType === 'mcq') {
      setInputValues((current) => ({ ...current, questionType: 'code' }));
    } else {
      setInputValues((current) => ({ ...current, questionType: 'mcq' }));
    }
  };

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
      if (inputValues.questionType === 'mcq') {
        setConfiguration(updatedConfiguration as QuestionOption[]);
      } else {
        setConfiguration(updatedConfiguration as QuestionOption[]);
      }
    }
    if (action === 'setAsCorrect') {
      const updatedConfiguration = (configuration as QuestionOption[]).map(
        ({ option, explanation }, i) => ({
          option,
          explanation,
          isCorrect: i === index,
        })
      );
      setConfiguration(updatedConfiguration);
    }
  };

  const editOptions = (key: string, value: string) => {
    const [rawIndex, type] = key.split(' ');
    const index = parseInt(rawIndex, 10);
    if (inputValues.questionType === 'code') {
      const newConfiguration = configuration.map((item) => ({ ...item })); // Create a deep copy of the objects
      if (type === 'input') {
        (newConfiguration as TestCase[])[index].input = value;
      } else {
        (newConfiguration as TestCase[])[index].output = value;
      }
      setConfiguration(newConfiguration);
    } else {
      const newConfiguration = [...configuration];
      if (type === 'option') {
        (newConfiguration as QuestionOption[])[index].option = value;
      } else {
        (newConfiguration as QuestionOption[])[index].explanation = value;
      }
      setConfiguration(newConfiguration);
    }
  };

  return (
    <div className={style.container}>
      <SectionHeader title="Crear pregunta" />
      <form className={style.form}>
        <div className={style['general-configuration']}>
          {createQuestionInputData.map(({ label, type, id, width }) => {
            if (type === 'autocomplete')
              return (
                <AutocompleteField
                  key={id}
                  id={id}
                  label={label}
                  list={[
                    { id: '0', value: 'a' },
                    { id: '1', value: 'b' },
                    { id: '2', value: 'c' },
                  ]}
                  error=""
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
                  error=""
                  handleChange={onChangeInputHandler}
                  handleBlur={() => []}
                  // eslint-disable-next-line
                  required={true}
                  value="hola"
                />
              );
            return (
              <div className={`${style.controllers} ${style[width]}`}>
                <span className={style.type}>Tipo de pregunta</span>
                <div className={style['question-changers']}>
                  <Button
                    location={
                      inputValues.questionType === 'mcq'
                        ? 'onChangeQuestionActive'
                        : 'onChangeQuestion'
                    }
                    text="Opción múltiple"
                    onClickHandler={onChangeQuestionType}
                  />
                  <Button
                    location={
                      inputValues.questionType === 'code'
                        ? 'onChangeQuestionActive'
                        : 'onChangeQuestion'
                    }
                    text="Código"
                    onClickHandler={onChangeQuestionType}
                  />
                </div>
              </div>
            );
          })}
        </div>
        {inputValues.questionType === 'mcq' ? (
          <h2>Multiple choice question</h2>
        ) : (
          <CodeConfiguration
            options={configuration as TestCase[]}
            changeOptions={changeOptions}
            editOptions={(key: string, value: string) =>
              editOptions(key, value)
            }
          />
        )}
        <Button
          location="createQuestion"
          text="Crear tarea"
          onClickHandler={() => []}
        />
      </form>
    </div>
  );
}
