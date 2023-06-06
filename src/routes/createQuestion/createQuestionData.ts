type InputData = {
  label: string;
  type: 'autocomplete' | 'text' | 'radio';
  id: string;
  width: 'full' | 'double' | 'single';
}[];

export const createQuestionInputData: InputData = [
  {
    label: 'Unidad de Formación (Nombre o clave)',
    type: 'autocomplete',
    id: 'subject',
    width: 'full',
  },
  {
    label: 'Módulo',
    type: 'autocomplete',
    id: 'module',
    width: 'full',
  },
  {
    label: 'Título',
    type: 'text',
    id: 'title',
    width: 'double',
  },
  {
    label: 'Dificultad',
    type: 'autocomplete',
    id: 'difficulty',
    width: 'single',
  },
  {
    label: 'Descripción',
    type: 'text',
    id: 'description',
    width: 'full',
  },
  {
    label: 'Tipo de pregunta',
    type: 'radio',
    id: 'questionType',
    width: 'full',
  },
];
