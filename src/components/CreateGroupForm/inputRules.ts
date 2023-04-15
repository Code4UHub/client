export const correctState = "Hecho";

type InputRule = {
  id: string;
  validate: (value: string) => string;
};

function isValidSubject(inputSubject: string) {
  console.log(inputSubject);
  return correctState;
}

export const inputRules: InputRule[] = [
  {
    id: "subject",
    validate: isValidSubject,
  },
];
