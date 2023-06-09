import { GroupGraphType } from 'types/GroupGraph/GroupGraphType';
import { GraphCategory, GraphEvaluate } from 'types/GroupOptions/GroupOptions';

function isGraphCategory(
  element: GraphCategory | GraphEvaluate
): element is GraphCategory {
  return ['Leaderboard', 'Módulo', 'Challenge'].includes(
    element as GraphCategory
  );
}

export function sortGraphs(
  data: GroupGraphType[],
  element: GraphCategory | GraphEvaluate,
  value: 'Up' | 'Down'
) {
  if (isGraphCategory(element)) {
    return value === 'Up'
      ? data.sort((a, b) => a.module_id - b.module_id)
      : data.sort((a, b) => b.module_id - a.module_id);
  }
  return value === 'Up'
    ? data.sort((a, b) => b.average - a.average)
    : data.sort((a, b) => a.average - b.average);
}
