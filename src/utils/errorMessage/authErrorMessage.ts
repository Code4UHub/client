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
  leadingSpaceError = 'Elimine el espacio inicial',
  endingSpaceError = 'Elimine el espacio al final',
}

export enum NameError {
  onlyAlphaError = 'Usa solo valores alfabéticos',
  leadingSpaceError = 'Elimine el espacio inicial',
  endingSpaceError = 'Elimine el espacio al final',
}
