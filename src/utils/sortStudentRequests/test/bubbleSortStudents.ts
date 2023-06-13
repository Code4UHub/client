import { StudentRequest } from 'types/StudentRequest/StudentRequest';

// Implementation that sorts StudentRequests according to order and attribute
// Accomplish the same as sortStudents with a different approach
export function bubbleSort(
  studentRequests: StudentRequest[],
  order: 'Up' | 'Down',
  element: string
): StudentRequest[] {
  const sortedArray = [...studentRequests];
  // Translate element from spanish (UI) to english (values in backend)
  let sortBy: keyof StudentRequest = 'class_id';
  switch (element) {
    case 'Grupo':
      sortBy = 'class_id';
      break;
    case 'Nombre':
      sortBy = 'first_name';
      break;
    case 'Apellidos':
      sortBy = 'last_name';
      break;
    case 'Matrícula':
      sortBy = 'student_id';
      break;
    case 'Fecha':
      sortBy = 'request_date';
      break;
    default:
      sortBy = 'class_id';
      break;
  }

  for (let i = 0; i < sortedArray.length - 1; i += 1) {
    for (let j = 0; j < sortedArray.length - i - 1; j += 1) {
      const currentRequest = sortedArray[j];
      const nextRequest = sortedArray[j + 1];
      let shouldSwap: boolean;
      if (sortBy === 'class_id') {
        shouldSwap =
          order === 'Up'
            ? `${currentRequest.subject_id}.${currentRequest.subject_id}` >
              `${nextRequest.subject_id}.${nextRequest.subject_id}`
            : `${currentRequest.subject_id}.${currentRequest.subject_id}` <=
              `${nextRequest.subject_id}.${nextRequest.subject_id}`;
      } else {
        shouldSwap =
          order === 'Up'
            ? currentRequest[sortBy] > nextRequest[sortBy]
            : currentRequest[sortBy] <= nextRequest[sortBy];
      }
      if (shouldSwap) {
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1];
        sortedArray[j + 1] = temp;
      }
    }
  }
  return sortedArray;
}
