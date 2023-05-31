import { GroupGraphType } from 'types/GroupGraph/GroupGraphType';
import { GraphCategory, GraphEvaluate } from 'types/GroupOptions/GroupOptions';

function isGraphCategory(
  element: GraphCategory | GraphEvaluate
): element is GraphCategory {
  return ['Leaderboard', 'Módulo', 'Tema'].includes(element as GraphCategory);
}

export function sortGraphs(
  data: GroupGraphType[],
  element: GraphCategory | GraphEvaluate,
  value: 'Up' | 'Down'
) {
  if (isGraphCategory(element)) {
    return value === 'Up'
      ? data.sort((a, b) => a.id - b.id)
      : data.sort((a, b) => b.id - a.id);
  }
  return value === 'Up'
    ? data.sort((a, b) => b.value - a.value)
    : data.sort((a, b) => a.value - b.value);
}
