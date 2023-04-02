import React from 'react';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import style from './FormHero.module.css';

type InputData = {
  label: string;
  type: string;
  id: string;
}[];

const inputData: { [key: string]: InputData } = {
  signIn: [
    {
      label: 'Correo',
      type: 'email',
      id: 'email',
    },
    {
      label: 'Contraseña',
      type: 'password',
      id: 'password',
    },
  ],
  signUp: [
    {
      label: 'Nombre(s)',
      type: 'text',
      id: 'firstName',
    },
    {
      label: 'Apellido(s)',
      type: 'text',
      id: 'lastName',
    },
    {
      label: 'Correo',
      type: 'email',
      id: 'email',
    },
    {
      label: 'Contraseña',
      type: 'password',
      id: 'password',
    },
    {
      label: 'Confirmar contraseña',
      type: 'password',
      id: 'passwordConfirmation',
    },
  ],
};

type Props = {
  screen: 'signIn' | 'signUp';
};

export default function FormHero({ screen }: Props) {
  const onMainClick = () => console.log('OnMainClick');
  return (
    <div className={style.form}>
      <h1>
        {screen === 'signUp' ? 'Crea tu cuenta' : 'Inicia sesión con tu cuenta'}
      </h1>
      <div className={style.inputs}>
        {inputData[screen].map((field, index: number) => (
          <InputField
            key={field.id}
            label={field.label}
            type={field.type}
            id={field.id}
            className={
              screen === 'signUp' && index < 2
                ? style.halfInput
                : style.singleInput
            }
          />
        ))}
      </div>
      <Button
        location="authentication"
        text={screen === 'signUp' ? 'Crear cuenta' : 'Iniciar sesión'}
        onClickHandler={onMainClick}
      />
    </div>
  );
}
