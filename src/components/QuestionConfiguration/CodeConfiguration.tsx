import React from 'react';

import { Button } from 'components/Button/Button';

import { TestCase } from 'types/CreateQuestion/CreateQuestion';
import { QuestionHeaderType } from 'routes/createQuestion/createQuestion';

import { ReactComponent as DeleteIcon } from './delete.svg';
import style from './CodeConfiguration.module.css';

type Props = {
  options: TestCase[];
  changeOptions: Function;
  editOptions: (index: number, type: QuestionHeaderType, value: string) => void;
};

export default function CodeConfiguration({
  options,
  changeOptions,
  editOptions,
}: Props) {
  return (
    <div className={style.container}>
      <span className={style.title}>Configuración de los casos de prueba</span>
      <div className={style.options}>
        <h3 className={style.header}>Input</h3>
        <h3 className={style.header}>Output</h3>
        <span />
        {options.map((option, index) => (
          <>
            <input
              type="text"
              className={style.input}
              value={option.input}
              onChange={(e) => editOptions(index, 'input', e.target.value)}
            />
            <input
              type="text"
              className={style.input}
              value={option.output}
              onChange={(e) => editOptions(index, 'output', e.target.value)}
            />
            <DeleteIcon
              key={`${index} icon`}
              className={style.icon}
              onClick={() => changeOptions('delete', index)}
            />
          </>
        ))}
        <Button
          location="addTestCase"
          text="Añadir test case"
          onClickHandler={() => changeOptions('add', 0)}
        />
      </div>
    </div>
  );
}
