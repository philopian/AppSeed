import "./sass/global.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Root from "./react/Root.jsx";
import store from "./react/store";

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

// Add React to the page
ReactDOM.render(<App />, document.getElementById("react")); // eslint-disable-line
