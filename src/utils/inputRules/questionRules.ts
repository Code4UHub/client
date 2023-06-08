import { generalRules } from 'utils/inputRules/generalRules';

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
