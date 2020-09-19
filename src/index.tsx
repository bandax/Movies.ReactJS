import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import { configureStore } from "./store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = configureStore();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
