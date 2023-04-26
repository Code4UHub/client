export enum EmailError {
  studentIdError = 'Verifique su matrícula en su correo',
  invalidEmailError = 'Ingrese un correo válido',
  nonEducationalEmailError = 'Use su correo institucional @tec.mx',
}

export enum PasswordError {
  noUpperError = 'Incluya una mayúscula',
  noLowerError = 'Incluya una minúscula',
  noNumberError = 'Incluya un número',
  noSpecialCharError = 'Incluya un símbolo especial @$!%*?&',
  noMatchingError = 'Las contraseñas no coinciden',
}

export enum NameError {
  leadingSpaceError = 'Elimine el espacio inicial',
  endingSpaceError = 'Elimine el espacio al final',
  onlyAlphaError = 'Usa solo valores alfabéticos',
}
