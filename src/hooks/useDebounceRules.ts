import { useEffect, useState } from 'react';

import { authRules } from 'utils/inputRules/authRules';
import { inputRules } from 'utils/inputRules/groupRules';
import { correctState } from 'utils/inputRules/generalRules';

// Implemention idea inspired on: https://www.tiktok.com/@cosdensolutions/video/7225961986532674842?_r=1&_t=8c9FwTf8ETN&social_sharing=v2

const DELAY = 400;

type StringsObject = { [key: string]: string };

/* To find the differennce between the tracker (used to check previous changes) 
and the inputValues (up-to-date), considering that they could have nested objects, 
just like in CreateGroupForm on subject and days
*/
function findDifferentKey(
  obj1: { [key: string]: any },
  obj2: { [key: string]: any },
  currentKey: string
): string {
  const keys = Object.keys(obj1);
  const diffKey = keys.find((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const nestedKey = currentKey ? `${currentKey}.${key}` : key;

    if (typeof val1 === 'object' && typeof val2 === 'object') {
      return findDifferentKey(val1, val2, nestedKey) !== '';
    }
    return val1 !== val2;
  });

  if (diffKey !== undefined) {
    return currentKey ? `${currentKey}.${diffKey}` : diffKey;
  }

  return '';
}

export const useDebounceRules = (
  inputValue: any,
  caller: 'auth' | 'joinGroup' | 'createGroup'
) => {
  // Registry of the previous value of inputValue (to check changes)
  const [tracker, setTracker] = useState(inputValue);
  // Current value on inputs
  const [inputErrors, setInputErrors] = useState<StringsObject>({});

  // To restart all input errors according to the provided keys
  const restartAllInputErrors = (keys: string[]) => {
    setInputErrors({});
    setTracker({});
    // setTracker(inputValue);

    keys.forEach((key) => {
      setInputErrors((error) => ({ ...error, [key]: '' }));
      if (key === 'subject' && caller === 'createGroup') {
        setTracker((val: any) => ({ ...val, [key]: { id: '', name: '' } }));
      } else setTracker((val: any) => ({ ...val, [key]: '' }));
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
  const onCheckRules = (id: string, value: string) => {
    // For authentication form
    if (caller === 'auth') {
      const rule = authRules.find((r) => r.id === id);
      let validationResult = '';
      if (rule) {
        switch (id) {
          case 'passwordConfirmation':
            validationResult = rule.validate(value, inputValue.password);
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
    // For joinGroup form
    if (caller === 'joinGroup') {
      const classCodeRules = inputRules.find((rule) => rule.id === 'class_id');
      const validationResult = classCodeRules?.validate(inputValue.classCode);
      setInputErrors({ classCode: validationResult });
    }
    // For Create Group Form
    if (caller === 'createGroup') {
      const rule = inputRules.find((r) => r.id === id);
      let validationResult = '';
      if (rule) {
        if (id === 'end_time')
          validationResult = rule.validate(value, inputValue.start_time);
        else validationResult = rule.validate(value);
        setInputErrors((previousErrors) => ({
          ...previousErrors,
          [id]: validationResult,
        }));
        // Revalidating contrapart end_time if start was validated and end_time had error
        if (
          id === 'start_time' &&
          validationResult === correctState &&
          inputErrors.end_time
        ) {
          onCheckRules('end_time', inputValue.end_time as string);
        }
      }
    }
  };

  // Everytime inputValue changes from the tracker (prev state), it should check rules
  useEffect(() => {
    const id = findDifferentKey(tracker, inputValue, '');
    const timeout = setTimeout(() => {
      if (id) {
        if (caller === 'createGroup' && id !== 'days') {
          onCheckRules(id, inputValue[id]);
        }
        if (caller !== 'createGroup') {
          onCheckRules(id, inputValue[id]);
        }
        setTracker(inputValue);
      }
    }, DELAY);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [inputValue]);

  return { inputErrors, onRestartIdValue, restartAllInputErrors };
};
