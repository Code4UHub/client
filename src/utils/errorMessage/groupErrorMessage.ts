export enum SubjectError {
	empty = "Campo vacío",
	noOption = "Selecciona una opción de la lista",
}

export enum ClassCodeError {
	whitespace = "Sin espacios",
}

export enum TimeError {
	empty = "Campo incompleto",
	noStartTime = "Introduce una hora de inicio",
	invalid = "Introduce un horario válido",
}

export enum DateError {
	empty = "Campo incompleto",
	endTimeGreater = "La fecha de fin debe ser mayor a la fecha actual",
}
