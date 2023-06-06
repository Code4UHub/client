import React from 'react';

import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';

import { TestCase } from 'types/CreateQuestion/CreateQuestion';

import { ReactComponent as DeleteIcon } from './delete.svg';
import style from './CodeConfiguration.module.css';

type Props = {
  options: TestCase[];
  changeOptions: Function;
  editOptions: (key: string, value: string) => void;
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
        {options.map((option, index) => {
          console.log(option);
          return (
            <>
              <InputField
                label=""
                id={`${index} input`}
                key={`${index} input`}
                type="text"
                error=""
                value={option.input}
                className={style.input}
                // eslint-disable-next-line
                required={true}
                handleBlur={() => []}
                handleChange={editOptions}
              />
              <InputField
                label=""
                id={`${index} output`}
                key={`${index} output`}
                type="text"
                error=""
                value={option.output}
                className={style.input}
                // eslint-disable-next-line
                required={true}
                handleBlur={() => []}
                handleChange={editOptions}
              />
              <DeleteIcon
                key={`${index} icon`}
                className={style.icon}
                onClick={() => changeOptions('delete', index)}
              />
            </>
          );
        })}
        <Button
          location="addTestCase"
          text="Añadir caso de prueba"
          onClickHandler={() => changeOptions('add', 0)}
        />
      </div>
    </div>
  );
}
