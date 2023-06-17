import { PasswordError } from 'utils/errorMessage/authErrorMessage';
import { GeneralError } from 'utils/errorMessage/generalErrorMessage';
import { correctState } from 'utils/inputRules/generalRules';
import {
  inputsMinLengthAuth,
  inputsMaxLengthAuth,
  runGeneralRules,
} from '../authRules';

function getSizeError(
  type: 'min' | 'max',
  id: 'password' | 'passwordLogin' | 'passwordConfirmation'
) {
  if (type === 'max') {
    const value = inputsMaxLengthAuth[id];
    return `${GeneralError.maxCharError} ${value} char`;
  }
  const value = inputsMinLengthAuth[id];
  return `${GeneralError.minCharError} ${value} char`;
}

describe('Password validation', () => {
  const idSignUp = 'password';
  const idLogin = 'passwordLogin';
  const idConfirmation = 'passwordConfirmation';
  describe('Valid password', () => {
    test('Valid signup password', () => {
      expect(runGeneralRules(idSignUp, 'Code4$123', '')).toBe(correctState);
      expect(runGeneralRules(idSignUp, 'Melocoton3&', '')).toBe(correctState);
    });
    test('Valid login password', () => {
      expect(runGeneralRules(idLogin, 'Carlosss', '')).toBe(correctState);
      expect(runGeneralRules(idLogin, 'python3', '')).toBe(correctState);
    });
    test('Valid confirmation password', () => {
      expect(runGeneralRules(idLogin, 'RoundRobin123', 'RoundRobin123')).toBe(
        correctState
      );
      expect(runGeneralRules(idLogin, 'CiudadModelo', 'CiudadModelo')).toBe(
        correctState
      );
    });
  });
  describe('General rules', () => {
    test('Empty password', () => {
      expect(runGeneralRules(idSignUp, '', '')).toBe(GeneralError.noEmpty);
      expect(runGeneralRules(idLogin, '', '')).toBe(GeneralError.noEmpty);
      expect(runGeneralRules(idConfirmation, '', '')).toBe(
        GeneralError.noEmpty
      );
    });
    describe('Password with forbidden chars', () => {
      test('Signup forbidden chars', () => {
        expect(runGeneralRules(idSignUp, '\\1==1HackedYou', '')).toBe(
          GeneralError.noSpecialChar
        );
        expect(runGeneralRules(idSignUp, '!="randomstring"', '')).toBe(
          GeneralError.noSpecialChar
        );
      });
      test('Login forbidden chars', () => {
        expect(runGeneralRules(idLogin, '<import hack />', '')).toBe(
          GeneralError.noSpecialChar
        );
        expect(runGeneralRules(idLogin, 'if(true)return;', '')).toBe(
          GeneralError.noSpecialChar
        );
      });
      test('Confirmation forbidden chars', () => {
        expect(
          runGeneralRules(
            idConfirmation,
            'element=disabled',
            'element=disabled'
          )
        ).toBe(GeneralError.noSpecialChar);
        expect(
          runGeneralRules(idConfirmation, 'fetch(hack.com)', 'fetch(hack.com)')
        ).toBe(GeneralError.noSpecialChar);
      });
    });
    describe('Password exceeds max length', () => {
      test('sign up exceeds', () => {
        expect(
          runGeneralRules(idSignUp, 'Password12345678910$&AbcDEF', '')
        ).toBe(getSizeError('max', idSignUp));
        expect(runGeneralRules(idSignUp, '@Popocatepetl2023Code4U', '')).toBe(
          getSizeError('max', idSignUp)
        );
      });
      test('login exceeds', () => {
        expect(
          runGeneralRules(idLogin, 'AndresManuelLopezObrador123', '')
        ).toBe(getSizeError('max', idLogin));
        expect(
          runGeneralRules(idLogin, 'IngenieriaEnTecnologiasComputacionales', '')
        ).toBe(getSizeError('max', idLogin));
      });
      test('confirmation exceeds', () => {
        expect(
          runGeneralRules(
            idConfirmation,
            'CarameloDeChocolate123',
            'CarameloDeChocoflanes'
          )
        ).toBe(getSizeError('max', idConfirmation));
        expect(
          runGeneralRules(
            idConfirmation,
            'TecnologicoDeMonterrey',
            'TecDeMonterrey'
          )
        ).toBe(getSizeError('max', idConfirmation));
      });
    });

    describe('Password under min length', () => {
      test('signup password', () => {
        expect(runGeneralRules(idSignUp, '$Money', '')).toBe(
          getSizeError('min', idSignUp)
        );
        expect(runGeneralRules(idSignUp, 'Dan&Pe', '')).toBe(
          getSizeError('min', idSignUp)
        );
      });
      test('login password', () => {
        expect(runGeneralRules(idLogin, 'C', '')).toBe(
          getSizeError('min', idLogin)
        );
        expect(runGeneralRules(idLogin, 'P', '')).toBe(
          getSizeError('min', idLogin)
        );
      });
      test('confirmation password', () => {
        expect(runGeneralRules(idConfirmation, 'm', 'm')).toBe(
          getSizeError('min', idConfirmation)
        );
        expect(runGeneralRules(idConfirmation, '4', '4')).toBe(
          getSizeError('min', idConfirmation)
        );
      });
    });
  });
  describe('Specific rules signup password', () => {
    test('Password doesnt have uppercase', () => {
      expect(runGeneralRules(idSignUp, 'password124?', '')).toBe(
        PasswordError.noUpperError
      );
      expect(runGeneralRules(idSignUp, 'carlos1234', '')).toBe(
        PasswordError.noUpperError
      );
    });
    test('Password doesnt have lowercase', () => {
      expect(runGeneralRules(idSignUp, 'CONTRASENA%', '')).toBe(
        PasswordError.noLowerError
      );
      expect(runGeneralRules(idSignUp, '12345678U', '')).toBe(
        PasswordError.noLowerError
      );
    });
    test('Password doesnt have digit', () => {
      expect(runGeneralRules(idSignUp, 'DontForgetPass', '')).toBe(
        PasswordError.noNumberError
      );
      expect(runGeneralRules(idSignUp, 'BestCoderEver', '')).toBe(
        PasswordError.noNumberError
      );
    });
    test('Password doesnt have special char', () => {
      expect(runGeneralRules(idSignUp, 'MyStrongPass123', '')).toBe(
        PasswordError.noSpecialCharError
      );
      expect(runGeneralRules(idSignUp, 'Generations2023', '')).toBe(
        PasswordError.noSpecialCharError
      );
    });
  });
  describe('Specific rules confirmation password', () => {
    test('no matching passwords', () => {
      expect(
        runGeneralRules(idConfirmation, 'SafePassword123#', 'SafePasswor123#')
      ).toBe(PasswordError.noMatchingError);
      expect(runGeneralRules(idConfirmation, 'Code4$12', 'Code4$123')).toBe(
        PasswordError.noMatchingError
      );
    });
  });
});
