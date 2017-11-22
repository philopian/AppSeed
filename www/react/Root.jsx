import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation.jsx";
import View1 from "./containers/View1.jsx";
import View2 from "./containers/View2.jsx";

export default class Root extends Component {
  render() {
    return (
      <Router>
        <div className="application-container">
          <div>
            <Navigation />
          </div>
          <div>
            <Route exact path="/" component={View1} />
            <Route path="/view2" component={View2} />
          </div>
        </div>
      </Router>
    );
  }
}
