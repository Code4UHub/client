import { useEffect, useState } from 'react';

import { authRules } from 'utils/inputRules/authRules';
import { inputRules } from 'utils/inputRules/groupRules';

// Implemention idea inspired on: https://www.tiktok.com/@cosdensolutions/video/7225961986532674842?_r=1&_t=8c9FwTf8ETN&social_sharing=v2

const DELAY = 500;

type StringsObject = { [key: string]: string };

function findDifferentKey(obj1: StringsObject, obj2: StringsObject): string {
  const key = Object.keys(obj1).find((k: string) => obj1[k] !== obj2[k]);
  return key || '';
}

export const useDebounceRules = (
  inputValue: StringsObject,
  caller: 'auth' | 'joinGroup' | 'other'
) => {
  // Registry of the previous value of inputValue (to check changes)
  const [tracker, setTracker] = useState(inputValue);
  // Current value on inputs
  const [inputErrors, setInputErrors] = useState<StringsObject>({});

  // To restart all input errors according to the provided keys
  const restartAllInputErrors = (keys: string[]) => {
    setInputErrors({});
    setTracker({});
    keys.forEach((key) => {
      setInputErrors((error) => ({ ...error, [key]: '' }));
      setTracker((val) => ({ ...val, [key]: '' }));
    });
  };

  // To set error to '' if the input on a given is changed
  const onRestartIdValue = (id: string) => {
    setInputErrors((previousErrors) => ({ ...previousErrors, [id]: '' }));
    // Special case for password on auth, a change on password restarts passwordConfirmation error
    if (caller === 'auth' && id === 'password')
      setInputErrors((previousErrors) => ({
        ...previousErrors,
        passwordConfirmation: '',
      }));
  };

  // Update errors according to rules
  const onCheckRules = (id: string, value: string, password?: string) => {
    if (caller === 'auth') {
      const rule = authRules.find((r) => r.id === id);
      let validationResult = '';
      if (rule) {
        switch (id) {
          case 'passwordConfirmation':
            validationResult = rule.validate(value, password);
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
    }
    if (caller === 'joinGroup') {
      const classCodeRules = inputRules.find((rule) => rule.id === 'class_id');
      const validationResult = classCodeRules?.validate(inputValue.classCode);
      setInputErrors({ classCode: validationResult });
    }
  };

  // Everytime inputValue changes from the tracker, it should check rules
  useEffect(() => {
    const id = findDifferentKey(tracker, inputValue);
    const timeout = setTimeout(() => {
      if (id !== '') {
        if (id === 'passwordConfirmation')
          onCheckRules(id, inputValue[id], inputValue.password);
        else onCheckRules(id, inputValue[id]);
        setTracker(inputValue);
      }
    }, DELAY);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [inputValue]);

  return { inputErrors, onRestartIdValue, restartAllInputErrors };
};
