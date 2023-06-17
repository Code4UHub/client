import { useEffect, useState } from 'react';
import { sortStudents } from 'utils/sortStudentRequests/sortStudents';
import { sortGraphs } from 'utils/sortGraphs/sortGraphs';
import { StudentRequest } from 'types/StudentRequest/StudentRequest';
import { GroupGraphType } from 'types/GroupGraph/GroupGraphType';
import { GraphCategory, GraphEvaluate } from 'types/GroupOptions/GroupOptions';

type Props = {
  initialRuleElement: string; // Sort value that is active on start
  initialFilterElement: string; // Filter element that is active on start
  ALL_VALUES: string; // Filter value that allows all data to appear
  caller: 'studentRequests' | 'groupGraphs'; // Who is using the hook, to decide sort function
};

export const useSort = ({
  initialRuleElement,
  initialFilterElement,
  ALL_VALUES,
  caller,
}: Props) => {
  const [data, setData] = useState([]);
  const [ruleElement, setRuleElement] = useState(initialRuleElement);
  const [ruleDirection, setRuleDirection] = useState<'Up' | 'Down'>('Up');
  const [filter, setFilter] = useState(initialFilterElement);
  const [sortedData, setSortedData] = useState<any[]>([]);

  function onUpdateRules(element: string, direction: 'Up' | 'Down') {
    setRuleElement(element);
    setRuleDirection(direction);
  }

  // Given a ruleElement, if that element has an active component, returns which button is active, otherwhise, none;
  function getActiveSort(header: string): 'Up' | 'Down' | 'none' {
    if (header === ruleElement) {
      return ruleDirection;
    }
    return 'none';
  }

  function onUpdateFilter(value: string) {
    setFilter(value);
  }

  const onUpdateData = (value: any) => {
    setData(value);
  };

  useEffect(() => {
    // Get requests sorted by buttons and filtered by values
    if (caller === 'studentRequests') {
      const newArray: StudentRequest[] = sortStudents(
        [...data],
        ruleElement,
        ruleDirection
      ).filter((request) => {
        if (filter === ALL_VALUES) return request;
        const row = `${request.subject_id}.${request.class_id}`;
        return row === filter;
      });
      setSortedData(newArray);
    }
    if (caller === 'groupGraphs') {
      if (data.length > 0 && (data[0] as GroupGraphType).id) {
        const newArray: GroupGraphType[] = sortGraphs(
          [...data],
          ruleElement as GraphCategory | GraphEvaluate,
          ruleDirection
        );
        setSortedData(newArray as GroupGraphType[]);
      }
    }
  }, [data, ruleDirection, ruleElement, filter, ALL_VALUES, caller]);

  // DEFINE ALL FILTER OPTIONS, FOR COMPONENTS TO SELECT
  let allFilterOptions: string[] = [ALL_VALUES];
  if (caller === 'studentRequests') {
    allFilterOptions = [
      ALL_VALUES,
      ...data
        .map(
          (request: StudentRequest) =>
            `${request.subject_id}.${request.class_id}`
        )
        .filter((value, index, array) => array.indexOf(value) === index),
    ];
  }
  if (caller === 'groupGraphs') {
    allFilterOptions = [ALL_VALUES];
  }

  return {
    ruleElement,
    ruleDirection,
    filter,
    allFilterOptions,
    sortedData,
    getActiveSort,
    onUpdateRules,
    onUpdateFilter,
    onUpdateData,
  };
};
