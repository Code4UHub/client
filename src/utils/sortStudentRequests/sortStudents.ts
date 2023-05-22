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
    return value === 'Up'
      ? data.sort((a, b) =>
          `${a.class_id}.${a.subject_id}`.localeCompare(
            `${b.class_id}.${b.subject_id}`
          )
        )
      : data.sort((a, b) =>
          `.${b.class_id}.${b.subject_id}`.localeCompare(
            `.${a.class_id}.${a.subject_id}`
          )
        );
  }
  return value === 'Up'
    ? data.sort((a, b) => a[assignedElement].localeCompare(b[assignedElement]))
    : data.sort((a, b) => b[assignedElement].localeCompare(a[assignedElement]));
}
