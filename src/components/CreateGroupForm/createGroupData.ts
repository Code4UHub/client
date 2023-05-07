type InputData = {
  label: string;
  type: string;
  id: string;
}[];

export const days: string[] = ['LU', 'MA', 'MI', 'JU', 'VI'];

export const createGroupInputData: InputData = [
  {
    label: 'Unidad de Formación (Nombre o clave)',
    type: 'text',
    id: 'subject',
  },
  {
    label: 'Código de la clase',
    type: 'text',
    id: 'class_id',
  },
  {
    label: 'Hora Inicio',
    type: 'time',
    id: 'start_time',
  },
  {
    label: 'Hora Fin',
    type: 'time',
    id: 'end_time',
  },
  {
    label: 'Días que aplican a este horario',
    type: 'checkbox',
    id: 'days',
  },
  {
    label: 'Fecha Fin',
    type: 'date',
    id: 'finished_date',
  },
];
