import React from 'react';

import { Button } from 'components/Button/Button';

import { QuestionOption } from 'types/CreateQuestion/CreateQuestion';
import { QuestionHeaderType } from 'routes/createQuestion/createQuestion';

import { ReactComponent as DeleteIcon } from './delete.svg';
import style from './MCQConfiguration.module.css';

type Props = {
  options: QuestionOption[];
  changeOptions: Function;
  editOptions: (index: number, key: QuestionHeaderType, value: string) => void;
};

export default function MCQConfiguration({
  options,
  changeOptions,
  editOptions,
}: Props) {
  return (
    <div className={style.container}>
      <span className={style.title}>Configuración las opciones</span>
      <div className={style.options}>
        {options.map((option, index) => (
          <>
            <Button
              location={option.isCorrect ? 'activeMCQ' : 'inactiveMCQ'}
              text={option.isCorrect ? '\u2713' : ''}
              onClickHandler={() => changeOptions('setAsCorrect', index)}
            />
            <input
              type="text"
              className={style.input}
              placeholder="Opción: "
              value={option.option}
              onChange={(e) => editOptions(index, 'option', e.target.value)}
            />
            <DeleteIcon
              key={`${index} icon`}
              className={style.icon}
              onClick={() => changeOptions('delete', index)}
            />
            <span />
            <input
              type="text"
              className={style.explanation}
              placeholder="Explicación:"
              value={option.explanation}
              onChange={(e) =>
                editOptions(index, 'explanation', e.target.value)
              }
            />
          </>
        ))}
        <Button
          location="addOption"
          text="Añadir opción"
          onClickHandler={() => changeOptions('add', 0)}
        />
      </div>
    </div>
  );
}
