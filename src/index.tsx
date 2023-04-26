import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "routes/authentication/Authentication";
import Assignment from "routes/assignment/Assignment";
import { store, persistor } from "store/store";
import { Provider } from "react-redux";
import { Root } from "routes/root/Root";

import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import "./index.css";

const router = createBrowserRouter([
	{
		element: <Root />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/assignment",
				element: <Assignment />,
			},
		],
		errorElement: <h1>Error</h1>,
	},
	{
		path: "/auth",
		element: <Authentication />,
	},
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate
				persistor={persistor}
				loading={null}
			>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
