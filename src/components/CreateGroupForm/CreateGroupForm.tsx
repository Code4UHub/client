import React, { useState, useRef, useEffect, useReducer } from "react";
import InputField from "components/InputField/InputField";
import { Button } from "components/Button/Button";
import { createGroupInputData } from "./createGroupData";
import styles from "./CreateGroupFom.module.css";
import { ReactComponent as IconClose } from "./x-mark.svg";

const query = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Physics" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "Biology" },
  { id: 5, name: "Computer Science" },
  { id: 6, name: "English" },
  { id: 7, name: "History" },
  { id: 8, name: "Geography" },
  { id: 9, name: "Art" },
  { id: 10, name: "Music" },
  { id: 11, name: "Physical Education" },
  { id: 12, name: "Social Studies" },
  { id: 13, name: "Environmental Science" },
  { id: 14, name: "Foreign Language" },
  { id: 15, name: "Health Education" },
  { id: 16, name: "Economics" },
  { id: 17, name: "Psychology" },
  { id: 18, name: "Sociology" },
  { id: 19, name: "Political Science" },
  { id: 20, name: "Philosophy" },
];

const INPUT_ERRORES_INITIAL = createGroupInputData.reduce(
  (acc: { [key: string]: string }, { id }) => {
    acc[id] = "";
    return acc;
  },
  {}
);

const inputErrorsReducer = (
  state: typeof INPUT_ERRORES_INITIAL,
  action: { type: string; payload: {} }
): typeof INPUT_ERRORES_INITIAL => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_ERRORS":
      return { ...state, ...payload };

    default:
      throw Error("Type not defined");
  }
};

const INPUT_VALUES_INITIAL = createGroupInputData.reduce(
  (acc: { [key: string]: string }, { id }) => {
    acc[id] = "";
    return acc;
  },
  {}
);

const inputValuesReducer = (
  state: typeof INPUT_VALUES_INITIAL,
  action: { type: string; payload: {} }
): typeof INPUT_VALUES_INITIAL => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_VALUES":
      return { ...state, ...payload };

    default:
      throw Error("Type not defined");
  }
};

export default function CreateGroupForm() {
  const [classes, setClasses] = useState<typeof query>([]);
  const [filteredClasses, setFilteredClasses] = useState<typeof query>([]);
  const [inputValues, dispatch] = useReducer(
    inputValuesReducer,
    INPUT_VALUES_INITIAL
  );

  const [inputErrors, dispatchError] = useReducer(
    inputErrorsReducer,
    INPUT_ERRORES_INITIAL
  );

  const firstFocusableEl = useRef<HTMLButtonElement>(null);
  const lastFocusableEl = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setClasses(query);
    setFilteredClasses(query);
  }, []);

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  const filterClass = (value: string) => {
    const newClass = classes.filter(({ name }) => name.includes(value));

    setFilteredClasses(newClass);
  };

  const onChangeHandler = (id: string, value: string) => {
    switch (id) {
      case "subject":
        filterClass(value);
        break;
      default:
        break;
    }
    dispatch({ type: "UPDATE_VALUES", payload: { [id]: value } });
    dispatchError({ type: "UPDATE_ERRORS", payload: { [id]: "Error" } });
  };

  const trapFocus = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        /* shift + tab */ if (
          document.activeElement === firstFocusableEl.current
        ) {
          lastFocusableEl.current?.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastFocusableEl.current) {
        /* tab */ firstFocusableEl.current?.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <div className={styles["form-wrapper"]}>
      <div className={styles["form-container"]}>
        <div className={styles["close-button-container"]}>
          <button
            className={styles["close-button"]}
            type="button"
            ref={firstFocusableEl}
            onKeyDown={trapFocus}
          >
            <IconClose />
          </button>
        </div>
        <form>
          <h3>Crear Grupo</h3>
          <div className={styles["form-inputs"]}>
            {createGroupInputData.map((inputData) => (
              <>
                <InputField
                  key={inputData.id}
                  className={styles.button}
                  value=""
                  label={inputData.label}
                  type={inputData.type}
                  id={inputData.id}
                  error={inputErrors[inputData.id]}
                  required
                  handleChange={onChangeHandler}
                  handleBlur={() => {}}
                />
                {/* {inputData.id === "subject" && (
                  <div>
                    <ul>
                      {filteredClasses.map(({ id, name }) => (
                        <li key={id}>{name}</li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </>
            ))}
          </div>
          <Button
            location="authentication"
            text="holi"
            onClickHandler={() => {}}
            type="submit"
            ref={lastFocusableEl}
            onKeyDownHandler={trapFocus}
          />
        </form>
      </div>
    </div>
  );
}
