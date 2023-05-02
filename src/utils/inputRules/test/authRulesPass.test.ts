import { PasswordError } from 'utils/errorMessage/authErrorMessage';
import { GeneralError } from 'utils/errorMessage/generalErrorMessage';
import { correctState } from 'utils/inputRules/generalRules';
import { inputsMinLengthAuth, inputsMaxLengthAuth , runGeneralRules } from '../authRules';

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
  describe('Signup password validation', () => {
    const id = 'password';
    test('Valid password signup', () => {
      expect(runGeneralRules(id, 'Code4$123', '')).toBe(correctState);
      expect(runGeneralRules(id, 'Melocoton3&', '')).toBe(correctState);
    });
    describe('General rules', () => {
      test('Empty password', () => {
        expect(runGeneralRules(id, '', '')).toBe(GeneralError.noEmpty);
      });
      test('Password with forbidden chars', () => {
        expect(runGeneralRules(id, '\\1==1HackedYou', '')).toBe(
          GeneralError.noSpecialChar
        );
      });
      test('Password exceeds max length', () => {
        expect(runGeneralRules(id, 'Password12345678910$&AbcDEF', '')).toBe(
          getSizeError('max', id)
        );
        expect(runGeneralRules(id, '@Popocatepetl2023Code4U', '')).toBe(
          getSizeError('max', id)
        );
      });
      test('Password under min length', () => {
        expect(runGeneralRules(id, '$Money', '')).toBe(getSizeError('min', id));
        expect(runGeneralRules(id, 'Dan&Pe', '')).toBe(getSizeError('min', id));
      });
    });
    describe('Specific rules signup password', () => {
      test('Password doesnt have uppercase', () => {
        expect(runGeneralRules(id, 'password124?', '')).toBe(
          PasswordError.noUpperError
        );
        expect(runGeneralRules(id, 'carlos1234', '')).toBe(
          PasswordError.noUpperError
        );
      });
      test('Password doesnt have lowercase', () => {
        expect(runGeneralRules(id, 'CONTRASENA%', '')).toBe(
          PasswordError.noLowerError
        );
        expect(runGeneralRules(id, '12345678U', '')).toBe(
          PasswordError.noLowerError
        );
      });
      test('Password doesnt have digit', () => {
        expect(runGeneralRules(id, 'DontForgetPass', '')).toBe(
          PasswordError.noNumberError
        );
        expect(runGeneralRules(id, 'BestCoderEver', '')).toBe(
          PasswordError.noNumberError
        );
      });
      test('Password doesnt have special char', () => {
        expect(runGeneralRules(id, 'MyStrongPass123', '')).toBe(
          PasswordError.noSpecialCharError
        );
      });
    });
  });
  // test('Valid password confirmation', () => {
  //     expect(runGeneralRules(id, 'danperez@tec.mx', '')).toBe(correctState);
  //     expect(runGeneralRules(id, 'RGPAREDES@TEC.MX', '')).toBe(correctState);
  // });
  // test('Valid password Login', () => {
  //     expect(runGeneralRules(id, 'danperez@tec.mx', '')).toBe(correctState);
  //     expect(runGeneralRules(id, 'RGPAREDES@TEC.MX', '')).toBe(correctState);
  // });
  // describe('General rules', () => {
  //     test('Empty email', () => {
  //         expect(runGeneralRules(id, '', '')).toBe(GeneralError.noEmpty);
  //     })
  //     test('Email with forbidden chars', () => {
  //         expect(runGeneralRules(id, 'a012381 OR 1==1', '')).toBe(GeneralError.noSpecialChar);
  //         expect(runGeneralRules(id, 'hacker <hacked> @tec.mx', '')).toBe(GeneralError.noSpecialChar);
  //     })
  //     describe('Email exceeds max length', () => {
  //         test('Student email too long', () => {
  //             expect(runGeneralRules(id, 'a01237158294290571048200@tec.mx', '')).toBe(maxCharMessage);
  //             expect(runGeneralRules(id, 'A01234567890123456789012346789@TEC.MX', '')).toBe(maxCharMessage);
  //         })
  //         test('Teacher email too long', () => {
  //             expect(runGeneralRules(id, 'margarita_de_la_rosa_martinez@tec.mx', '')).toBe(maxCharMessage);
  //             expect(runGeneralRules(id, 'claudiaveronicaperezlezama@tec.mx', '')).toBe(maxCharMessage);
  //         })
  //     });
  //     describe('Email under min length', () => {
  //         test('Student email not long enough', () => {
  //             expect(runGeneralRules(id, 'a0@tec.mx', '')).toBe(minCharMessage);
  //             expect(runGeneralRules(id, 'A0@TEC.MX', '')).toBe(minCharMessage);
  //         });
  //         test('Teacher email not long enough', () => {
  //             expect(runGeneralRules(id, 'an@tec.mx', '')).toBe(minCharMessage);
  //             expect(runGeneralRules(id, 'AD@TEC.MX', '')).toBe(minCharMessage);
  //         })
  //     })
  // });
  // describe('Specific email rules', () => {
  //     describe('Incorrect student id in email', () => {
  //         test('ID too long', () => {
  //             expect(runGeneralRules(id, 'A0173403012@tec.mx', '')).toBe(EmailError.studentIdError);
  //             expect(runGeneralRules(id, 'a018417582749@tec.mx', '')).toBe(EmailError.studentIdError);
  //         });
  //         test('ID not long enough', () => {
  //             expect(runGeneralRules(id, 'a01482@tec.mx', '')).toBe(EmailError.studentIdError);
  //             expect(runGeneralRules(id, 'a01@tec.mx', '')).toBe(EmailError.studentIdError);
  //         })
  //     });
  //     describe('Incorrect email format', () => {
  //         test('Incorrect student format', () => {
  //             expect(runGeneralRules(id, 'A01857133@.', '')).toBe(EmailError.invalidEmailError);
  //             expect(runGeneralRules(id, 'A01234573@', '')).toBe(EmailError.invalidEmailError);
  //         });
  //         test('Incorrect teacher format', () => {
  //             expect(runGeneralRules(id, 'danperez@@@', '')).toBe(EmailError.invalidEmailError);
  //             expect(runGeneralRules(id, 'rgpare@desz', '')).toBe(EmailError.invalidEmailError);
  //         })
  //     })
  //     describe('Incorrect educational format', () => {
  //         test('Not an educational teacher account', () => {
  //             expect(runGeneralRules(id, 'albarodriguez@gmail.com', '')).toBe(EmailError.nonEducationalEmailError);
  //         });
  //         test('Not an educational student account', () => {
  //             expect(runGeneralRules(id, 'a01732953@outlook.com', '')).toBe(EmailError.nonEducationalEmailError);
  //             expect(runGeneralRules(id, 'A02395819@HOTMAIL.com', '')).toBe(EmailError.nonEducationalEmailError);
  //         })
  //         test('Teacher using @itesm instead of @tec', () => {
  //             expect(runGeneralRules(id, 'jmgonzale@itesm.mx', '')).toBe(EmailError.nonEducationalEmailError);
  //             expect(runGeneralRules(id, 'moralesrojas@itesm.mx', '')).toBe(EmailError.nonEducationalEmailError);
  //         })
  //         test('Student using @itesm instead of @tec', () => {
  //             expect(runGeneralRules(id, 'A05829158@itesm.mx', '')).toBe(EmailError.nonEducationalEmailError);
  //             expect(runGeneralRules(id, 'A05185228@mail.com', '')).toBe(EmailError.nonEducationalEmailError);
  //         })
  //     });
  // });
});
