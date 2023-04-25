type InputData = {
  label: string;
  type: string;
  id: string
}[];

export const days: string[] = ["L", "M", "X", "J", "V"];

export const createGroupInputData: InputData = [
  {
    label: "Unidad de Formación (Nombre o clave)",
    type: "text",
    id: "subject"
  },
  {
    label: "Código de la clase",
    type: "text",
    id: "classCode"
  },
  {
    label: "Hora Inicio",
    type: "time",
    id: "startTime"
  },
  {
    label: "Hora Fin",
    type: "time",
    id: "endTime"
  },
  {
    label: "Días que aplican a este horario",
    type: "checkbox",
    id: "days"
  },
  {
    label: "Fecha Fin",
    type: "date",
    id: "endDate"
  },
];
