import { correctState, generalRules } from 'utils/inputRules/generalRules';
import { GeneralError } from 'utils/errorMessage/generalErrorMessage';

export const inputsMinLengthAuth = {
  title: 3,
  description: 5,
};

export const inputsMaxLengthAuth = {
  title: 80,
  description: 150,
};

type InputRule = {
  id: string;
  validate: (value: string) => string;
};

export function runGeneralRules(idInput: string, inputValue: string) {
  const generalResults = generalRules(
    inputValue,
    idInput,
    inputsMinLengthAuth,
    inputsMaxLengthAuth
  );
  if (
    (idInput === 'description' || idInput === 'title') &&
    generalResults === GeneralError.noSpecialChar
  )
    return correctState;
  return generalResults;
}

export const questionRules: InputRule[] = [
  {
    id: 'title',
    validate: (value) => runGeneralRules('title', value),
  },
  {
    id: 'description',
    validate: (value) => runGeneralRules('description', value),
  },
];
