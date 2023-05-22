import { GeneralError } from 'utils/errorMessage/generalErrorMessage';

export const forbidenChars = '<>=(){};\\/';

export const correctState = 'Hecho';

function isEmptyInput(input: string) {
  return input.length < 1;
}

export function hasForbiddenChars(input: string) {
  let result = false;
  input.split('').forEach((letter) => {
    if (forbidenChars.includes(letter)) result = true;
  });
  return result;
}

export function generalRules(
  input: string,
  id: string,
  minLength: { [key: string]: number },
  maxLength: { [key: string]: number }
) {
  if (isEmptyInput(input)) return GeneralError.noEmpty;
  if (input.length < minLength[id])
    return `${GeneralError.minCharError} ${minLength[id]} char`;
  if (input.length < maxLength[id])
    return `${GeneralError.maxCharError} ${maxLength[id]} char`;
  if (hasForbiddenChars(input)) return GeneralError.noSpecialChar;
  return '';
}
