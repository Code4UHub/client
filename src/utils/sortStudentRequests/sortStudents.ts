import { Request } from 'components/StudentRequest/StudentRequest';

export function sortStudents(data: Request[], element: string, value: string) {
  // Translate element from spanish (UI) to values in backend
  let assignedElement: keyof Request = 'class_id';
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
      assignedElement = 'requested_date';
      break;
    default:
      assignedElement = 'class_id';
      break;
  }
  if (assignedElement === 'class_id') {
    return value === 'Up'
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
  return value === 'Up'
    ? data.sort((a, b) => a[assignedElement].localeCompare(b[assignedElement]))
    : data.sort((a, b) => b[assignedElement].localeCompare(a[assignedElement]));
}
