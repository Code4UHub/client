import React, { useEffect } from 'react';

import { Button } from 'components/Button/Button';

import { TestCase } from 'types/CreateQuestion/CreateQuestion';
import { QuestionHeaderType } from 'routes/createQuestion/auxFunctions';
import { correctState } from 'utils/inputRules/generalRules';
import { DebounceObject } from 'hooks/useDebounceRules';

import { ReactComponent as DeleteIcon } from './delete.svg';
import style from './CodeConfiguration.module.css';

type Props = {
  options: TestCase[];
  changeOptions: Function;
  editOptions: (index: number, type: QuestionHeaderType, value: string) => void;
  debouncer: DebounceObject;
};

export default function CodeConfiguration({
  options,
  changeOptions,
  editOptions,
  debouncer,
}: Props) {
  useEffect(() => {
    debouncer.restartAllInputErrors(
      Array.from({ length: options.length }, (_value, index) => `${index}`)
    );
  }, []);

  const handleChangeOnNumberOptions = () => {
    debouncer.restartAllInputErrors(
      Array.from({ length: options.length }, (_value, index) => `${index}`)
    );
    debouncer.onCheckAllInputValues();
  };

  const getSpanErrorClass = (index: number) => {
    if (!debouncer.inputErrors[index] || debouncer.inputErrors[index] === '')
      return style['no-error'];
    if (debouncer.inputErrors[index] === correctState) return style.correct;
    return style.error;
  };

  const getHintClass = () => {
    const noErrors = Object.values(debouncer.inputErrors).every(
      (error) => error === correctState
    );
    if (noErrors) return style['passed-hint'];
    return style['missing-hint'];
  };

  const isInputError = (inputType: 'Input' | 'Output', error: string) => {
    if (error) {
      const input = error.split(':')[0];
      if (input === inputType) return style['input-Error'];
    }
    return '';
  };

  return (
    <div className={style.container}>
      <span className={style.title}>Configuración de los casos de prueba</span>
      <div className={style['hint-container']}>
        <span className={getHintClass()}>Configure todos los testcases</span>
      </div>
      <div className={style.options}>
        <h3 className={style.header}>Input</h3>
        <h3 className={style.header}>Output</h3>
        <span />
        {options.map((option, index) => (
          <React.Fragment key={`code-option-${index}`}>
            <div className={style['feedback-container']}>
              <span className={getSpanErrorClass(index)}>
                {debouncer.inputErrors[index]}
              </span>
            </div>
            <input
              type="text"
              className={`${style.input} ${isInputError(
                'Input',
                debouncer.inputErrors[index]
              )}`}
              value={option.input}
              onChange={(e) => editOptions(index, 'input', e.target.value)}
            />
            <input
              type="text"
              className={`${style.input} ${isInputError(
                'Output',
                debouncer.inputErrors[index]
              )}`}
              value={option.output}
              onChange={(e) => editOptions(index, 'output', e.target.value)}
            />
            <DeleteIcon
              key={`${index} icon`}
              className={style.icon}
              onClick={() => {
                changeOptions('delete', index);
                handleChangeOnNumberOptions();
              }}
            />
          </React.Fragment>
        ))}
        <Button
          location="addTestCase"
          text="Añadir test case"
          onClickHandler={() => {
            changeOptions('add', 0);
            debouncer.onSetError(`${options.length}`, '');
            handleChangeOnNumberOptions();
          }}
        />
      </div>
    </div>
  );
}
