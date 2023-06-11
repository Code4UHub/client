import React, { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import {
  ChallengeQuestionsPromise,
  HomeworkQuestionsPromise,
} from 'types/Questions/Question';

import Assignment from './Assignment';

export default function AssignmentWrapper() {
  const assignmentPromise = useLoaderData() as {
    assignment: Promise<HomeworkQuestionsPromise | ChallengeQuestionsPromise>;
  };

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Await resolve={assignmentPromise.assignment}>
        {(assigment: HomeworkQuestionsPromise | ChallengeQuestionsPromise) => {
          if (
            assigment.status === 'success' &&
            typeof assigment.data !== 'string'
          ) {
            return <Assignment assignment={assigment.data} />;
          }

          return <h1>Error</h1>;
        }}
      </Await>
    </Suspense>
  );
}
