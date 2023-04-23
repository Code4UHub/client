export const correctState = 'Hecho';

type InputRule = {
    id: string;
    validate: Function;
};

function isValidClasscode(value: string) {
    const splittedString = value.split(' ');
    if (splittedString.length > 1) return 'Sin espacios';

    if (!splittedString[0]) return 'Campo Vacío';

    return correctState;
}

export const inputRules: InputRule[] = [
    {
        id: 'classCode',
        validate: isValidClasscode,
    }
];