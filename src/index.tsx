import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toast } from 'components/Toast/Toast';
import GlobalLoading from 'components/GlobalLoading/GlobalLoading';
import Authentication from 'routes/authentication/Authentication';
import Assignment from 'routes/assignment/Assignment';
import StudentRequests from 'routes/StudentRequests/StudentRequests';
import { store, persistor } from 'store/store';
import { Provider } from 'react-redux';
import { Root } from 'routes/root/Root';

import { PersistGate } from 'redux-persist/integration/react';

import Classes from 'routes/classes/Classes';
import './index.css';

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Classes />,
      },
      {
        path: '/assignment',
        element: <Assignment />,
      },
      {
        path: '/report',
        element: <h1>Aqui va los reportes</h1>,
      },
      {
        path: '/requests',
        element: <StudentRequests />,
      },
    ],
    errorElement: <h1>Error</h1>,
  },
  {
    path: '/auth',
    element: <Authentication />,
  },
]);

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
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
