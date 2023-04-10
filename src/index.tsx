import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from 'routes/authentication/Authentication';
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Error</h1>
  },
  {
    path: 'auth',
    element: <Authentication />
  }
])

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
