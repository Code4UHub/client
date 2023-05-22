import { StudentRequest } from 'types/StudentRequest/StudentRequest';

export function sortStudents(
  data: StudentRequest[],
  element: string,
  value: 'Up' | 'Down'
) {
  // Translate element from spanish (UI) to english (values in backend)
  let assignedElement: keyof StudentRequest = 'class_id';
  switch (element) {
    case 'Grupo':
      assignedElement = 'class_id';
      break;
    case 'Nombre':
      assignedElement = 'first_name';
      break;
    case 'Apellidos':
      assignedElement = 'last_name';
      break;
    case 'Matrícula':
      assignedElement = 'student_id';
      break;
    case 'Fecha':
      assignedElement = 'request_date';
      break;
    default:
      assignedElement = 'class_id';
      break;
  }
  if (assignedElement === 'class_id') {
    return value === 'Up' || value === 'Down'
      ? data.sort((a, b) =>
          `${a.subject_id}.${a.class_id}`.localeCompare(
            `${b.subject_id}.${b.class_id}`
          )
        )
      : data.sort((a, b) =>
          `${b.subject_id}.${b.class_id}`.localeCompare(
            `${a.subject_id}.${a.class_id}`
          )
        );
  }
  return value === 'Up' || value === 'Down'
    ? data.sort((a, b) => a[assignedElement].localeCompare(b[assignedElement]))
    : data.sort((a, b) => b[assignedElement].localeCompare(a[assignedElement]));
}
