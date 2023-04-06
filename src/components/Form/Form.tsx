import React, {useState, useEffect} from 'react';
import InputField from 'components/InputField/InputField';
import Button from 'components/Button/Button';
import { inputData } from './inputData';
import { inputRules } from './inputRules';
import style from './Form.module.css';


type Props = {
  screen: 'signIn' | 'signUp';
};

export default function Form({ screen }: Props) {
  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({
  });
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
  });
  useEffect(() => {
    setInputErrors({});
    inputData[screen].forEach(({id}) => {
      setInputErrors((inputE) => ({...inputE, [id]: ""}))
    });
    setInputValues({});
    inputData[screen].forEach(({id}) => {
      setInputValues((value) => ({...value, [id]: ""}))
    });
  }, [screen]);
  
  function onChangeHandler(id : string, value : string) {
    setInputValues((storedValues) => ({...storedValues, [id]: value}))
  }

  function onCheckRules(id : string, value : string) {
    const rule = inputRules.find((r) => r.id === id);
    if (rule) {
      const validationResult = rule.validate(value);
      setInputErrors((prevErrors) => ({ ...prevErrors, [id]: validationResult }));
    }
  }

  const onMainClick = () => console.log('Holi');

  return (
    <main className={style.form}>
      <form>
        <h1>
          {screen === 'signUp'
            ? 'Crea tu cuenta'
            : 'Inicia sesión con tu cuenta'}
        </h1>
        <div className={style.inputs}>
          {inputData[screen].map((field, index: number) => (
            <InputField
              key={field.id}
              value={inputValues[field.id]}
              label={field.label}
              type={field.type}
              id={field.id}
              error={inputErrors[field.id]}
              required
              handleChange={onChangeHandler}
              handleBlur={onCheckRules}
              className={
                screen === 'signUp' && index < 2
                  ? style.halfInput
                  : style.singleInput
              }
            />
          ))}
        </div>
        <Button
          type="submit"
          location="authentication"
          text={screen === 'signUp' ? 'Crear cuenta' : 'Iniciar sesión'}
          onClickHandler={onMainClick}
        />
      </form>
    </main>
  );
}
