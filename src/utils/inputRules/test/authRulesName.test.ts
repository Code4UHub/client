import { NameError } from 'utils/errorMessage/authErrorMessage';
import { GeneralError } from 'utils/errorMessage/generalErrorMessage';
import { inputsMinLengthAuth, inputsMaxLengthAuth } from '../authRules';
import { correctState } from 'utils/inputRules/generalRules';
import { runGeneralRules } from '../authRules';

const nameMin = inputsMinLengthAuth.name;
const minCharMessage = `${GeneralError.minCharError} ${nameMin} char`
const nameMax = inputsMaxLengthAuth.name;
const maxCharMessage = `${GeneralError.maxCharError} ${nameMax} char`

describe('Name validation', () => {
    const id = 'name';

    test('Valid first names', () => {
        expect(runGeneralRules(id, 'José Ángel', '')).toBe(correctState);
        expect(runGeneralRules(id, 'ÓSCAR MAXIMILIANO', '')).toBe(correctState);
    })
    test('Valid last names', () => {
        expect(runGeneralRules(id, 'MUÑOZ GONZÁLEZ', '')).toBe(correctState);
        expect(runGeneralRules(id, 'Vega Pérez', '')).toBe(correctState);
    });
    describe('General rules', () => {
        test('Empty name', () => {
            expect(runGeneralRules(id, '', '')).toBe(GeneralError.noEmpty);
        });
        test('Name with forbidden chars', () => {
            expect(runGeneralRules(id, 'Fer\\', '')).toBe(GeneralError.noSpecialChar);
            expect(runGeneralRules(id, 'Jesús<script>', '')).toBe(GeneralError.noSpecialChar);
        });
        describe('Name exceeds max length', () => {
            test('First name is too long', () => {
                expect(runGeneralRules(id, 'Santiago de Alejandro Sebastián', '')).toBe(maxCharMessage);
                expect(runGeneralRules(id, 'Francisco Fernando de las Flores', '')).toBe(maxCharMessage);
            });
            test('Last name is too long', () => {
                expect(runGeneralRules(id, 'Dominguez de los Santos Martinez', '')).toBe(maxCharMessage);
                expect(runGeneralRules(id, 'Johnson-Martinez Rodriguez de la Luna', '')).toBe(maxCharMessage);
            });
        });
        describe('Name under min length', () => {
            test('First name not long enough', () => {
                expect(runGeneralRules(id, 'Al', '')).toBe(minCharMessage);
                expect(runGeneralRules(id, 'ro', '')).toBe(minCharMessage);
            });
            test('Last name not long enough', () => {
                expect(runGeneralRules(id, 'MA', '')).toBe(minCharMessage);
                expect(runGeneralRules(id, 'de', '')).toBe(minCharMessage);
            })
        })
    });
    describe('Specific name rules', () => {
        describe('Incorrect leading space', () => {
            test('First name leading space', () => {
                expect(runGeneralRules(id, ' Jorge', '')).toBe(NameError.leadingSpaceError);
                expect(runGeneralRules(id, ' KARLA', '')).toBe(NameError.leadingSpaceError);
            });
            test('Last name leading space', () => {
                expect(runGeneralRules(id, ' MORALES', '')).toBe(NameError.leadingSpaceError);
                expect(runGeneralRules(id, ' gonzalez', '')).toBe(NameError.leadingSpaceError);
            });
        });
        describe('Incorrect ending space', () => {
            test('First name ending space', () => {
                expect(runGeneralRules(id, 'Jesús ', '')).toBe(NameError.endingSpaceError);
                expect(runGeneralRules(id, 'danna ', '')).toBe(NameError.endingSpaceError);
            });
            test('Last name ending space', () => {
                expect(runGeneralRules(id, 'Castro ', '')).toBe(NameError.endingSpaceError);
                expect(runGeneralRules(id, 'RAMÍREZ ', '')).toBe(NameError.endingSpaceError);
            });
        });
        describe('Incorrect name with no alpha values', () => {
            test('First name with no alpha values', () => {
                expect(runGeneralRules(id, 'Carl0s', '')).toBe(NameError.onlyAlphaError);
                expect(runGeneralRules(id, 'Fern4nd4', '')).toBe(NameError.onlyAlphaError);
            });
            test('Last name with no alpha', () => {
                expect(runGeneralRules(id, 'Gonz4lez', '')).toBe(NameError.onlyAlphaError);
                expect(runGeneralRules(id, '0NT1V3R0S', '')).toBe(NameError.onlyAlphaError);
            });
        });
    });
});
