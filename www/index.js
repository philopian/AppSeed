//--bower:css (DO NOT DELETE)------------
//--bower:endinject (DO NOT DELETE)-------
import "./sass/style.scss";
import React from "react";
import ReactDOM from "react-dom";

import config from '../appseed.config.js';
import Root from "./react/Root.jsx";

// Make sure webpack is wired up!
console.log("[webpack is setup!]");

// Add React to the page
ReactDOM.render(<Root />, document.getElementById("react")); // eslint-disable-line