import "semantic-ui-css/semantic.min.css";
import "decentraland-ui/dist/themes/base-theme.css";
import "decentraland-ui/dist/themes/alternative/dark-theme.css";
import "./index.css";

import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TranslationProvider from "decentraland-dapps/dist/providers/TranslationProvider";
import MainPage from "./components/Pages/MainPage/MainPage";
import { initStore } from "./modules/store";
import * as locales from "./modules/translation/locales";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

const component = (
  <React.StrictMode>
    <Provider store={initStore()}>
      <TranslationProvider locales={Object.keys(locales)}>
        <RouterProvider router={router} />
      </TranslationProvider>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(component, document.getElementById("root") as HTMLElement);
