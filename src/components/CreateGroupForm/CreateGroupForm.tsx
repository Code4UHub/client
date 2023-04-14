import React, { useState, useRef, useEffect, useReducer } from "react";
import { InputField } from "components/InputField/InputField";
import { Button } from "components/Button/Button";
// eslint-disable-next-line
import { createGroupInputData, days } from "./createGroupData";
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
    if (id === "days") {
      days.forEach((day) => {
        acc[day] = "off";
      });
    } else {
      acc[id] = "";
    }
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
  // eslint-disable-next-line
  const [filteredClasses, setFilteredClasses] = useState<typeof query>([]);

  const [isListOpen, setIsListOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // eslint-disable-next-line
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
  const autoComplete = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setClasses(query);
    setFilteredClasses(query);
  }, []);

  // filters autocomplete results based on user inputz
  const filterClass = (value: string) => {
    const newClass = classes.filter(({ name }) => name.includes(value));

    setFilteredClasses(newClass);
  };

  // Updates input values every time a field changes
  const onChangeHandler = (id: string, value: string) => {
    if (id === "subject") {
      filterClass(value);
    }
    if (days.includes(id)) {
      const newState = inputValues[id] === "off" ? "on" : "off";
      dispatch({ type: "UPDATE_VALUES", payload: { [id]: newState } });
    } else {
      dispatch({ type: "UPDATE_VALUES", payload: { [id]: value } });
    }
  };

  // Updates class on item click
  const selectClass = (id: string, name: string) => {
    if (autoComplete.current) autoComplete.current.value = name;

    dispatch({
      type: "UPDATE_VALUES",
      payload: { subject: name },
    });

    setIsListOpen(false);
  };

  // Closes autocomplete list on tab press
  const skipAutocomplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") setIsListOpen(false);
  };

  // Traps tab focus on modal
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

  // Renders inputfield based on inputData
  const inputFields = createGroupInputData.map((inputData) => {
    switch (inputData.id) {
      case "subject":
        return (
          <div key={inputData.id} className={`${styles.autocomplete}`}>
            <InputField
              placeholder={inputData.placeholder}
              ref={autoComplete}
              className={`${styles.button}`}
              value=""
              label={inputData.label}
              type={inputData.type}
              id={inputData.id}
              error={inputErrors[inputData.id]}
              required
              handleFocus={() => setIsListOpen(true)}
              handleChange={onChangeHandler}
              handleKeyDown={skipAutocomplete}
              handleBlur={() => {}}
            />
            {isListOpen && (
              <ul className={styles["autocomplete-list"]}>
                {filteredClasses.map(({ id, name }) => (
                  <li key={id} onClick={() => selectClass(inputData.id, name)}>
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "days":
        return (
          <div key={inputData.id} className={styles.singleInput}>
            <legend>{inputData.label}</legend>
            <div className={styles["day-buttons"]}>
              {days.map((day) => (
                <Button
                  className={inputValues[day] === "on" ? styles.selected : ""}
                  key={day}
                  location="createGroup"
                  text={day}
                  onClickHandler={() => onChangeHandler(day, "off")}
                  isDisable={false}
                />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <InputField
            key={inputData.id}
            className={`${styles.button} ${
              inputData.id === "startTime" || inputData.id === "endTime"
                ? styles.halfInput
                : styles.singleInput
            }`}
            value=""
            placeholder={inputData.placeholder}
            label={inputData.label}
            type={inputData.type}
            id={inputData.id}
            error={inputErrors[inputData.id]}
            required
            handleChange={onChangeHandler}
            handleBlur={() => {}}
          />
        );
    }
  });

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
        <form autoComplete="off">
          <h3>Crear Grupo</h3>
          <div className={styles["form-inputs"]}>{inputFields}</div>
          <Button
            location=""
            text="Crear grupo"
            type="submit"
            isDisable={isSubmitDisabled}
            ref={lastFocusableEl}
            onClickHandler={() => {}}
            onKeyDownHandler={trapFocus}
          />
        </form>
      </div>
    </div>
  );
}
