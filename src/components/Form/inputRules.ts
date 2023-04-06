
export const correctState = "Valor aceptado";

type InputRule = {
  id: string;
  validate: (value: string) => string;
};

function isValidEmail(email : string) {
	const lowerCaseEmail = email.toLowerCase();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	const studentEmailRegex = /^a0\d{7}@tec\.mx$/;
	const startStudentEmailRegex = /A0/;
	if (startStudentEmailRegex.test(lowerCaseEmail)) {
		if (studentEmailRegex.test(lowerCaseEmail)) return "Ingrese un correo estudiantil válido"
	}
	if (!emailRegex.test(lowerCaseEmail)) return "Ingrese un correo válido";
	if (!lowerCaseEmail.endsWith("@tec.mx")) return "Use su correo institucional";
	return correctState;
}


export const inputRules : InputRule[] = [
  {
    id: 'email',
    validate: isValidEmail
  },
  {
    id: 'password',
    validate: () => correctState
  },
];