
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

// Just asked for a password (won't share the content of a valid password)
function isValidLoginPassword(password: string) {
  if (password.length < 1) return "Ingrese una contraseña"
  return correctState;
}

// Follows security rules? Ask for them
function isValidSignUpPassword(password: string) {
  const hasUpperCaseRegex = /[A-Z]/;
  const hasLowerCaseRegex = /[a-z]/;
  const hasDigitRegex = /[1-9]/;
  const hasSpecialCharRegex = /[@$!%*?&]/
  if (!hasUpperCaseRegex.test(password)) return "Incluya una mayúscula";
  if (!hasLowerCaseRegex.test(password)) return "Incluya una minúscula";
  if (!hasDigitRegex.test(password)) return "Incluya un número";
  if (!hasSpecialCharRegex.test(password)) return "Incluya un símbolo especial @$!%*?&";
  if (password.length < 8) return "Incluya mínimo 8 caracteres";
  return correctState;
}

function isValidName(name : string) {
  // Allow many Upper and lower case, with and without accents
  const alphaAndAccents = '[a-zA-ZáéíóúÁÉÍÓÚ]+';
  // There should be a name, and optional, a space followed by a name
  const nameRegex = new RegExp(`^(${alphaAndAccents})(\\s+${alphaAndAccents})*$`);
  if (name.length < 1) return "Ingrese un nombre";
  if (name.length > 30) return "Excede el tamaño permitido"
  if (!nameRegex.test(name)) {
    if (name.startsWith(" ")) return "Elimina el espacio inicial"
    if (name.endsWith(" ")) return "Elimina el espacio al final"
    return "Usa solo valores alfabéticos"}
  return correctState;
}

// function isSamePassword(repeatedPassword: string, password: string) {
//   if (repeatedPassword !== password) return "Las contraseñas no coinciden";
//   return correctState
// }

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
  },
  {
    id: "lastName",
    validate: isValidName
  },
  {
    id: "password",
    validate: isValidSignUpPassword
  },
  // {
  //   id: "passwordConfirmation",
  //   validate: isSamePassword
  // }
];