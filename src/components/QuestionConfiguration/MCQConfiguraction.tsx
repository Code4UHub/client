import React, { useEffect } from 'react';

import { Button } from 'components/Button/Button';

import { QuestionHeaderType } from 'routes/createQuestion/auxFunctions';
import { QuestionOption } from 'types/CreateQuestion/CreateQuestion';
import { correctState } from 'utils/inputRules/generalRules';

import { DebounceObject } from 'hooks/useDebounceRules';

import { ReactComponent as DeleteIcon } from './delete.svg';
import style from './MCQConfiguration.module.css';

type Props = {
  answer: number;
  options: QuestionOption[];
  changeOptions: Function;
  editOptions: (index: number, key: QuestionHeaderType, value: string) => void;
  debouncer: DebounceObject;
};

export default function MCQConfiguration({
  answer,
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

  const getHintClass = (type: 'set-option' | 'correct-option') => {
    if (type === 'set-option') {
      const noErrors = Object.values(debouncer.inputErrors).every(
        (error) => error === correctState
      );
      if (noErrors) return style['passed-hint'];
    }
    if (type === 'correct-option') {
      if (answer >= 0 && answer < options.length) {
        return style['passed-hint'];
      }
    }
    return style['missing-hint'];
  };

  const isInputError = (inputType: 'Opción' | 'Explicación', error: string) => {
    if (error) {
      const input = error.split(':')[0];
      if (input === inputType) return style['input-Error'];
    }
    return '';
  };

  return (
    <div className={style.container}>
      <span className={style.title}>Configuración de las opciones</span>
      <div className={style['hint-container']}>
        <span className={getHintClass('set-option')}>
          Configure todas las opciones
        </span>
      </div>
      <div className={style['hint-container']}>
        <span className={getHintClass('correct-option')}>
          No olvide declarar la opción correcta
        </span>
      </div>
      <div className={style.options}>
        {options.map((option, index) => (
          <React.Fragment key={`option-${index}`}>
            <div className={style['feedback-container']}>
              <span className={getSpanErrorClass(index)}>
                {debouncer.inputErrors[index]}
              </span>
            </div>
            <Button
              location={answer === index ? 'activeMCQ' : 'inactiveMCQ'}
              text={answer === index ? '\u2713' : ''}
              onClickHandler={() => changeOptions('setAsCorrect', index)}
            />
            <input
              type="text"
              className={`${style.input} ${isInputError(
                'Opción',
                debouncer.inputErrors[index]
              )}`}
              placeholder="Opción: "
              value={option.option}
              onChange={(e) => {
                editOptions(index, 'option', e.target.value);
                debouncer.onRestartIdValue(`${index}`);
              }}
            />
            <DeleteIcon
              className={style.icon}
              onClick={() => {
                changeOptions('delete', index);
                handleChangeOnNumberOptions();
              }}
            />
            <span />
            <input
              type="text"
              className={`${style.explanation} ${isInputError(
                'Explicación',
                debouncer.inputErrors[index]
              )}`}
              placeholder="Explicación:"
              value={option.explanation}
              onChange={(e) => {
                editOptions(index, 'explanation', e.target.value);
                debouncer.onRestartIdValue(`${index}`);
              }}
            />
          </React.Fragment>
        ))}
        <Button
          location="addOption"
          text="Añadir opción"
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
