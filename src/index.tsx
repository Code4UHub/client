import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
  LoaderFunction,
  LoaderFunctionArgs,
  defer,
} from 'react-router-dom';

import { store, persistor, RootState } from 'store/store';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { TypePromise } from 'types/TypePromise/TypePromise';
import { Class as ClassType } from 'types/Class/Class';
import { SubjectModule } from 'types/Module/Module';

import {
  getClass,
  getGraphData,
  getSubjects,
  getSubjectHomeworkQuestions,
  getsSubjectModules,
  getQuestionFromHomework,
  getQuestionFromChallenge,
} from 'utils/db/db.utils';

import { Root } from 'routes/root/Root';
import Authentication from 'routes/authentication/Authentication';
import StudentRequests from 'routes/requests/StudentRequests';
import Classes from 'routes/classes/Classes';
import ModuleTeachers from 'routes/class/modules/ModuleTeachers';
import ModuleStudents from 'routes/class/modules/ModuleStudents';
import Group from 'routes/class/group/Group';
import GroupGraphController from 'routes/class/groupGraphController/GroupGraphController';
import CreateQuestion from 'routes/createQuestion/createQuestion';
import { Class } from 'routes/class/Class';
import Home from 'routes/class/home/Home';
import AssignmentWrapper from 'routes/assignment/AssignmentWrapper';
import CreateHomework from 'routes/homework/createHomework/CreateHomework';
import HomeworkPage from 'routes/class/homework/Homework';
import Homework from 'routes/homework/Homework';

import { Toast } from 'components/Toast/Toast';
import GlobalLoading from 'components/GlobalLoading/GlobalLoading';
import NotFound from 'components/NotFound/NotFound';
import './index.css';

function Index() {
  const user = useSelector((state: RootState) => state.user.currentUser);

  const loaderWrapper = async (
    fn: () => Promise<TypePromise<any>>,
    allowedUsers?: 'student' | 'teacher'
  ) => {
    if (!user) {
      return redirect('/auth');
    }
    if (allowedUsers && allowedUsers !== user.role) {
      throw new Error();
    }

    const data = await fn();
    if (data.status === 'success') {
      return data.data;
    }
    throw new Error();
  };

  const createHomeworkLoader: LoaderFunction = async ({
    params,
  }: LoaderFunctionArgs) => {
    if (
      params.difficulty === '1' ||
      params.difficulty === '2' ||
      params.difficulty === '3'
    ) {
      const data = (await loaderWrapper(
        () => getClass(user?.authToken as string, params.id as string),
        'teacher'
      )) as ClassType;

      if (data.teacher_id === user?.id) {
        const questions = await getSubjectHomeworkQuestions(
          user?.authToken as string,
          data.subject_id,
          Number(params.difficulty) as 1 | 2 | 3
        );

        if (questions.status === 'success') {
          const modules = await getsSubjectModules(
            user.authToken,
            data.subject_id
          );

          if (modules.status === 'success') {
            const modulesList = (modules.data as SubjectModule[]).map(
              (module) => ({ id: module.module_id, value: module.title })
            );

            return {
              class: { id: data.class_id, value: data.subject_name },
              questionListDb: questions.data,
              modulesList,
            };
          }
        }
      }
    }

    throw new Error();
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          children: [
            {
              path: '/',
              element: <Navigate to="/classes" />,
            },
            {
              path: '/requests',
              element: <StudentRequests />,
            },
            {
              path: 'classes',
              element: <Classes />,
            },
            {
              path: 'classes/:id',
              loader: async ({ params }) =>
                await loaderWrapper(() =>
                  getClass(user?.authToken as string, params.id as string)
                ),
              element: <Class />,
              children: [
                {
                  path: '',
                  element: <Home />,
                },
                {
                  path: 'modules',
                  element:
                    user?.role === 'teacher' ? (
                      <ModuleTeachers />
                    ) : (
                      <ModuleStudents />
                    ),
                },
                { path: 'homework', element: <HomeworkPage /> },
                { path: 'graphs', element: <Group /> },
                {
                  path: 'graphs/:graph_id',
                  loader: async ({ params }) =>
                    await loaderWrapper(
                      () =>
                        getGraphData(
                          user?.authToken as string,
                          params.id as string,
                          parseInt(params.graph_id ?? '0', 10)
                        ),
                      'teacher'
                    ),
                  element: <GroupGraphController />,
                },
              ],
            },
            {
              path: 'classes/:id/homework/create/:difficulty',
              element: <CreateHomework />,
              loader: createHomeworkLoader,
            },
          ],
        },
        {
          path: 'homework',
          element: <Homework />,
        },
        {
          path: 'new-question',
          element: <CreateQuestion />,
          loader: async () =>
            await loaderWrapper(
              () => getSubjects(user?.authToken as string),
              'teacher'
            ),
        },
        {
          path: 'homework/:id/create/:difficulty',
          element: <CreateHomework />,
          loader: createHomeworkLoader,
        },
        {
          path: 'classes/:classId/modules/challenge/:assignmentId',
          element: <AssignmentWrapper />,
          loader: async ({ params }) => {
            if (!user) return redirect('/auth');
            if (user.role !== 'student') throw new Error();

            const assignmentPromise = getQuestionFromChallenge(
              user.authToken,
              params.assignmentId as string,
              user.id
            );

            return defer({
              assignment: assignmentPromise,
            });
          },
        },
        {
          path: 'homework/:assignmentId',
          element: <AssignmentWrapper />,
          loader: async ({ params }) => {
            if (!user) return redirect('/auth');
            if (user.role !== 'student') throw new Error();

            const assignmentPromise = getQuestionFromHomework(
              user.authToken,
              params.assignmentId as string,
              user.id
            );

            return defer({
              assignment: assignmentPromise,
            });
          },
        },
      ],
      errorElement: <NotFound />,
    },
    {
      path: '/auth',
      element: <Authentication />,
    },
  ]);

  return <RouterProvider router={router} />;
}

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={null}
      >
        <Toast />
        <GlobalLoading />
        <Index />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
