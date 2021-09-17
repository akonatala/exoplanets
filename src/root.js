import React from "react";
import App from "./containers/app";
import { Provider } from "react-redux";
import configureStore from "./store";

// import "bootstrap/dist/css/bootstrap.min.css";

const Root = () => (
  <Provider store={configureStore()}>
  <App />
  </Provider>
);

export default Root;
