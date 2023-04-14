type InputData = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
}[];

export const days: string[] = ["L", "M", "X", "J", "V"];

export const createGroupInputData: InputData = [
  {
    label: "Unidad de Formación (Nombre o clave)",
    type: "text",
    id: "subject",
    placeholder: "TC1000B - Programacion orientada a objetos",
  },
  {
    label: "Código de la clase",
    type: "text",
    id: "classCode",
    placeholder: "Código de acceso de la clase",
  },
  {
    label: "Hora Inicio",
    type: "time",
    id: "startTime",
    placeholder: "",
  },
  {
    label: "Hora Fin",
    type: "time",
    id: "endTime",
    placeholder: "",
  },
  {
    label: "Días que aplican a este horario",
    type: "checkbox",
    id: "days",
    placeholder: "",
  },
  {
    label: "Fecha Fin",
    type: "date",
    id: "endDate",
    placeholder: "",
  },
];
