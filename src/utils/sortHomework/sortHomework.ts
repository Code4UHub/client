/* eslint-disable no-continue */
import {
  Homework,
  StudentAllHomeworks,
  StudentClassHomework,
  TeacherAllHomeworks,
} from 'types/Homework/Homework';

export function groupHomeworkByDate(
  homeworkList: (
    | Homework
    | StudentAllHomeworks
    | TeacherAllHomeworks
    | StudentClassHomework
  )[]
) {
  if (homeworkList.length === 0) return homeworkList;

  if (homeworkList.length === 1) return [homeworkList];

  const homeworkGroup: (
    | Homework
    | StudentAllHomeworks
    | TeacherAllHomeworks
    | StudentClassHomework
  )[][] = [[]];

  let currentGroup = 0;

  let currIndex = 0;

  while (
    'is_active' in homeworkList[currIndex] &&
    !(homeworkList[currIndex] as StudentAllHomeworks | TeacherAllHomeworks)
      .is_active
  ) {
    currIndex += 1;
  }

  if (currIndex < homeworkList.length) {
    homeworkGroup[currentGroup].push(homeworkList[currIndex]);
  }

  for (let index = currIndex + 1; index < homeworkList.length; index += 1) {
    if (
      !(homeworkList[index] as StudentAllHomeworks | TeacherAllHomeworks)
        .is_active
    ) {
      continue;
    }

    if (homeworkList[index].deadline !== homeworkList[index - 1].deadline) {
      homeworkGroup.push([]);
      currentGroup += 1;
    }

    homeworkGroup[currentGroup].push(homeworkList[index]);
  }

  return homeworkGroup;
}
