import { Homework } from 'types/Homework/Homework';

export function groupHomeworkByDate(homeworkList: Homework[]) {
  if (homeworkList.length === 0) return homeworkList;

  if (homeworkList.length === 1) return [homeworkList];

  const homeworkGroup: Homework[][] = [[]];

  let currentGroup = 0;

  homeworkGroup[currentGroup].push(homeworkList[0]);

  for (let index = 1; index < homeworkList.length; index += 1) {
    if (homeworkList[index].deadline !== homeworkList[index - 1].deadline) {
      homeworkGroup.push([]);
      currentGroup += 1;
    }

    homeworkGroup[currentGroup].push(homeworkList[index]);
  }

  return homeworkGroup;
}
