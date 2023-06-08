import { correctState, isEmptyInput } from 'utils/inputRules/generalRules';
import { GeneralError } from 'utils/errorMessage/generalErrorMessage';

export const inputsMinLength = {
  option: 1,
  explanation: 4,
  input: 1,
  output: 1,
};

export const inputsMaxLength = {
  option: 50,
  explanation: 80,
  input: 40,
  output: 40,
};

type InputRule = {
  id: string;
  validate: (value: string) => string;
};

export function runGeneralRules(
  id: 'option' | 'explanation' | 'input' | 'output',
  input: string
) {
  if (isEmptyInput(input)) return GeneralError.noEmpty;
  if (input.length < inputsMinLength[id])
    return `${GeneralError.minCharError} ${inputsMinLength[id]} char`;
  if (input.length > inputsMaxLength[id])
    return `${GeneralError.maxCharError} ${inputsMaxLength[id]} char`;
  return correctState;
}

export const questionOptionRules: InputRule[] = [
  {
    id: 'option',
    validate: (value) => runGeneralRules('option', value),
  },
  {
    id: 'explanation',
    validate: (value) => runGeneralRules('explanation', value),
  },
  {
    id: 'input',
    validate: (value) => runGeneralRules('input', value),
  },
  {
    id: 'output',
    validate: (value) => runGeneralRules('output', value),
  },
];
