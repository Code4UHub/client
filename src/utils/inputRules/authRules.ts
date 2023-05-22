import {
  EmailError,
  PasswordError,
  NameError,
} from 'utils/errorMessage/authErrorMessage';
import { generalRules, correctState } from 'utils/inputRules/generalRules';

export const inputsMinLengthAuth = {
  email: 10,
  password: 8,
  passwordLogin: 2,
  passwordConfirmation: 2,
  name: 3,
};
export const inputsMaxLengthAuth = {
  email: 30,
  password: 16,
  passwordLogin: 16,
  passwordConfirmation: 16,
  name: 30,
};

type InputRule = {
  id: string;
  validate: (value: string, passwordConfirmation?: string) => string;
};

function isValidEmail(inputEmail: string) {
  const email = inputEmail.toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const studentEmailRegex = /^a0\d{7}@/;
  const startStudentEmailRegex = /^a0/;
  if (startStudentEmailRegex.test(email)) {
    if (!emailRegex.test(email)) return EmailError.invalidEmailError;
    if (!studentEmailRegex.test(email)) return EmailError.studentIdError;
  } else if (!emailRegex.test(email)) return EmailError.invalidEmailError;
  if (!email.endsWith('@tec.mx')) return EmailError.nonEducationalEmailError;
  return correctState;
}

// Follows security rules? Ask for them
function isValidSignUpPassword(password: string) {
  const hasUpperCaseRegex = /[A-Z]/;
  const hasLowerCaseRegex = /[a-z]/;
  const hasDigitRegex = /[1-9]/;
  const hasSpecialCharRegex = /[@%*?&]/;
  if (!hasUpperCaseRegex.test(password)) return PasswordError.noUpperError;
  if (!hasLowerCaseRegex.test(password)) return PasswordError.noLowerError;
  if (!hasDigitRegex.test(password)) return PasswordError.noNumberError;
  if (!hasSpecialCharRegex.test(password))
    return PasswordError.noSpecialCharError;
  return correctState;
}

function isValidConfirmationPassword(
  password: string,
  passwordConfirmation: string
) {
  return password === passwordConfirmation
    ? correctState
    : PasswordError.noMatchingError;
}

function isValidName(name: string) {
  // Allow many Upper and lower case, with and without accents
  const alphaAndAccents = '[a-zA-ZáéíóúÁÉÍÓÚñÑ]+';
  // There should be a name, and optional, a space followed by a name
  const nameRegex = new RegExp(
    `^(${alphaAndAccents})(\\s+${alphaAndAccents})*$`
  );
  if (!nameRegex.test(name)) {
    if (name.startsWith(' ')) return NameError.leadingSpaceError;
    if (name.endsWith(' ')) return NameError.endingSpaceError;
    return NameError.onlyAlphaError;
  }
  return correctState;
}

export function runGeneralRules(
  idInput: string,
  inputValue: string,
  password: string
) {
  const generalResults = generalRules(
    inputValue,
    idInput,
    inputsMinLengthAuth,
    inputsMaxLengthAuth
  );
  if (generalResults === correctState) {
    if (idInput === 'name') {
      return isValidName(inputValue);
    }
    if (idInput === 'email') {
      return isValidEmail(inputValue);
    }
    if (idInput === 'password') {
      return isValidSignUpPassword(inputValue);
    }
    if (idInput === 'passwordLogin') {
      return correctState;
    }
    if (idInput === 'passwordConfirmation') {
      return isValidConfirmationPassword(inputValue, password);
    }
  }
  return generalResults;
}

export const authRules: InputRule[] = [
  {
    id: 'email',
    validate: (value) => runGeneralRules('email', value, ''),
  },
  {
    id: 'passwordLogin',
    validate: (value) => runGeneralRules('passwordLogin', value, ''),
  },
  {
    id: 'firstName',
    validate: (value) => runGeneralRules('name', value, ''),
  },
  {
    id: 'lastName',
    validate: (value) => runGeneralRules('name', value, ''),
  },
  {
    id: 'password',
    validate: (value) => runGeneralRules('password', value, ''),
  },
  {
    id: 'passwordConfirmation',
    validate: (value, password) =>
      runGeneralRules('passwordConfirmation', value, password || ''),
  },
];
