//--bower:css (DO NOT DELETE)------------
//--bower:endinject (DO NOT DELETE)-------
import "./sass/style.scss";
import React from "react";
import ReactDOM from "react-dom";

import config from '../appseed.config.js';
import Root from "./react/Root.jsx";
import showComponents from "./services/show-components.js";
import { fetchDataTest } from './services/http';

// Make sure webpack is wired up!
console.log("[webpack is setup!]");

// Add React to the page
ReactDOM.render(<Root />, document.getElementById("react")); // eslint-disable-line

// Fetch some sample data from the Express Rest service
fetchDataTest().then((payload) => {
  console.log('[local REST webserver]', payload.localServer);
})