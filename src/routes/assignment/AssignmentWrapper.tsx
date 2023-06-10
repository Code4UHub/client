import React, { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import {
  HomeworkQuestionList,
  HomeworkQuestionListPromise,
} from 'types/Questions/Question';
import Assignment from './Assignment';

export default function AssignmentWrapper() {
  const assignmentPromise = useLoaderData() as {
    assignment: Promise<HomeworkQuestionListPromise>;
  };

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Await resolve={assignmentPromise.assignment}>
        {(assigment: HomeworkQuestionListPromise) => {
          if (assigment.status === 'success') {
            return (
              <Assignment assignment={assigment.data as HomeworkQuestionList} />
            );
          }

          return <h1>Error</h1>;
        }}
      </Await>
    </Suspense>
  );
}
