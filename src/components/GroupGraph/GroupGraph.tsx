import React, { useEffect } from 'react';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import { SortButtons } from 'components/SortButtons/SortButtons';

import { GroupGraphType } from 'types/GroupGraph/GroupGraphType';
import { GraphCategory, GraphEvaluate } from 'types/GroupOptions/GroupOptions';

import { useSort } from 'hooks/useSort';

import style from './GroupGraph.module.css';

type Props = {
  graphData: GroupGraphType[];
  category: GraphCategory;
  evaluate: GraphEvaluate;
};

export default function GroupGraph({ graphData, category, evaluate }: Props) {
  const ALL_VALUES = 'ALL';
  const {
    ruleElement,
    ruleDirection,
    sortedData,
    getActiveSort,
    onUpdateRules,
    onUpdateData,
  } = useSort({
    initialRuleElement: category,
    initialFilterElement: ALL_VALUES,
    ALL_VALUES,
    caller: 'groupGraphs',
  });

  useEffect(() => {
    onUpdateData(
      graphData.map((graph) => ({
        title: `${graph.id}. ${graph.title}`,
        value: graph.value,
        id: graph.id,
      }))
    );
    // eslint-disable-next-line
  }, [graphData]);

  if (!sortedData) return <h1>Loading</h1>;

  return (
    <div className={style.container}>
      <div className={style.sorters}>
        <span className={style.hint}>Ordenar por: </span>
        <div className={style.sort}>
          <SortButtons
            active={getActiveSort(category)}
            parameter={category}
            updateSortRule={onUpdateRules}
          />
        </div>
        <div className={style.sort}>
          <SortButtons
            active={getActiveSort(evaluate)}
            parameter={evaluate}
            updateSortRule={onUpdateRules}
          />
        </div>
      </div>

      <div className={style.graphs}>
        {sortedData.map((d) => (
          <React.Fragment key={`${d.id}${d.value}`}>
            <span className={style['graph-title']}>{d.title}</span>
            <div className={style['bar-graph']}>
              <ProgressBar
                percentage={d.value}
                textPosition="in"
                key={`${d.id}${d.value}${ruleElement}${ruleDirection}graph`}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
