
export const correctState = "Excelente";

type InputRule = {
  id: string;
  validate: (value: string) => string;
};

function isValidEmail(inputEmail : string) {
	const email = inputEmail.toLowerCase();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	const studentEmailRegex = /^a0\d{7}@/;
	const startStudentEmailRegex = /^a0/;
	if (startStudentEmailRegex.test(email)) {
		if (!studentEmailRegex.test(email)) return "Verifique su matrícula en su correo"
	}
	else if (!emailRegex.test(email)) return "Ingrese un correo válido";
	if (!email.endsWith("@tec.mx")) return "Use su correo institucional @tec.mx";
  if (email.length > 30) return "El correo excede el máximo tamaño"
	return correctState;
}

function isValidLoginPassword(password: string) {
  if (password.length < 1) return "Ingrese una contraseña"
  return correctState;
}

function isValidName(name : string) {
  const alphaAndAccents = '[a-zA-ZáéíóúÁÉÍÓÚ]';
  // Allows accents. And spaces. Spaces should be between names (not starting on ending positions)
  const nameRegex = new RegExp(`^(${alphaAndAccents}+)(\s)$`);
  if (name.length < 1) return "Ingrese un nombre";
  if (name.length > 30) return "Excede el tamaño permitido"
  if (!nameRegex.test(name)) return "Recuerda usar solo valores alfabéticos"
  return correctState;
}

export const inputRules : InputRule[] = [
  {
    id: 'email',
    validate: isValidEmail
  },
  {
    id: 'passwordLogin',
    validate: isValidLoginPassword
  },
  {
    id: "firstName",
    validate: isValidName
  }
];