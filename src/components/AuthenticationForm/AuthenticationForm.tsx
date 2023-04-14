import React, { useState, useEffect } from "react";
import { InputField } from "components/InputField/InputField";
import { Button } from "components/Button/Button";
import { inputData } from "./inputData";
import { inputRules, correctState } from "./inputRules";
import style from "./AuthenticationForm.module.css";

type Props = {
  screen: "signIn" | "signUp";
};

export default function AuthenticationForm({ screen }: Props) {
  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  // Checks every inputError and if one has an error message, you can't signin/signup
  const isMainButtonDisable = !Object.values(inputErrors).every(
    (value: string) => value === correctState
  );

  // Update values of inputs and errors, according to the screen
  useEffect(() => {
    setInputErrors({});
    inputData[screen].forEach(({ id }) => {
      setInputErrors((inputE) => ({ ...inputE, [id]: "" }));
    });
    setInputValues({});
    inputData[screen].forEach(({ id }) => {
      setInputValues((value) => ({ ...value, [id]: "" }));
    });
  }, [screen]);

  // Keep record of values and restart errors as a value changes
  const onChangeHandler = (id: string, value: string) => {
    setInputValues((storedValues) => ({ ...storedValues, [id]: value }));
    setInputErrors((previousErrors) => ({ ...previousErrors, [id]: "" }));
    // If password changes, passwordConfirmation validation status will change. Restart it
    if (id === "password")
      setInputErrors((previousErrors) => ({
        ...previousErrors,
        passwordConfirmation: "",
      }));
  };

  // Update errors according to rules
  const onCheckRules = (id: string, value: string) => {
    const rule = inputRules.find((r) => r.id === id);
    let validationResult = "";
    if (rule) {
      switch (id) {
        case "passwordConfirmation":
          validationResult = rule.validate(value, inputValues.password);
          break;
        default:
          validationResult = rule.validate(value);
          break;
      }
      setInputErrors((previousErrors) => ({
        ...previousErrors,
        [id]: validationResult,
      }));
    }
  };

  const onMainClick = () => console.log("Holi");

  return (
    <main className={style.form}>
      <form>
        <h1 className={style["form-title"]}>
          {screen === "signUp"
            ? "Crea tu cuenta"
            : "Inicia sesión con tu cuenta"}
        </h1>
        <div className={style.inputs}>
          {inputData[screen].map((field, index: number) => (
            <InputField
              placeholder={field.placeholder}
              key={`${screen}${field.id}`}
              value={inputValues[field.id]}
              label={field.label}
              type={field.type}
              id={field.id}
              error={inputErrors[field.id]}
              required
              handleChange={onChangeHandler}
              handleBlur={onCheckRules}
              className={
                screen === "signUp" && index < 2
                  ? style.halfInput
                  : style.singleInput
              }
            />
          ))}
        </div>
        <Button
          type="submit"
          location="authentication"
          isDisable={isMainButtonDisable}
          text={screen === "signUp" ? "Crear cuenta" : "Iniciar sesión"}
          onClickHandler={onMainClick}
        />
      </form>
    </main>
  );
}
