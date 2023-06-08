import { useEffect, useState } from 'react';

import { authRules } from 'utils/inputRules/authRules';
import { inputRules } from 'utils/inputRules/groupRules';
import { questionOptionRules } from 'utils/inputRules/questionOptionRules';
import { questionRules } from 'utils/inputRules/questionRules';
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
  const keys = Object.keys(obj2);
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

export type DebounceObject = {
  inputErrors: StringsObject;
  restartAllInputErrors: (keys: string[]) => void;
  onRestartIdValue: (id: string) => void;
  onPassError: (id: string) => void;
  onSetError: (id: string, error: string) => void;
  onCheckAllInputValues: () => void;
};

export const useDebounceRules = (
  inputValue: any,
  caller:
    | 'auth'
    | 'joinGroup'
    | 'createGroup'
    | 'createQuestion'
    | 'mcqConfig'
    | 'codeConfig'
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
      if (key === 'subject' && caller === 'createGroup') {
        setTracker((val: any) => ({ ...val, [key]: { id: '', name: '' } }));
      } else if (caller === 'mcqConfig') {
        setTracker((val: any) => ({
          ...val,
          [key]: { option: '', explanation: '' },
        }));
      } else if (caller === 'codeConfig') {
        setTracker((val: any) => ({
          ...val,
          [key]: { input: '', output: '' },
        }));
      } else setTracker((val: any) => ({ ...val, [key]: '' }));
    });
  };

  // To set error to '' if the input on a given is changed
  const onRestartIdValue = (id: string) => {
    console.log('restarting id:', id);
    setInputErrors((previousErrors) => ({ ...previousErrors, [id]: '' }));
    // Special case for password on auth, a change on password restarts passwordConfirmation error
    if (caller === 'auth' && id === 'password')
      setInputErrors((previousErrors) => ({
        ...previousErrors,
        passwordConfirmation: '',
      }));
  };

  // Used on autocomplete, so when selecting an option it can be set as correct
  const onPassError = (id: string) => {
    const timeout = setTimeout(() => {
      setInputErrors((previousErrors) => ({
        ...previousErrors,
        [id]: correctState,
      }));
    }, DELAY);

    return () => clearTimeout(timeout);
  };

  const onSetError = (id: string, error: string) => {
    const timeout = setTimeout(() => {
      setInputErrors((previousErrors) => ({ ...previousErrors, [id]: error }));
    }, DELAY);

    return () => clearTimeout(timeout);
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
    if (caller === 'createQuestion') {
      if (
        id !== 'subject' &&
        id !== 'module' &&
        id !== 'difficulty' &&
        id !== 'questionType'
      ) {
        const questionRule = questionRules.find((rule) => rule.id === id);
        if (questionRule) {
          const result = questionRule.validate(inputValue[id]);
          setInputErrors((previousErrors) => ({
            ...previousErrors,
            [id]: result,
          }));
        }
      }
    }
    if (
      caller === 'mcqConfig' &&
      Object.keys(inputValue).length > 0 &&
      parseInt(id, 10) < Object.keys(inputValue).length
    ) {
      console.log('checking rules on', id);
      const optionRule = questionOptionRules.find(
        (rule) => rule.id === 'option'
      );
      const explanationRule = questionOptionRules.find(
        (rule) => rule.id === 'explanation'
      );
      const { option, explanation } = inputValue[id];
      console.log('option', option);
      console.log('explanation', explanation);
      if (optionRule && explanationRule && option !== undefined) {
        const optionResult = optionRule.validate(option);
        const explanationResult = explanationRule.validate(explanation);
        console.log('result option', optionResult);
        console.log('exp result', explanationResult);
        if (
          optionResult === correctState &&
          explanationResult === correctState
        ) {
          setInputErrors((previousErrors) => ({
            ...previousErrors,
            [id]: correctState,
          }));
        } else if (optionResult !== correctState) {
          setInputErrors((previousErrors) => ({
            ...previousErrors,
            [id]: `Opción: ${optionResult}`,
          }));
        } else {
          setInputErrors((previousErrors) => ({
            ...previousErrors,
            [id]: `Explicación: ${explanationResult}`,
          }));
        }
      }
    }
    if (caller === 'codeConfig' && Object.keys(inputValue).length > 0) {
      const inputRule = questionOptionRules.find((rule) => rule.id === 'input');
      const outputRule = questionOptionRules.find(
        (rule) => rule.id === 'output'
      );
      const { input, output } = inputValue[id];
      if (inputRule && outputRule && input !== undefined) {
        const inputResult = inputRule.validate(input);
        const outputResult = outputRule.validate(output);
        if (inputResult === correctState && outputResult === correctState) {
          setInputErrors((previousErrors) => ({
            ...previousErrors,
            [id]: correctState,
          }));
        } else if (inputResult !== correctState) {
          setInputErrors((previousErrors) => ({
            ...previousErrors,
            [id]: `Input: ${inputResult}`,
          }));
        } else {
          setInputErrors((previousErrors) => ({
            ...previousErrors,
            [id]: `Output: ${outputResult}`,
          }));
        }
      }
    }
  };

  // Specific for mcq and code question
  const onCheckAllInputValues = () => {
    Object.values(inputValue).forEach((value: any, i) => {
      onCheckRules(`${i}`, value);
    });
  };

  // Everytime inputValue changes from the tracker (prev state), it should check rules
  useEffect(() => {
    const id = findDifferentKey(tracker, inputValue, '');
    console.log('--------------');
    console.log('difference on:', id);
    console.log('tracker', tracker);
    console.log('inputValue', inputValue);
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

  return {
    inputErrors,
    onRestartIdValue,
    restartAllInputErrors,
    onCheckAllInputValues,
    onPassError,
    onSetError,
  };
};
